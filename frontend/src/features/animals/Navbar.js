"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PawPrint, Menu, X } from "lucide-react";

const links = [
  { label: "Find Care", href: "/search" },
  { label: "Explore Services", href: "/animals#services" },
  { label: "For Providers", href: "/animals#providers" },
  { label: "About", href: "/animals#about" },
];

// Only real pages can be "active". Anchor links (/animals#services) stay neutral.
function isActive(href, pathname) {
  if (href === "/search") return pathname.startsWith("/search") || pathname.startsWith("/provider");
  return false;
}

export default function Navbar() {
  const pathname = usePathname();
  // menu: "closed" | "open" | "closing" (closing keeps it mounted for the exit animation)
  const [menu, setMenu] = useState("closed");
  const timer = useRef(null);

  const closeMenu = useCallback(() => {
    setMenu((m) => (m === "open" ? "closing" : m));
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMenu("closed"), 160);
  }, []);

  function toggleMenu() {
    if (menu === "open") {
      closeMenu();
    } else {
      clearTimeout(timer.current);
      setMenu("open");
    }
  }

  useEffect(() => () => clearTimeout(timer.current), []);

  // Escape closes the mobile menu
  useEffect(() => {
    if (menu !== "open") return;
    function onKey(e) {
      if (e.key === "Escape") closeMenu();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menu, closeMenu]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ivory/90 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5"
      >
        <Link href="/animals" className="group flex items-center gap-2 font-heading text-lg font-extrabold text-forest">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-forest text-white transition duration-200 motion-safe:group-hover:-rotate-6 motion-safe:group-hover:scale-110">
            <PawPrint size={18} />
          </span>
          Practo for Animals
        </Link>

        <ul className="hidden items-center gap-8 text-sm font-medium md:flex">
          {links.map((l) => {
            const active = isActive(l.href, pathname);
            return (
              <li key={l.label}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-1 transition-colors duration-150 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:bg-forest after:transition-transform after:duration-200 hover:text-forest hover:after:scale-x-100 ${
                    active ? "text-forest after:scale-x-100" : "text-muted after:scale-x-0"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <Link
            href="/search"
            className="rounded-full bg-forest px-5 py-2 text-sm font-semibold text-white transition duration-150 hover:bg-green active:scale-95"
          >
            Find a Vet
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-forest transition duration-150 active:scale-90 md:hidden"
          aria-label={menu === "open" ? "Close menu" : "Open menu"}
          aria-expanded={menu === "open"}
          aria-controls="mobile-menu"
          onClick={toggleMenu}
        >
          {menu === "open" ? <X /> : <Menu />}
        </button>
      </nav>

      {menu !== "closed" && (
        <div
          id="mobile-menu"
          className={`border-t border-line bg-ivory px-5 pb-5 md:hidden ${
            menu === "open" ? "menu-in" : "menu-out"
          }`}
        >
          <ul className="flex flex-col py-2">
            {links.map((l) => {
              const active = isActive(l.href, pathname);
              return (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    onClick={closeMenu}
                    aria-current={active ? "page" : undefined}
                    className={`block py-3 text-sm font-medium transition-colors duration-150 ${
                      active ? "text-forest" : "text-ink hover:text-green"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href="/search"
            onClick={closeMenu}
            className="block rounded-full bg-forest py-3 text-center text-sm font-semibold text-white transition duration-150 active:scale-95"
          >
            Find a Vet
          </Link>
        </div>
      )}
    </header>
  );
}