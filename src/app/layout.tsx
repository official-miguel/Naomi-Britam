import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Preloader } from "@/components/Preloader";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const title = `${site.name} | Executive Financial Advisor, Britam, ${site.location.split(",")[0]}`;
const description = `${site.name} is an Executive Financial Advisor at Britam in ${site.location}, serving clients across Kenya. Get personal guidance and a quotation for life, medical, motor, education, retirement, investment and business cover.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}, Britam Financial Advisor` },
  description,
  keywords: [
    "Britam", "Britam Kenya", "Britam insurance agent", "Britam insurance advisor", "Britam financial advisor", "Executive Financial Advisor Britam", site.name,
    `Britam agent ${site.location.split(",")[0]}`, "motor insurance Kenya", "medical insurance Kenya", "life insurance Kenya", "insurance quotation Kenya",
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_KE", url: site.url, siteName: site.name, title, description },
  twitter: { card: "summary_large_image", title, description },
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
        name: site.name,
        jobTitle: site.title,
        url: site.url,
        worksFor: { "@type": "Organization", name: "Britam" },
        address: { "@type": "PostalAddress", addressLocality: site.location.split(",")[0], addressCountry: "KE" },
      },
      {
        "@type": "InsuranceAgency",
        "@id": `${site.url}/#agency`,
        name: `${site.name}, Britam Executive Financial Advisor`,
        url: site.url,
        telephone: site.phone,
        email: site.email,
        areaServed: { "@type": "Country", name: "Kenya" },
        address: { "@type": "PostalAddress", addressLocality: site.location.split(",")[0], addressCountry: "KE" },
        founder: { "@id": `${site.url}/#person` },
      },
      { "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.name, inLanguage: "en-KE" },
    ],
  };
  return (
    <html lang="en-KE" className={inter.variable}>
      <body className="font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        <Preloader />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
