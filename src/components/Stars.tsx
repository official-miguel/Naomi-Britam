import { Star } from "lucide-react";

/** Read-only star rating. Gold stars read instantly as "rating" to every visitor. */
export function Stars({ rating, size = 18, className = "" }: { rating: number; size?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          aria-hidden
          className={i <= rating ? "fill-[#F5A623] text-[#F5A623]" : "fill-black/10 text-black/10"}
          strokeWidth={1.5}
        />
      ))}
    </span>
  );
}
