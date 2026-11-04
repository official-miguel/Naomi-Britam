"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ShieldCheck, MapPin, Clock } from "lucide-react";
import { site } from "@/lib/site";
import { products } from "@/lib/products";

export function Portrait({ className = "" }: { className?: string }) {
  if (site.photo) {
    return <Image src={site.photo} alt={`Portrait of ${site.name}, ${site.title}`} fill priority sizes="(min-width:1024px) 420px, 90vw" className={`object-cover object-[50%_18%] ${className}`} />;
  }
  return (
    <div className={`absolute inset-0 grid place-items-center bg-neutral-100 ${className}`} role="img" aria-label="Portrait placeholder. Add a real photograph in src/lib/site.ts">
      <div className="text-center">
        <span className="block text-8xl font-bold tracking-tightest text-black/10">{site.firstName[0]}</span>
        <span className="mt-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-black/40">Portrait to be added</span>
      </div>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const fade = (d: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-32 sm:pt-40 lg:pb-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.045)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_60%_at_30%_30%,black,transparent)]" />
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.p {...fade(0)} className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-3.5 py-1.5 text-xs font-semibold">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-brand" /></span>
            Accepting new clients · {site.location}
          </motion.p>
          <motion.p {...fade(0.05)} className="mt-6 text-sm font-semibold text-black/60">
            {site.name} · {site.title}, Britam
          </motion.p>
          <motion.h1 {...fade(0.1)} className="mt-3 text-[2.9rem] font-bold leading-[1.02] tracking-tightest sm:text-6xl lg:text-[4.6rem]">
            Protecting what <span className="text-brand">matters most</span> to you.
          </motion.h1>
          <motion.p {...fade(0.2)} className="mt-7 max-w-xl text-lg leading-relaxed text-black/65">
            I&apos;m {site.firstName}, an Executive Financial Advisor at Britam. I help individuals, families and businesses understand their options and choose cover that
            fits, in plain language and without pressure.
          </motion.p>
          <motion.div {...fade(0.3)} className="mt-9 flex flex-wrap gap-3">
            <Link href="/#solutions" className="btn btn-primary">Explore Insurance Solutions <ArrowRight size={18} aria-hidden /></Link>
            <Link href="/quote" className="btn btn-outline">Get a Quote</Link>
          </motion.div>
          <motion.ul {...fade(0.4)} className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-black/60">
            <li className="flex items-center gap-2"><MapPin size={16} className="text-brand" aria-hidden />Based in Nairobi · {site.serviceArea.replace("Serving clients", "serving clients")}</li>
            <li className="flex items-center gap-2"><Clock size={16} className="text-brand" aria-hidden />Replies during working hours</li>
            <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-brand" aria-hidden />Britam products</li>
          </motion.ul>
        </div>

        <motion.div {...fade(0.2)} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="on-dark overflow-hidden rounded-[2rem] bg-black p-3 text-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)]">
            <div className="relative aspect-[4/4.2] overflow-hidden rounded-[1.5rem]">
              <Portrait />
              <span className="absolute right-3 top-3 rounded-xl bg-white/95 px-3 py-2 shadow-sm">
                <Image src="/britam-wordmark.png" alt="Britam" width={864} height={343} className="h-5 w-auto" />
              </span>
            </div>
            <div className="px-3 pb-3 pt-5">
              <p className="text-xl font-bold tracking-tight">{site.name}</p>
              <p className="text-sm text-white/60">{site.title}</p>
              <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4 text-sm">
                <span className="text-white/60">{products.length} insurance solutions</span>
                <Link href="/#solutions" className="flex items-center gap-1 font-semibold hover:underline hover:decoration-brand hover:underline-offset-4">View <ArrowUpRight size={15} aria-hidden /></Link>
              </div>
            </div>
          </div>
          <motion.div
            animate={reduce ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-3 top-8 hidden rounded-2xl border border-black/10 bg-white px-4 py-3 text-xs shadow-lg sm:block lg:-left-10"
          >
            <p className="font-bold">Free consultation</p>
            <p className="text-black/55">No obligation to buy</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
