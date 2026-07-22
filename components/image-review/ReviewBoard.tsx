"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRightLeft,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  ExternalLink,
  Loader2,
  Plus,
  Send,
  Sparkles,
  Trash2,
  Undo2,
  X,
} from "lucide-react";

type Category = {
  id: string;
  title: string;
  tier: string;
  description: string;
  targetDistinct: number;
};

type Item = {
  assetId: string;
  categoryId: string;
  role: "selected" | "alternative";
  decision: "pending" | "keep" | "remove" | "add";
  clientCategoryId?: string;
  clientNote?: string;
};

type Asset = {
  assetId: string;
  title: string;
  altText: string;
  sourcePath: string;
  publicPath: string | null;
  category: string | null;
  destination: string;
  width: number | null;
  height: number | null;
  status: string;
};

type ReviewState = {
  project: {
    reviewId: string;
    title: string;
    clientName: string;
    status: "draft" | "client-review" | "client-submitted" | "approved";
  };
  categories: Category[];
  items: Item[];
  assets: Asset[];
};

type Props = {
  reviewId: string;
  token: string;
  admin: boolean;
};

function apiPath(reviewId: string, token: string, admin: boolean) {
  const base = `/api/image-review/${reviewId}/${token}`;
  return admin ? `${base}?mode=admin` : base;
}

function itemKey(item: Pick<Item, "assetId" | "categoryId">) {
  return `${item.assetId}:${item.categoryId}`;
}

function effectiveRole(item: Item) {
  if (item.decision === "add") return "selected";
  if (item.decision === "remove") return "removed";
  return item.role;
}

function countCategory(items: Item[], categoryId: string, role: "selected" | "alternative") {
  return items.filter((item) => item.categoryId === categoryId && effectiveRole(item) === role).length;
}

export default function ReviewBoard({ reviewId, token, admin }: Props) {
  const [state, setState] = useState<ReviewState | null>(null);
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  const [assetLimit, setAssetLimit] = useState(30);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(apiPath(reviewId, token, admin), { cache: "no-store" });
      const json = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(json.error ?? "Unable to load review");
      setState(json as ReviewState);
      setCategoryId((current) => current || json.categories?.[0]?.id || "");
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load review");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, [reviewId, token, admin]);

  const category = state?.categories.find((item) => item.id === categoryId) ?? state?.categories[0];
  const currentItems = useMemo(
    () => state?.items.filter((item) => item.categoryId === category?.id) ?? [],
    [category?.id, state?.items],
  );
  const selectedItems = currentItems.filter((item) => effectiveRole(item) === "selected");
  const alternativeItems = currentItems.filter((item) => effectiveRole(item) === "alternative");
  const removedItems = currentItems.filter((item) => effectiveRole(item) === "removed");
  const assetMap = useMemo(() => new Map((state?.assets ?? []).map((asset) => [asset.assetId, asset])), [state?.assets]);
  const currentItemByAsset = useMemo(
    () => new Map(currentItems.map((item) => [item.assetId, item])),
    [currentItems],
  );
  const filteredAssets = useMemo(() => {
    const query = search.trim().toLowerCase();
    return (state?.assets ?? []).filter((asset) => {
      if (!query) return true;
      return [asset.assetId, asset.title, asset.altText, asset.sourcePath, asset.category, asset.destination]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query);
    });
  }, [search, state?.assets]);

  async function action(body: Record<string, unknown>) {
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch(apiPath(reviewId, token, false), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, ...(admin ? { mode: "admin" } : {}) }),
      });
      const json = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(json.error ?? "Unable to save review");
      await load();
      setNotice("Saved");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save review");
    } finally {
      setSaving(false);
    }
  }

  async function copy(value: string) {
    await navigator.clipboard.writeText(value);
    setNotice("Link copied");
  }

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-[#f3efe6] text-warmgrey"><Loader2 className="mr-2 animate-spin" size={18} /> Loading review</div>;
  }

  if (!state) {
    return <div className="mx-auto flex min-h-screen max-w-xl items-center justify-center bg-[#f3efe6] px-6 text-center"><div><X className="mx-auto mb-4 text-red-500" size={30} /><h1 className="font-body text-2xl font-semibold">Review unavailable</h1><p className="mt-3 text-sm text-warmgrey">{error || "This review link could not be loaded."}</p></div></div>;
  }

  const clientUrl = `${window.location.origin}/image-review/${reviewId}/${token}`;
  const totalSelected = state.items.filter((item) => effectiveRole(item) === "selected").length;
  const totalAlternatives = state.items.filter((item) => effectiveRole(item) === "alternative").length;
  const totalRemoved = state.items.filter((item) => effectiveRole(item) === "removed").length;

  return (
    <section className="min-h-screen bg-[#f3efe6] px-4 py-7 text-charcoal md:px-8">
      <div className="mx-auto max-w-[1500px]">
        <header className="mb-6 border border-sand bg-white p-5 md:p-7">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="label-eyebrow mb-3">Sawla photography review</p>
              <h1 className="font-body text-2xl font-semibold tracking-normal md:text-3xl">{state.project.title}</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-warmgrey">
                {admin ? "Curate the selected images and alternatives before sending the review link." : "Please review the proposed images for each part of the site. You can keep, remove, add, or move images between categories."}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="border border-sand bg-ivory px-3 py-2">{totalSelected} selected</span>
              <span className="border border-sand bg-ivory px-3 py-2">{totalAlternatives} alternatives</span>
              {totalRemoved > 0 && <span className="border border-red-200 bg-red-50 px-3 py-2 text-red-700">{totalRemoved} removed</span>}
              <span className="border border-gold/40 bg-gold-faint px-3 py-2 font-medium text-gold-ink">{state.project.status}</span>
            </div>
          </div>

          {admin && (
            <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-sand pt-4">
              <button type="button" onClick={() => void copy(clientUrl)} className="btn-primary px-4 py-2 text-xs"><Copy size={14} /> Copy client link</button>
              <a href={`/image-review/${reviewId}/${token}`} target="_blank" rel="noreferrer" className="btn-ghost px-4 py-2 text-xs"><ExternalLink size={14} /> Open client view</a>
              {state.project.status === "draft" && <button type="button" disabled={saving} onClick={() => void action({ action: "admin-publish" })} className="btn-ghost px-4 py-2 text-xs"><Send size={14} /> Publish for client</button>}
              {state.project.status === "client-submitted" && <button type="button" disabled={saving} onClick={() => void action({ action: "admin-approve" })} className="btn-primary px-4 py-2 text-xs"><CheckCircle2 size={14} /> Final approve</button>}
              {state.project.status === "approved" && <button type="button" disabled={saving} onClick={() => void action({ action: "admin-reopen" })} className="btn-ghost px-4 py-2 text-xs"><Undo2 size={14} /> Reopen review</button>}
            </div>
          )}
        </header>

        {error && <div className="mb-5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</div>}
        {notice && <div className="mb-5 border border-gold/30 bg-gold-faint px-4 py-3 text-sm text-gold-ink">{notice}</div>}

        <div className="grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="h-fit border border-sand bg-white p-3 lg:sticky lg:top-5">
            <p className="px-3 pb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-gold">Image guide</p>
            <div className="space-y-1">
              {state.categories.map((item) => {
                const isActive = item.id === category?.id;
                const selected = countCategory(state.items, item.id, "selected");
                const alternatives = countCategory(state.items, item.id, "alternative");
                return <button key={item.id} type="button" onClick={() => { setCategoryId(item.id); setAssetLimit(30); }} className={`w-full border px-3 py-3 text-left transition ${isActive ? "border-gold bg-gold-faint" : "border-transparent hover:border-sand hover:bg-ivory"}`}>
                  <span className="block text-xs font-medium uppercase tracking-[0.08em] text-warmgrey">{item.tier}</span>
                  <span className="mt-1 block text-sm font-semibold text-charcoal">{item.title}</span>
                  <span className="mt-2 block text-xs text-warmgrey">{selected} selected · {alternatives} alternatives</span>
                  <span className="mt-1 block text-xs text-gold-ink">Target: {item.targetDistinct} distinct</span>
                </button>;
              })}
            </div>
          </aside>

          <main>
            {category && <div className="mb-5 border border-sand bg-white p-5"><p className="label-eyebrow mb-2">{category.tier}</p><h2 className="font-body text-xl font-semibold tracking-normal md:text-2xl">{category.title}</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-warmgrey">{category.description}</p></div>}

            {!admin && <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border border-gold/30 bg-gold-faint p-4 text-sm"><span>Move an image with the category menu on its card. Your changes are saved immediately.</span><button type="button" disabled={saving || state.project.status === "approved"} onClick={() => void action({ action: "client-submit" })} className="btn-primary px-4 py-2 text-xs"><Send size={14} /> Submit review</button></div>}

            {admin ? <AdminCategoryView state={state} category={category} assets={filteredAssets.slice(0, assetLimit)} currentItemByAsset={currentItemByAsset} search={search} setSearch={setSearch} setAssetLimit={setAssetLimit} onAction={action} saving={saving} /> : <ClientCategoryView state={state} category={category} selectedItems={selectedItems} alternativeItems={alternativeItems} removedItems={removedItems} assetMap={assetMap} onAction={action} saving={saving} />}
          </main>
        </div>
      </div>
    </section>
  );
}

function AdminCategoryView({ state, category, assets, currentItemByAsset, search, setSearch, setAssetLimit, onAction, saving }: {
  state: ReviewState;
  category?: Category;
  assets: Asset[];
  currentItemByAsset: Map<string, Item>;
  search: string;
  setSearch: (value: string) => void;
  setAssetLimit: (value: number | ((current: number) => number)) => void;
  onAction: (body: Record<string, unknown>) => Promise<void>;
  saving: boolean;
}) {
  if (!category) return null;
  return <>
    <div className="mb-4 grid gap-3 border border-sand bg-white p-4 md:grid-cols-[1fr_auto]"><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the labeled library for candidates" className="form-input" /><span className="self-center text-xs text-warmgrey">Showing {assets.length} candidates</span></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {assets.map((asset) => {
        const item = currentItemByAsset.get(asset.assetId);
        return <div key={asset.assetId} className="border border-sand bg-white">
          <div className="relative aspect-[4/3] bg-charcoal">{asset.publicPath ? <img src={asset.publicPath} alt={asset.altText || asset.title} className="h-full w-full object-cover" loading="lazy" /> : <div className="flex h-full items-center justify-center text-xs text-ivory">No preview</div>}{item && <span className={`absolute left-2 top-2 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.08em] ${item.role === "selected" ? "bg-gold text-white" : "bg-white text-charcoal"}`}>{item.role}</span>}</div>
          <div className="p-3"><p className="line-clamp-2 text-sm font-semibold">{asset.title || asset.sourcePath}</p><p className="mt-1 line-clamp-1 text-xs text-warmgrey">{asset.destination || asset.category || asset.sourcePath}</p><div className="mt-3 grid grid-cols-2 gap-2"><button type="button" disabled={saving} onClick={() => void onAction({ action: "admin-upsert-item", assetId: asset.assetId, categoryId: category.id, role: "selected" })} className={`inline-flex items-center justify-center gap-1 border px-2 py-2 text-xs ${item?.role === "selected" ? "border-gold bg-gold-faint text-gold-ink" : "border-sand hover:border-gold"}`}><Check size={13} /> Selected</button><button type="button" disabled={saving} onClick={() => void onAction({ action: "admin-upsert-item", assetId: asset.assetId, categoryId: category.id, role: "alternative" })} className={`inline-flex items-center justify-center gap-1 border px-2 py-2 text-xs ${item?.role === "alternative" ? "border-gold bg-gold-faint text-gold-ink" : "border-sand hover:border-gold"}`}><Sparkles size={13} /> Alternative</button></div>{item && <button type="button" disabled={saving} onClick={() => void onAction({ action: "admin-remove-item", assetId: asset.assetId, categoryId: category.id })} className="mt-2 inline-flex w-full items-center justify-center gap-1 py-1 text-xs text-warmgrey hover:text-red-600"><Trash2 size={13} /> Remove from review</button>}</div>
        </div>;
      })}
    </div>
    {assets.length >= 30 && <button type="button" onClick={() => setAssetLimit((current) => current + 30)} className="btn-ghost mx-auto mt-6 flex px-4 py-2 text-xs">Load more candidates</button>}
  </>;
}

function ClientCategoryView({ state, category, selectedItems, alternativeItems, removedItems, assetMap, onAction, saving }: {
  state: ReviewState;
  category?: Category;
  selectedItems: Item[];
  alternativeItems: Item[];
  removedItems: Item[];
  assetMap: Map<string, Asset>;
  onAction: (body: Record<string, unknown>) => Promise<void>;
  saving: boolean;
}) {
  if (!category) return null;
  return <div className="space-y-7"><ReviewGroup title="Selected for the site" description="These are the current recommendations." items={selectedItems} state={state} category={category} assetMap={assetMap} onAction={onAction} saving={saving} selected /><ReviewGroup title="Alternatives you can add" description="These are the only additional images included for this category." items={alternativeItems} state={state} category={category} assetMap={assetMap} onAction={onAction} saving={saving} />{removedItems.length > 0 && <ReviewGroup title="Removed in this review" description="You can restore any image you removed." items={removedItems} state={state} category={category} assetMap={assetMap} onAction={onAction} saving={saving} removed />}</div>;
}

function ReviewGroup({ title, description, items, state, category, assetMap, onAction, saving, selected, removed }: {
  title: string;
  description: string;
  items: Item[];
  state: ReviewState;
  category: Category;
  assetMap: Map<string, Asset>;
  onAction: (body: Record<string, unknown>) => Promise<void>;
  saving: boolean;
  selected?: boolean;
  removed?: boolean;
}) {
  return <section><div className="mb-3 flex flex-wrap items-end justify-between gap-3"><div><h3 className="font-body text-lg font-semibold tracking-normal">{title} <span className="text-warmgrey">({items.length})</span></h3><p className="mt-1 text-sm text-warmgrey">{description}</p></div></div>{items.length === 0 ? <div className="border border-dashed border-sand bg-white p-8 text-center text-sm text-warmgrey">No images in this group yet.</div> : <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{items.map((item) => <ReviewCard key={itemKey(item)} item={item} state={state} category={category} asset={assetMap.get(item.assetId)} onAction={onAction} saving={saving} selected={selected} removed={removed} />)}</div>}</section>;
}

function ReviewCard({ item, state, category, asset, onAction, saving, selected, removed }: {
  item: Item;
  state: ReviewState;
  category: Category;
  asset?: Asset;
  onAction: (body: Record<string, unknown>) => Promise<void>;
  saving: boolean;
  selected?: boolean;
  removed?: boolean;
}) {
  if (!asset) return null;
  const decision = item.decision;
  const nextAction = selected ? "remove" : removed ? "keep" : "add";
  const nextLabel = selected ? "Remove" : removed ? "Restore" : "Add to selection";
  return <article className={`border bg-white ${decision !== "pending" ? "border-gold" : "border-sand"}`}><div className="relative aspect-[4/3] bg-charcoal">{asset.publicPath && <img src={asset.publicPath} alt={asset.altText || asset.title} className="h-full w-full object-cover" loading="lazy" />}<span className="absolute left-2 top-2 bg-white/90 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-charcoal">{decision === "pending" ? item.role : decision}</span></div><div className="p-4"><h4 className="line-clamp-2 font-body text-base font-semibold tracking-normal">{asset.title || asset.sourcePath}</h4><p className="mt-1 line-clamp-2 text-xs leading-5 text-warmgrey">{asset.destination || asset.category || asset.sourcePath}</p><div className="mt-4 grid gap-2"><button type="button" disabled={saving || state.project.status === "approved"} onClick={() => void onAction({ action: "client-update-item", assetId: item.assetId, categoryId: item.categoryId, nextCategoryId: item.categoryId, decision: nextAction })} className={`inline-flex items-center justify-center gap-2 border px-3 py-2 text-xs font-medium ${selected ? "border-red-200 text-red-700 hover:bg-red-50" : "border-gold bg-gold-faint text-gold-ink hover:bg-gold/20"}`}>{selected ? <X size={14} /> : removed ? <Undo2 size={14} /> : <Plus size={14} />} {nextLabel}</button><label className="flex items-center gap-2 text-xs text-warmgrey"><ArrowRightLeft size={14} /><span className="sr-only">Move category</span><select disabled={saving || state.project.status === "approved"} value={item.categoryId} onChange={(event) => void onAction({ action: "client-update-item", assetId: item.assetId, categoryId: item.categoryId, nextCategoryId: event.target.value, decision })} className="h-9 min-w-0 flex-1 border border-sand bg-ivory px-2 text-xs outline-none focus:border-gold"><option value={category.id}>Keep in {category.title}</option>{state.categories.filter((other) => other.id !== category.id).map((other) => <option key={other.id} value={other.id}>Move to {other.title}</option>)}</select><ChevronDown size={13} /></label><textarea defaultValue={item.clientNote ?? ""} disabled={saving || state.project.status === "approved"} onBlur={(event) => { if (event.target.value !== (item.clientNote ?? "")) void onAction({ action: "client-update-item", assetId: item.assetId, categoryId: item.categoryId, nextCategoryId: item.categoryId, decision, clientNote: event.target.value }); }} rows={2} placeholder="Optional note" className="form-input resize-none text-xs" /></div></div></article>;
}
