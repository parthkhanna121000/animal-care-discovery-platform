"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, SearchX } from "lucide-react";
import { providers } from "@/data/providers";
import FilterPanel from "./FilterPanel";
import ProviderCard from "./ProviderCard";

const emptyFilters = {
  location: "",
  category: "",
  distance: "",
  minRating: "",
  emergency: false,
  facilities: [],
};

export default function SearchResults() {
  const params = useSearchParams();
  const [filters, setFilters] = useState({
    ...emptyFilters,
    location: params.get("location") ?? "",
    category: params.get("category") ?? "",
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const results = useMemo(() => {
    const loc = filters.location.trim().toLowerCase();
    return providers
      .filter((p) => {
        if (loc && !`${p.area} ${p.city} ${p.address}`.toLowerCase().includes(loc)) return false;
        if (filters.category && p.category !== filters.category) return false;
        if (filters.distance && p.distanceKm > Number(filters.distance)) return false;
        if (filters.minRating && (p.rating ?? 0) < Number(filters.minRating)) return false;
        if (filters.emergency && !p.emergency) return false;
        if (!filters.facilities.every((f) => p.facilities.includes(f))) return false;
        return true;
      })
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }, [filters]);

  const reset = () => setFilters(emptyFilters);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-forest">
            Find animal care
          </h1>
          <p className="mt-1 text-sm text-muted" aria-live="polite">
            {results.length} {results.length === 1 ? "provider" : "providers"} found
          </p>
        </div>
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 rounded-full border border-forest px-4 py-2 text-sm font-semibold text-forest lg:hidden"
        >
          <SlidersHorizontal size={16} /> Filters
        </button>
      </div>

      <p className="mb-6 rounded-lg bg-sage px-4 py-2 text-xs text-forest">
        Demonstration data: providers, ratings, distances and phone numbers are
        fictional and not verified listings.
      </p>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block" aria-label="Filters">
          <FilterPanel filters={filters} setFilters={setFilters} onReset={reset} />
        </aside>

        <section aria-label="Search results">
          {results.length === 0 ? (
            <div className="grid place-items-center rounded-2xl border border-dashed border-line bg-white px-6 py-16 text-center">
              <SearchX size={32} className="text-muted" aria-hidden />
              <h2 className="mt-3 font-heading text-lg font-bold text-forest">
                No providers match your filters
              </h2>
              <p className="mt-1 text-sm text-muted">Try widening the distance or removing a filter.</p>
              <button
                type="button"
                onClick={reset}
                className="mt-5 rounded-full bg-forest px-5 py-2 text-sm font-semibold text-white hover:bg-green"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {results.map((p) => (
                <ProviderCard key={p.id} provider={p} />
              ))}
            </div>
          )}
        </section>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setDrawerOpen(false)} />
          <div className="absolute inset-y-0 right-0 flex w-[85%] max-w-sm flex-col bg-ivory">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="font-heading font-bold text-forest">Filters</h2>
              <button type="button" aria-label="Close filters" onClick={() => setDrawerOpen(false)}>
                <X />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <FilterPanel filters={filters} setFilters={setFilters} onReset={reset} />
            </div>
            <div className="border-t border-line p-4">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="w-full rounded-full bg-forest py-3 text-sm font-semibold text-white"
              >
                Show {results.length} {results.length === 1 ? "result" : "results"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}