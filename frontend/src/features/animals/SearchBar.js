"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Search } from "lucide-react";
import { categories } from "@/data/categories";

export default function SearchBar() {
  const router = useRouter();
  const formRef = useRef(null);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  // Suggestions are the six real categories, shown while the location field is empty.
  const showPanel = open && location.trim() === "";

  // Close the panel when clicking outside the search bar
  useEffect(() => {
    function onDown(e) {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setOpen(false);
        setActive(-1);
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  function goTo(cat, loc) {
    const params = new URLSearchParams();
    if (loc.trim()) params.set("location", loc.trim());
    if (cat) params.set("category", cat);
    router.push(`/search?${params.toString()}`);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setOpen(false);
    goTo(category, location);
  }

  function choose(c) {
    setCategory(c.slug);
    setOpen(false);
    setActive(-1);
    goTo(c.slug, "");
  }

  function handleKeyDown(e) {
    const n = categories.length;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => (i + 1) % n);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => (i <= 0 ? n - 1 : i - 1));
    } else if (e.key === "Enter" && showPanel && active >= 0) {
      e.preventDefault();
      choose(categories[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
      setActive(-1);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      role="search"
      className="relative flex flex-col gap-2 rounded-2xl border border-line bg-white p-2 shadow-sm transition duration-200 focus-within:border-green focus-within:shadow-md focus-within:ring-4 focus-within:ring-green/15 sm:flex-row sm:items-center"
    >
      <label className="pin-field flex flex-1 items-center gap-2 px-3 py-2">
        <MapPin size={18} className="pin-icon text-green" aria-hidden />
        <span className="sr-only">Location</span>
        <input
          type="text"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls="service-suggestions"
          aria-autocomplete="list"
          aria-activedescendant={
            showPanel && active >= 0 ? `suggestion-${categories[active].slug}` : undefined
          }
          autoComplete="off"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            setOpen(e.target.value.trim() === "");
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
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
        className="flex items-center justify-center gap-2 rounded-xl bg-forest px-6 py-3 text-sm font-semibold text-white transition duration-150 hover:bg-green active:scale-95"
      >
        <Search size={16} />
        Search
      </button>

      {showPanel && (
        <div className="animate-pop-in absolute left-0 right-0 top-full z-30 mt-2 rounded-2xl border border-line bg-white p-2 shadow-lg">
          <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-muted">
            Browse by service
          </p>
          <ul id="service-suggestions" role="listbox" aria-label="Browse by service">
            {categories.map((c, i) => {
              const Icon = c.icon;
              return (
                <li
                  key={c.slug}
                  id={`suggestion-${c.slug}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => choose(c)}
                  onMouseEnter={() => setActive(i)}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-150 ${
                    i === active ? "bg-sage text-forest" : "hover:bg-sage/60"
                  }`}
                >
                  <Icon size={18} className="text-green" aria-hidden />
                  {c.title}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </form>
  );
}