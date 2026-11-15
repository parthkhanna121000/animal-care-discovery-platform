"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { providers } from "@/data/providers";
import { categories } from "@/data/categories";
import FilterPanel from "./FilterPanel";
import ProviderCard from "./ProviderCard";
import EmptySearchState from "./EmptySearchState";
import { ProviderSkeletonList } from "./ProviderCardSkeleton";

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
  // Demo-only: /search?preview=skeleton shows the loading skeleton so it can be reviewed.
  const previewSkeleton = params.get("preview") === "skeleton";

  const [filters, setFilters] = useState({
    ...emptyFilters,
    location: params.get("location") ?? "",
    category: params.get("category") ?? "",
  });

  // drawer: "closed" | "open" | "closing" (closing keeps it mounted for the exit animation)
  const [drawer, setDrawer] = useState("closed");
  const closeTimer = useRef(null);
  const filterBtnRef = useRef(null);
  const closeBtnRef = useRef(null);
  const panelRef = useRef(null);

  const openDrawer = () => {
    clearTimeout(closeTimer.current);
    setDrawer("open");
  };

  const closeDrawer = useCallback(() => {
    setDrawer("closing");
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setDrawer("closed");
      filterBtnRef.current?.focus();
    }, 220);
  }, []);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  // While open: lock background scroll, focus the close button, Escape closes, Tab stays inside
  useEffect(() => {
    if (drawer !== "open") return;
    closeBtnRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(e) {
      if (e.key === "Escape") {
        closeDrawer();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [drawer, closeDrawer]);

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
  const setFilter = (key, value) => setFilters((f) => ({ ...f, [key]: value }));

  // Removable chips, one per active filter
  const chips = [];
  if (filters.location.trim())
    chips.push({ key: "location", label: `Near ${filters.location.trim()}`, clear: () => setFilter("location", "") });
  if (filters.category)
    chips.push({
      key: "category",
      label: categories.find((c) => c.slug === filters.category)?.title ?? filters.category,
      clear: () => setFilter("category", ""),
    });
  if (filters.distance)
    chips.push({ key: "distance", label: `Within ${filters.distance} km`, clear: () => setFilter("distance", "") });
  if (filters.minRating)
    chips.push({ key: "rating", label: `${filters.minRating}+ rating`, clear: () => setFilter("minRating", "") });
  if (filters.emergency)
    chips.push({ key: "emergency", label: "Emergency only", clear: () => setFilter("emergency", false) });
  filters.facilities.forEach((f) =>
    chips.push({
      key: `fac-${f}`,
      label: f,
      clear: () => setFilter("facilities", filters.facilities.filter((x) => x !== f)),
    })
  );
  const activeCount = chips.length;

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
          ref={filterBtnRef}
          type="button"
          onClick={openDrawer}
          className="flex items-center gap-2 rounded-full border border-forest px-4 py-2 text-sm font-semibold text-forest transition duration-150 hover:bg-sage active:scale-95 lg:hidden"
        >
          <SlidersHorizontal size={16} /> Filters
          {activeCount > 0 && (
            <span
              key={activeCount}
              className="animate-badge grid h-5 min-w-5 place-items-center rounded-full bg-forest px-1 text-xs text-white"
            >
              {activeCount}
            </span>
          )}
        </button>
      </div>

      <p className="mb-6 rounded-lg bg-sage px-4 py-2 text-xs text-forest">
        Demonstration data: providers, ratings, distances and phone numbers are
        fictional and not verified listings.
      </p>

      {chips.length > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-2" aria-label="Active filters">
          {chips.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={c.clear}
              aria-label={`Remove filter: ${c.label}`}
              className="animate-pop-in inline-flex items-center gap-1 rounded-full bg-sage px-3 py-1 text-xs font-semibold text-forest transition duration-150 hover:bg-forest hover:text-white active:scale-95"
            >
              {c.label}
              <X size={12} aria-hidden />
            </button>
          ))}
          <button
            type="button"
            onClick={reset}
            className="px-2 text-xs font-semibold text-green underline-offset-4 hover:underline"
          >
            Clear all
          </button>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block" aria-label="Filters">
          <FilterPanel filters={filters} setFilters={setFilters} onReset={reset} />
        </aside>

        <section aria-label="Search results">
          {previewSkeleton ? (
            <>
              <p className="mb-4 text-xs text-muted">
                Skeleton preview mode (<code>?preview=skeleton</code>). Remove the parameter to see results.
              </p>
              <ProviderSkeletonList />
            </>
          ) : results.length === 0 ? (
            <EmptySearchState onClear={reset} />
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {results.map((p, i) => (
                <ProviderCard key={p.id} provider={p} index={i} />
              ))}
            </div>
          )}
        </section>
      </div>

      {drawer !== "closed" && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <div
            className={`absolute inset-0 bg-ink/40 ${
              drawer === "open" ? "drawer-overlay-in" : "drawer-overlay-out"
            }`}
            onClick={closeDrawer}
          />
          <div
            ref={panelRef}
            className={`absolute inset-y-0 right-0 flex w-[85%] max-w-sm flex-col bg-ivory ${
              drawer === "open" ? "drawer-panel-in" : "drawer-panel-out"
            }`}
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="font-heading font-bold text-forest">Filters</h2>
              <button ref={closeBtnRef} type="button" aria-label="Close filters" onClick={closeDrawer}>
                <X />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <FilterPanel filters={filters} setFilters={setFilters} onReset={reset} />
            </div>
            <div className="border-t border-line p-4">
              <button
                type="button"
                onClick={closeDrawer}
                className="w-full rounded-full bg-forest py-3 text-sm font-semibold text-white transition duration-150 active:scale-95"
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