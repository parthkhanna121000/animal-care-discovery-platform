"use client";

import { ArrowRight, Download, FileText, PenLine, Sparkles } from "lucide-react";
import SlideCanvas from "./SlideCanvas";
import WorkflowDiagram from "./WorkflowDiagram";
import { SAMPLE_CAROUSEL } from "@/data/studio-sample";
import { btnPrimary, btnSecondary } from "./ui";

const STAGES = [
  { icon: FileText, title: "Brief", text: "Share your idea, audience, platform, objective, tone and slide count." },
  { icon: Sparkles, title: "Generate", text: "Gemini researches, structures the story and writes slide copy, visual directions and a caption." },
  { icon: PenLine, title: "Design and edit", text: "Themes and layouts are applied for you. Edit any headline or line of copy and watch the preview update." },
  { icon: Download, title: "Review and export", text: "Approve the carousel, copy the caption and download PNG images or a PDF." },
];

const TOOLS = [
  {
    name: "Google Gemini",
    status: "Built",
    purpose: "Understands the brief, develops the idea, structures the slides and writes headlines, body copy, visual directions, caption and CTA.",
    flow: "Receives the brief and research notes. Returns structured JSON.",
  },
  {
    name: "Gemini search grounding",
    status: "Built",
    purpose: "Research pass that gathers supporting points and source links before writing. Anything without a source is labelled unverified.",
    flow: "Runs first when a key is configured. If it fails, generation continues and every insight is marked unverified.",
  },
  {
    name: "Next.js API route",
    status: "Built",
    purpose: "Keeps the API key on the server, calls Gemini, validates the response and sends clean JSON to the studio.",
    flow: "Browser to /api/studio/generate, to Gemini and back.",
  },
  {
    name: "Carousel Studio editor",
    status: "Built",
    purpose: "Applies themes, layouts, typography and spacing, then lets the founder edit and approve each slide.",
    flow: "Reads the validated JSON and draws every slide on a canvas.",
  },
  {
    name: "PNG, PDF and caption export",
    status: "Built",
    purpose: "Turns approved slides into publish-ready files in the browser, with no extra services.",
    flow: "Uses the same renderer as the preview, so exports match what you see.",
  },
  {
    name: "Canva",
    status: "Optional",
    purpose: "Optional refinement for brand kits, stock photos or custom illustration.",
    flow: "Not integrated. Upload the exported PNG or PDF files to Canva manually.",
  },
  {
    name: "n8n",
    status: "Future",
    purpose: "Would orchestrate research, generation, review and delivery through webhooks and connected services.",
    flow: "Not implemented. It could call the same API route and send approved files onward.",
  },
];

const BADGE = {
  Built: "bg-[#D9DFF0] text-[#171C2B]",
  Optional: "border border-dashed border-[#40598D] text-[#40598D]",
  Future: "border border-dashed border-[#40598D] text-[#40598D]",
};

export default function Landing({ fonts, onCreate, onSample }) {
  const slides = SAMPLE_CAROUSEL.slides;
  return (
    <main>
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-14 md:pt-20 lg:grid-cols-2">
        <div className="animate-fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#40598D]">Carousel Studio</p>
          <h1 className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Bring your idea. Leave with a publish-ready carousel.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#777A83]">
            Carousel Studio turns a raw idea into a structured, designed and editable Instagram or LinkedIn carousel,
            so founders can publish without an in-house designer.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={onCreate} className={btnPrimary}>
              Create a Carousel <ArrowRight size={16} aria-hidden="true" />
            </button>
            <button type="button" onClick={onSample} className={btnSecondary}>
              Explore Sample Carousel
            </button>
          </div>
        </div>

        <div className="animate-fade-up mx-auto flex w-full max-w-md items-start gap-4" style={{ animationDelay: "120ms" }}>
          <div className="w-1/2 overflow-hidden rounded-2xl shadow-xl shadow-[#171C2B]/15">
            <SlideCanvas slide={slides[0]} themeId="midnight" index={0} total={slides.length} scale={0.5} fonts={fonts} label="Sample slide 1" className="block aspect-[4/5] w-full" />
          </div>
          <div className="mt-10 w-1/2 overflow-hidden rounded-2xl border border-[#E1E0DB] shadow-xl shadow-[#171C2B]/10">
            <SlideCanvas slide={slides[1]} themeId="ivory" index={1} total={slides.length} scale={0.5} fonts={fonts} label="Sample slide 2" className="block aspect-[4/5] w-full" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16" aria-labelledby="stages-heading">
        <h2 id="stages-heading" className="font-heading text-2xl font-extrabold tracking-tight md:text-3xl">
          Four stages from idea to carousel
        </h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-[#E1E0DB] bg-white p-5">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D9DFF0] text-[#171C2B]">
                  <s.icon size={18} aria-hidden="true" />
                </span>
                <span className="text-xs font-semibold text-[#777A83]">0{i + 1}</span>
              </div>
              <h3 className="mt-4 font-heading text-lg font-extrabold">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#777A83]">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="workflow" className="border-t border-[#E1E0DB] bg-white" aria-labelledby="workflow-heading">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#40598D]">AI tools and automation</p>
          <h2 id="workflow-heading" className="mt-3 max-w-3xl font-heading text-3xl font-extrabold tracking-tight md:text-4xl">
            A simple, repeatable workflow from raw idea to reviewed carousel
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-[#777A83]">
            Gemini does the research and writing through a server-side Next.js API route that returns structured JSON.
            The studio then designs, previews and exports it. Items marked Built are implemented in this prototype.
            Canva and n8n are proposed extensions and are not connected.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((t) => (
              <article key={t.name} className="rounded-2xl border border-[#E1E0DB] bg-[#F5F3ED] p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-heading text-base font-extrabold">{t.name}</h3>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${BADGE[t.status]}`}>
                    {t.status}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#171C2B]/80">{t.purpose}</p>
                <p className="mt-3 text-xs leading-relaxed text-[#777A83]">{t.flow}</p>
              </article>
            ))}
          </div>

          <h3 className="mt-16 font-heading text-2xl font-extrabold tracking-tight">How information moves</h3>
          <div className="mt-6">
            <WorkflowDiagram />
          </div>

          <div className="mt-12 rounded-2xl bg-[#171C2B] p-6 text-[#F5F3ED] md:p-8">
            <h3 className="font-heading text-xl font-extrabold">Repeating it for the next carousel</h3>
            <ol className="mt-4 grid gap-4 text-sm leading-relaxed text-[#D9DFF0] md:grid-cols-3">
              <li>1. Change the brief: a new idea, audience, platform or tone. Nothing else needs to change.</li>
              <li>2. Generate, then review. Every carousel uses the same JSON structure, so the same editor and export work each time.</li>
              <li>3. Export and publish. Later, an n8n webhook could trigger the same API route on a schedule.</li>
            </ol>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={onCreate} className="inline-flex items-center gap-2 rounded-full bg-[#F5F3ED] px-6 py-3 text-sm font-semibold text-[#171C2B] transition hover:bg-[#D9DFF0]">
                Create a Carousel <ArrowRight size={16} aria-hidden="true" />
              </button>
              <button type="button" onClick={onSample} className="inline-flex items-center gap-2 rounded-full border border-[#D9DFF0]/40 px-6 py-3 text-sm font-semibold text-[#F5F3ED] transition hover:border-[#D9DFF0]">
                Explore Sample Carousel
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}