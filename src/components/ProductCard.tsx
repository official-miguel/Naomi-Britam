import Link from "next/link";
import { ArrowUpRight, Check, ExternalLink } from "lucide-react";
import type { Product } from "@/lib/products";

export function ProductIllustration({ product, className = "" }: { product: Product; className?: string }) {
  const Icon = product.icon;
  return (
    <div className={`relative overflow-hidden bg-black ${className}`} aria-hidden>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:28px_28px]" />
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/20" />
      <div className="absolute -right-4 -top-4 h-28 w-28 rounded-full border border-brand" />
      <div className="absolute bottom-5 left-5 grid h-16 w-16 place-items-center rounded-2xl bg-brand text-white transition duration-300 group-hover:rotate-[-6deg] group-hover:scale-105">
        <Icon size={30} strokeWidth={1.75} />
      </div>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-white transition duration-300 hover:-translate-y-1 hover:border-black">
      <ProductIllustration product={product} className="h-40" />
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold tracking-tight">{product.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-black/65">{product.tagline}</p>
        <ul className="mt-4 space-y-2 text-sm text-black/75">
          {product.highlights.slice(0, 2).map((h) => (
            <li key={h} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-brand" aria-hidden />{h}</li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          <Link href={`/insurance/${product.slug}`} className="btn btn-outline !px-4 !py-2.5 !text-sm" aria-label={`Learn more about ${product.name}`}>
            Learn More
          </Link>
          <Link href={`/quote?product=${product.slug}`} className="btn btn-primary !px-4 !py-2.5 !text-sm" aria-label={`Get a quote for ${product.name}`}>
            Get a Quote <ArrowUpRight size={15} aria-hidden />
          </Link>
          {product.purchaseUrl && (
            <a href={product.purchaseUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark !px-4 !py-2.5 !text-sm">
              Buy Online <ExternalLink size={14} aria-hidden />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
