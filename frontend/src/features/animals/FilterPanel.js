"use client";

import { categories } from "@/data/categories";
import { allFacilities } from "@/data/providers";

const fieldClass =
  "w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-green";

export default function FilterPanel({ filters, setFilters, onReset }) {
  function update(key, value) {
    setFilters((f) => ({ ...f, [key]: value }));
  }

  function toggleFacility(name) {
    setFilters((f) => ({
      ...f,
      facilities: f.facilities.includes(name)
        ? f.facilities.filter((x) => x !== name)
        : [...f.facilities, name],
    }));
  }

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="f-location" className="mb-1.5 block text-sm font-semibold">
          Location
        </label>
        <input
          id="f-location"
          type="text"
          value={filters.location}
          onChange={(e) => update("location", e.target.value)}
          placeholder="City or area"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="f-category" className="mb-1.5 block text-sm font-semibold">
          Service
        </label>
        <select
          id="f-category"
          value={filters.category}
          onChange={(e) => update("category", e.target.value)}
          className={fieldClass}
        >
          <option value="">All services</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="f-distance" className="mb-1.5 block text-sm font-semibold">
          Distance
        </label>
        <select
          id="f-distance"
          value={filters.distance}
          onChange={(e) => update("distance", e.target.value)}
          className={fieldClass}
        >
          <option value="">Any distance</option>
          <option value="2">Within 2 km</option>
          <option value="5">Within 5 km</option>
          <option value="10">Within 10 km</option>
          <option value="25">Within 25 km</option>
        </select>
      </div>

      <div>
        <label htmlFor="f-rating" className="mb-1.5 block text-sm font-semibold">
          Minimum rating
        </label>
        <select
          id="f-rating"
          value={filters.minRating}
          onChange={(e) => update("minRating", e.target.value)}
          className={fieldClass}
        >
          <option value="">Any rating</option>
          <option value="4">4.0 and above</option>
          <option value="4.5">4.5 and above</option>
        </select>
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold">
        <input
          type="checkbox"
          checked={filters.emergency}
          onChange={(e) => update("emergency", e.target.checked)}
          className="h-4 w-4 accent-[#287a5a]"
        />
        Emergency services only
      </label>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Facilities</legend>
        <div className="space-y-2">
          {allFacilities.map((f) => (
            <label key={f} className="flex cursor-pointer items-center gap-2 text-sm text-muted">
              <input
                type="checkbox"
                checked={filters.facilities.includes(f)}
                onChange={() => toggleFacility(f)}
                className="h-4 w-4 accent-[#287a5a]"
              />
              {f}
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="button"
        onClick={onReset}
        className="text-sm font-semibold text-green underline-offset-4 hover:underline"
      >
        Reset filters
      </button>
    </div>
  );
}