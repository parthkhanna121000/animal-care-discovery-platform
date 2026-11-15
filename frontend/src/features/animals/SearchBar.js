"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Search } from "lucide-react";
import { categories } from "@/data/categories";

export default function SearchBar() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location.trim()) params.set("location", location.trim());
    if (category) params.set("category", category);
    router.push(`/search?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="flex flex-col gap-2 rounded-2xl border border-line bg-white p-2 shadow-sm sm:flex-row sm:items-center"
    >
      <label className="flex flex-1 items-center gap-2 px-3 py-2">
        <MapPin size={18} className="text-green" aria-hidden />
        <span className="sr-only">Location</span>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City or area"
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
        />
      </label>

      <div className="hidden h-8 w-px bg-line sm:block" />

      <label className="flex flex-1 items-center px-3 py-2">
        <span className="sr-only">Service type</span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-transparent text-sm outline-none"
        >
          <option value="">All services</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.title}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-xl bg-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-green active:scale-95"
      >
        <Search size={16} />
        Search
      </button>
    </form>
  );
}