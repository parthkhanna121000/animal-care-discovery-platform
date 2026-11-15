import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Phone, Flag } from "lucide-react";
import Navbar from "@/features/animals/Navbar";
import Footer from "@/features/animals/Footer";
import { providers } from "@/data/providers";
import { categories } from "@/data/categories";

// Tells Next.js which provider ids exist, so the page can be prerendered
export function generateStaticParams() {
  return providers.map((p) => ({ id: p.id }));
}

export default async function ProviderPage({ params }) {
  const { id } = await params;
  const provider = providers.find((p) => p.id === id);
  if (!provider) notFound();
  const category = categories.find((c) => c.slug === provider.category);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-5 py-10">
        <Link href="/search" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-green hover:underline">
          <ArrowLeft size={16} /> Back to results
        </Link>

        <p className="text-xs font-semibold uppercase tracking-wider text-green">{category?.title}</p>
        <h1 className="mt-1 font-heading text-3xl font-extrabold tracking-tight text-forest">
          {provider.name}
        </h1>
        <p className="mt-3 flex items-start gap-1.5 text-muted">
          <MapPin size={16} className="mt-1 shrink-0" aria-hidden /> {provider.address}
        </p>
        <p className="mt-6 leading-relaxed">{provider.about}</p>

        <h2 className="mt-8 font-heading text-lg font-bold text-forest">Facilities</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {provider.facilities.map((f) => (
            <li key={f} className="rounded-full border border-line bg-white px-3 py-1 text-sm text-muted">{f}</li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`tel:${provider.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white hover:bg-green"
          >
            <Phone size={16} /> {provider.phone}
          </a>
          <Link
            href="/correction"
            className="flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-muted hover:border-forest hover:text-forest"
          >
            <Flag size={16} /> Submit a correction
          </Link>
        </div>

        <p className="mt-8 rounded-lg bg-sage px-4 py-2 text-xs text-forest">
          Demonstration listing. Not a verified real provider.
        </p>
      </main>
      <Footer />
    </>
  );
}