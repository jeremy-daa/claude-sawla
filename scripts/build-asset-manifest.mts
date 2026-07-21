// Compresses staged photography into public/assets/untagged and MERGES the results into
// the existing manifest.json that the asset labeler reads.
//
// The manifest is the sole source of truth for the labeler: app/asset-labeler/page.tsx renders
// manifest.images, and app/api/asset-labels/route.ts refuses to save a label whose assetId is
// not in it. The original source root of the first run ("images/") no longer exists, so this
// script can never regenerate those 309 entries — it only ever appends. Overwriting the manifest
// would orphan every asset already labeled in MongoDB.
//
// Run: npx tsx scripts/build-asset-manifest.mts --dry-run --limit 5
//      npx tsx scripts/build-asset-manifest.mts
import { createHash } from 'node:crypto'
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import type { AssetManifest, AssetManifestImage } from '../lib/asset-labeling'

const SOURCE_DIR = path.join('public', 'assets', 'staged')
const OUTPUT_ROOT = path.join('public', 'assets', 'untagged')
const MANIFEST_PATH = path.join(OUTPUT_ROOT, 'manifest.json')

// Every file in the flat staged dump becomes one labeler category. The prefix is synthetic —
// it is what lands in source.path (and therefore what the asset id hashes) without moving files.
const CATEGORY = 'staged-2026-07'

// Must match the first run exactly, or the batches will not look like one library.
const MAX_DIMENSION = 2400
const QUALITY = 82
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp'])

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const limitArg = args.indexOf('--limit')
const limit = limitArg === -1 ? Infinity : Number(args[limitArg + 1])

if (Number.isNaN(limit)) {
  console.error('--limit needs a number')
  process.exit(1)
}

// ── helpers ────────────────────────────────────────────────────────────────────

// The first run keyed assets on the first 8 chars of sha1(source.path), with forward slashes.
// Verified against live entries: sha1('Awash NP & Ali/Hamedreyas.jpg') starts 1bd7f848.
// Changing this would break every existing asset_labels document.
function assetId(sourcePath: string) {
  return createHash('sha1').update(sourcePath).digest('hex').slice(0, 8)
}

function fileHash(filePath: string) {
  return createHash('sha256').update(readFileSync(filePath)).digest('hex')
}

function run(command: string, commandArgs: string[]): Promise<{ code: number; stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, commandArgs, { windowsHide: true })
    let stdout = ''
    let stderr = ''
    child.stdout.on('data', chunk => (stdout += chunk))
    child.stderr.on('data', chunk => (stderr += chunk))
    child.on('error', reject)
    child.on('close', code => resolve({ code: code ?? 1, stdout, stderr }))
  })
}

async function probe(filePath: string) {
  const { code, stdout, stderr } = await run('ffprobe', [
    '-v', 'error',
    '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height,codec_name',
    '-of', 'json',
    filePath,
  ])

  if (code !== 0) throw new Error(`ffprobe failed: ${stderr.trim()}`)

  const stream = (JSON.parse(stdout).streams ?? [])[0]
  if (!stream) throw new Error('ffprobe returned no video stream')

  return {
    width: typeof stream.width === 'number' ? stream.width : null,
    height: typeof stream.height === 'number' ? stream.height : null,
    format: typeof stream.codec_name === 'string' ? stream.codec_name : null,
  }
}

// Caps the *longer* edge at MAX_DIMENSION and never upscales. -1 rather than -2 so an image
// already under the cap passes through at its exact dimensions instead of gaining a pixel row.
const SCALE_FILTER =
  `scale='if(gt(iw,ih),min(${MAX_DIMENSION},iw),-1)':'if(gt(iw,ih),-1,min(${MAX_DIMENSION},ih))'`

async function encode(source: string, destination: string) {
  const { code, stderr } = await run('ffmpeg', [
    '-y',
    '-i', source,
    '-vf', SCALE_FILTER,
    '-c:v', 'libwebp',
    '-quality', String(QUALITY),
    '-compression_level', '6',
    '-preset', 'picture',
    '-map_metadata', '-1',
    '-frames:v', '1',
    destination,
  ])

  if (code !== 0) throw new Error(`ffmpeg failed: ${stderr.trim().split('\n').slice(-4).join(' ')}`)
}

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`
}

// ── discovery ──────────────────────────────────────────────────────────────────

if (!existsSync(SOURCE_DIR)) {
  console.error(`Source directory not found: ${SOURCE_DIR}`)
  process.exit(1)
}

const sourceFiles = readdirSync(SOURCE_DIR)
  .filter(name => IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()))
  .sort()

// Staged files that differ only by extension (e.g. foo.jpg + foo.webp, which here are two
// different photographs) would fight over one .webp output and silently lose an image. Suffix
// the whole colliding group with its source extension — deterministic, and no source file moves.
const outputNames = new Map<string, string>()
const byBaseName = new Map<string, string[]>()
for (const name of sourceFiles) {
  const base = name.slice(0, name.length - path.extname(name).length)
  byBaseName.set(base.toLowerCase(), [...(byBaseName.get(base.toLowerCase()) ?? []), name])
}

for (const [, names] of byBaseName) {
  for (const name of names) {
    const extension = path.extname(name)
    const base = name.slice(0, name.length - extension.length)
    const outputName = names.length > 1 ? `${base}-${extension.slice(1).toLowerCase()}.webp` : `${base}.webp`
    outputNames.set(name, outputName)
    if (names.length > 1) console.log(`Disambiguated: ${name} -> ${outputName}`)
  }
}

const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8')) as AssetManifest
const existingById = new Map(manifest.images.map(image => [image.id, image] as const))

console.log(`Manifest holds ${manifest.images.length} assets. Found ${sourceFiles.length} images in ${SOURCE_DIR}.`)
if (dryRun) console.log('DRY RUN — no files written, manifest untouched.\n')

const outputDir = path.join(OUTPUT_ROOT, CATEGORY)
if (!dryRun) mkdirSync(outputDir, { recursive: true })

// ── process ────────────────────────────────────────────────────────────────────

const added: AssetManifestImage[] = []
const errors: Array<Record<string, unknown>> = []
const contentHashes = new Map<string, string[]>()
let processed = 0
let skippedExisting = 0
let index = 0

for (const name of sourceFiles) {
  if (index >= limit) break
  index += 1

  const sourceAbsolute = path.join(SOURCE_DIR, name)
  const sourcePath = `${CATEGORY}/${name}`
  const outputPath = `${CATEGORY}/${outputNames.get(name)}`
  const outputAbsolute = path.join(OUTPUT_ROOT, outputPath)
  const id = assetId(sourcePath)

  if (existingById.has(id) && existsSync(outputAbsolute)) {
    skippedExisting += 1
    console.log(`[${index}/${sourceFiles.length}] skip (already in manifest) ${name}`)
    continue
  }

  try {
    const sourceBytes = statSync(sourceAbsolute).size
    const sourceMeta = await probe(sourceAbsolute)

    const hash = fileHash(sourceAbsolute)
    contentHashes.set(hash, [...(contentHashes.get(hash) ?? []), name])

    if (dryRun) {
      console.log(
        `[${index}/${sourceFiles.length}] would encode ${name} ` +
          `(${sourceMeta.width}x${sourceMeta.height} ${sourceMeta.format}, ${formatBytes(sourceBytes)}) -> ${outputPath}`,
      )
      continue
    }

    await encode(sourceAbsolute, outputAbsolute)

    const outputBytes = statSync(outputAbsolute).size
    const outputMeta = await probe(outputAbsolute)

    added.push({
      id,
      status: 'processed',
      category: CATEGORY,
      source: {
        path: sourcePath,
        bytes: sourceBytes,
        width: sourceMeta.width,
        height: sourceMeta.height,
        format: sourceMeta.format,
        // Verified at planning time: every staged file is EXIF orientation 1, which is why
        // ffmpeg (which ignores EXIF rotation) is safe for this batch.
        orientation: 1,
      },
      output: {
        path: outputPath,
        publicPath: `/assets/untagged/${outputPath}`,
        bytes: outputBytes,
        width: outputMeta.width,
        height: outputMeta.height,
        format: 'webp',
      },
    })

    processed += 1
    console.log(
      `[${index}/${sourceFiles.length}] ${name} ` +
        `${formatBytes(sourceBytes)} -> ${formatBytes(outputBytes)} (${outputMeta.width}x${outputMeta.height})`,
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    errors.push({ sourcePath, message })
    console.error(`[${index}/${sourceFiles.length}] FAILED ${name}: ${message}`)
  }
}

// Byte-identical duplicates inside this batch. Cross-batch duplicates cannot be detected this
// way — the originals behind the first 309 assets are gone — so the labeler's "duplicate"
// status remains the human backstop.
const duplicateGroups = [...contentHashes.values()].filter(names => names.length > 1)
if (duplicateGroups.length > 0) {
  console.log('\nIdentical files in this batch (label one, mark the rest duplicate):')
  for (const names of duplicateGroups) console.log(`  ${names.join('  ==  ')}`)
}

if (dryRun) {
  console.log(`\nDry run complete. ${index} inspected, ${skippedExisting} already present, ${errors.length} failed.`)
  process.exit(errors.length > 0 ? 1 : 0)
}

// ── merge + atomic write ───────────────────────────────────────────────────────

manifest.images = [...manifest.images, ...added]
manifest.generatedAt = new Date().toISOString()
manifest.errors = [...(manifest.errors ?? []), ...errors]

const inputBytes = manifest.images.reduce((sum, image) => sum + (image.source.bytes ?? 0), 0)
const outputBytes = manifest.images.reduce((sum, image) => sum + (image.output.bytes ?? 0), 0)

manifest.totals = {
  discovered: manifest.images.length + errors.length,
  processed: manifest.images.filter(image => image.status === 'processed').length,
  skippedExisting: manifest.images.filter(image => image.status === 'skipped-existing').length,
  failed: manifest.errors.length,
  inputBytes,
  outputBytes,
  savedBytes: inputBytes - outputBytes,
}

const temporaryPath = `${MANIFEST_PATH}.tmp`
writeFileSync(temporaryPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
renameSync(temporaryPath, MANIFEST_PATH)

console.log(
  `\nAdded ${processed} assets (${skippedExisting} skipped, ${errors.length} failed). ` +
    `Manifest now holds ${manifest.images.length}.`,
)
console.log(`Library: ${formatBytes(inputBytes)} of originals -> ${formatBytes(outputBytes)} of webp.`)

if (errors.length > 0) process.exit(1)
