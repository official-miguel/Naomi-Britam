"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, Heart, Loader2, Star } from "lucide-react";
import { products } from "@/lib/products";
import { site } from "@/lib/site";
import { PUBLISH_MIN_RATING, ratingLabels } from "@/lib/reviews";

type Result = { ok: true; published: boolean } | { ok: false; error: string };

/**
 * Write-a-review form. Reads ?rating= and ?product= from the URL so links like
 * /reviews?rating=5&product=Motor%20Insurance#write open pre-filled.
 */
export function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [v, setV] = useState({ name: "", product: "", location: "", comment: "", website: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const r = Number(q.get("rating"));
    if (r >= 1 && r <= 5) setRating(r);
    const p = q.get("product");
    if (p && products.some((x) => x.name === p)) setV((s) => ({ ...s, product: p }));
  }, []);

  const set = (k: keyof typeof v, val: string) => setV((s) => ({ ...s, [k]: val }));
  const shown = hover || rating;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!rating) return setError("Please tap a star to rate your experience.");
    if (v.name.trim().length < 2) return setError("Please enter your name.");
    if (v.comment.trim().length < 10) return setError("Please write a few words about your experience.");
    setBusy(true);
    try {
      const r = await fetch("/api/review", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...v, rating }) });
      const data = await r.json();
      if (!r.ok) setError(data.error ?? "Something went wrong. Please try again.");
      else setResult({ ok: true, published: !!data.published });
    } catch {
      setError("Network problem. Please check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  if (result?.ok) {
    return (
      <div role="status" className="rounded-3xl border border-black/10 bg-white p-7 text-center sm:p-10">
        {result.published ? <CheckCircle2 size={48} className="mx-auto text-brand" aria-hidden /> : <Heart size={48} className="mx-auto text-brand" aria-hidden />}
        <h3 className="mt-5 text-2xl font-bold tracking-tight">
          {result.published ? "Thank you for your review!" : "Thank you for your honest feedback."}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-black/65">
          {result.published
            ? "Your review has been posted and will appear on the website shortly. It really helps other families and businesses find the right cover."
            : `${site.firstName} has received your feedback personally and will get in touch to make things right.`}
        </p>
        <Link href="/" className="btn btn-dark mt-7">Back to home</Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-3xl border border-black/10 bg-white p-6 sm:p-8">
      <fieldset>
        <legend className="text-lg font-bold">How was your experience with {site.firstName} &amp; Britam?</legend>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2" onMouseLeave={() => setHover(0)}>
          <div className="flex gap-1" role="radiogroup" aria-label="Star rating">
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                type="button"
                role="radio"
                aria-checked={rating === i}
                aria-label={`${i} star${i > 1 ? "s" : ""}, ${ratingLabels[i]}`}
                onClick={() => setRating(i)}
                onMouseEnter={() => setHover(i)}
                className="rounded-lg p-1 transition hover:scale-110 focus-visible:outline-2"
              >
                <Star size={38} strokeWidth={1.5} aria-hidden className={i <= shown ? "fill-[#F5A623] text-[#F5A623]" : "fill-black/5 text-black/25"} />
              </button>
            ))}
          </div>
          <span className="min-w-[6rem] text-sm font-semibold text-black/60" aria-live="polite">{shown ? ratingLabels[shown] : "Tap to rate"}</span>
        </div>
      </fieldset>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="r-name">Your name</label>
          <input id="r-name" className="input" autoComplete="name" maxLength={60} placeholder="e.g. Jane W." value={v.name} onChange={(e) => set("name", e.target.value)} />
        </div>
        <div>
          <label className="label" htmlFor="r-location">Town (optional)</label>
          <input id="r-location" className="input" maxLength={60} placeholder="e.g. Nairobi" value={v.location} onChange={(e) => set("location", e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="r-product">Britam cover (optional)</label>
          <select id="r-product" className="input" value={v.product} onChange={(e) => set("product", e.target.value)}>
            <option value="">Choose a product</option>
            {products.map((p) => <option key={p.slug} value={p.name}>{p.name}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="r-comment">Your review</label>
          <textarea
            id="r-comment"
            rows={5}
            maxLength={1000}
            className="input resize-none"
            placeholder={`What was it like working with ${site.firstName}? How did she help you choose your cover?`}
            value={v.comment}
            onChange={(e) => set("comment", e.target.value)}
          />
          <p className="mt-1 text-right text-xs text-black/45">{v.comment.length}/1000</p>
        </div>
        <div aria-hidden className="absolute left-[-9999px]">
          <label htmlFor="r-web">Website</label>
          <input id="r-web" tabIndex={-1} autoComplete="off" value={v.website} onChange={(e) => set("website", e.target.value)} />
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-4 flex items-center gap-2 text-sm font-medium">
          <AlertCircle size={16} className="shrink-0 text-brand" aria-hidden /> {error}
        </p>
      )}

      <button type="submit" disabled={busy} className="btn btn-primary mt-6 w-full sm:w-auto">
        {busy ? <><Loader2 size={18} className="animate-spin" aria-hidden /> Sending…</> : "Submit review"}
      </button>
      <p className="mt-4 text-xs leading-relaxed text-black/50">
        Reviews of {PUBLISH_MIN_RATING} stars and above are posted on this website with the name and town you enter. Lower ratings go privately to {site.firstName} so she can follow up with you.
      </p>
    </form>
  );
}
