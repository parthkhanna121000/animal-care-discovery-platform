import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { providers } from "@/data/providers";
import ProviderCard from "./ProviderCard";

const featuredIds = ["p2", "p1", "p3"];

export default function FeaturedProviders() {
  const featured = featuredIds.map((id) => providers.find((p) => p.id === id));

  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div className="max-w-xl">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-forest">
            Featured providers
          </h2>
          <p className="mt-3 text-muted">
            A preview of what listings look like. Sample data only.
          </p>
        </div>
        <Link
          href="/search"
          className="hidden items-center gap-1.5 text-sm font-semibold text-green hover:underline sm:flex"
        >
          See all <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {featured.map((p) => (
          <ProviderCard key={p.id} provider={p} />
        ))}
      </div>

      <p className="mt-5 rounded-lg bg-sage px-4 py-2 text-xs text-forest">
        Demonstration data: these providers, ratings and phone numbers are
        fictional and not verified listings.
      </p>
    </section>
  );
}