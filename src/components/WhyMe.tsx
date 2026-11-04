import { Reveal } from "./Reveal";

const points = [
  ["Personalised guidance", "Advice built around your situation, not a one-size-fits-all pitch."],
  ["Understanding your family", "We look at the people who depend on you and the goals you are working toward."],
  ["Choosing appropriate cover", "I help you compare options so you avoid paying for cover you do not need, or missing cover you do."],
  ["Help with the application", "I walk you through the forms and documents so nothing is missed."],
  ["Ongoing support", "Questions after you buy? Renewals coming up? You know who to call."],
  ["Claims understanding", "I help you understand the claims process and what to prepare before you ever need it."],
];

export function WhyMe() {
  return (
    <section id="why-me" className="on-dark bg-black py-20 text-white sm:py-28">
      <div className="container-page grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="eyebrow !text-white"><span className="text-white">Why work with me</span></p>
          <h2 className="h-section">A person, not a call centre.</h2>
          <p className="mt-5 max-w-md text-lg text-white/65">
            Dealing directly with your advisor means one familiar contact who knows your situation from the first conversation onward.
          </p>
        </Reveal>
        <ul className="grid gap-px overflow-hidden rounded-3xl border border-white/15 bg-white/15 sm:grid-cols-2">
          {points.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.05} className="bg-black">
              <li className="group h-full list-none p-7 transition hover:bg-brand">
                <span className="text-xs font-semibold text-white/50 group-hover:text-white">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-bold tracking-tight">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65 group-hover:text-white">{d}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
