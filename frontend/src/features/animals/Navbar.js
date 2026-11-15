"use client";

import { useState } from "react";
import Link from "next/link";
import { PawPrint, Menu, X } from "lucide-react";

const links = [
  { label: "Find Care", href: "/search" },
  { label: "Explore Services", href: "/#services" },
  { label: "For Providers", href: "/#providers" },
  { label: "About", href: "/#about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ivory/90 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5"
      >
        <Link href="/" className="flex items-center gap-2 font-heading text-lg font-extrabold text-forest">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-forest text-white">
            <PawPrint size={18} />
          </span>
          Practo for Animals
        </Link>

        <ul className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className="transition hover:text-forest">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link
            href="/search"
            className="rounded-full bg-forest px-5 py-2 text-sm font-semibold text-white transition hover:bg-green active:scale-95"
          >
            Find a Vet
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-forest md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-ivory px-5 pb-5 md:hidden">
          <ul className="flex flex-col py-2">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm font-medium text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/search"
            onClick={() => setOpen(false)}
            className="block rounded-full bg-forest py-3 text-center text-sm font-semibold text-white"
          >
            Find a Vet
          </Link>
        </div>
      )}
    </header>
  );
}