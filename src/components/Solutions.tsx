import { Reveal } from "./Reveal";
import { ProductCard } from "./ProductCard";
import { products } from "@/lib/products";

export function Solutions() {
  return (
    <section id="solutions" className="bg-neutral-50 py-20 sm:py-28">
      <div className="container-page">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Insurance solutions</p>
          <h2 className="h-section">Cover for the things that would hurt most to lose.</h2>
          <p className="mt-5 text-lg text-black/65">
            Browse the Britam products I can help you with. Each page explains what to consider, what you will need, and how to request a quotation.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.07}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-xs text-black/50">
          Descriptions are general. Benefits, limits, exclusions and premiums are defined by Britam in the policy wording and quotation.
        </p>
      </div>
    </section>
  );
}
