"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site } from "@/lib/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-black focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-page items-center justify-between rounded-full border bg-white/90 py-2 pl-5 pr-2 backdrop-blur-md transition-all duration-300 ${
          scrolled ? "border-black/15 shadow-[0_8px_30px_rgba(0,0,0,0.08)]" : "border-black/10"
        }`}
      >
        <Link href="/#home" className="flex items-center gap-3" onClick={() => setOpen(false)} aria-label={`${site.name}, ${site.title}. Home`}>
          <span className="text-lg font-bold tracking-tight">{site.firstName}</span>
          <span aria-hidden className="h-5 w-px bg-black/20" />
          <Image src="/britam-wordmark.png" alt="Britam" width={1000} height={470} priority className="h-[26px] w-auto" />
          <span className="hidden text-[11px] font-semibold uppercase tracking-[0.14em] text-black/55 md:inline">Financial Advisor</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} className="group relative rounded-full px-4 py-2 text-sm font-medium text-black/70 transition hover:text-black">
                {n.label}
                <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link href="/quote" className="btn btn-primary !px-5 !py-2.5 !text-sm">
            Get Insured <ArrowUpRight size={16} aria-hidden />
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full border border-black/15 lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-page overflow-hidden rounded-3xl border border-black/10 bg-white p-3 shadow-xl lg:hidden"
          >
            <ul>
              {nav.map((n, i) => (
                <li key={n.href}>
                  <Link href={n.href} onClick={() => setOpen(false)} className="flex items-center justify-between rounded-2xl px-4 py-4 text-lg font-semibold hover:bg-black hover:text-white">
                    <span>{n.label}</span>
                    <span className="text-xs text-brand">0{i + 1}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/quote" onClick={() => setOpen(false)} className="btn btn-primary mt-2 w-full">
              Get Insured
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
