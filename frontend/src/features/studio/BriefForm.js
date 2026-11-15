"use client";

import { OBJECTIVES, PLATFORMS, SLIDE_COUNTS, TONES } from "./constants";
import { btnPrimary, btnSecondary, field, label } from "./ui";

function Pills({ name, legend, options, value, onChange, format = String }) {
  return (
    <fieldset>
      <legend className={label}>{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={o}
              checked={value === o}
              onChange={() => onChange(o)}
              className="peer sr-only"
            />
            <span className="inline-flex rounded-full border border-[#E1E0DB] bg-white px-4 py-2 text-sm font-medium text-[#171C2B] transition peer-checked:border-[#171C2B] peer-checked:bg-[#171C2B] peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#40598D]">
              {format(o)}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function BriefForm({ brief, onChange, onSubmit, onSample, loading, error }) {
  const set = (key) => (value) => onChange({ ...brief, [key]: value });

  return (
    <main className="mx-auto max-w-3xl px-5 py-12 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#40598D]">Step 1 of 4: Brief</p>
      <h1 className="mt-3 font-heading text-3xl font-extrabold tracking-tight md:text-4xl">Create a carousel</h1>
      <p className="mt-3 text-[#777A83]">
        Tell us about your idea. Sensible defaults are already set, so only the idea is required.
      </p>

      <form
        className="mt-8 space-y-7 rounded-2xl border border-[#E1E0DB] bg-white p-6 md:p-8"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div>
          <label htmlFor="topic" className={label}>Topic or raw idea</label>
          <textarea
            id="topic"
            required
            minLength={8}
            maxLength={600}
            rows={4}
            value={brief.topic}
            onChange={(e) => set("topic")(e.target.value)}
            placeholder="Example: why small bakeries should collect customer emails before they open a second location"
            className={field}
          />
          <p className="mt-1 text-right text-xs text-[#777A83]">{brief.topic.length} / 600</p>
        </div>

        <Pills name="platform" legend="Platform" options={PLATFORMS} value={brief.platform} onChange={set("platform")} />

        <div>
          <label htmlFor="audience" className={label}>Target audience</label>
          <input id="audience" maxLength={200} value={brief.audience} onChange={(e) => set("audience")(e.target.value)} className={field} />
        </div>

        <Pills name="objective" legend="Objective" options={OBJECTIVES} value={brief.objective} onChange={set("objective")} />
        <Pills name="tone" legend="Tone" options={TONES} value={brief.tone} onChange={set("tone")} />
        <Pills
          name="slideCount"
          legend="Slide count"
          options={SLIDE_COUNTS}
          value={brief.slideCount}
          onChange={set("slideCount")}
          format={(n) => `${n} slides`}
        />

        <div>
          <label htmlFor="instructions" className={label}>Additional instructions (optional)</label>
          <textarea
            id="instructions"
            maxLength={600}
            rows={2}
            value={brief.instructions}
            onChange={(e) => set("instructions")(e.target.value)}
            placeholder="Anything to include or avoid"
            className={field}
          />
        </div>

        {error && (
          <div role="alert" className="rounded-xl border border-[#E1E0DB] bg-[#F5F3ED] p-4 text-sm">
            <p className="font-semibold text-[#9B2C2C]">{error}</p>
            <button type="button" onClick={onSample} className="mt-2 font-semibold text-[#40598D] underline">
              Open the sample carousel instead
            </button>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" disabled={loading} className={btnPrimary}>
            {loading ? (
              <>
                <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Generating
              </>
            ) : (
              "Generate Carousel"
            )}
          </button>
          <button type="button" onClick={onSample} disabled={loading} className={btnSecondary}>
            Explore Sample Carousel
          </button>
        </div>
        {loading && (
          <p className="text-sm text-[#777A83]" aria-live="polite">
            Gemini is researching and writing. This can take up to a minute.
          </p>
        )}
      </form>
    </main>
  );
}