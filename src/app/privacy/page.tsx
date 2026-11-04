import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };

export default function Privacy() {
  return (
    <section className="pb-24 pt-32 sm:pt-40">
      <div className="container-page max-w-3xl [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_li]:mt-1.5 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 text-black/75 leading-relaxed">
        <h1 className="text-4xl font-bold tracking-tightest text-black sm:text-5xl">Privacy Policy</h1>
        <p className="mt-4 rounded-xl border border-dashed border-black/25 p-3 text-sm">Draft template. Have it reviewed against the Kenya Data Protection Act, 2019 and Britam&apos;s requirements before launch.</p>
        <h2>Who we are</h2>
        <p>This website is operated by {site.name}, an Executive Financial Advisor at Britam, based in {site.location}. Contact: {site.email}.</p>
        <h2>What we collect</h2>
        <ul>
          <li>Details you submit in forms: name, phone number, email, and information about the cover you are interested in.</li>
          <li>Basic technical data your browser sends when you visit the site.</li>
        </ul>
        <h2>How we use it</h2>
        <ul>
          <li>To respond to consultation and quotation requests.</li>
          <li>To request quotations and arrange applications with Britam on your behalf, where you ask us to.</li>
          <li>To comply with legal and regulatory obligations.</li>
        </ul>
        <p>We do not sell your personal data. We do not collect payment details on this website.</p>
        <h2>Sharing</h2>
        <p>Information may be shared with Britam and its authorised service providers where needed to process your request, and with service providers who help operate this website.</p>
        <h2>Your rights</h2>
        <p>Under the Data Protection Act, 2019 you may ask to access, correct or delete your personal data, or object to its processing, by contacting {site.email}.</p>
        <h2>Retention and security</h2>
        <p>We keep information only as long as needed for the purposes above and take reasonable steps to protect it.</p>
      </div>
    </section>
  );
}
