import { NextResponse } from "next/server";
import { validateContact, type LeadPayload } from "@/lib/lead";

export const runtime = "nodejs";

const clean = (s: unknown, max = 500) => (typeof s === "string" ? s.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Partial<LeadPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: pretend success for bots, deliver nothing.
  if (body.website) return NextResponse.json({ ok: true, delivered: true });

  const errors = validateContact(body);
  if (Object.keys(errors).length) return NextResponse.json({ error: Object.values(errors)[0], errors }, { status: 422 });
  if (!body.consent) return NextResponse.json({ error: "Consent is required to process your request." }, { status: 422 });

  const lead = {
    kind: body.kind === "quote" ? "quote" : "consultation",
    name: clean(body.name, 120),
    phone: clean(body.phone, 20),
    email: clean(body.email, 160),
    product: clean(body.product, 80),
    message: clean(body.message, 2000),
    details: Object.fromEntries(
      Object.entries(body.details ?? {})
        .slice(0, 20)
        .map(([k, v]) => [clean(k, 40), clean(v, 300)]),
    ),
    receivedAt: new Date().toISOString(),
  };

  /**
   * Delivery: set LEAD_WEBHOOK_URL (Zapier, Make, Slack-compatible, Google Apps Script,
   * your own CRM endpoint, etc.). Without it nothing is stored or sent, and the UI tells
   * the visitor honestly to complete the request by WhatsApp/phone instead.
   */
  const hook = process.env.LEAD_WEBHOOK_URL;
  if (!hook) {
    console.warn("[lead] LEAD_WEBHOOK_URL not configured; lead not delivered.");
    return NextResponse.json({ ok: true, delivered: false });
  }
  try {
    const r = await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) });
    if (!r.ok) throw new Error(`webhook ${r.status}`);
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[lead] delivery failed", err);
    return NextResponse.json({ ok: true, delivered: false });
  }
}
