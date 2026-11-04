/**
 * Single source of truth for agent-specific details.
 * Everything marked PLACEHOLDER must be replaced with real information
 * (or set via environment variables) before launch.
 */
export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://naomi-britam-advisor.vercel.app",
  name: "Naomi Kihuga",
  firstName: "Naomi",
  title: "Britam Insurance Advisor",
  location: "Nairobi, Kenya", // based in Nairobi, serves clients across Kenya
  serviceArea: "Serving clients across Kenya",
  /** Path inside /public. */
  photo: "/naomi.jpg" as string | null,
  /** International format, digits only. */
  whatsapp: "254729715201",
  phone: "+254729715201",
  phoneDisplay: "0729 715 201",
  email: "nkihuga@britam.com",
  /** Britam agent / licence number. PLACEHOLDER: add once available. */
  agentNumber: process.env.NEXT_PUBLIC_AGENT_NUMBER ?? "",
};

export const nav = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Insurance Solutions", href: "/#solutions" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
];

export function waLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Real testimonials only. Leave empty until the agent supplies genuine ones. */
export type Testimonial = { quote: string; name: string; context?: string };
export const testimonials: Testimonial[] = [];

/** Real figures only. Leave empty until verified numbers are provided. */
export const stats: { value: string; label: string }[] = [];

export const faqs = [
  {
    q: "How do I choose the right insurance policy?",
    a: "Start with what you want to protect (your car, your health, your family's income) and what you could not afford to lose. We will talk through your situation, compare the options Britam offers, and you decide. There is no pressure to buy.",
  },
  {
    q: "How do insurance quotations work?",
    a: "You share a few details about what you want to cover. Premiums are set by Britam based on its underwriting rules, so the final figure comes from Britam, not from this website. I will help you request and understand the quotation.",
  },
  {
    q: "How are premiums paid?",
    a: "Payment options depend on the product and are set by Britam. This website does not collect or process payments. I will guide you to Britam's authorised payment channels when you are ready.",
  },
  {
    q: "When do I get my policy documents?",
    a: "Cover starts only after Britam accepts your application and confirms the premium. Policy documents are issued by Britam. Submitting a form here does not mean you are covered.",
  },
  {
    q: "How do policy renewals work?",
    a: "Most policies run for a set period and must be renewed to stay in force. I can remind you ahead of time and help you review whether your cover still fits your needs.",
  },
  {
    q: "How do I make a claim?",
    a: "Claims are assessed and settled by Britam under your policy terms. Contact me as soon as something happens and I will help you understand the steps and the documents required, then guide you through submitting the claim.",
  },
  {
    q: "How can I get help from you directly?",
    a: "Call, WhatsApp or email me, or send a consultation request through the form below. I will respond as soon as I can during working hours.",
  },
];
