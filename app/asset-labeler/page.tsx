import type { Metadata } from "next";
import { readAssetManifest } from "@/lib/asset-labeling";
import AssetLabelerClient from "./AssetLabelerClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Asset Labeler",
  robots: { index: false, follow: false },
};

export default async function AssetLabelerPage() {
  const manifest = await readAssetManifest();

  return (
    <AssetLabelerClient
      generatedAt={manifest.generatedAt}
      images={manifest.images}
      totals={manifest.totals}
    />
  );
}