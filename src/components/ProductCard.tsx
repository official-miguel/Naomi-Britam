import Link from "next/link";
import Image from "next/image";
import { ProductArt } from "./ProductArt";
import { ArrowUpRight, Check, ExternalLink } from "lucide-react";
import type { Product } from "@/lib/products";

export function ProductIllustration({ product, className = "" }: { product: Product; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-black ${className}`} aria-hidden>
      {product.image ? (
        <Image src={product.image} alt="" fill unoptimized sizes="(min-width:1024px) 380px, 90vw" className="object-cover transition duration-500 group-hover:scale-105" />
      ) : (
        <ProductArt slug={product.slug} className="h-full w-full transition duration-500 group-hover:scale-105" />
      )}
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
