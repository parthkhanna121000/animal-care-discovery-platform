"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { quizQuestions } from "@/data/academy";
import { isComplete, recommend } from "./recommend";
import { useAcademy } from "./AcademyContext";
import PathResults from "./PathResults";

export default function LearningPathFinder() {
  const { setRecommendedId } = useAcademy();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [direction, setDirection] = useState("next");
  const headingRef = useRef(null);
  const mounted = useRef(false);

  const total = quizQuestions.length;
  const inQuiz = step < total;
  const question = inQuiz ? quizQuestions[step] : null;
  const selected = question ? answers[question.id] : undefined;
  const result = !inQuiz && isComplete(answers) ? recommend(answers) : null;

  // Move focus to the new question or results heading after the first render.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  const select = (value) => setAnswers((a) => ({ ...a, [question.id]: value }));

  const next = () => {
    if (!selected) return;
    setDirection("next");
    const nextStep = step + 1;
    setStep(nextStep);
    if (nextStep === total) setRecommendedId(recommend(answers).programme.id);
  };

  const back = () => {
    setDirection("back");
    setStep((s) => Math.max(0, s - 1));
  };

  const editAnswers = () => {
    setDirection("back");
    setRecommendedId(null);
    setStep(0);
  };

  const restart = () => {
    setDirection("back");
    setAnswers({});
    setRecommendedId(null);
    setStep(0);
  };

  return (
    <section
      id="path-finder"
      aria-labelledby="finder-heading"
      className="scroll-mt-4 bg-graphite text-white"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lilac">
          Learning path finder
        </p>
        <h2
          id="finder-heading"
          className="mt-3 max-w-3xl font-heading text-3xl font-extrabold tracking-tight md:text-5xl"
        >
          Three questions. One suggested starting point.
        </h2>
        <p className="mt-4 max-w-2xl text-white/70">
          Answer honestly and get a rule-based programme suggestion, a roadmap and a
          project idea. Nothing is stored or sent.
        </p>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-5 md:p-8">
          {inQuiz ? (
            <>
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-white/80" aria-live="polite">
                  Question {step + 1} of {total}
                </p>
              </div>
              <div
                className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"
                role="progressbar"
                aria-label="Quiz progress"
                aria-valuemin={1}
                aria-valuemax={total}
                aria-valuenow={step + 1}
              >
                <div
                  className="h-full rounded-full bg-lilac transition-[width] duration-300 ease-out"
                  style={{ width: `${((step + 1) / total) * 100}%` }}
                />
              </div>

              <div
                key={step}
                className={`mt-8 ${direction === "next" ? "finder-in-next" : "finder-in-back"}`}
              >
                <fieldset>
                  <legend
                    ref={headingRef}
                    tabIndex={-1}
                    className="mb-6 font-heading text-2xl font-extrabold tracking-tight md:text-4xl"
                  >
                    {question.prompt}
                  </legend>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {question.options.map((o) => {
                      const isSel = selected === o.value;
                      return (
                        <label key={o.value} className="relative block cursor-pointer">
                          <input
                            type="radio"
                            name={question.id}
                            value={o.value}
                            checked={isSel}
                            onChange={() => select(o.value)}
                            className="peer sr-only"
                          />
                          <span
                            className={`flex h-full flex-col rounded-2xl border p-5 transition duration-200 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lilac motion-safe:hover:-translate-y-0.5 ${
                              isSel
                                ? "border-lilac bg-violet text-white"
                                : "border-white/15 bg-white/5 text-white hover:border-white/40"
                            }`}
                          >
                            <span className="flex items-start justify-between gap-3">
                              <span className="font-heading text-lg font-extrabold">
                                {o.label}
                              </span>
                              <span
                                aria-hidden="true"
                                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition duration-200 ${
                                  isSel
                                    ? "border-white bg-white text-violet"
                                    : "border-white/30"
                                }`}
                              >
                                {isSel ? <Check size={14} /> : null}
                              </span>
                            </span>
                            <span
                              className={`mt-2 text-sm ${isSel ? "text-white/85" : "text-white/60"}`}
                            >
                              {o.detail}
                            </span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              </div>

              <div className="mt-8 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={back}
                  disabled={step === 0}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:border-white/50 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ArrowLeft size={16} aria-hidden="true" /> Back
                </button>
                <button
                  type="button"
                  onClick={next}
                  disabled={!selected}
                  className="inline-flex items-center gap-2 rounded-full bg-lilac px-6 py-2.5 text-sm font-semibold text-graphite transition-colors duration-150 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {step === total - 1 ? "See my learning path" : "Continue"}
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            </>
          ) : result ? (
            <PathResults
              result={result}
              answers={answers}
              headingRef={headingRef}
              onEdit={editAnswers}
              onRestart={restart}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}