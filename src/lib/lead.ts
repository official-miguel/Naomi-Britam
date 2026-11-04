export type LeadPayload = {
  kind: "quote" | "consultation";
  name: string;
  phone: string;
  email?: string;
  product?: string;
  details?: Record<string, string>;
  message?: string;
  consent: boolean;
  website?: string; // honeypot
};

export const PHONE_RE = /^(?:\+?254|0)?[17]\d{8}$/;
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(v: { name?: string; phone?: string; email?: string }) {
  const e: Record<string, string> = {};
  if (!v.name || v.name.trim().length < 2) e.name = "Please enter your full name.";
  const phone = (v.phone ?? "").replace(/[\s-]/g, "");
  if (!PHONE_RE.test(phone)) e.phone = "Enter a valid Kenyan number, e.g. 0712 345 678.";
  if (v.email && !EMAIL_RE.test(v.email.trim())) e.email = "Enter a valid email address.";
  return e;
}

export type LeadResult = { ok: boolean; delivered: boolean; error?: string };

export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { ok: false, delivered: false, error: data.error ?? "Something went wrong. Please try again." };
    return { ok: true, delivered: !!data.delivered };
  } catch {
    return { ok: false, delivered: false, error: "Network problem. Check your connection and try again." };
  }
}
