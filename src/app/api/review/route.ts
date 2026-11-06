import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { PUBLISH_MIN_RATING, REVIEWS_TABLE, REVIEWS_TAG, SUPABASE_KEY, SUPABASE_URL, ratingLabels } from "@/lib/reviews";
import { site } from "@/lib/site";

export const runtime = "nodejs";

const clean = (s: unknown, max: number) => (typeof s === "string" ? s.replace(/\s+/g, " ").trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill the hidden field. Pretend success, store nothing.
  if (body.website) return NextResponse.json({ ok: true, published: true });

  const review = {
    name: clean(body.name, 60),
    rating: Number(body.rating),
    comment: clean(body.comment, 1000),
    product: clean(body.product, 80) || null,
    location: clean(body.location, 60) || null,
  };

  if (review.name.length < 2) return NextResponse.json({ error: "Please enter your name." }, { status: 422 });
  if (!Number.isInteger(review.rating) || review.rating < 1 || review.rating > 5)
    return NextResponse.json({ error: "Please choose a star rating." }, { status: 422 });
  if (review.comment.length < 10) return NextResponse.json({ error: "Please write a few words about your experience (at least 10 characters)." }, { status: 422 });
  if (/https?:\/\/|www\./i.test(review.comment)) return NextResponse.json({ error: "Please remove links from your review." }, { status: 422 });

  const r = await fetch(`${SUPABASE_URL}/rest/v1/${REVIEWS_TABLE}`, {
    method: "POST",
    headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify(review),
  });
  if (!r.ok) {
    console.error("[review] insert failed", r.status, await r.text().catch(() => ""));
    return NextResponse.json({ error: "Your review could not be saved. Please try again in a moment." }, { status: 502 });
  }

  const published = review.rating >= PUBLISH_MIN_RATING;
  if (published) revalidateTag(REVIEWS_TAG);

  await notifyNaomi(review, published);
  return NextResponse.json({ ok: true, published });
}

/**
 * Emails every new review to Naomi; 1–2 star reviews are marked as private feedback.
 * Uses FormSubmit (no account needed). The FIRST email sends an activation link to the
 * inbox below; Naomi must click "Activate" once, after which emails arrive normally.
 * Override the inbox with REVIEW_NOTIFY_EMAIL.
 */
async function notifyNaomi(review: { name: string; rating: number; comment: string; product: string | null; location: string | null }, published: boolean) {
  const to = process.env.REVIEW_NOTIFY_EMAIL || site.email;
  if (to === "off") return; // for local testing: never email Naomi
  const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);
  try {
    const r = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json", Origin: site.url, Referer: `${site.url}/reviews` },
      body: JSON.stringify({
        _subject: published
          ? `New ${review.rating}-star review on your website from ${review.name}`
          : `PRIVATE feedback (${review.rating} star) from ${review.name}: not published`,
        _template: "box",
        _captcha: "false",
        Rating: `${stars} (${review.rating}/5, ${ratingLabels[review.rating]})`,
        Name: review.name,
        Review: review.comment,
        "Britam product": review.product ?? "Not specified",
        Location: review.location ?? "Not specified",
        Status: published
          ? "Published on naomibritam.co.ke"
          : "NOT published. Only you can see this. Consider reaching out to this client to resolve their concern.",
      }),
    });
    if (!r.ok) throw new Error(`formsubmit ${r.status}`);
  } catch (err) {
    console.error("[review] email notification failed", err);
  }
}
