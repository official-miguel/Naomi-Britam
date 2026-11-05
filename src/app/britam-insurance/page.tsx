import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ChevronRight, MessageCircle } from "lucide-react";
import { products } from "@/lib/products";
import { site, waLink } from "@/lib/site";

const city = site.location.split(",")[0];
const pageTitle = "Britam Insurance Kenya: Products, Quotes & a Britam Advisor";
const pageDesc = `A plain-language guide to Britam insurance in Kenya: motor, medical, life, education, retirement, investment and business cover. Get a Britam quotation through ${site.fullDisplayName}, Britam ${site.title} in ${city}.`;

export const metadata: Metadata = {
  title: { absolute: `${pageTitle} | ${site.fullDisplayName}` },
  description: pageDesc,
  alternates: { canonical: "/britam-insurance" },
  openGraph: { title: pageTitle, description: pageDesc, url: "/britam-insurance", type: "article" },
};

const guideFaqs = [
  {
    q: "What insurance does Britam offer in Kenya?",
    a: `Britam offers cover for individuals, families and businesses, including ${products.map((p) => p.name.toLowerCase()).join(", ")}. Each product has its own terms, benefits and exclusions set out in Britam's policy wording.`,
  },
  {
    q: "How do I get a Britam insurance quote?",
    a: `Share a few details about what you want to cover through the quotation form or on WhatsApp. ${site.fullDisplayName} will help you request the quotation from Britam and explain it. Premiums are set by Britam, not by this website.`,
  },
  {
    q: "Why buy Britam insurance through an advisor?",
    a: "An advisor helps you compare the options, understand what is and is not covered, prepare the documents Britam needs, and supports you at renewal and claim time. You still deal with Britam as your insurer.",
  },
  {
    q: `Is there a Britam insurance advisor in ${city}?`,
    a: `Yes. ${site.fullDisplayName} is a Britam ${site.title} based in ${city}, serving clients across Kenya by phone, WhatsApp, email and in person.`,
  },
  {
    q: "Is this the official Britam website?",
    a: "No. This is the personal website of a Britam Executive Financial Advisor. Policies are issued, priced and administered by Britam.",
  },
];

export default function BritamInsuranceGuide() {
  const url = `${site.url}/britam-insurance`;
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: pageTitle,
        description: pageDesc,
        url,
        inLanguage: "en-KE",
        author: { "@id": `${site.url}/#person` },
        publisher: { "@id": `${site.url}/#agency` },
        about: [{ "@type": "Organization", name: "Britam" }, { "@type": "Thing", name: "Insurance in Kenya" }],
        image: `${site.url}/naomi.jpg`,
      },
      {
        "@type": "ItemList",
        name: "Britam insurance products",
        itemListElement: products.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: `Britam ${p.name}`, url: `${site.url}/insurance/${p.slug}` })),
      },
      {
        "@type": "FAQPage",
        mainEntity: guideFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Britam Insurance Guide", item: url },
        ],
      },
    ],
  };

  return (
    <article className="pb-24 pt-32 sm:pt-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="container-page max-w-4xl">
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-1 text-sm text-black/55">
          <Link href="/" className="hover:text-brand">Home</Link><ChevronRight size={14} aria-hidden />
          <span className="font-semibold text-black" aria-current="page">Britam Insurance Guide</span>
        </nav>

        <h1 className="text-4xl font-bold leading-[1.05] tracking-tightest sm:text-6xl">Britam Insurance in Kenya</h1>
        <p className="mt-6 text-lg leading-relaxed text-black/70">
          A plain-language guide to Britam insurance, investment and retirement products, written by {site.fullDisplayName}, Britam {site.title} in {city}.
          Use it to understand your options, then request a Britam quotation with personal guidance.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/quote" className="btn btn-primary">Get a Britam Quote <ArrowRight size={18} aria-hidden /></Link>
          <a href={waLink("Hello Naomi, I'd like help choosing Britam insurance.")} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            <MessageCircle size={18} aria-hidden /> WhatsApp {site.firstName}
          </a>
        </div>

        <h2 className="mt-16 text-3xl font-bold tracking-tight">Britam insurance products</h2>
        <p className="mt-3 text-black/65">Britam covers individuals, families and businesses. Choose a product to see what it covers, who it suits and what you need for a quote.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {products.map((p) => (
            <Link key={p.slug} href={`/insurance/${p.slug}`} className="group rounded-2xl border border-black/10 p-6 transition hover:border-brand">
              <h3 className="text-xl font-bold group-hover:text-brand">Britam {p.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-black/65">{p.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-black/55">{p.description}</p>
            </Link>
          ))}
        </div>

        <h2 className="mt-16 text-3xl font-bold tracking-tight">How to buy Britam insurance through an advisor</h2>
        <ol className="mt-6 list-decimal space-y-3 pl-5 leading-relaxed text-black/70">
          <li><strong>Talk through your needs.</strong> Tell {site.firstName} what you want to protect: your car, your health, your family&apos;s income, your business or your savings.</li>
          <li><strong>Compare Britam options.</strong> Get a clear explanation of what each option covers and what it excludes.</li>
          <li><strong>Request a quotation.</strong> Britam sets the premium based on its underwriting rules.</li>
          <li><strong>Apply and pay through Britam&apos;s authorised channels.</strong> Cover starts only when Britam accepts your application.</li>
          <li><strong>Get ongoing support.</strong> Help with renewals, policy changes and claims.</li>
        </ol>

        <h2 className="mt-16 text-3xl font-bold tracking-tight">Britam insurance: common questions</h2>
        <div className="mt-6 space-y-6">
          {guideFaqs.map((f) => (
            <div key={f.q}>
              <h3 className="text-lg font-bold">{f.q}</h3>
              <p className="mt-2 leading-relaxed text-black/70">{f.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-black p-8 text-white">
          <h2 className="text-2xl font-bold">Speak to a Britam advisor in {city}</h2>
          <p className="mt-3 text-white/75">
            {site.fullDisplayName} · {site.title}, Britam · <a href={`tel:${site.phone}`} className="underline">{site.phoneDisplay}</a> ·{" "}
            <a href={`mailto:${site.email}`} className="underline">{site.email}</a>
          </p>
          <Link href="/quote" className="btn btn-primary mt-6">Request a Britam quotation <ArrowRight size={18} aria-hidden /></Link>
        </div>

        <p className="mt-10 text-xs leading-relaxed text-black/50">
          This is a personal advisor website, not the official website of Britam Holdings Plc or any Britam company. Product details are a general guide;
          exact benefits, limits and exclusions are set only in Britam&apos;s policy wording.
        </p>
      </div>
    </article>
  );
}
