"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink, Loader2 } from "lucide-react";

export default function ImageReviewAdmin() {
  const [title, setTitle] = useState("Sawla photography selection — client review");
  const [clientName, setClientName] = useState("");
  const [result, setResult] = useState<{ clientUrl: string; adminUrl: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function createReview(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/image-review", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title, clientName }) });
      const json = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(json.error ?? "Unable to create review");
      setResult(json);
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : "Unable to create review");
    } finally {
      setSaving(false);
    }
  }

  return <section className="min-h-screen bg-[#f3efe6] px-4 py-10 text-charcoal md:px-8"><div className="mx-auto max-w-2xl"><div className="border border-sand bg-white p-6 md:p-8"><p className="label-eyebrow mb-3">Internal tool</p><h1 className="font-body text-2xl font-semibold tracking-normal md:text-3xl">Create a client image review</h1><p className="mt-3 text-sm leading-6 text-warmgrey">This creates a single shared review link with the six image-guide categories and a server-stored bcrypt token hash. Keep the generated links; the clear token is returned only once.</p><form onSubmit={createReview} className="mt-7 space-y-4"><label className="block"><span className="form-label">Review title</span><input value={title} onChange={(event) => setTitle(event.target.value)} className="form-input" /></label><label className="block"><span className="form-label">Client name</span><input value={clientName} onChange={(event) => setClientName(event.target.value)} placeholder="Optional" className="form-input" /></label>{error && <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}<button type="submit" disabled={saving} className="btn-primary"><span>{saving ? <Loader2 className="animate-spin" size={16} /> : <Check size={16} />}</span>{saving ? "Creating review" : "Create review"}</button></form></div>{result && <div className="mt-5 border border-gold/40 bg-gold-faint p-6"><p className="text-sm font-semibold text-gold-ink">Review created</p><p className="mt-2 text-sm text-warmgrey">Open the internal link to curate selected images and alternatives. Share the client link only after publishing.</p><div className="mt-4 space-y-3 text-xs"><LinkRow label="Internal link" value={`${window.location.origin}${result.adminUrl}`} /><LinkRow label="Client link" value={`${window.location.origin}${result.clientUrl}`} /></div><div className="mt-5 flex flex-wrap gap-2"><a href={result.adminUrl} className="btn-primary px-4 py-2 text-xs"><ExternalLink size={14} /> Open internal review</a><button type="button" onClick={() => navigator.clipboard.writeText(`${window.location.origin}${result.clientUrl}`)} className="btn-ghost px-4 py-2 text-xs"><Copy size={14} /> Copy client link</button></div></div>}</div></section>;
}

function LinkRow({ label, value }: { label: string; value: string }) {
  return <div><p className="mb-1 font-medium text-charcoal">{label}</p><code className="block break-all border border-sand bg-white px-3 py-2 text-[11px] leading-5">{value}</code></div>;
}
