import { Suspense } from "react";
import type { Metadata } from "next";
import { QuoteWizard } from "@/components/QuoteWizard";

export const metadata: Metadata = {
  title: "Request a Britam Insurance Quotation",
  description: "Request a personalised Britam insurance quotation in a few simple steps. No obligation, no payment on this website.",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <section className="pb-24 pt-32 sm:pt-40">
      <div className="container-page max-w-3xl">
        <p className="eyebrow">Get insured</p>
        <h1 className="sr-only">Request a quotation</h1>
        <Suspense fallback={<p className="text-black/60">Loading…</p>}>
          <QuoteWizard />
        </Suspense>
      </div>
    </section>
  );
}
