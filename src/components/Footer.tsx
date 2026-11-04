import Link from "next/link";
import Image from "next/image";
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
              <Image src="/britam-logo.png" alt="Britam: with you every step of the way" width={864} height={520} className="h-14 w-auto" />
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
            {site.name} is an independent insurance advisor/agent offering Britam products. This is a personal website and is{" "}
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
    </footer>
  );
}
