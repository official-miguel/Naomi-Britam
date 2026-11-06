"use client";
import { useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { ratingLabels } from "@/lib/reviews";

/** Five big tappable stars. Each opens the review form with that rating already chosen. */
export function QuickRate({ product, dark = false }: { product?: string; dark?: boolean }) {
  const [hover, setHover] = useState(0);
  const href = (n: number) => `/reviews?rating=${n}${product ? `&product=${encodeURIComponent(product)}` : ""}#write`;
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Link
            key={n}
            href={href(n)}
            aria-label={`Rate ${n} star${n > 1 ? "s" : ""}, ${ratingLabels[n]}`}
            onMouseEnter={() => setHover(n)}
            onFocus={() => setHover(n)}
            onBlur={() => setHover(0)}
            className="rounded-lg p-1 transition hover:scale-110"
          >
            <Star
              size={34}
              strokeWidth={1.5}
              aria-hidden
              className={`transition-colors ${n <= hover ? "fill-[#F5A623] text-[#F5A623]" : dark ? "fill-white/10 text-white/50" : "fill-black/5 text-black/30"}`}
            />
          </Link>
        ))}
      </div>
      <span aria-hidden className={`hidden w-20 text-sm font-semibold sm:inline ${dark ? "text-white/70" : "text-black/60"}`}>{hover ? ratingLabels[hover] : ""}</span>
    </div>
  );
}
