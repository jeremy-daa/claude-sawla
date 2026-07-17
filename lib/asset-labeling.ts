import { promises as fs } from "node:fs";
import path from "node:path";
import type { Db } from "mongodb";

export type AssetManifestImage = {
  id: string;
  status: string;
  category: string | null;
  source: {
    path: string;
    bytes: number;
    width: number | null;
    height: number | null;
    format: string | null;
    orientation: number | null;
  };
  output: {
    path: string;
    publicPath: string | null;
    bytes: number | null;
    width: number | null;
    height: number | null;
    format: string;
  };
};

export type AssetManifest = {
  generatedAt: string;
  sourceRoot: string;
  outputRoot: string;
  settings: Record<string, unknown>;
  totals: {
    discovered: number;
    processed: number;
    skippedExisting: number;
    failed: number;
    inputBytes: number;
    outputBytes: number;
    savedBytes: number;
  };
  images: AssetManifestImage[];
  errors: Array<Record<string, unknown>>;
};

export type AssetLabelRecord = {
  assetId: string;
  status: "labeled" | "duplicate" | "skipped";
  title: string;
  altText: string;
  description: string;
  tags: string[];
  seoKeywords: string[];
  suggestedUse: string[];
  destination: string;
  subjectType: string;
  duplicateOf?: string;
  notes: string;
  sourcePath: string;
  outputPath: string;
  publicPath: string | null;
  category: string | null;
  width: number | null;
  height: number | null;
  bytes: number | null;
  updatedAt: Date;
  createdAt?: Date;
};

export const ASSET_LABEL_COLLECTION = "asset_labels";

export async function readAssetManifest(): Promise<AssetManifest> {
  const manifestPath = path.join(process.cwd(), "public", "assets", "untagged", "manifest.json");
  const raw = await fs.readFile(manifestPath, "utf8");
  const manifest = JSON.parse(raw) as AssetManifest;

  manifest.images = Array.isArray(manifest.images) ? manifest.images : [];
  return manifest;
}

export function normalizeList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String).map((item) => item.trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

export function cleanString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function ensureAssetLabelIndexes(db: Db) {
  const collection = db.collection<AssetLabelRecord>(ASSET_LABEL_COLLECTION);

  await Promise.all([
    collection.createIndex({ assetId: 1 }, { unique: true }),
    collection.createIndex({ status: 1 }),
    collection.createIndex({ category: 1 }),
    collection.createIndex({ tags: 1 }),
    collection.createIndex({ updatedAt: -1 }),
  ]);

  return collection;
}
