import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Preloader } from "@/components/Preloader";
import { PreloaderProvider } from "@/components/PreloaderProvider";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/lib/site";
import { products } from "@/lib/products";
import { sharePreview } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const title = `${site.fullDisplayName} | Britam Executive Financial Advisor, ${site.location.split(",")[0]}`;
const description = `${site.fullDisplayName} is an Executive Financial Advisor at Britam in ${site.location}, serving clients across Kenya. Get personal guidance and a quotation for life, medical, motor, education, retirement, investment and business cover.`;

// Link previews (WhatsApp, Facebook, LinkedIn, X, Telegram, iMessage) show ~2 lines, so keep these short.
// The preview image and tags come from sharePreview() in src/lib/seo.ts; every page must use it.
const shareTitle = `${site.fullDisplayName} · Britam Executive Financial Advisor`;
const shareDescription = `Honest advice and free Britam quotes for motor, medical, life, education and retirement cover. Based in ${site.location.split(",")[0]}, serving all of Kenya.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.fullDisplayName}, Britam Financial Advisor` },
  description,
  keywords: [
    "Britam", "Britam Kenya", "Britam insurance agent", "Britam insurance advisor", "Britam financial advisor", "Executive Financial Advisor Britam", site.fullDisplayName, ...site.altNames, ...site.altNames.map((n) => `${n} Britam`), "Naomi Britam",
    `Britam agent ${site.location.split(",")[0]}`, "motor insurance Kenya", "medical insurance Kenya", "life insurance Kenya", "insurance quotation Kenya",
  ],
  authors: [{ name: site.fullDisplayName }],
  alternates: { canonical: "/" },
  ...sharePreview({ title: shareTitle, description: shareDescription, path: "/" }),
  verification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION } : undefined,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

// colorScheme "only light" stops phones from auto-darkening the site in dark mode.
export const viewport: Viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1, colorScheme: "only light" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.fullDisplayName,
        givenName: "Naomi",
        additionalName: "Mugure",
        familyName: "Kihuga",
        alternateName: site.altNames,
        jobTitle: site.title,
        url: site.url,
        image: `${site.url}/naomi.jpg`,
        ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
        description: description,
        knowsAbout: ["Britam insurance", "Life insurance", "Medical insurance", "Motor insurance", "Education plans", "Retirement and pension planning", "Investments", "Business insurance", "Financial planning in Kenya"],
        email: site.email,
        telephone: site.phone,
        worksFor: { "@type": "Organization", name: "Britam", logo: `${site.url}/britam-logo-v2.png` },
        address: { "@type": "PostalAddress", addressLocality: site.location.split(",")[0], addressCountry: "KE" },
      },
      {
        "@type": "InsuranceAgency",
        "@id": `${site.url}/#agency`,
        name: `${site.name}, Britam Executive Financial Advisor`,
        url: site.url,
        image: [`${site.url}/naomi.jpg`, `${site.url}/britam-logo-v2.png`],
        logo: `${site.url}/britam-logo-v2.png`,
        telephone: site.phone,
        email: site.email,
        areaServed: { "@type": "Country", name: "Kenya" },
        address: { "@type": "PostalAddress", addressLocality: site.location.split(",")[0], addressCountry: "KE" },
        founder: { "@id": `${site.url}/#person` },
        description,
        priceRange: "Quotation-based",
        ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Britam insurance and investment solutions",
          itemListElement: products.map((p) => ({ "@type": "Offer", itemOffered: { "@id": `${site.url}/insurance/${p.slug}#service` } })),
        },
      },
      { "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.name, inLanguage: "en-KE" },
    ],
  };
  return (
    <html lang="en-KE" className={inter.variable}>
      <body className="font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        <PreloaderProvider>
        <Preloader />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
        </PreloaderProvider>
      </body>
    </html>
  );
}
