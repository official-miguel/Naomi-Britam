import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight, MessageSquareHeart } from "lucide-react";
import { ReviewCard } from "@/components/ReviewCard";
import { ReviewForm } from "@/components/ReviewForm";
import { getPublishedReviews } from "@/lib/reviews";
import { site } from "@/lib/site";
import { sharePreview } from "@/lib/seo";

const city = site.location.split(",")[0];
const title = `${site.fullDisplayName} Reviews: Britam Advisor in ${city}`;
const description = `Read client reviews of ${site.fullDisplayName}, Britam ${site.title} in ${city}, and share your own experience with Naomi and Britam insurance.`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/reviews" },
  ...sharePreview({ title: `Reviews of ${site.fullDisplayName} · Britam Advisor`, description: `See what clients say about ${site.firstName}, or rate your own experience in under a minute.`, path: "/reviews" }),
};

export const revalidate = 300;

export default async function ReviewsPage() {
  const reviews = await getPublishedReviews(200);

  return (
    <section className="bg-neutral-50 pb-24 pt-32 sm:pt-40">
      <div className="container-page">
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-1 text-sm text-black/55">
          <Link href="/" className="hover:text-brand">Home</Link><ChevronRight size={14} aria-hidden />
          <span className="font-semibold text-black" aria-current="page">Reviews</span>
        </nav>

        <p className="eyebrow">Reviews</p>
        <h1 className="h-section max-w-3xl">Client reviews of {site.firstName} &amp; Britam.</h1>
        <p className="mt-5 max-w-2xl text-lg text-black/65">
          Real experiences from clients {site.fullDisplayName} has helped with Britam insurance, investments and retirement planning.
          {reviews.length > 0 && <> <strong className="text-black">{reviews.length} review{reviews.length === 1 ? "" : "s"}</strong> so far.</>}
        </p>

        <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_440px]">
          <div className="order-2 min-w-0 lg:order-1">
            {reviews.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-black/25 bg-white p-8 text-center sm:p-12">
                <MessageSquareHeart className="mx-auto text-brand" size={36} aria-hidden />
                <p className="mt-5 text-2xl font-semibold tracking-tight">No reviews yet. Be the first!</p>
                <p className="mx-auto mt-3 max-w-md text-black/60">Your review helps other families and businesses choose the right Britam cover.</p>
              </div>
            )}
          </div>

          <div id="write" className="order-1 min-w-0 scroll-mt-28 lg:sticky lg:top-28 lg:order-2">
            <h2 className="mb-4 text-2xl font-bold tracking-tight">Write a review</h2>
            <ReviewForm />
          </div>
        </div>
      </div>
    </section>
  );
}
