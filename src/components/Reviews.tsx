import Link from "next/link";
import { ArrowRight, MessageSquareHeart, PenLine } from "lucide-react";
import { Reveal } from "./Reveal";
import { ReviewCard } from "./ReviewCard";
import { QuickRate } from "./QuickRate";
import { getPublishedReviews } from "@/lib/reviews";
import { site } from "@/lib/site";

const SHOW = 6;

/** Homepage reviews section (replaces the old Testimonials section). */
export async function Reviews() {
  const reviews = await getPublishedReviews(SHOW + 1);
  const hasMore = reviews.length > SHOW;

  return (
    <section id="reviews" className="bg-neutral-50 py-20 sm:py-28">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Reviews</p>
            <h2 className="h-section">What clients say about {site.firstName} &amp; Britam.</h2>
          </Reveal>
          <Reveal className="flex flex-wrap gap-3">
            <Link href="/reviews#write" className="btn btn-primary"><PenLine size={18} aria-hidden /> Write a review</Link>
            {reviews.length > 0 && <Link href="/reviews" className="btn btn-outline">All reviews <ArrowRight size={18} aria-hidden /></Link>}
          </Reveal>
        </div>

        {reviews.length > 0 ? (
          <div className="-mx-5 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
            {reviews.slice(0, SHOW).map((r, i) => (
              <Reveal key={r.id} delay={i * 0.06} className="w-[85%] shrink-0 snap-center sm:w-auto">
                <ReviewCard review={r} clamp />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="mt-12">
            <div className="rounded-3xl border border-dashed border-black/25 bg-white p-8 text-center sm:p-12">
              <MessageSquareHeart className="mx-auto text-brand" size={36} aria-hidden />
              <p className="mx-auto mt-5 max-w-xl text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">Be the first to review {site.firstName}.</p>
              <p className="mx-auto mt-3 max-w-md text-black/60">Worked with {site.firstName} on your Britam cover? Your review helps other families and businesses choose with confidence.</p>
            </div>
          </Reveal>
        )}

        <Reveal className="mt-10">
          <div className="flex flex-col items-center justify-between gap-4 rounded-3xl bg-black px-6 py-6 text-white sm:flex-row sm:px-8">
            <div>
              <p className="text-lg font-bold">Worked with {site.firstName}? Rate your experience.</p>
              <p className="text-sm text-white/60">Tap a star. It takes less than a minute.</p>
            </div>
            <QuickRate dark />
          </div>
        </Reveal>

        {hasMore && (
          <div className="mt-8 text-center">
            <Link href="/reviews" className="font-semibold text-brand underline underline-offset-4">Read all reviews</Link>
          </div>
        )}
      </div>
    </section>
  );
}
