import { Quote } from "lucide-react";
import Link from "next/link";
import { Reveal } from "./Reveal";
import { testimonials } from "@/lib/site";

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-neutral-50 py-20 sm:py-28">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Testimonials</p>
          <h2 className="h-section">What clients say.</h2>
        </Reveal>

        {testimonials.length > 0 ? (
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.07}>
                <figure className="flex h-full flex-col rounded-3xl border border-black/10 bg-white p-7">
                  <Quote className="text-brand" size={28} aria-hidden />
                  <blockquote className="mt-5 flex-1 text-lg leading-relaxed">{t.quote}</blockquote>
                  <figcaption className="mt-6 text-sm"><strong>{t.name}</strong>{t.context && <span className="text-black/55"> · {t.context}</span>}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="mt-14">
            <div className="rounded-3xl border border-dashed border-black/25 bg-white p-8 sm:p-12">
              <Quote className="text-brand" size={30} aria-hidden />
              <p className="mt-5 max-w-2xl text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
                Client stories will appear here. I only publish genuine feedback shared with permission.
              </p>
              <p className="mt-4 max-w-xl text-black/60">Already worked with me? I would value hearing about your experience.</p>
              <Link href="/#contact" className="btn btn-dark mt-7">Share your experience</Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
