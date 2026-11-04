import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowUpRight, Check, ChevronRight, ExternalLink, FileText, MessageCircle, Users } from "lucide-react";
import { getProduct, products } from "@/lib/products";
import { ProductIllustration } from "@/components/ProductCard";
import { site, waLink } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProduct(params.slug);
  if (!p) return {};
  return {
    title: `${p.name} in Kenya`,
    description: `${p.tagline} Learn about Britam ${p.name.toLowerCase()} and request a quotation from ${site.name}.`,
    alternates: { canonical: `/insurance/${p.slug}` },
    openGraph: { title: `${p.name} | ${site.name}`, description: p.description, url: `/insurance/${p.slug}` },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  if (!p) notFound();
  const related = products.filter((x) => x.slug !== p.slug).slice(0, 3);
  const ld = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Britam ${p.name}`,
    description: p.description,
    provider: { "@type": "InsuranceAgency", name: `${site.name}, Britam Executive Financial Advisor`, url: site.url },
    areaServed: "KE",
  };

  return (
    <article className="pb-24 pt-32 sm:pt-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="container-page">
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-1 text-sm text-black/55">
          <Link href="/" className="hover:text-brand">Home</Link><ChevronRight size={14} aria-hidden />
          <Link href="/#solutions" className="hover:text-brand">Insurance Solutions</Link><ChevronRight size={14} aria-hidden />
          <span className="font-semibold text-black" aria-current="page">{p.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tightest sm:text-6xl">{p.name}</h1>
            <p className="mt-5 text-xl text-black/65">{p.tagline}</p>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-black/75">{p.description}</p>

            <h2 className="mt-14 text-2xl font-bold tracking-tight">Key things to know</h2>
            <ul className="mt-5 space-y-3">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-lg"><Check className="mt-1 shrink-0 text-brand" size={20} aria-hidden />{h}</li>
              ))}
            </ul>

            {p.includes && p.includes.length > 0 && (
              <>
                <h2 className="mt-14 text-2xl font-bold tracking-tight">Options available</h2>
                <ul className="mt-5 divide-y divide-black/10 border-y border-black/10">
                  {p.includes.map((o) => (
                    <li key={o.name} className="grid gap-1 py-5 sm:grid-cols-[240px_1fr] sm:gap-8">
                      <h3 className="font-bold tracking-tight">{o.name}</h3>
                      <p className="text-black/65">{o.text}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              <div className="rounded-3xl border border-black/10 p-6">
                <h2 className="flex items-center gap-2 text-lg font-bold"><Users size={18} className="text-brand" aria-hidden /> Who it&apos;s for</h2>
                <ul className="mt-4 list-inside list-disc space-y-2 text-black/70">{p.suitableFor.map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
              <div className="rounded-3xl border border-black/10 p-6">
                <h2 className="flex items-center gap-2 text-lg font-bold"><FileText size={18} className="text-brand" aria-hidden /> What you&apos;ll need</h2>
                <ul className="mt-4 list-inside list-disc space-y-2 text-black/70">{p.needed.map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
            </div>

            <div className="mt-12 rounded-3xl bg-neutral-50 p-6 text-sm leading-relaxed text-black/70">
              <h2 className="text-base font-bold text-black">Important conditions</h2>
              <p className="mt-2">
                This page gives general information only. The actual benefits, limits, waiting periods, exclusions and premiums for {p.name.toLowerCase()} are
                set by Britam and appear in the policy wording and your quotation. I will walk you through them before you decide. Cover is not in force until Britam
                accepts your application, confirms the premium and issues your policy.
              </p>
              {p.notice && <p className="mt-3 font-semibold text-black">{p.notice}</p>}
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="on-dark overflow-hidden rounded-3xl bg-black text-white">
              <ProductIllustration product={p} className="h-44" />
              <div className="p-6">
                <h2 className="text-xl font-bold tracking-tight">Interested in {p.name}?</h2>
                <p className="mt-2 text-sm text-white/65">Request a personalised quotation. No obligation.</p>
                <div className="mt-6 space-y-3">
                  <Link href={`/quote?product=${p.slug}`} className="btn btn-primary w-full">Get a Quote <ArrowUpRight size={16} aria-hidden /></Link>
                  {p.purchaseUrl && (
                    <a href={p.purchaseUrl} target="_blank" rel="noopener noreferrer" className="btn w-full bg-white text-black hover:bg-brand hover:text-white">
                      Buy on Britam&apos;s authorised page <ExternalLink size={15} aria-hidden />
                    </a>
                  )}
                  <a href={waLink(`Hello ${site.firstName}, I'm interested in ${p.name} through Britam. Could you help me?`)} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark w-full">
                    <MessageCircle size={17} aria-hidden /> Ask on WhatsApp
                  </a>
                </div>
                {!p.purchaseUrl && (
                  <p className="mt-5 text-xs leading-relaxed text-white/50">
                    Online purchase is not currently available for this product through this website. I&apos;ll guide you through Britam&apos;s authorised process after your quotation.
                  </p>
                )}
              </div>
            </div>
          </aside>
        </div>

        <section className="mt-24" aria-labelledby="related">
          <h2 id="related" className="text-2xl font-bold tracking-tight">Other insurance solutions</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/insurance/${r.slug}`} className="group flex items-center justify-between rounded-2xl border border-black/10 p-5 font-semibold transition hover:border-brand hover:text-brand">
                {r.name}<ArrowUpRight size={18} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
