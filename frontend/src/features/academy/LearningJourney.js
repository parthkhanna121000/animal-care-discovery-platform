"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { journeyStages } from "@/data/academy";

const LABEL = "text-xs font-semibold uppercase tracking-[0.18em] text-violet";

function StageDetail({ stage }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div>
        <h4 className={LABEL}>What you will do</h4>
        <p className="mt-2 text-sm text-graphite/80">{stage.doing}</p>
      </div>
      <div>
        <h4 className={LABEL}>Skills you will develop</h4>
        <ul className="mt-2 flex flex-wrap gap-2">
          {stage.skills.map((s) => (
            <li key={s} className="rounded-full bg-mist px-3 py-1 text-xs font-medium text-violet">
              {s}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className={LABEL}>What you will create</h4>
        <p className="mt-2 text-sm text-graphite/80">{stage.output}</p>
      </div>
    </div>
  );
}

export default function LearningJourney() {
  const [active, setActive] = useState(0);
  const last = journeyStages.length - 1;
  const stage = journeyStages[active];

  return (
    <section id="journey" className="scroll-mt-4 bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet">
          Learning journey
        </p>
        <h2 className="mt-3 max-w-3xl font-heading text-3xl font-extrabold tracking-tight text-graphite md:text-5xl">
          Explore, learn, experiment, build, showcase.
        </h2>
        <p className="mt-4 max-w-2xl text-graphite/70">
          Select a stage to see what you would do, the skills you would develop and what
          you would create.
        </p>

        {/* Desktop: connected horizontal timeline */}
        <div className="relative mt-14 hidden md:block">
          <div aria-hidden="true" className="absolute left-[10%] right-[10%] top-6 h-0.5 bg-graphite/15" />
          <div
            aria-hidden="true"
            className="absolute left-[10%] top-6 h-0.5 bg-violet transition-[width] duration-300 ease-out"
            style={{ width: `${(active / last) * 80}%` }}
          />
          <ol className="relative grid grid-cols-5">
            {journeyStages.map((s, i) => (
              <li key={s.id} className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={i === active ? "step" : undefined}
                  className="group flex flex-col items-center gap-3 rounded-xl px-2 pb-2 text-center"
                >
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-full border-2 font-heading text-sm font-extrabold transition duration-200 motion-safe:group-hover:scale-110 ${
                      i <= active
                        ? "border-violet bg-violet text-white"
                        : "border-graphite/20 bg-paper text-graphite/60 group-hover:border-violet"
                    }`}
                  >
                    {`0${i + 1}`}
                  </span>
                  <span
                    className={`text-sm font-semibold ${i === active ? "text-violet" : "text-graphite/70"}`}
                  >
                    {s.title}
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <div
            aria-live="polite"
            className="mt-10 rounded-3xl border border-violet/15 bg-white p-8"
          >
            <div key={stage.id} className="academy-rise">
              <StageDetail stage={stage} />
            </div>
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <ol className="mt-10 md:hidden">
          {journeyStages.map((s, i) => {
            const open = i === active;
            return (
              <li
                key={s.id}
                className={`relative border-l-2 pb-6 pl-7 last:border-transparent last:pb-0 ${
                  i < active ? "border-violet" : "border-graphite/15"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute -left-[17px] top-0 grid h-8 w-8 place-items-center rounded-full border-2 font-heading text-xs font-extrabold transition duration-200 ${
                    i <= active
                      ? "border-violet bg-violet text-white"
                      : "border-graphite/20 bg-paper text-graphite/60"
                  }`}
                >
                  {`0${i + 1}`}
                </span>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-expanded={open}
                  className={`flex min-h-8 w-full items-center text-left font-heading text-lg font-extrabold ${
                    open ? "text-violet" : "text-graphite"
                  }`}
                >
                  {s.title}
                </button>
                {open ? (
                  <div className="academy-rise mt-4 rounded-2xl border border-violet/15 bg-white p-5">
                    <StageDetail stage={s} />
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>

        <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-graphite/15 pt-8">
          <a
            href="#path-finder"
            className="inline-flex items-center gap-2 rounded-full bg-violet px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-graphite"
          >
            Find Your Learning Path <ArrowRight size={16} aria-hidden="true" />
          </a>
          <p className="text-xs text-graphite/60">
            Illustrative structure, not a confirmed curriculum.
          </p>
        </div>
      </div>
    </section>
  );
}