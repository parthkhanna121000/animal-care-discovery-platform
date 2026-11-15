import { Clock, Layers, Check } from "lucide-react";
import { programmes, DEMO_NOTE } from "@/data/academy";

export default function ProgrammeCards() {
  return (
    <section id="programmes" className="bg-mist scroll-mt-4">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet">
          Programmes
        </p>
        <h2 className="mt-3 max-w-2xl font-heading text-3xl font-extrabold tracking-tight text-graphite md:text-4xl">
          Three paths, one progression.
        </h2>
        <p className="mt-3 max-w-2xl rounded-lg border border-violet/20 bg-white/60 px-4 py-3 text-sm text-graphite/70">
          {DEMO_NOTE}
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {programmes.map((p) => (
            <article
              key={p.id}
              className="flex flex-col rounded-2xl border border-violet/15 bg-white p-6 transition duration-200 motion-safe:hover:-translate-y-1 hover:border-violet"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-violet">
                  {p.level}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-graphite/50">
                  Placeholder
                </span>
              </div>
              <h3 className="mt-5 font-heading text-xl font-extrabold text-graphite">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-graphite/70">{p.summary}</p>

              <dl className="mt-5 space-y-2 text-sm text-graphite/80">
                <div className="flex items-start gap-2">
                  <Layers size={16} className="mt-0.5 shrink-0 text-violet" aria-hidden="true" />
                  <div>
                    <dt className="sr-only">Format</dt>
                    <dd>{p.format}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock size={16} className="mt-0.5 shrink-0 text-violet" aria-hidden="true" />
                  <div>
                    <dt className="sr-only">Duration</dt>
                    <dd>{p.duration}</dd>
                  </div>
                </div>
              </dl>

              <ul className="mt-5 space-y-2 border-t border-violet/15 pt-5 text-sm text-graphite/80">
                {p.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2">
                    <Check size={16} className="mt-0.5 shrink-0 text-violet" aria-hidden="true" />
                    {o}
                  </li>
                ))}
              </ul>

              <a
                href="#enquire"
                className="mt-6 inline-flex justify-center rounded-full bg-graphite px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-violet focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
              >
                Ask about this programme
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}