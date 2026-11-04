"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Briefcase, Plane, HeartPulse } from "lucide-react";
import { site } from "@/lib/site";
import { usePreloader } from "./PreloaderProvider";

const BLUE = "#0000FF";
const GREEN = "#00B612"; // Trillionaire Designs brand colour (requested exception to the site palette)

const BOUNCE = 1.4; // seconds per bounce (moderate pace)
const CYCLE = BOUNCE * 3; // briefcase → plane → health
const MIN_VISIBLE = CYCLE * 1000; // ms: long enough to see all three shapes once
const MAX_WAIT = 6000; // ms

// Keyframe times for 3 bounces: land, apex, land, apex, land, apex, land
const T = [0, 1 / 6, 2 / 6, 3 / 6, 4 / 6, 5 / 6, 1];
const bounceEase = ["easeOut", "easeIn", "easeOut", "easeIn", "easeOut", "easeIn"] as const;

/** Visibility window around the apex of bounce n (0..2). */
function apexWindow(n: number, onValue: number, offValue: number) {
  const apex = (2 * n + 1) / 6;
  const w = 0.075;
  const a = Math.max(0, apex - w - 0.03);
  const b = apex - w;
  const c = apex + w;
  const d = Math.min(1, apex + w + 0.03);
  const times = [0, a, b, c, d, 1];
  const values = [offValue, offValue, onValue, onValue, offValue, offValue];
  return { times, values };
}

const icons = [Briefcase, Plane, HeartPulse];

function Stage() {
  return (
    <div className="relative h-[190px] w-[120px]" aria-hidden>
      {/* shadow */}
      <motion.span
        className="absolute bottom-0 left-1/2 h-[10px] w-[46px] -translate-x-1/2 rounded-[50%] bg-black/15"
        animate={{ scaleX: [1, 0.45, 1, 0.45, 1, 0.45, 1], opacity: [1, 0.35, 1, 0.35, 1, 0.35, 1] }}
        transition={{ duration: CYCLE, times: T, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* bouncing object */}
      <motion.div
        className="absolute bottom-[10px] left-1/2 h-[64px] w-[64px] -ml-8"
        style={{ originY: 1 }}
        animate={{
          y: [0, -118, 0, -118, 0, -118, 0],
          scaleY: [0.82, 1, 0.82, 1, 0.82, 1, 0.82],
          scaleX: [1.12, 1, 1.12, 1, 1.12, 1, 1.12],
        }}
        transition={{
          duration: CYCLE,
          times: T,
          repeat: Infinity,
          ease: [...bounceEase],
        }}
      >
        {[0, 1, 2].map((n) => {
          const Icon = icons[n];
          const op = apexWindow(n, 1, 0);
          const sc = apexWindow(n, 1, 0.3);
          return (
            <motion.span key={n} className="absolute inset-0 grid place-items-center" style={{ color: BLUE }} initial={{ opacity: 0 }}
              animate={{ opacity: op.values, scale: sc.values }}
              transition={{ duration: CYCLE, times: op.times, repeat: Infinity, ease: "linear" }}>
              <Icon size={60} strokeWidth={2.2} />
            </motion.span>
          );
        })}
        {/* ball fades out only during each apex window */}
        <BallMask />
      </motion.div>
    </div>
  );
}

/** Ball that is visible except around each apex, when it morphs into an icon. */
function BallMask() {
  // Build opacity keyframes: 1 outside apex windows, 0 inside.
  const times: number[] = [0];
  const values: number[] = [1];
  [0, 1, 2].forEach((n) => {
    const w = apexWindow(n, 0, 1);
    w.times.slice(1, -1).forEach((t, i) => {
      times.push(t);
      values.push(w.values[i + 1]);
    });
  });
  times.push(1);
  values.push(1);
  return (
    <motion.span
      className="absolute bottom-0 left-1/2 block h-[44px] w-[44px] -translate-x-1/2 rounded-full"
      style={{ background: BLUE }}
      animate={{ opacity: values, scale: values.map((v) => 0.55 + 0.45 * v) }}
      transition={{ duration: CYCLE, times, repeat: Infinity, ease: "linear" }}
    />
  );
}

export function Preloader() {
  const [show, setShow] = useState(true);
  const { setDone } = usePreloader();
  const reduce = useReducedMotion();

  useEffect(() => {
    // Shown on every full page load, including reloads. In-site navigation does not remount it.
    document.body.style.overflow = "hidden";
    const minDone = new Promise<void>((r) => setTimeout(r, reduce ? 900 : MIN_VISIBLE));
    const loaded = new Promise<void>((r) => {
      if (document.readyState === "complete") r();
      else {
        window.addEventListener("load", () => r(), { once: true });
        setTimeout(r, MAX_WAIT);
      }
    });
    // Start revealing the site (hero/navbar) at the same moment the curtain begins to lift.
    Promise.all([minDone, loaded]).then(() => {
      setDone(true);
      setShow(false);
    });
    return () => { document.body.style.overflow = ""; };
  }, [reduce, setDone]);

  useEffect(() => {
    if (!show) document.body.style.overflow = "";
  }, [show]);

  return (
    <>
      <noscript><style>{`#preloader{display:none!important}header,main *{opacity:1!important;transform:none!important}`}</style></noscript>
      <AnimatePresence>
        {show && (
          <motion.div
            id="preloader"
            role="status"
            aria-live="polite"
            aria-label="Loading website"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-white px-6 py-8"
            // Curtain lifts upward while the site fades in underneath, so there is no hard cut.
            exit={{ y: "-100%", transition: { duration: 0.95, delay: 0.2, ease: [0.76, 0, 0.24, 1] } }}
          >
            <span />
            <motion.div
              className="flex flex-col items-center text-center"
              exit={{ opacity: 0, scale: 0.94, y: -10, transition: { duration: 0.4, ease: "easeIn" } }}
            >
              {reduce ? (
                <div className="h-[44px] w-[44px] rounded-full" style={{ background: BLUE }} aria-hidden />
              ) : (
                <Stage />
              )}
              <p className="mt-8 text-2xl font-bold tracking-tight text-black sm:text-3xl">{site.preloaderName}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-black/55 sm:text-sm">{site.title}</p>
              <Image src="/britam-wordmark-v2.png" alt="Britam" width={1000} height={238} priority className="mt-5 h-6 w-auto max-w-none shrink-0 object-contain" />
            </motion.div>
            <motion.p className="text-xs text-black/55" exit={{ opacity: 0, transition: { duration: 0.3 } }}>
              Powered by{" "}
              <a href="https://trillionairedesigns.co.ke" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline" style={{ color: GREEN }}>Trillionaire Designs</a>
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
