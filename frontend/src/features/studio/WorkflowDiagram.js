import { ArrowDown } from "lucide-react";

const STEPS = [
  {
    title: "User brief",
    detail: "The founder enters the idea, audience, platform, objective, tone and slide count.",
    tool: "Studio form",
    out: "Brief fields (JSON)",
  },
  {
    title: "Gemini research",
    detail: "A search-grounded Gemini call gathers facts and source links. Points without a source are labelled unverified.",
    tool: "Gemini with search grounding, called from the Next.js API route",
    out: "Research notes and source links",
  },
  {
    title: "Gemini content generation",
    detail: "A second Gemini call writes the story arc, headlines, short copy, visual directions, caption and CTA to a fixed schema. The API route validates every field.",
    tool: "Gemini, called from the Next.js API route",
    out: "Structured carousel JSON",
  },
  {
    title: "Carousel Studio design and preview",
    detail: "The browser applies themes, layouts, typography and spacing and draws every slide.",
    tool: "Carousel Studio",
    out: "Editable slides",
  },
  {
    title: "Founder review and editing",
    detail: "The founder edits copy, layout and theme, then confirms the review.",
    tool: "Carousel Studio editor",
    out: "Approved carousel",
  },
  {
    title: "Export final carousel",
    detail: "PNG images, a PDF and the caption are produced in the browser from the approved slides.",
    tool: "Carousel Studio export",
    out: "PNG files, PDF, caption text",
  },
];

export default function WorkflowDiagram() {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <ol className="space-y-0">
        {STEPS.map((s, i) => (
          <li key={s.title}>
            <div className="flex gap-4 rounded-2xl border border-[#E1E0DB] bg-white p-5">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#171C2B] text-sm font-bold text-white"
              >
                {i + 1}
              </span>
              <div className="min-w-0">
                <h4 className="font-heading text-base font-extrabold">{s.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-[#777A83]">{s.detail}</p>
                <p className="mt-3 text-xs text-[#777A83]">
                  <span className="font-semibold text-[#171C2B]">Tool:</span> {s.tool}
                </p>
                <p className="mt-1 text-xs text-[#777A83]">
                  <span className="font-semibold text-[#171C2B]">Passes on:</span> {s.out}
                </p>
              </div>
            </div>
            {i < STEPS.length - 1 && (
              <div className="flex justify-center py-2 text-[#40598D]" aria-hidden="true">
                <ArrowDown size={18} />
              </div>
            )}
          </li>
        ))}
      </ol>

      <div className="space-y-4 lg:pt-2">
        <div className="rounded-2xl border border-dashed border-[#40598D] bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#40598D]">Optional, not integrated</p>
          <h4 className="mt-2 font-heading text-base font-extrabold">Canva refinement</h4>
          <p className="mt-1 text-sm leading-relaxed text-[#777A83]">
            After step 6, upload the exported PNG or PDF files to Canva by hand to add brand kits, photos or custom
            illustration. There is no Canva connection in this prototype.
          </p>
        </div>
        <div className="rounded-2xl border border-dashed border-[#40598D] bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#40598D]">Future, not implemented</p>
          <h4 className="mt-2 font-heading text-base font-extrabold">n8n automation</h4>
          <p className="mt-1 text-sm leading-relaxed text-[#777A83]">
            An n8n workflow could trigger steps 1 to 3 from a webhook or schedule, route the JSON to a reviewer, and
            send approved files onward. It would call the same API route used today.
          </p>
        </div>
      </div>
    </div>
  );
}