import { BadgeCheck } from "lucide-react";
import { Stars } from "./Stars";
import { formatReviewDate, ratingLabels, type Review } from "@/lib/reviews";

export function ReviewCard({ review, clamp = false }: { review: Review; clamp?: boolean }) {
  const initials = review.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
  return (
    <figure className="flex h-full flex-col rounded-3xl border border-black/10 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5 hover:shadow-lg sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <Stars rating={review.rating} />
        <span className="text-xs font-semibold text-black/45">{ratingLabels[review.rating]}</span>
      </div>
      <blockquote className={`mt-4 flex-1 text-[15px] leading-relaxed text-black/80 sm:text-base ${clamp ? "line-clamp-6" : ""}`}>
        &ldquo;{review.comment}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-black/10 pt-5">
        <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-white">{initials}</span>
        <span className="min-w-0 text-sm">
          <span className="flex items-center gap-1 font-bold">
            <span className="truncate">{review.name}</span>
            <BadgeCheck size={15} className="shrink-0 text-brand" aria-label="Client review" />
          </span>
          <span className="block truncate text-black/55">
            {[review.product, review.location, formatReviewDate(review.created_at)].filter(Boolean).join(" · ")}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
