/**
 * Client reviews, stored in Supabase.
 *
 * NOTE: the table lives in the "trillionaire company" Supabase project (ref edtuvlmdhhaidgwmxdtg)
 * as public.naomi_portfolio_reviews. It is NOT part of the company app; it only serves this site.
 *
 * Rules (enforced by the database, not just this code):
 * - Anyone can submit a review (insert only; no edits or deletes from the website).
 * - 3–5 star reviews are published automatically (column `published` = rating >= 3).
 * - 1–2 star reviews are stored but never readable by the public; they are emailed to Naomi.
 *
 * The publishable key is designed to be public: row-level security limits what it can do.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://edtuvlmdhhaidgwmxdtg.supabase.co";
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "sb_publishable_SJrKtrCW6ceud6xLXXukZw_YesrEeLd";
export const REVIEWS_TABLE = "naomi_portfolio_reviews";
export const REVIEWS_TAG = "reviews";

/** Lowest star rating that is shown publicly. */
export const PUBLISH_MIN_RATING = 3;

export type Review = {
  id: string;
  created_at: string;
  name: string;
  rating: number;
  comment: string;
  product: string | null;
  location: string | null;
};

export const ratingLabels = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];

/** Published reviews, newest first. Never throws: returns [] if the database is unreachable. */
export async function getPublishedReviews(limit = 100): Promise<Review[]> {
  try {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/${REVIEWS_TABLE}?select=id,created_at,name,rating,comment,product,location&published=eq.true&order=created_at.desc&limit=${limit}`,
      { headers: { apikey: SUPABASE_KEY }, next: { revalidate: 300, tags: [REVIEWS_TAG] } },
    );
    if (!r.ok) throw new Error(`reviews ${r.status}`);
    return (await r.json()) as Review[];
  } catch (err) {
    console.error("[reviews] fetch failed", err);
    return [];
  }
}

export function formatReviewDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-KE", { month: "long", year: "numeric" });
}
