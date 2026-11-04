"use client";
import { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MessageCircle, Loader2, CheckCircle2, AlertCircle, FileText } from "lucide-react";
import { Reveal } from "./Reveal";
import { site, waLink } from "@/lib/site";
import { products } from "@/lib/products";
import { submitLead, validateContact, type LeadResult } from "@/lib/lead";

export function Contact() {
  const [interest, setInterest] = useState("");
  const [v, setV] = useState({ name: "", phone: "", email: "", message: "", consent: false, website: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<LeadResult | null>(null);

  const productName = products.find((p) => p.slug === interest)?.name;
  const waMessage = productName
    ? `Hello ${site.firstName}, I'm interested in ${productName} through Britam. Could you help me?`
    : `Hello ${site.firstName}, I'd like to talk about Britam insurance options.`;

  const set = (k: string, val: string | boolean) => setV((s) => ({ ...s, [k]: val }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateContact(v);
    if (!v.consent) errs.consent = "Please agree so I can contact you about this request.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    const r = await submitLead({ kind: "consultation", name: v.name, phone: v.phone, email: v.email, product: productName, message: v.message, consent: v.consent, website: v.website });
    setBusy(false);
    setResult(r);
  }

  const methods = [
    { icon: MessageCircle, label: "WhatsApp", value: "Chat now", href: waLink(waMessage), ext: true },
    { icon: Phone, label: "Call", value: site.phoneDisplay, href: `tel:${site.phone}` },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}?subject=${encodeURIComponent(productName ? `Enquiry: ${productName}` : "Insurance enquiry")}` },
  ];

  return (
    <section id="contact" className="on-dark bg-black py-20 text-white sm:py-28">
      <div className="container-page grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="eyebrow !text-white"><span>Contact</span></p>
          <h2 className="h-section">Let&apos;s talk about your cover.</h2>
          <p className="mt-5 max-w-md text-lg text-white/65">Choose the way that suits you. I&apos;ll respond as soon as I can during working hours.</p>

          <div className="mt-8">
            <label htmlFor="interest" className="mb-2 block text-sm font-semibold text-white/80">I&apos;m interested in (optional)</label>
            <select id="interest" value={interest} onChange={(e) => setInterest(e.target.value)} className="w-full rounded-xl border border-white/25 bg-black px-4 py-3.5 text-base text-white focus:border-white focus:outline-none focus:ring-4 focus:ring-white/20">
              <option value="">General enquiry</option>
              {products.map((p) => (<option key={p.slug} value={p.slug}>{p.name}</option>))}
            </select>
          </div>

          <ul className="mt-6 space-y-3">
            {methods.map((m) => (
              <li key={m.label}>
                <a href={m.href} {...(m.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group flex items-center gap-4 rounded-2xl border border-white/15 p-4 transition hover:border-brand hover:bg-brand">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-black"><m.icon size={20} aria-hidden /></span>
                  <span><span className="block text-xs uppercase tracking-[0.14em] text-white/55 group-hover:text-white">{m.label}</span><span className="block font-semibold">{m.value}</span></span>
                </a>
              </li>
            ))}
          </ul>
          <Link href={interest ? `/quote?product=${interest}` : "/quote"} className="btn btn-outline-dark mt-6 w-full sm:w-auto"><FileText size={18} aria-hidden /> Request a quotation instead</Link>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-3xl bg-white p-6 text-black sm:p-9">
            {result?.ok ? (
              <div role="status" className="py-6">
                <CheckCircle2 size={40} className="text-brand" aria-hidden />
                <h3 className="mt-4 text-2xl font-bold tracking-tight">{result.delivered ? "Request received." : "One more step."}</h3>
                <p className="mt-3 text-black/65">
                  {result.delivered
                    ? `Thank you, ${v.name.split(" ")[0]}. I'll contact you on ${v.phone}. This is a consultation request only; no cover has been arranged.`
                    : "Your request could not be delivered automatically. Please send it by WhatsApp so it reaches me straight away."}
                </p>
                {!result.delivered && (
                  <a className="btn btn-primary mt-6" target="_blank" rel="noopener noreferrer"
                    href={waLink(`Hello ${site.firstName}, I'm ${v.name} (${v.phone}). ${productName ? `I'm interested in ${productName}. ` : ""}${v.message}`)}>
                    <MessageCircle size={18} aria-hidden /> Send via WhatsApp
                  </a>
                )}
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate aria-labelledby="consult-title">
                <h3 id="consult-title" className="text-2xl font-bold tracking-tight">Request a consultation</h3>
                <p className="mt-1 text-sm text-black/60">Free, with no obligation to buy.</p>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="label" htmlFor="c-name">Full name</label>
                    <input id="c-name" className="input" autoComplete="name" value={v.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "c-name-e" : undefined} />
                    {errors.name && <p id="c-name-e" className="mt-1.5 flex items-center gap-1.5 text-sm font-medium"><AlertCircle size={14} className="text-brand" aria-hidden />{errors.name}</p>}
                  </div>
                  <div>
                    <label className="label" htmlFor="c-phone">Phone / WhatsApp</label>
                    <input id="c-phone" className="input" type="tel" inputMode="tel" autoComplete="tel" placeholder="0712 345 678" value={v.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "c-phone-e" : undefined} />
                    {errors.phone && <p id="c-phone-e" className="mt-1.5 flex items-center gap-1.5 text-sm font-medium"><AlertCircle size={14} className="text-brand" aria-hidden />{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="label" htmlFor="c-email">Email (optional)</label>
                    <input id="c-email" className="input" type="email" inputMode="email" autoComplete="email" value={v.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? "c-email-e" : undefined} />
                    {errors.email && <p id="c-email-e" className="mt-1.5 flex items-center gap-1.5 text-sm font-medium"><AlertCircle size={14} className="text-brand" aria-hidden />{errors.email}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label" htmlFor="c-msg">How can I help? (optional)</label>
                    <textarea id="c-msg" rows={4} className="input resize-none" value={v.message} onChange={(e) => set("message", e.target.value)} />
                  </div>
                  <div className="hidden" aria-hidden>
                    <label htmlFor="c-web">Website</label>
                    <input id="c-web" tabIndex={-1} autoComplete="off" value={v.website} onChange={(e) => set("website", e.target.value)} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="flex items-start gap-3 text-sm text-black/70">
                      <input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-[#0000ff]" checked={v.consent} onChange={(e) => set("consent", e.target.checked)} aria-invalid={!!errors.consent} />
                      <span>I agree to be contacted about this request and to my details being processed as described in the <Link href="/privacy" className="font-semibold text-brand underline">Privacy Policy</Link>.</span>
                    </label>
                    {errors.consent && <p className="mt-1.5 flex items-center gap-1.5 text-sm font-medium"><AlertCircle size={14} className="text-brand" aria-hidden />{errors.consent}</p>}
                  </div>
                </div>
                {result && !result.ok && <p role="alert" className="mt-5 rounded-xl border border-black p-3 text-sm font-medium">{result.error}</p>}
                <button type="submit" disabled={busy} className="btn btn-primary mt-6 w-full sm:w-auto">
                  {busy ? <><Loader2 size={18} className="animate-spin" aria-hidden /> Sending…</> : "Request consultation"}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
