import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AcademyHero() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-16 md:pb-24 md:pt-24">
        <p className="academy-rise text-xs font-semibold uppercase tracking-[0.2em] text-violet">
          AI Education · Prototype
        </p>
        <h1 className="academy-rise mt-5 max-w-4xl font-heading text-5xl font-extrabold leading-[1.02] tracking-tight text-graphite md:text-7xl">
          Learn AI by <span className="text-violet">using it</span>, not just
          reading about it.
        </h1>
        <p className="academy-rise mt-6 max-w-2xl text-base text-graphite/70 md:text-lg">
          A concept for practical, project-led AI learning. Three illustrative
          programmes show how the page would work once the real offering is
          defined.
        </p>
        <div className="academy-rise mt-9 flex flex-wrap items-center gap-4">
          <Link
            href="#programmes"
            className="inline-flex items-center gap-2 rounded-full bg-violet px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
          >
            Explore programmes <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link
            href="#enquire"
            className="rounded-full border border-graphite/20 px-6 py-3 text-sm font-semibold text-graphite transition-colors duration-150 hover:border-violet hover:text-violet focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
          >
            Send an enquiry
          </Link>
        </div>
      </div>
    </section>
  );
}