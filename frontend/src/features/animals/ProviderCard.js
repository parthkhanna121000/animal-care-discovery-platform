import Link from "next/link";
import { MapPin, Phone, Star, Siren } from "lucide-react";
import { categories } from "@/data/categories";

export default function ProviderCard({ provider, index = 0 }) {
  const category = categories.find((c) => c.slug === provider.category);

  return (
    <article
      style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
      className="animate-fade-up flex flex-col rounded-2xl border border-line bg-white p-5 transition duration-200 ease-out hover:border-green hover:shadow-md motion-safe:hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-green">
            {category?.title}
          </p>
          <h3 className="mt-1 font-heading text-lg font-bold text-forest">
            {provider.name}
          </h3>
        </div>
        <div className="flex shrink-0 items-center gap-1 rounded-full bg-sage px-2.5 py-1 text-sm font-semibold text-forest">
          <Star size={14} className="fill-amber text-amber" aria-hidden />
          {provider.rating ?? "New"}
        </div>
      </div>

      <p className="mt-3 flex items-start gap-1.5 text-sm text-muted">
        <MapPin size={15} className="mt-0.5 shrink-0" aria-hidden />
        {provider.address} · {provider.distanceKm} km
      </p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {provider.emergency && (
          <li className="flex items-center gap-1 rounded-full bg-amber/25 px-2.5 py-1 text-xs font-semibold text-ink">
            <Siren size={12} aria-hidden /> Emergency
          </li>
        )}
        {provider.facilities.map((f) => (
          <li key={f} className="rounded-full border border-line px-2.5 py-1 text-xs text-muted">
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex gap-2 pt-1">
        <Link
          href={`/provider/${provider.id}`}
          className="flex-1 rounded-full border border-forest px-4 py-2 text-center text-sm font-semibold text-forest transition duration-150 hover:bg-sage active:scale-95"
        >
          View details
        </Link>
        <a
          href={`tel:${provider.phone.replace(/\s/g, "")}`}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white transition duration-150 hover:bg-green active:scale-95"
        >
          <Phone size={14} aria-hidden /> Call
        </a>
      </div>
    </article>
  );
}