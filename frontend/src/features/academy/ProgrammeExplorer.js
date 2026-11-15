"use client";

import { useRef } from "react";
import { ArrowRight, Check, Clock, Layers } from "lucide-react";
import { programmes, DEMO_NOTE } from "@/data/academy";
import { useAcademy } from "./AcademyContext";

const TONES = {
  foundations: {
    tab: "bg-lilac text-graphite",
    chip: "bg-graphite/10 text-graphite",
    numeral: "text-graphite/30",
    badge: "bg-graphite text-white",
  },
  practitioner: {
    tab: "bg-violet text-white",
    chip: "bg-white/15 text-white",
    numeral: "text-white/30",
    badge: "bg-white text-violet",
  },
  builder: {
    tab: "bg-graphite text-white",
    chip: "bg-white/10 text-white",
    numeral: "text-lilac/60",
    badge: "bg-lilac text-graphite",
  },
};

const LABEL = "text-xs font-semibold uppercase tracking-[0.18em] text-violet";

export default function ProgrammeExplorer() {
  const { selectedId, recommendedId, chooseProgramme } = useAcademy();
  const tabRefs = useRef([]);
  const selected = programmes.find((p) => p.id === selectedId) ?? programmes[0];

  function onKeyDown(e) {
    const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const i = programmes.findIndex((p) => p.id === selectedId);
    let n = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") n = (i + 1) % programmes.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = (i - 1 + programmes.length) % programmes.length;
    else if (e.key === "Home") n = 0;
    else n = programmes.length - 1;
    chooseProgramme(programmes[n].id);
    tabRefs.current[n]?.focus();
  }

  return (
    <section id="programmes" className="scroll-mt-4 bg-mist">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <p className={LABEL}>Programmes</p>
        <h2 className="mt-3 max-w-2xl font-heading text-3xl font-extrabold tracking-tight text-graphite md:text-5xl">
          Three paths, one progression.
        </h2>
        <p className="mt-4 max-w-2xl rounded-lg border border-violet/20 bg-white/60 px-4 py-3 text-sm text-graphite/70">
          {DEMO_NOTE}
        </p>

        <div
          role="tablist"
          aria-label="Programmes"
          onKeyDown={onKeyDown}
          className="mt-10 grid gap-4 md:grid-cols-3"
        >
          {programmes.map((p, i) => {
            const tone = TONES[p.id];
            const isSel = p.id === selected.id;
            const isRec = p.id === recommendedId;
            return (
              <button
                key={p.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${p.id}`}
                aria-selected={isSel}
                aria-controls="programme-panel"
                tabIndex={isSel ? 0 : -1}
                onClick={() => chooseProgramme(p.id, "mobile")}
                className={`flex min-h-[220px] flex-col rounded-2xl p-5 text-left transition duration-200 ${tone.tab} ${
                  isSel
                    ? "shadow-xl shadow-violet/25 ring-2 ring-graphite ring-offset-2 ring-offset-mist"
                    : "motion-safe:hover:-translate-y-1"
                }`}
              >
                <span className="flex items-start justify-between gap-3">
                  <span className={`font-heading text-6xl font-extrabold leading-none ${tone.numeral}`}>
                    {p.number}
                  </span>
                  <span className="flex flex-col items-end gap-1.5">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tone.chip}`}>
                      {p.level}
                    </span>
                    {isRec ? (
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tone.badge}`}>
                        Recommended for you
                      </span>
                    ) : null}
                  </span>
                </span>
                <span className="mt-5 font-heading text-xl font-extrabold">{p.title}</span>
                <span className="mt-2 text-sm opacity-90">{p.summary}</span>
                <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold">
                  Explore Programme <ArrowRight size={16} aria-hidden="true" />
                </span>
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id="programme-panel"
          aria-labelledby={`tab-${selected.id}`}
          className="mt-6 scroll-mt-4"
        >
          <div
            key={selected.id}
            className="academy-rise rounded-3xl border border-violet/15 bg-white p-6 md:p-8"
          >
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className={LABEL}>
                  {selected.number} / {selected.level}
                </p>
                <h3 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-graphite">
                  {selected.title}
                </h3>
                <p className="mt-3 text-graphite/70">{selected.summary}</p>
                <dl className="mt-5 space-y-2 text-sm text-graphite/80">
                  <div className="flex items-start gap-2">
                    <Layers size={16} className="mt-0.5 shrink-0 text-violet" aria-hidden="true" />
                    <div>
                      <dt className="sr-only">Format</dt>
                      <dd>{selected.format}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock size={16} className="mt-0.5 shrink-0 text-violet" aria-hidden="true" />
                    <div>
                      <dt className="sr-only">Duration</dt>
                      <dd>{selected.duration}</dd>
                    </div>
                  </div>
                </dl>
              </div>

              <div className="lg:col-span-4">
                <h4 className={LABEL}>Skills covered</h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {selected.skills.map((s) => (
                    <li key={s} className="rounded-full bg-mist px-3 py-1 text-xs font-medium text-violet">
                      {s}
                    </li>
                  ))}
                </ul>
                <h4 className={`${LABEL} mt-6`}>Learning outcomes</h4>
                <ul className="mt-3 space-y-2 text-sm text-graphite/80">
                  {selected.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2">
                      <Check size={16} className="mt-0.5 shrink-0 text-violet" aria-hidden="true" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-mist p-5 lg:col-span-3">
                <h4 className={LABEL}>Practical project example</h4>
                <p className="mt-3 text-sm text-graphite/80">{selected.project}</p>
                <a
                  href="#enquire"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-violet px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-graphite"
                >
                  Enquire About This Programme
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}