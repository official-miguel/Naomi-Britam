import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { nav, site } from "@/lib/site";
import { products } from "@/lib/products";

const link = "text-white/80 hover:text-white hover:underline hover:decoration-brand hover:underline-offset-4";

export function Footer() {
  return (
    <footer className="on-dark bg-black text-white">
      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <span className="mb-6 inline-block rounded-2xl bg-white px-4 py-3">
              <Image src="/britam-logo-v2.png" alt="Britam: with you every step of the way" width={1400} height={430} className="h-14 w-auto max-w-none shrink-0 object-contain" />
            </span>
            <p className="text-2xl font-bold tracking-tight">{site.name}</p>
            <p className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-white/60">{site.title}</p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              Personal, honest guidance on choosing insurance. Based in {site.location}. {site.serviceArea}.
            </p>
          </div>
          <div>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/50">Navigate</h2>
            <ul className="space-y-2.5 text-sm">
              {nav.map((n) => (
                <li key={n.href}><Link className={link} href={n.href}>{n.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/50">Insurance</h2>
            <ul className="space-y-2.5 text-sm">
              {products.map((p) => (
                <li key={p.slug}><Link className={link} href={`/insurance/${p.slug}`}>{p.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/50">Contact</h2>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li><a className="hover:text-white hover:underline" href={`tel:${site.phone}`}>{site.phoneDisplay}</a></li>
              <li><a className="hover:text-white hover:underline" href={`mailto:${site.email}`}>{site.email}</a></li>
              <li>{site.location}</li>
              {site.agentNumber && <li>Agent ref: {site.agentNumber}</li>}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/15 pt-8 text-xs leading-relaxed text-white/55">
          <p>
            {site.name} is an Executive Financial Advisor offering Britam products and services. This is a personal website and is{" "}
            <strong className="font-semibold text-white/80">not the official website of Britam Holdings Plc or any Britam company</strong>.
            Britam and its logos are trademarks of their respective owner and are used only to describe the products offered.
            Submitting a form on this site does not create, bind or confirm insurance cover. Cover starts only when Britam accepts your
            application and confirms the premium. Insurance in Kenya is regulated by the Insurance Regulatory Authority (IRA).
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white hover:underline">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white hover:underline">Terms &amp; Conditions</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15 bg-white/[0.04]">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-white/70">
            Designed &amp; developed by{" "}
            <a href="https://trillionairedesigns.co.ke" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline" style={{ color: "#00B612" }}>
              Trillionaire Designs
            </a>
          </p>
          <a
            href="https://trillionairedesigns.co.ke"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition hover:bg-[#00B612] hover:text-black"
            style={{ borderColor: "#00B612", color: "#00B612" }}
          >
            Need a website like this? Let&apos;s talk <ArrowUpRight size={14} aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
