import { Compass, HeartHandshake, Scale, FileSearch } from "lucide-react";
import { Reveal } from "./Reveal";
import { site, stats } from "@/lib/site";

const values = [
  { icon: Scale, title: "Honest advice", text: "I tell you what a product does and what it does not, including conditions that apply." },
  { icon: HeartHandshake, title: "People first", text: "Insurance is about your family, your income and your peace of mind, not a sales target." },
  { icon: FileSearch, title: "Informed decisions", text: "I explain the policy wording in plain language so you choose with confidence." },
  { icon: Compass, title: "Guidance after you buy", text: "From renewals to claims, you have someone to ask." },
];

export function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="container-page grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="eyebrow">About me</p>
          <h2 className="h-section">Insurance explained by someone you can actually talk to.</h2>
        </Reveal>
        <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-black/70">
          {/* PLACEHOLDER BIO: replace with the agent's real story, experience and years in practice. */}
          <p>
            I&apos;m <strong className="text-black">{site.name}</strong>, a {site.title} working with Britam in {site.location}. I help people
            understand which risks matter in their lives and which Britam products may help them manage those risks.
          </p>
          <p>
            My approach is simple: listen first, explain clearly, and make sure you know what you are signing up for, including the benefits, the
            conditions and how to claim, before you commit.
          </p>
          <p className="rounded-2xl border border-dashed border-black/25 bg-neutral-50 p-4 text-sm text-black/60">
            Agent note: replace this paragraph with your professional background, years of experience, areas of specialisation and licensing details.
          </p>
        </Reveal>
      </div>

      {stats.length > 0 && (
        <div className="container-page mt-14 grid grid-cols-2 gap-6 border-y border-black/10 py-10 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-bold tracking-tightest text-brand">{s.value}</p>
              <p className="mt-1 text-sm text-black/60">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="container-page mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((v, i) => (
          <Reveal key={v.title} delay={i * 0.07}>
            <div className="h-full rounded-3xl border border-black/10 p-6 transition duration-300 hover:-translate-y-1 hover:border-brand">
              <v.icon className="text-brand" size={26} aria-hidden />
              <h3 className="mt-5 text-lg font-bold tracking-tight">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-black/60">{v.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
