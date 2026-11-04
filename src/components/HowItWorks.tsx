import { Reveal } from "./Reveal";

const steps = [
  ["Discover your needs", "We talk about what you want to protect, your budget and your priorities."],
  ["Explore suitable options", "I show you Britam products that fit, and explain the conditions that apply."],
  ["Complete your application", "You fill in the details with my help, online or through a consultation."],
  ["Guidance through issuance", "Britam reviews and accepts your application. I guide you through its authorised policy issuance process."],
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">How it works</p>
          <h2 className="h-section">From first chat to policy, in four steps.</h2>
        </Reveal>
        <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          <span aria-hidden className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-px bg-black/15 md:left-0 md:right-0 md:top-5 md:h-px md:w-full" />
          {steps.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.1}>
              <li className="relative list-none pl-14 md:pl-0 md:pt-14">
                <span className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full bg-brand text-sm font-bold text-white ring-8 ring-white md:top-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-bold tracking-tight">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/65">{d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <p className="mt-12 max-w-2xl border-l-2 border-brand pl-4 text-sm text-black/65">
          Important: your cover is active only once Britam has accepted your application, confirmed the premium and issued your policy. Submitting a
          form on this website does not give you cover.
        </p>
      </div>
    </section>
  );
}
