import { notFound } from "next/navigation";
import { getAuthenticatedReview, getReviewAssets } from "@/lib/image-review";
import { readAssetManifest } from "@/lib/asset-labeling";
import { getSawlaToursDb } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ reviewId: string; token: string }>;
  searchParams: Promise<{ assetId?: string; pagePath?: string; categoryId?: string }>;
};

function pageTitle(pagePath: string) {
  const lastPart = pagePath.split("/").filter(Boolean).pop();
  return (lastPart || "Sawla Tours")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default async function ImageReviewPreview({ params, searchParams }: Props) {
  const { reviewId, token } = await params;
  const query = await searchParams;
  const db = await getSawlaToursDb();
  const project = await getAuthenticatedReview(db, reviewId, token);
  if (!project || !query.assetId) notFound();

  const assets = await getReviewAssets(db, await readAssetManifest());
  const asset = assets.find((candidate) => candidate.assetId === query.assetId);
  if (!asset) notFound();

  const path = query.pagePath || "/";
  const title = pageTitle(path);
  const category = project.categories.find((item) => item.id === query.categoryId);

  return <main className="min-h-screen bg-[#f3efe6] text-charcoal">
    <header className="border-b border-sand bg-white px-5 py-4 md:px-8"><div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-3"><div><p className="label-eyebrow">Sawla page preview</p><h1 className="mt-1 font-body text-xl font-semibold tracking-normal">{title}</h1></div><div className="flex flex-wrap gap-2 text-xs"><span className="border border-sand bg-ivory px-3 py-2">{category?.title || "Image review"}</span><a href={`/image-review/${reviewId}/${token}`} className="btn-ghost px-3 py-2">Back to review</a><a href={path} target="_blank" rel="noreferrer" className="btn-primary px-3 py-2">Open current page</a></div></div></header>
    <section className="relative min-h-[68vh] overflow-hidden bg-charcoal"><img src={asset.publicPath || "/images/og-home.jpg"} alt={asset.altText || asset.title} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(35,32,29,0.9),rgba(35,32,29,0.2)_60%,rgba(35,32,29,0.3))]" /><div className="relative z-10 flex min-h-[68vh] items-end px-6 pb-14 md:px-12 md:pb-20"><div className="mx-auto w-full max-w-[1500px] text-ivory"><p className="label-eyebrow text-gold">Representative hero treatment</p><h2 className="mt-3 max-w-4xl font-body text-4xl font-semibold tracking-normal md:text-7xl">{title}</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-ivory/75">This review image is shown in the site’s full-width destination and journey hero treatment.</p></div></div></section>
    <section className="border-b border-sand bg-white px-6 py-10 md:px-12"><div className="mx-auto grid max-w-[1100px] gap-8 md:grid-cols-[1fr_280px] md:items-start"><div><p className="label-eyebrow">Image assignment</p><h2 className="mt-2 font-body text-2xl font-semibold tracking-normal">{asset.title || asset.sourcePath}</h2><p className="mt-3 text-sm leading-7 text-warmgrey">{asset.description || asset.altText || "Labeled photography candidate"}</p></div><dl className="border border-sand bg-ivory p-5 text-xs"><div><dt className="font-medium text-charcoal">Page path</dt><dd className="mt-1 break-all text-warmgrey">{path}</dd></div><div className="mt-4 border-t border-sand pt-4"><dt className="font-medium text-charcoal">Destination</dt><dd className="mt-1 text-warmgrey">{asset.destination || "Not specified"}</dd></div><div className="mt-4 border-t border-sand pt-4"><dt className="font-medium text-charcoal">Asset ID</dt><dd className="mt-1 break-all text-warmgrey">{asset.assetId}</dd></div></dl></div></section>
  </main>;
}
