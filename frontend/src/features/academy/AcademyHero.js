import { ArrowRight } from "lucide-react";

function HeroGraphic() {
  return (
    <div aria-hidden="true" className="relative mx-auto h-[380px] w-full max-w-md md:h-[440px]">
      <div className="absolute inset-x-6 bottom-10 top-6 -rotate-[5deg] rounded-3xl bg-violet" />
      <div className="absolute inset-x-2 bottom-16 top-0 rotate-[2deg] rounded-3xl bg-lilac/60" />

      <div className="academy-rise absolute left-0 right-8 top-10 rounded-2xl border border-graphite/10 bg-white p-5 shadow-xl shadow-violet/20">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-graphite/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-graphite/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-graphite/15" />
        </div>
        <p className="mt-5 font-mono text-sm text-graphite">
          &gt; Summarise this report for my team
          <span className="academy-caret ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-violet" />
        </p>
        <div className="mt-4 space-y-2">
          <div className="h-2 w-full rounded-full bg-graphite/10" />
          <div className="h-2 w-5/6 rounded-full bg-graphite/10" />
          <div className="h-2 w-2/3 rounded-full bg-graphite/10" />
        </div>
      </div>

      <div
        className="academy-rise absolute bottom-6 left-6 right-0 rounded-2xl bg-graphite p-5 text-white shadow-xl"
        style={{ animationDelay: "120ms" }}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-lilac">
          Learn, experiment, build
        </p>
        <div className="mt-4 flex items-center">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs">Prompt</span>
          <span className="h-px flex-1 bg-white/30" />
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs">Workflow</span>
          <span className="h-px flex-1 bg-white/30" />
          <span className="rounded-full bg-violet px-3 py-1 text-xs">App</span>
        </div>
      </div>
    </div>
  );
}

export default function AcademyHero() {
  return (
    <section className="academy-grid relative overflow-hidden bg-paper">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-14 md:pb-28 md:pt-20 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p className="academy-rise flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet">
            <span className="h-2 w-2 rounded-full bg-violet" aria-hidden="true" />
            AI learning lab · Prototype
          </p>
          <h1
            className="academy-rise mt-5 font-heading text-5xl font-extrabold leading-[1.02] tracking-tight text-graphite md:text-7xl"
            style={{ animationDelay: "60ms" }}
          >
            Stop reading about AI. <span className="text-violet">Build with it.</span>
          </h1>
          <p
            className="academy-rise mt-6 max-w-xl text-base text-graphite/70 md:text-lg"
            style={{ animationDelay: "120ms" }}
          >
            A concept for practical AI learning for students and young professionals:
            answer three questions, get a suggested programme, then explore the path
            from first prompt to finished project.
          </p>
          <div
            className="academy-rise mt-9 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "180ms" }}
          >
            <a
              href="#path-finder"
              className="inline-flex items-center gap-2 rounded-full bg-violet px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-graphite"
            >
              Find My Learning Path <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a
              href="#programmes"
              className="rounded-full border border-graphite/20 px-7 py-3.5 text-sm font-semibold text-graphite transition-colors duration-150 hover:border-violet hover:text-violet"
            >
              Explore Programmes
            </a>
          </div>
          <p className="mt-6 text-xs text-graphite/60">
            Prototype: programmes, durations and projects are illustrative placeholders.
          </p>
        </div>
        <div className="lg:col-span-5">
          <HeroGraphic />
        </div>
      </div>
    </section>
  );
}