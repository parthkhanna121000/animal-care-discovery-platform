"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function StudioHeader({ onHome, onCreate, onSample }) {
  return (
    <header className="border-b border-[#E1E0DB] bg-[#F5F3ED]/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4">
        <button type="button" onClick={onHome} className="flex items-center gap-2.5" aria-label="Carousel Studio home">
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#171C2B] font-heading text-sm font-extrabold text-[#D9DFF0]"
          >
            C
          </span>
          <span className="font-heading text-base font-extrabold tracking-tight">Carousel Studio</span>
        </button>
        <nav className="flex items-center gap-2 text-sm font-medium sm:gap-4" aria-label="Studio">
          <Link href="/" className="hidden items-center gap-1.5 text-[#777A83] hover:text-[#171C2B] sm:inline-flex">
            <ArrowLeft size={14} aria-hidden="true" /> Assignment overview
          </Link>
          <button type="button" onClick={onSample} className="text-[#777A83] hover:text-[#171C2B]">
            Sample
          </button>
          <button
            type="button"
            onClick={onCreate}
            className="rounded-full bg-[#171C2B] px-4 py-2 text-white transition hover:bg-[#40598D]"
          >
            Create
          </button>
        </nav>
      </div>
    </header>
  );
}