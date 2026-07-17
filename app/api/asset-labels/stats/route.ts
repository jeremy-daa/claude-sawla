import { NextResponse } from "next/server";
import { ensureAssetLabelIndexes, readAssetManifest } from "@/lib/asset-labeling";
import { getSawlaToursDb } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [manifest, db] = await Promise.all([readAssetManifest(), getSawlaToursDb()]);
    const collection = await ensureAssetLabelIndexes(db);
    const [labeled, duplicates, skipped, totalSaved] = await Promise.all([
      collection.countDocuments({ status: "labeled" }),
      collection.countDocuments({ status: "duplicate" }),
      collection.countDocuments({ status: "skipped" }),
      collection.countDocuments({}),
    ]);

    const totalAssets = manifest.images.length;
    const completed = labeled + duplicates + skipped;

    return NextResponse.json({
      totalAssets,
      totalSaved,
      completed,
      labeled,
      duplicates,
      skipped,
      remaining: Math.max(0, totalAssets - completed),
      percent: totalAssets > 0 ? Math.round((completed / totalAssets) * 100) : 0,
      database: "sawla-tours",
      collection: "asset_labels",
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to load asset label stats" },
      { status: 500 },
    );
  }
}