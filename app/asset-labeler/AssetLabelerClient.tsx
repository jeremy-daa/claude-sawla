"use client";

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  ImageIcon,
  Loader2,
  Save,
  Search,
} from "lucide-react";
import type { AssetManifestImage } from "@/lib/asset-labeling";

type AssetTotals = {
  discovered: number;
  processed: number;
  skippedExisting: number;
  failed: number;
  inputBytes: number;
  outputBytes: number;
  savedBytes: number;
};

type LabelStatus = "labeled" | "duplicate" | "skipped";

type AssetLabel = {
  assetId: string;
  status: LabelStatus;
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
  updatedAt?: string;
};

type LabelForm = {
  status: LabelStatus;
  title: string;
  altText: string;
  description: string;
  tags: string;
  seoKeywords: string;
  suggestedUse: string;
  destination: string;
  subjectType: string;
  duplicateOf: string;
  notes: string;
};

type Stats = {
  totalAssets: number;
  completed: number;
  labeled: number;
  duplicates: number;
  skipped: number;
  remaining: number;
  percent: number;
};

type Filter = "all" | "unlabeled" | LabelStatus;

type Props = {
  generatedAt: string;
  images: AssetManifestImage[];
  totals: AssetTotals;
};

const EMPTY_FORM: LabelForm = {
  status: "labeled",
  title: "",
  altText: "",
  description: "",
  tags: "",
  seoKeywords: "",
  suggestedUse: "",
  destination: "",
  subjectType: "",
  duplicateOf: "",
  notes: "",
};

const TAG_OPTIONS = [
  "homepage",
  "destination page",
  "tour page",
  "travel guide",
  "wildlife page",
  "culture page",
  "festival page",
  "gallery",
  "sawla moments",
  "mobile camps",
  "team profile",
  "seo support",
  "Addis Ababa",
  "Awash",
  "Axum",
  "Bahir Dar",
  "Bale Mountains",
  "Danakil Depression",
  "Gambela",
  "Gheralta",
  "Gondar",
  "Lalibela",
  "Lake Tana",
  "Omo Valley",
  "Simien Mountains",
  "Timket",
  "Meskel",
  "Blue Nile Falls",
  "Gondar castles",
  "rock-hewn churches",
  "historic route",
  "UNESCO",
  "Omo tribes",
  "Karo",
  "Mursi",
  "Hamar",
  "Konso",
  "Surma",
  "portrait",
  "people",
  "adventure",
  "architecture",
  "birding",
  "birds",
  "camping",
  "celebration",
  "churches",
  "culture",
  "desert",
  "endemic wildlife",
  "Ethiopian wolf",
  "festival",
  "gelada",
  "giant mole rat",
  "history",
  "landscape",
  "local life",
  "mountain nyala",
  "mountains",
  "nature",
  "religious ceremony",
  "photography",
  "scenic road",
  "trekking",
  "wildlife",
  "Walia ibex",
  "lodges",
  "tented camp",
  "map",
  "food",
  "vehicle",
];

function listToText(value: string[] | undefined) {
  return value?.join(", ") ?? "";
}

function labelToForm(label?: AssetLabel): LabelForm {
  if (!label) return EMPTY_FORM;

  return {
    status: label.status,
    title: label.title ?? "",
    altText: label.altText ?? "",
    description: label.description ?? "",
    tags: listToText(label.tags),
    seoKeywords: listToText(label.seoKeywords),
    suggestedUse: listToText(label.suggestedUse),
    destination: label.destination ?? "",
    subjectType: label.subjectType ?? "",
    duplicateOf: label.duplicateOf ?? "",
    notes: label.notes ?? "",
  };
}

function splitList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function toListText(items: string[]) {
  return items.join(", ");
}

function formatBytes(bytes: number | null | undefined) {
  if (!bytes) return "Unknown size";
  if (bytes < 1024) return `${bytes} B`;

  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let index = 0;

  while (value >= 1024 && index < units.length - 1) {
    value /= 1024;
    index += 1;
  }

  return `${value.toFixed(value >= 10 ? 1 : 2)} ${units[index]}`;
}

function inferTitle(asset: AssetManifestImage) {
  const fileName = asset.source.path.split("/").pop() ?? asset.source.path;
  return fileName.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
}

function statusLabel(status?: LabelStatus) {
  if (status === "duplicate") return "Duplicate";
  if (status === "skipped") return "Skipped";
  if (status === "labeled") return "Labeled";
  return "Unlabeled";
}

export default function AssetLabelerClient({ generatedAt, images, totals }: Props) {
  const [labels, setLabels] = useState<Record<string, AssetLabel>>({});
  const [stats, setStats] = useState<Stats | null>(null);
  const [filter, setFilter] = useState<Filter>("unlabeled");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [drafts, setDrafts] = useState<Record<string, LabelForm>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const categories = useMemo(() => {
    const unique = new Set(images.map((image) => image.category).filter(Boolean) as string[]);
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [images]);

  const filteredImages = useMemo(() => {
    const query = search.trim().toLowerCase();

    return images.filter((image) => {
      const label = labels[image.id];
      const labelStatus = label?.status;
      const matchesFilter =
        filter === "all" ||
        (filter === "unlabeled" && !labelStatus) ||
        labelStatus === filter;
      const matchesCategory = category === "all" || image.category === category;
      const haystack = [
        image.id,
        image.category,
        image.source.path,
        image.output.path,
        label?.title,
        label?.altText,
        label?.tags?.join(" "),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesFilter && matchesCategory && (!query || haystack.includes(query));
    });
  }, [category, filter, images, labels, search]);

  const currentAsset = filteredImages[currentIndex] ?? filteredImages[0] ?? null;
  const currentLabel = currentAsset ? labels[currentAsset.id] : undefined;
  const form = currentAsset ? drafts[currentAsset.id] ?? labelToForm(currentLabel) : EMPTY_FORM;
  const tagOptions = Array.from(new Set([...(currentAsset?.category ? [currentAsset.category] : []), ...categories, ...TAG_OPTIONS]));
  const completedCount = stats?.completed ?? Object.keys(labels).length;
  const percent = stats?.percent ?? (images.length > 0 ? Math.round((completedCount / images.length) * 100) : 0);

  useEffect(() => {
    let cancelled = false;

    async function loadLabels() {
      setLoading(true);
      setError("");

      try {
        const [labelsResponse, statsResponse] = await Promise.all([
          fetch("/api/asset-labels", { cache: "no-store" }),
          fetch("/api/asset-labels/stats", { cache: "no-store" }),
        ]);

        const labelsJson = await labelsResponse.json().catch(() => ({}));
        const statsJson = await statsResponse.json().catch(() => ({}));

        if (!labelsResponse.ok) {
          throw new Error(labelsJson.error ?? "Unable to load saved labels");
        }

        if (!cancelled) {
          const labelMap = Object.fromEntries(
            ((labelsJson.labels ?? []) as AssetLabel[]).map((label) => [label.assetId, label]),
          );
          setLabels(labelMap);
          if (statsResponse.ok) setStats(statsJson as Stats);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : "Unable to load labels");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadLabels();

    return () => {
      cancelled = true;
    };
  }, []);

  function resetPosition() {
    setCurrentIndex(0);
    setNotice("");
    setError("");
  }

  function setCurrentForm(update: React.SetStateAction<LabelForm>) {
    if (!currentAsset) return;

    setDrafts((current) => {
      const previous = current[currentAsset.id] ?? labelToForm(currentLabel);
      const next = typeof update === "function" ? update(previous) : update;
      return { ...current, [currentAsset.id]: next };
    });
  }

  function updateField(field: keyof LabelForm) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setCurrentForm((current) => ({ ...current, [field]: event.target.value }));
    };
  }

  function toggleListField(field: keyof LabelForm, value: string) {
    setCurrentForm((current) => {
      const selected = splitList(current[field]);
      const next = selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value];

      return { ...current, [field]: toListText(next) };
    });
  }

  function moveBy(offset: number) {
    setNotice("");
    setError("");
    setCurrentIndex((index) => {
      if (filteredImages.length === 0) return 0;
      return Math.min(Math.max(index + offset, 0), filteredImages.length - 1);
    });
  }

  async function refreshStats(nextLabels: Record<string, AssetLabel>) {
    try {
      const response = await fetch("/api/asset-labels/stats", { cache: "no-store" });
      const json = await response.json().catch(() => ({}));
      if (response.ok) {
        setStats(json as Stats);
      } else {
        setStats(null);
      }
    } catch {
      setStats(null);
    }

    setLabels(nextLabels);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!currentAsset) return;

    setSaving(true);
    setError("");
    setNotice("");

    const selectedTags = splitList(form.tags);

    const payload = {
      assetId: currentAsset.id,
      status: form.status,
      title: form.title,
      altText: form.altText,
      description: form.altText,
      tags: selectedTags,
      seoKeywords: selectedTags.map((item) => `${item} Ethiopia`),
      suggestedUse: selectedTags.filter((item) => item.includes("page") || item === "homepage" || item === "gallery"),
      destination: currentAsset.category ?? "",
      subjectType: "",
      duplicateOf: form.duplicateOf,
      notes: form.notes,
    };

    try {
      const response = await fetch("/api/asset-labels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(json.error ?? "Unable to save this asset label");
      }

      const savedLabel = json.label as AssetLabel;
      const nextLabels = { ...labels, [currentAsset.id]: savedLabel };
      await refreshStats(nextLabels);
      setDrafts((current) => ({ ...current, [currentAsset.id]: labelToForm(savedLabel) }));
      setNotice(`${statusLabel(savedLabel.status)} saved`);

      if (filter === "unlabeled") {
        setCurrentIndex((index) => Math.min(index, Math.max(0, filteredImages.length - 2)));
      } else {
        moveBy(1);
      }
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save this asset label");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="min-h-screen bg-[#f3efe6] px-4 py-8 text-charcoal md:px-8">
      <div className="mx-auto max-w-wide">
        <div className="mb-4 flex justify-end">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-sand bg-white px-4 py-2 text-sm font-medium text-charcoal transition hover:border-gold hover:text-gold"
          >
            Return home
          </Link>
        </div>

        <div className="mb-6 grid gap-4 border border-sand bg-white p-5 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h1 className="font-body text-2xl font-semibold tracking-normal text-charcoal md:text-3xl">
              Asset Labeler
            </h1>
            <p className="mt-1 text-xs text-warmgrey">
              Manifest: {new Date(generatedAt).toLocaleString()}
            </p>
          </div>

          <div className="grid min-w-72 gap-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-warmgrey">Progress</span>
              <strong className="text-charcoal">
                {completedCount}/{images.length} ({percent}%)
              </strong>
            </div>
            <div className="h-2 overflow-hidden bg-gold-faint">
              <div
                className="h-full bg-gold transition-all"
                style={{ width: `${percent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-warmgrey">
              <span>
                {stats?.remaining ??
                  Math.max(0, images.length - completedCount)}{" "}
                remaining
              </span>
              <span>{formatBytes(totals.outputBytes)} staged</span>
            </div>
          </div>
        </div>

        <div className="mb-5 grid gap-3 border border-sand bg-white p-4 lg:grid-cols-[1fr_auto_auto]">
          <label className="flex items-center gap-2 border border-sand bg-ivory px-3">
            <Search size={16} className="text-warmgrey" aria-hidden="true" />
            <input
              value={search}
              onChange={updateFieldFromSetter(setSearch, resetPosition)}
              placeholder="Search path, title, tag, category"
              className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-warmgrey/55"
            />
          </label>

          <select
            value={category}
            onChange={updateFieldFromSetter(setCategory, resetPosition)}
            className="h-11 border border-sand bg-ivory px-3 text-sm outline-none focus:border-gold"
            aria-label="Filter category"
          >
            <option value="all">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={filter}
            onChange={(event) => {
              setFilter(event.target.value as Filter);
              resetPosition();
            }}
            className="h-11 border border-sand bg-ivory px-3 text-sm outline-none focus:border-gold"
            aria-label="Filter label status"
          >
            <option value="unlabeled">Unlabeled</option>
            <option value="all">All assets</option>
            <option value="labeled">Labeled</option>
            <option value="duplicate">Duplicates</option>
            <option value="skipped">Skipped</option>
          </select>
        </div>

        {error && (
          <div
            className="mb-5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex min-h-96 items-center justify-center border border-sand bg-white text-warmgrey">
            <Loader2
              className="mr-2 animate-spin"
              size={18}
              aria-hidden="true"
            />
            Loading labels
          </div>
        ) : currentAsset ? (
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(420px,0.9fr)]">
            <div className="border border-sand bg-white">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand px-4 py-3 text-sm">
                <div>
                  <span className="font-medium text-charcoal">
                    {currentIndex + 1} of {filteredImages.length}
                  </span>
                  <span className="ml-3 text-warmgrey">
                    {currentAsset.category ?? "Uncategorized"}
                  </span>
                </div>
                <span className="inline-flex items-center gap-2 bg-gold-faint px-3 py-1 text-xs font-medium text-charcoal">
                  <Check
                    size={14}
                    className={currentLabel ? "text-gold" : "text-warmgrey"}
                    aria-hidden="true"
                  />
                  {statusLabel(currentLabel?.status)}
                </span>
              </div>

              <div className="relative flex min-h-[58vh] items-center justify-center bg-charcoal">
                {currentAsset.output.publicPath ? (
                  <Image
                    src={currentAsset.output.publicPath}
                    alt={currentLabel?.altText || inferTitle(currentAsset)}
                    fill
                    sizes="(min-width: 1280px) 58vw, 100vw"
                    className="object-contain"
                    unoptimized
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3 text-ivory">
                    <ImageIcon size={34} aria-hidden="true" />
                    <span>No public asset path</span>
                  </div>
                )}
              </div>

              <div className="grid gap-3 border-t border-sand p-4 text-xs text-warmgrey md:grid-cols-3">
                <MetaItem label="Source" value={currentAsset.source.path} />
                <MetaItem label="Output" value={currentAsset.output.path} />
                <MetaItem
                  label="Dimensions"
                  value={`${currentAsset.output.width ?? "?"} x ${currentAsset.output.height ?? "?"} - ${formatBytes(
                    currentAsset.output.bytes,
                  )}`}
                />
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="border border-sand bg-white"
            >
              <div className="flex items-center justify-between gap-3 border-b border-sand p-4">
                <div>
                  <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.14em] text-gold">
                    Duplicate check
                  </p>
                </div>
                <div className="flex border border-sand text-sm">
                  <StatusButton
                    status="labeled"
                    current={form.status}
                    setForm={setCurrentForm}
                    label="Use"
                  />
                  <StatusButton
                    status="duplicate"
                    current={form.status}
                    setForm={setCurrentForm}
                    label="Duplicate"
                  />
                  <StatusButton
                    status="skipped"
                    current={form.status}
                    setForm={setCurrentForm}
                    label="Skip"
                  />
                </div>
              </div>

              {(form.status === "duplicate" || form.status === "skipped") && (
                <div className="grid gap-3 border-b border-sand bg-gold-faint/60 p-4 md:grid-cols-2">
                  {form.status === "duplicate" && (
                    <Field label="Duplicate of" htmlFor="duplicateOf">
                      <input
                        id="duplicateOf"
                        value={form.duplicateOf}
                        onChange={updateField("duplicateOf")}
                        placeholder="Asset id, title, or source path"
                        className="form-input bg-white"
                      />
                    </Field>
                  )}
                  <Field
                    label={
                      form.status === "duplicate"
                        ? "Duplicate note"
                        : "Skip reason"
                    }
                    htmlFor="notes"
                  >
                    <input
                      id="notes"
                      value={form.notes}
                      onChange={updateField("notes")}
                      placeholder="Short reason"
                      className="form-input bg-white"
                    />
                  </Field>
                </div>
              )}

              <div className="space-y-5 p-4">
                <fieldset className="border border-sand p-4">
                  <legend className="px-2 text-sm font-semibold text-charcoal">
                    1. Title
                  </legend>
                  <div className="pt-2">
                    <Field label="Asset title" htmlFor="title">
                      <input
                        id="title"
                        value={form.title}
                        onChange={updateField("title")}
                        placeholder={inferTitle(currentAsset)}
                        className="form-input"
                      />
                    </Field>
                  </div>
                </fieldset>

                <fieldset className="border border-sand p-4">
                  <legend className="px-2 text-sm font-semibold text-charcoal">
                    2. Alt text
                  </legend>
                  <div className="pt-2">
                    <Field label="Image alt text" htmlFor="altText">
                      <textarea
                        id="altText"
                        value={form.altText}
                        onChange={updateField("altText")}
                        rows={3}
                        placeholder="Describe the image content for screen readers and SEO"
                        className="form-input resize-none"
                      />
                    </Field>
                  </div>
                </fieldset>

                <fieldset className="border border-sand p-4">
                  <legend className="px-2 text-sm font-semibold text-charcoal">
                    3. Tags
                  </legend>
                  <div className="space-y-4 pt-2">
                    <PillGroup
                      label=""
                      options={tagOptions}
                      selected={splitList(form.tags)}
                      onToggle={(value) => toggleListField("tags", value)}
                    />
                  </div>
                </fieldset>
              </div>

              <div className="sticky bottom-0 flex flex-wrap items-center justify-between gap-3 border-t border-sand bg-white p-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => moveBy(-1)}
                    disabled={currentIndex === 0}
                    className="inline-flex h-11 w-11 items-center justify-center border border-sand text-charcoal disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Previous asset"
                  >
                    <ChevronLeft size={18} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveBy(1)}
                    disabled={currentIndex >= filteredImages.length - 1}
                    className="inline-flex h-11 w-11 items-center justify-center border border-sand text-charcoal disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Next asset"
                  >
                    <ChevronRight size={18} aria-hidden="true" />
                  </button>
                </div>

                {notice && (
                  <span className="text-sm font-medium text-gold">
                    {notice}
                  </span>
                )}

                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary justify-center px-5 py-3 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <Loader2
                      className="animate-spin"
                      size={16}
                      aria-hidden="true"
                    />
                  ) : (
                    <Save size={16} aria-hidden="true" />
                  )}
                  {saving ? "Saving" : "Save and continue"}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex min-h-96 flex-col items-center justify-center border border-sand bg-white p-8 text-center">
            <Copy className="mb-4 text-gold" size={28} aria-hidden="true" />
            <h2 className="font-body text-xl font-semibold tracking-normal">
              No assets match this view
            </h2>
            <p className="mt-2 max-w-md text-sm text-warmgrey">
              Change the status, category, or search filters to continue
              labeling.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function updateFieldFromSetter(setter: (value: string) => void, afterChange?: () => void) {
  return (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setter(event.target.value);
    afterChange?.();
  };
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="form-label">
        {label}
      </label>
      {children}
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="mb-1 font-medium uppercase tracking-[0.1em] text-charcoal">{label}</p>
      <p className="truncate" title={value}>
        {value}
      </p>
    </div>
  );
}

function PillGroup({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div>
      {label && <p className="mb-2 text-xs font-medium uppercase tracking-[0.1em] text-warmgrey">{label}</p>}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected.includes(option);

          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={`min-h-10 border px-3 py-2 text-left text-sm transition-colors ${
                active
                  ? "border-charcoal bg-charcoal text-ivory"
                  : "border-sand bg-ivory text-charcoal hover:border-gold"
              }`}
              aria-pressed={active}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StatusButton({
  status,
  current,
  setForm,
  label,
}: {
  status: LabelStatus;
  current: LabelStatus;
  setForm: React.Dispatch<React.SetStateAction<LabelForm>>;
  label: string;
}) {
  const active = status === current;

  return (
    <button
      type="button"
      onClick={() => setForm((form) => ({ ...form, status }))}
      className={`h-10 px-3 text-xs font-medium transition-colors ${
        active ? "bg-charcoal text-ivory" : "bg-white text-warmgrey hover:bg-gold-faint hover:text-charcoal"
      }`}
    >
      {label}
    </button>
  );
}
