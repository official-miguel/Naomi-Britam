import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms & Conditions", alternates: { canonical: "/terms" } };

export default function Terms() {
  return (
    <section className="pb-24 pt-32 sm:pt-40">
      <div className="container-page max-w-3xl [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_p]:mt-3 text-black/75 leading-relaxed">
        <h1 className="text-4xl font-bold tracking-tightest text-black sm:text-5xl">Terms &amp; Conditions</h1>
        <p className="mt-4 rounded-xl border border-dashed border-black/25 p-3 text-sm">Draft template. Have it reviewed by a qualified professional before launch.</p>
        <h2>Nature of this website</h2>
        <p>This is the personal website of {site.name}, an Executive Financial Advisor offering Britam products and services. It is not the official website of Britam Holdings Plc or any Britam company. Britam names and logos are trademarks of their respective owner.</p>
        <h2>Information only</h2>
        <p>Content is general information, not a policy document or a contract of insurance. Benefits, exclusions, limits and premiums are determined by Britam and set out in its policy wording and quotations.</p>
        <h2>Forms do not create cover</h2>
        <p>Submitting a quotation or consultation request does not constitute an application that has been accepted, and does not give you insurance cover. Cover starts only when Britam accepts your application, confirms the premium and issues your policy. This website does not process premium payments.</p>
        <h2>Accuracy of your information</h2>
        <p>You are responsible for giving accurate and complete information. Incorrect or missing information may affect a quotation, a policy or a claim.</p>
        <h2>Third-party links</h2>
        <p>Links to Britam or other websites are provided for convenience. Their terms and privacy practices apply there.</p>
        <h2>Contact</h2>
        <p>Questions? Email {site.email}.</p>
      </div>
    </section>
  );
}
