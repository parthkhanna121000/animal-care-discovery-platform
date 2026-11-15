import { ArrowRight, Check, Pencil, RotateCcw } from "lucide-react";
import { programmes, roadmapSteps } from "@/data/academy";
import { EXPERIENCE_STEPS, labelFor, projectFor } from "./recommend";
import { useAcademy } from "./AcademyContext";

const LABEL = "text-xs font-semibold uppercase tracking-[0.18em]";

export default function PathResults({ result, answers, headingRef, onEdit, onRestart }) {
  const { chooseProgramme } = useAcademy();
  const { programme, alternative, tied, reasons, scores } = result;
  const project = projectFor(answers.goal);
  const experience = EXPERIENCE_STEPS[answers.level] ?? 0;

  return (
    <div>
      <div className="academy-rise">
        <p className={`${LABEL} text-lilac`}>Your suggested path</p>
        <h3
          ref={headingRef}
          tabIndex={-1}
          className="mt-3 font-heading text-3xl font-extrabold tracking-tight md:text-5xl"
        >
          Start with {programme.title}.
        </h3>
        <p className="mt-3 max-w-2xl text-sm text-white/60">
          A rule-based suggestion from your three answers. No AI model is involved, and
          nothing is stored or sent.
        </p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-5">
        <article
          className="academy-rise rounded-3xl bg-violet p-6 text-white md:p-8 lg:col-span-3"
          style={{ animationDelay: "80ms" }}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-violet">
              {programme.level}
            </span>
            <span className="rounded-full border border-white/40 px-3 py-1 text-xs font-semibold">
              Recommended programme
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white/70">
              Placeholder
            </span>
          </div>
          <h4 className="mt-5 font-heading text-3xl font-extrabold">{programme.title}</h4>
          <p className="mt-2 text-white/85">{programme.summary}</p>

          <h5 className={`${LABEL} mt-6 text-white/70`}>Why it matches</h5>
          <ul className="mt-3 space-y-2 text-sm">
            {reasons.map((r) => (
              <li key={r} className="flex gap-2">
                <Check size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                {r}
              </li>
            ))}
          </ul>
          {tied ? (
            <p className="mt-3 text-sm text-white/80">
              Your answers pointed equally to two programmes, so the earlier, lower-level
              one is suggested first.
            </p>
          ) : null}

          <h5 className={`${LABEL} mt-6 text-white/70`}>Key learning outcomes</h5>
          <ul className="mt-3 space-y-2 text-sm">
            {programme.outcomes.map((o) => (
              <li key={o} className="flex gap-2">
                <Check size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                {o}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => chooseProgramme(programme.id, "always")}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-graphite transition-colors duration-150 hover:bg-lilac"
            >
              Explore Recommended Programme
              <ArrowRight size={16} aria-hidden="true" />
            </button>
            <a
              href="#enquire"
              className="inline-flex items-center rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-white/10"
            >
              Submit an Enquiry
            </a>
          </div>

          {alternative ? (
            <p className="mt-5 text-sm text-white/80">
              Also worth a look:{" "}
              <button
                type="button"
                onClick={() => chooseProgramme(alternative.id, "always")}
                className="font-semibold underline underline-offset-4"
              >
                {alternative.title}
              </button>
            </p>
          ) : null}
        </article>

        <aside
          className="academy-rise rounded-3xl bg-paper p-6 text-graphite md:p-8 lg:col-span-2"
          style={{ animationDelay: "160ms" }}
        >
          <h4 className={`${LABEL} text-violet`}>Your learning profile</h4>
          <dl className="mt-5 space-y-5">
            <div>
              <dt className={`${LABEL} text-graphite/60`}>Background</dt>
              <dd className="mt-1 font-heading text-xl font-extrabold">
                {labelFor("role", answers.role)}
              </dd>
            </div>
            <div>
              <dt className={`${LABEL} text-graphite/60`}>Experience</dt>
              <dd className="mt-1">
                <span className="font-heading text-xl font-extrabold">
                  {labelFor("level", answers.level)}
                </span>
                <span
                  className="mt-2 flex gap-1.5"
                  role="img"
                  aria-label={`Self-reported experience: ${experience} of 3`}
                >
                  {[1, 2, 3].map((n) => (
                    <span
                      key={n}
                      className={`h-2 flex-1 rounded-full ${n <= experience ? "bg-violet" : "bg-graphite/15"}`}
                    />
                  ))}
                </span>
              </dd>
            </div>
            <div>
              <dt className={`${LABEL} text-graphite/60`}>Goal</dt>
              <dd className="mt-1 font-heading text-xl font-extrabold">
                {labelFor("goal", answers.goal)}
              </dd>
            </div>
          </dl>

          <div className="mt-6 border-t border-graphite/15 pt-5">
            <p className={`${LABEL} text-graphite/60`}>Programme track</p>
            <ol className="mt-3 flex items-center">
              {programmes.map((p, i) => (
                <li
                  key={p.id}
                  className="flex flex-1 items-center last:flex-none"
                >
                  <span
                    className={`grid h-8 w-8 place-items-center rounded-full text-xs font-extrabold ${
                      p.id === programme.id
                        ? "bg-violet text-white"
                        : "border border-graphite/25 text-graphite/60"
                    }`}
                  >
                    {p.number}
                  </span>
                  {i < programmes.length - 1 ? (
                    <span aria-hidden="true" className="mx-2 h-px flex-1 bg-graphite/20" />
                  ) : null}
                </li>
              ))}
            </ol>
            <p className="mt-2 text-xs text-graphite/60">Highlighted: {programme.title}</p>
          </div>
          <p className="mt-5 text-xs text-graphite/60">
            Built only from your answers. No skills were tested or scored.
          </p>
        </aside>
      </div>

      <section
        aria-labelledby="roadmap-heading"
        className="academy-rise mt-5 rounded-3xl bg-paper p-6 text-graphite md:p-8"
        style={{ animationDelay: "240ms" }}
      >
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h4 id="roadmap-heading" className={`${LABEL} text-violet`}>
              Suggested learning roadmap
            </h4>
            <ol className="mt-5 grid gap-5 sm:grid-cols-2">
              {roadmapSteps.map((s, i) => (
                <li key={s.title} className="flex gap-3">
                  <span className="font-heading text-3xl font-extrabold text-lilac">
                    {`0${i + 1}`}
                  </span>
                  <div>
                    <p className="font-semibold">{s.title}</p>
                    <p className="mt-1 text-sm text-graphite/70">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          {project ? (
            <div className="rounded-2xl bg-mist p-5 lg:col-span-2">
              <h4 className={`${LABEL} text-violet`}>Suggested practical project</h4>
              <p className="mt-3 font-heading text-xl font-extrabold">{project.title}</p>
              <p className="mt-2 text-sm text-graphite/70">{project.text}</p>
              <p className="mt-3 text-xs text-graphite/60">
                An idea to aim for, not a confirmed course assignment.
              </p>
            </div>
          ) : null}
        </div>
      </section>

      <details className="mt-5 rounded-2xl border border-white/10 p-4 text-sm text-white/70">
        <summary className="cursor-pointer font-semibold text-white">
          How this was decided
        </summary>
        <p className="mt-3">
          Each answer adds fixed points to one programme. The highest total wins, and ties
          go to the lower-level programme.
        </p>
        <ul className="mt-3 space-y-1">
          {programmes.map((p) => (
            <li key={p.id} className="flex justify-between gap-4">
              <span>{p.title}</span>
              <span>{scores[p.id]} points</span>
            </li>
          ))}
        </ul>
      </details>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:border-white/60"
        >
          <Pencil size={14} aria-hidden="true" /> Edit my answers
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:border-white/60"
        >
          <RotateCcw size={14} aria-hidden="true" /> Retake quiz
        </button>
      </div>
    </div>
  );
}