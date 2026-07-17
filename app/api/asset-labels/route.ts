import { NextResponse } from "next/server";
import {
  ASSET_LABEL_COLLECTION,
  cleanString,
  ensureAssetLabelIndexes,
  normalizeList,
  readAssetManifest,
  type AssetLabelRecord,
} from "@/lib/asset-labeling";
import { getSawlaToursDb } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = await getSawlaToursDb();
    const collection = await ensureAssetLabelIndexes(db);
    const labels = await collection.find({}).sort({ updatedAt: -1 }).toArray();

    return NextResponse.json({ labels });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to load labels" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const assetId = cleanString(body.assetId);
    const status = cleanString(body.status) as AssetLabelRecord["status"];

    if (!assetId) {
      return NextResponse.json({ error: "assetId is required" }, { status: 400 });
    }

    if (!["labeled", "duplicate", "skipped"].includes(status)) {
      return NextResponse.json({ error: "Invalid label status" }, { status: 400 });
    }

    const manifest = await readAssetManifest();
    const asset = manifest.images.find((item) => item.id === assetId);

    if (!asset) {
      return NextResponse.json({ error: "Asset was not found in manifest" }, { status: 404 });
    }

    const now = new Date();
    const record: AssetLabelRecord = {
      assetId,
      status,
      title: cleanString(body.title),
      altText: cleanString(body.altText),
      description: cleanString(body.description),
      tags: normalizeList(body.tags),
      seoKeywords: normalizeList(body.seoKeywords),
      suggestedUse: normalizeList(body.suggestedUse),
      destination: cleanString(body.destination),
      subjectType: cleanString(body.subjectType),
      duplicateOf: cleanString(body.duplicateOf) || undefined,
      notes: cleanString(body.notes),
      sourcePath: asset.source.path,
      outputPath: asset.output.path,
      publicPath: asset.output.publicPath,
      category: asset.category,
      width: asset.output.width,
      height: asset.output.height,
      bytes: asset.output.bytes,
      updatedAt: now,
    };

    if (status === "labeled" && (!record.title || !record.altText)) {
      return NextResponse.json(
        { error: "Title and alt text are required unless the asset is marked duplicate or skipped" },
        { status: 400 },
      );
    }

    if (status === "duplicate" && !record.duplicateOf && !record.notes) {
      return NextResponse.json(
        { error: "Add a duplicate reference or note before marking this as duplicate" },
        { status: 400 },
      );
    }

    const db = await getSawlaToursDb();
    const collection = await ensureAssetLabelIndexes(db);

    await collection.updateOne(
      { assetId },
      {
        $set: record,
        $setOnInsert: { createdAt: now },
      },
      { upsert: true },
    );

    const saved = await db.collection<AssetLabelRecord>(ASSET_LABEL_COLLECTION).findOne({ assetId });

    return NextResponse.json({ label: saved });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to save label" },
      { status: 500 },
    );
  }
}