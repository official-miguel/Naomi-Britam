"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AlertCircle, ArrowLeft, ArrowRight, Check, CheckCircle2, ExternalLink, Loader2, MessageCircle } from "lucide-react";
import { products, getProduct } from "@/lib/products";
import { site, waLink } from "@/lib/site";
import { submitLead, validateContact, type LeadResult } from "@/lib/lead";

const steps = ["Product", "About you", "Details", "Review"];

export function QuoteWizard({ initialProduct }: { initialProduct?: string }) {
  const params = useSearchParams();
  const preset = initialProduct ?? params.get("product") ?? "";
  const [step, setStep] = useState(getProduct(preset) ? 1 : 0);
  const [slug, setSlug] = useState(getProduct(preset) ? preset : "");
  const [contact, setContact] = useState({ name: "", phone: "", email: "", preferred: "WhatsApp" });
  const [details, setDetails] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<LeadResult | null>(null);
  const top = useRef<HTMLDivElement>(null);

  const product = useMemo(() => getProduct(slug), [slug]);
  const done = !!result?.ok;

  useEffect(() => {
    top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    top.current?.focus({ preventScroll: true });
  }, [step, done]);

  function validate(s: number) {
    const e: Record<string, string> = {};
    if (s === 0 && !product) e.product = "Please choose an insurance product to continue.";
    if (s === 1) Object.assign(e, validateContact(contact));
    if (s === 2 && product)
      product.fields.forEach((f) => {
        const val = (details[f.name] ?? "").trim();
        if (f.required && !val) e[f.name] = `${f.label} is required.`;
        if (f.type === "number" && val && (isNaN(Number(val)) || Number(val) < 0)) e[f.name] = "Enter a valid number.";
      });
    if (s === 3 && !consent) e.consent = "Please confirm your consent to continue.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  const next = () => validate(step) && setStep((s) => s + 1);
  const back = () => { setErrors({}); setStep((s) => Math.max(0, s - 1)); };

  async function submit() {
    if (!validate(3) || !product) return;
    setBusy(true);
    const r = await submitLead({
      kind: "quote",
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      product: product.name,
      details: { ...details, preferredContact: contact.preferred },
      message: notes,
      consent,
      website,
    });
    setBusy(false);
    setResult(r);
  }

  const summary = product
    ? `Hello ${site.firstName}, I'd like a quotation for ${product.name}.\nName: ${contact.name}\nPhone: ${contact.phone}\n` +
      product.fields.filter((f) => details[f.name]).map((f) => `${f.label}: ${details[f.name]}`).join("\n") +
      (notes ? `\nNotes: ${notes}` : "")
    : "";

  const Err = ({ id }: { id: string }) =>
    errors[id] ? (
      <p id={`${id}-err`} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium">
        <AlertCircle size={14} className="shrink-0 text-brand" aria-hidden />
        {errors[id]}
      </p>
    ) : null;

  /* ---------- Confirmation ---------- */
  if (done && product) {
    return (
      <div ref={top} tabIndex={-1} className="outline-none" role="status">
        <CheckCircle2 size={48} className="text-brand" aria-hidden />
        <h2 className="mt-5 text-3xl font-bold tracking-tightest sm:text-4xl">
          {result.delivered ? "Quotation request received." : "Almost done. Send it to me."}
        </h2>
        <p className="mt-4 max-w-xl text-lg text-black/65">
          {result.delivered
            ? `Thank you, ${contact.name.split(" ")[0]}. I'll contact you via ${contact.preferred} on ${contact.phone} about your ${product.name} quotation.`
            : "Your details could not be delivered automatically. Please send them by WhatsApp so I receive them straight away."}
        </p>
        {!result.delivered && (
          <a href={waLink(summary)} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-6"><MessageCircle size={18} aria-hidden /> Send via WhatsApp</a>
        )}
        <div className="mt-8 rounded-2xl border border-black/15 p-5">
          <h3 className="font-bold">What happens next</h3>
          <ol className="mt-3 space-y-2 text-sm text-black/70">
            <li>1. I review your details and request a quotation from Britam.</li>
            <li>2. I explain the quotation, benefits and conditions to you.</li>
            <li>3. If you choose to proceed, I guide you through Britam&apos;s authorised application and payment process.</li>
          </ol>
          <p className="mt-4 border-l-2 border-brand pl-3 text-sm font-medium">
            You are not insured yet. Cover starts only after Britam accepts your application, confirms the premium and issues your policy.
          </p>
        </div>
        {product.purchaseUrl && (
          <a href={product.purchaseUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark mt-6">
            Continue to Britam&apos;s authorised purchase page <ExternalLink size={16} aria-hidden />
          </a>
        )}
        <div className="mt-8"><Link href="/" className="font-semibold text-brand underline">Back to home</Link></div>
      </div>
    );
  }

  /* ---------- Steps ---------- */
  return (
    <div>
      <div ref={top} tabIndex={-1} className="outline-none">
        <ol className="mb-10 flex items-center gap-2" aria-label="Progress">
          {steps.map((s, i) => (
            <li key={s} className="flex flex-1 flex-col gap-2" aria-current={i === step ? "step" : undefined}>
              <span className={`h-1.5 rounded-full transition-colors duration-300 ${i <= step ? "bg-brand" : "bg-black/10"}`} />
              <span className={`hidden text-xs font-semibold sm:block ${i === step ? "text-black" : "text-black/45"}`}>
                {String(i + 1).padStart(2, "0")} {s}
              </span>
            </li>
          ))}
        </ol>
        <p className="mb-6 text-sm font-semibold text-black/55 sm:hidden">Step {step + 1} of 4: {steps[step]}</p>
      </div>

      {step === 0 && (
        <fieldset>
          <legend className="text-3xl font-bold tracking-tightest sm:text-4xl">What would you like to cover?</legend>
          <div className="mt-8 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-describedby={errors.product ? "product-err" : undefined}>
            {products.map((p) => {
              const on = slug === p.slug;
              return (
                <label key={p.slug} className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition focus-within:ring-4 focus-within:ring-brand/20 ${on ? "border-brand bg-brand text-white" : "border-black/15 hover:border-black"}`}>
                  <input type="radio" name="product" value={p.slug} checked={on} onChange={() => { setSlug(p.slug); setDetails({}); setErrors({}); }} className="sr-only" />
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${on ? "bg-white text-brand" : "bg-black text-white"}`}><p.icon size={20} aria-hidden /></span>
                  <span className="font-semibold">{p.name}</span>
                  {on && <Check size={18} className="ml-auto" aria-hidden />}
                </label>
              );
            })}
          </div>
          <Err id="product" />
        </fieldset>
      )}

      {step === 1 && (
        <div>
          <h2 className="text-3xl font-bold tracking-tightest sm:text-4xl">Tell me about you.</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="label" htmlFor="q-name">Full name</label>
              <input id="q-name" className="input" autoComplete="name" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />
              <Err id="name" />
            </div>
            <div>
              <label className="label" htmlFor="q-phone">Phone / WhatsApp</label>
              <input id="q-phone" className="input" type="tel" inputMode="tel" autoComplete="tel" placeholder="0712 345 678" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-err" : undefined} />
              <Err id="phone" />
            </div>
            <div>
              <label className="label" htmlFor="q-email">Email (optional)</label>
              <input id="q-email" className="input" type="email" inputMode="email" autoComplete="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} />
              <Err id="email" />
            </div>
            <div className="sm:col-span-2">
              <label className="label" htmlFor="q-pref">Best way to reach you</label>
              <select id="q-pref" className="input" value={contact.preferred} onChange={(e) => setContact({ ...contact, preferred: e.target.value })}>
                {["WhatsApp", "Phone call", "Email"].map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
        </div>
      )}

      {step === 2 && product && (
        <div>
          <h2 className="text-3xl font-bold tracking-tightest sm:text-4xl">{product.name} details.</h2>
          <p className="mt-3 text-black/60">These help me prepare your quotation request. Final terms and premiums come from Britam.</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {product.fields.map((f) => (
              <div key={f.name} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
                <label className="label" htmlFor={`f-${f.name}`}>{f.label}{!f.required && <span className="font-normal text-black/45"> (optional)</span>}</label>
                {f.type === "select" ? (
                  <select id={`f-${f.name}`} className="input" value={details[f.name] ?? ""} onChange={(e) => setDetails({ ...details, [f.name]: e.target.value })} aria-invalid={!!errors[f.name]} aria-describedby={errors[f.name] ? `${f.name}-err` : undefined}>
                    <option value="">Select…</option>
                    {f.options?.map((o) => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input id={`f-${f.name}`} className="input" type={f.type === "number" ? "number" : "text"} inputMode={f.type === "number" ? "numeric" : undefined} min={f.type === "number" ? 0 : undefined} placeholder={f.placeholder} value={details[f.name] ?? ""} onChange={(e) => setDetails({ ...details, [f.name]: e.target.value })} aria-invalid={!!errors[f.name]} aria-describedby={errors[f.name] ? `${f.name}-err` : undefined} />
                )}
                <Err id={f.name} />
              </div>
            ))}
            <div className="sm:col-span-2">
              <label className="label" htmlFor="f-notes">Anything else I should know? (optional)</label>
              <textarea id="f-notes" rows={3} className="input resize-none" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
          </div>
          <div className="mt-8 rounded-2xl bg-neutral-50 p-5 text-sm">
            <p className="font-bold">Good to have ready</p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-black/65">{product.needed.map((n) => <li key={n}>{n}</li>)}</ul>
          </div>
        </div>
      )}

      {step === 3 && product && (
        <div>
          <h2 className="text-3xl font-bold tracking-tightest sm:text-4xl">Review and send.</h2>
          <dl className="mt-8 divide-y divide-black/10 rounded-2xl border border-black/15 text-sm">
            {[
              ["Product", product.name],
              ["Name", contact.name],
              ["Phone", contact.phone],
              ...(contact.email ? [["Email", contact.email]] : []),
              ["Contact via", contact.preferred],
              ...product.fields.filter((f) => details[f.name]).map((f) => [f.label, details[f.name]]),
              ...(notes ? [["Notes", notes]] : []),
            ].map(([k, val]) => (
              <div key={k} className="grid grid-cols-[130px_1fr] gap-3 p-4"><dt className="text-black/55">{k}</dt><dd className="break-words font-semibold">{val}</dd></div>
            ))}
          </dl>
          <div className="mt-6 rounded-2xl border border-black/15 p-5 text-sm leading-relaxed text-black/70">
            <strong className="text-black">Please note:</strong> this is a request for a quotation and consultation. It is not an application for cover and does not
            make you insured. Premiums, acceptance and policy issuance are decided by Britam. This website does not take payments.
          </div>
          <div className="hidden" aria-hidden><label htmlFor="q-web">Website</label><input id="q-web" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></div>
          <label className="mt-6 flex items-start gap-3 text-sm text-black/75">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#0000ff]" aria-invalid={!!errors.consent} />
            <span>I agree to be contacted about this request and to my details being processed as set out in the <Link href="/privacy" className="font-semibold text-brand underline" target="_blank">Privacy Policy</Link>.</span>
          </label>
          <Err id="consent" />
          {result && !result.ok && <p role="alert" className="mt-5 rounded-xl border border-black p-3 text-sm font-medium">{result.error}</p>}
        </div>
      )}

      <div className="mt-10 flex items-center justify-between gap-3">
        {step > 0 ? <button type="button" onClick={back} className="btn btn-outline"><ArrowLeft size={18} aria-hidden /> Back</button> : <span />}
        {step < 3 ? (
          <button type="button" onClick={next} className="btn btn-primary">Continue <ArrowRight size={18} aria-hidden /></button>
        ) : (
          <button type="button" onClick={submit} disabled={busy} className="btn btn-primary">
            {busy ? <><Loader2 size={18} className="animate-spin" aria-hidden /> Sending…</> : "Request my quotation"}
          </button>
        )}
      </div>
    </div>
  );
}
