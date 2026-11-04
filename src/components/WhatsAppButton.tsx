"use client";
import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { site, waLink } from "@/lib/site";
import { products } from "@/lib/products";

export function WhatsAppButton() {
  const path = usePathname();
  const slug = path?.startsWith("/insurance/") ? path.split("/")[2] : undefined;
  const p = products.find((x) => x.slug === slug);
  const msg = p
    ? `Hello ${site.firstName}, I'm interested in ${p.name} through Britam. Could you help me?`
    : `Hello ${site.firstName}, I found your website and would like help with Britam insurance.`;
  return (
    <a
      href={waLink(msg)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-20 right-5 z-40 flex items-center gap-2 rounded-full bg-brand px-4 py-3.5 text-white shadow-[0_10px_30px_rgba(0,0,255,0.35)] transition hover:bg-black sm:px-5"
    >
      <MessageCircle size={22} aria-hidden />
      <span className="hidden text-sm font-semibold sm:inline">WhatsApp me</span>
    </a>
  );
}
