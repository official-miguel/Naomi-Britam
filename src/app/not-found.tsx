import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center px-5 pt-28 text-center">
      <div>
        <p className="eyebrow justify-center">404</p>
        <h1 className="text-5xl font-bold tracking-tightest">Page not found.</h1>
        <p className="mt-4 text-black/60">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <Link href="/" className="btn btn-primary mt-8">Back to home</Link>
      </div>
    </section>
  );
}
