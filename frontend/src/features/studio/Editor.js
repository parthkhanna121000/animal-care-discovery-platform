"use client";

import { useState } from "react";
import { ArrowLeft, Check, ChevronLeft, ChevronRight, Copy, Download } from "lucide-react";
import SlideCanvas from "./SlideCanvas";
import { LAYOUTS, THEMES } from "./constants";
import { btnSmall, card, field, label } from "./ui";
import { copyText, exportAllPng, exportPdf, exportSlidePng } from "./exporters";

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
        active
          ? "border-[#171C2B] bg-[#171C2B] text-white"
          : "border-[#E1E0DB] bg-white text-[#171C2B] hover:border-[#40598D]"
      }`}
    >
      {children}
    </button>
  );
}

export default function Editor({ carousel, fonts, onBack, onUpdateSlide, onUpdateCarousel }) {
  const [index, setIndex] = useState(0);
  const [themeId, setThemeId] = useState("midnight");
  const [showAll, setShowAll] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const [busy, setBusy] = useState("");
  const [notice, setNotice] = useState(null);

  const slides = carousel.slides;
  const total = slides.length;
  const slide = slides[index];
  const isSample = carousel.origin === "sample";

  const editSlide = (patch) => {
    setReviewed(false);
    onUpdateSlide(index, patch);
  };
  const editCarousel = (patch) => {
    setReviewed(false);
    onUpdateCarousel(patch);
  };
  const step = (d) => setIndex((i) => Math.min(total - 1, Math.max(0, i + d)));

  async function run(kind) {
    setBusy(kind);
    setNotice(null);
    try {
      if (kind === "png") await exportSlidePng(carousel, index, themeId, fonts);
      if (kind === "all") await exportAllPng(carousel, themeId, fonts);
      if (kind === "pdf") await exportPdf(carousel, themeId, fonts);
      setNotice({ type: "ok", text: "Export complete. Check your downloads folder." });
    } catch (e) {
      setNotice({ type: "error", text: `Export failed: ${e && e.message ? e.message : "unknown error"}` });
    } finally {
      setBusy("");
    }
  }

  async function copyCaption() {
    setNotice(null);
    try {
      await copyText(carousel.caption);
      setNotice({ type: "ok", text: "Caption copied." });
    } catch {
      setNotice({ type: "error", text: "Copy was blocked. Select the caption text and copy it manually." });
    }
  }

  const exportDisabled = !reviewed || !fonts || Boolean(busy);

  return (
    <main className="mx-auto max-w-7xl px-5 py-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 text-sm font-medium text-[#777A83] hover:text-[#171C2B]">
            <ArrowLeft size={16} aria-hidden="true" /> Back to workspace
          </button>
          <h1 className="mt-2 font-heading text-2xl font-extrabold tracking-tight md:text-3xl">{carousel.title}</h1>
          <p className="mt-1 text-sm text-[#777A83]">
            {carousel.platform} - {carousel.objective} - {carousel.audience}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isSample && (
            <span className="rounded-full bg-[#D9DFF0] px-3 py-1 text-xs font-semibold">Sample, no API call</span>
          )}
          <button type="button" onClick={() => setShowAll((v) => !v)} className={btnSmall}>
            {showAll ? "Back to editor" : "Review all slides"}
          </button>
        </div>
      </div>

      {showAll ? (
        <section aria-label="All slides">
          <p className="mb-4 text-sm text-[#777A83]">Select a slide to edit it.</p>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {slides.map((s, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => {
                    setIndex(i);
                    setShowAll(false);
                  }}
                  className="block w-full overflow-hidden rounded-xl border border-[#E1E0DB] text-left transition hover:border-[#40598D]"
                  aria-label={`Edit slide ${i + 1}: ${s.headline}`}
                >
                  <SlideCanvas slide={s} themeId={themeId} index={i} total={total} scale={0.4} fonts={fonts} label={`Slide ${i + 1}: ${s.headline}`} className="block aspect-[4/5] w-full" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[88px_minmax(0,1fr)_380px]">
          <ol className="order-2 flex gap-2 overflow-x-auto pb-2 lg:order-1 lg:max-h-[640px] lg:flex-col lg:overflow-x-hidden lg:overflow-y-auto lg:pb-0" aria-label="Slides">
            {slides.map((s, i) => (
              <li key={i} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index}
                  className={`block w-16 overflow-hidden rounded-lg border-2 lg:w-full ${
                    i === index ? "border-[#40598D]" : "border-transparent hover:border-[#D9DFF0]"
                  }`}
                >
                  <SlideCanvas slide={s} themeId={themeId} index={i} total={total} scale={0.15} fonts={fonts} label={`Slide ${i + 1} thumbnail`} className="block aspect-[4/5] w-full" />
                </button>
              </li>
            ))}
          </ol>

          <section className="order-1 lg:order-2" aria-label="Slide preview">
            <div className="mx-auto w-full max-w-[480px]">
              <div className="overflow-hidden rounded-2xl border border-[#E1E0DB] shadow-lg shadow-[#171C2B]/10">
                <SlideCanvas slide={slide} themeId={themeId} index={index} total={total} scale={0.75} fonts={fonts} label={`Slide ${index + 1} of ${total}: ${slide.headline}`} className="block aspect-[4/5] w-full" />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <button type="button" onClick={() => step(-1)} disabled={index === 0} className={btnSmall} aria-label="Previous slide">
                  <ChevronLeft size={16} aria-hidden="true" /> Previous
                </button>
                <p className="text-sm font-medium text-[#777A83]" aria-live="polite">
                  Slide {index + 1} of {total}
                </p>
                <button type="button" onClick={() => step(1)} disabled={index === total - 1} className={btnSmall} aria-label="Next slide">
                  Next <ChevronRight size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
          </section>

          <aside className="order-3 space-y-4">
            <div className={card}>
              <h2 className="font-heading text-lg font-extrabold">Edit slide {index + 1}</h2>
              <p className="mt-1 text-xs text-[#777A83]">Purpose: {slide.purpose}</p>
              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="headline" className={label}>Headline</label>
                  <input id="headline" maxLength={90} value={slide.headline} onChange={(e) => editSlide({ headline: e.target.value })} className={field} />
                </div>
                <div>
                  <label htmlFor="body" className={label}>Body</label>
                  <textarea id="body" rows={4} maxLength={260} value={slide.body} onChange={(e) => editSlide({ body: e.target.value })} className={field} />
                </div>
                <div>
                  <p className={label}>Slide layout</p>
                  <div className="flex flex-wrap gap-2">
                    {LAYOUTS.map((l) => (
                      <Chip key={l.id} active={slide.layout === l.id} onClick={() => editSlide({ layout: l.id })}>
                        {l.label}
                      </Chip>
                    ))}
                  </div>
                </div>
                <div>
                  <p className={label}>Visual direction</p>
                  <p className="rounded-xl bg-[#F5F3ED] p-3 text-sm leading-relaxed text-[#171C2B]/80">
                    {slide.visualDirection || "No visual direction provided."}
                  </p>
                  <p className="mt-1 text-xs text-[#777A83]">Guidance for adding imagery or refining in Canva. It is not drawn on the slide.</p>
                </div>
              </div>
            </div>

            <div className={card}>
              <p className={label}>Theme (all slides)</p>
              <div className="flex flex-wrap gap-2">
                {THEMES.map((t) => (
                  <Chip key={t.id} active={themeId === t.id} onClick={() => setThemeId(t.id)}>
                    {t.label}
                  </Chip>
                ))}
              </div>
            </div>

            <div className={card}>
              <h2 className="font-heading text-lg font-extrabold">Caption and CTA</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="caption" className={label}>Caption</label>
                  <textarea id="caption" rows={7} maxLength={1500} value={carousel.caption} onChange={(e) => editCarousel({ caption: e.target.value })} className={field} />
                  <button type="button" onClick={copyCaption} className={`${btnSmall} mt-2`}>
                    <Copy size={14} aria-hidden="true" /> Copy caption
                  </button>
                </div>
                <div>
                  <label htmlFor="cta" className={label}>Final CTA</label>
                  <input id="cta" maxLength={200} value={carousel.cta} onChange={(e) => editCarousel({ cta: e.target.value })} className={field} />
                </div>
              </div>
            </div>

            <details className={card}>
              <summary className="cursor-pointer font-heading text-lg font-extrabold">Research and sources</summary>
              <p className="mt-3 text-sm leading-relaxed text-[#777A83]">{carousel.researchNote}</p>
              {carousel.researchInsights.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {carousel.researchInsights.map((r, i) => (
                    <li key={i} className="rounded-xl bg-[#F5F3ED] p-3 text-sm">
                      <span
                        className={`mr-2 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                          r.status === "supported" ? "bg-[#D9DFF0] text-[#171C2B]" : "bg-[#FFF4DD] text-[#7A5200]"
                        }`}
                      >
                        {r.status === "supported" ? "Search-backed" : "Unverified"}
                      </span>
                      {r.insight}
                    </li>
                  ))}
                </ul>
              )}
              {carousel.sources.length > 0 && (
                <ul className="mt-3 space-y-1 text-sm">
                  {carousel.sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-[#40598D] underline">
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </details>

            <div className={card}>
              <h2 className="font-heading text-lg font-extrabold">Review and export</h2>
              <label className="mt-3 flex cursor-pointer items-start gap-3 text-sm">
                <input type="checkbox" checked={reviewed} onChange={(e) => setReviewed(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[#171C2B]" />
                <span>I have reviewed every slide and the caption. Downloads unlock once this is ticked, and any later edit unticks it.</span>
              </label>
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" onClick={() => run("png")} disabled={exportDisabled} className={btnSmall}>
                  <Download size={14} aria-hidden="true" /> This slide (PNG)
                </button>
                <button type="button" onClick={() => run("all")} disabled={exportDisabled} className={btnSmall}>
                  <Download size={14} aria-hidden="true" /> All slides (PNG)
                </button>
                <button type="button" onClick={() => run("pdf")} disabled={exportDisabled} className={btnSmall}>
                  <Download size={14} aria-hidden="true" /> PDF
                </button>
              </div>
              <p className="mt-2 text-xs text-[#777A83]">Your browser may ask permission to download multiple files.</p>
              {busy && <p className="mt-2 text-sm text-[#777A83]" aria-live="polite">Preparing export...</p>}
              {notice && (
                <p role="status" className={`mt-2 flex items-center gap-1.5 text-sm font-medium ${notice.type === "ok" ? "text-[#40598D]" : "text-[#9B2C2C]"}`}>
                  {notice.type === "ok" && <Check size={14} aria-hidden="true" />}
                  {notice.text}
                </p>
              )}
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}