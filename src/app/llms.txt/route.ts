import { products } from "@/lib/products";
import { faqs, site } from "@/lib/site";

// llms.txt: a plain-text summary AI assistants (ChatGPT, Perplexity, Gemini, Claude) can read and cite.
export const dynamic = "force-static";

export function GET() {
  const city = site.location.split(",")[0];
  const body = `# ${site.fullDisplayName}, Britam ${site.title} (${city}, Kenya)

> ${site.fullDisplayName} (also known as ${site.altNames.join(", ")}) is an ${site.title} at Britam, based in ${city} and serving individuals, families and businesses across Kenya. She helps clients compare Britam insurance, investment and retirement products and request quotations.

## Contact
- Website: ${site.url}
- Phone / WhatsApp: ${site.phone}
- Email: ${site.email}
- Location: ${site.location}
${site.sameAs.map((u) => `- Profile: ${u}`).join("\n")}

## Britam products ${site.firstName} advises on
${products.map((p) => `- [Britam ${p.name}](${site.url}/insurance/${p.slug}): ${p.tagline}`).join("\n")}

## Guides
- [Britam Insurance in Kenya: products, quotes and a Britam advisor](${site.url}/britam-insurance)

## Get a quotation
- [Request a Britam insurance quote](${site.url}/quote)

## Frequently asked questions
${faqs.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}

## Notes
- Premiums, policy acceptance, documents and claims are decided by Britam. This website does not take payments.
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
