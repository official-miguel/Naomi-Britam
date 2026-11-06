import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Solutions } from "@/components/Solutions";
import { WhyMe } from "@/components/WhyMe";
import { HowItWorks } from "@/components/HowItWorks";
import { Reviews } from "@/components/Reviews";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { faqs } from "@/lib/site";

// Re-check for new reviews every 5 minutes (new reviews also refresh instantly via revalidateTag).
export const revalidate = 300;

export default function Home() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Hero />
      <About />
      <Solutions />
      <WhyMe />
      <HowItWorks />
      <Reviews />
      <FAQ />
      <Contact />
    </>
  );
}
