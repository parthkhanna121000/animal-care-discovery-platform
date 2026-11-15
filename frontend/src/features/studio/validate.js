import { LAYOUTS, OBJECTIVES, PLATFORMS, SLIDE_COUNTS, TONES } from "./constants";

const LAYOUT_IDS = LAYOUTS.map((l) => l.id);

function stripControl(s) {
  let out = "";
  for (const ch of s) {
    const c = ch.charCodeAt(0);
    if (c === 10 || c === 9 || (c >= 32 && c !== 127)) out += ch;
  }
  return out;
}

function oneLine(v, max) {
  return typeof v === "string" ? stripControl(v).replace(/\s+/g, " ").trim().slice(0, max) : "";
}

function multiLine(v, max) {
  return typeof v === "string" ? stripControl(v).replace(/\n{3,}/g, "\n\n").trim().slice(0, max) : "";
}

export function validateBrief(input) {
  const b = input && typeof input === "object" ? input : {};
  const topic = oneLine(b.topic, 600);
  if (topic.length < 8) return { ok: false, error: "Please describe your idea in at least a short sentence." };
  if (!PLATFORMS.includes(b.platform)) return { ok: false, error: "Choose Instagram or LinkedIn." };
  if (!OBJECTIVES.includes(b.objective)) return { ok: false, error: "Choose an objective." };
  if (!TONES.includes(b.tone)) return { ok: false, error: "Choose a tone." };
  const slideCount = Number(b.slideCount);
  if (!SLIDE_COUNTS.includes(slideCount)) return { ok: false, error: "Choose 5, 7 or 10 slides." };
  return {
    ok: true,
    brief: {
      topic,
      platform: b.platform,
      audience: oneLine(b.audience, 200) || "Startup founders and small business owners",
      objective: b.objective,
      tone: b.tone,
      slideCount,
      instructions: oneLine(b.instructions, 600),
    },
  };
}

function safeUrl(u) {
  try {
    const url = new URL(u);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

// Turns the model output into a safe, predictable object. Throws a readable error if it is unusable.
export function validateCarousel(raw, brief, research) {
  if (!raw || typeof raw !== "object") throw new Error("Gemini returned an unexpected response. Please try again.");
  const list = Array.isArray(raw.slides) ? raw.slides : [];
  if (list.length < brief.slideCount) {
    throw new Error(`Gemini returned ${list.length} slides instead of ${brief.slideCount}. Please try again.`);
  }

  const slides = list.slice(0, brief.slideCount).map((item, i) => {
    const s = item && typeof item === "object" ? item : {};
    const headline = oneLine(s.headline, 90);
    const body = oneLine(s.body, 260);
    if (!headline || !body) throw new Error(`Slide ${i + 1} was missing a headline or body copy. Please try again.`);
    return {
      number: i + 1,
      purpose: oneLine(s.purpose, 36) || `Slide ${i + 1}`,
      headline,
      body,
      visualDirection: oneLine(s.visualDirection, 300),
      layout: LAYOUT_IDS.includes(s.layout) ? s.layout : "editorial",
    };
  });

  const sources = (research.sources || [])
    .map((s) => ({ title: oneLine(s.title, 120), url: safeUrl(s.url) }))
    .filter((s) => s.url)
    .map((s) => ({ title: s.title || s.url, url: s.url }));
  const grounded = sources.length > 0;

  const insights = (Array.isArray(raw.researchInsights) ? raw.researchInsights : [])
    .slice(0, 6)
    .map((r) => ({
      insight: oneLine(r && r.insight, 240),
      status: grounded && r && r.status === "supported" ? "supported" : "unverified",
    }))
    .filter((r) => r.insight);

  return {
    origin: "gemini",
    title: oneLine(raw.title, 120) || brief.topic.slice(0, 80),
    audience: oneLine(raw.audience, 160) || brief.audience,
    platform: brief.platform,
    objective: brief.objective,
    tone: brief.tone,
    researchNote: grounded
      ? "Research used Gemini with Google Search grounding. Source links come from the search results. Check each claim before publishing."
      : "The research step was unavailable for this run, so every insight is unverified. Check claims before publishing.",
    researchInsights: insights,
    sources,
    slides,
    caption: multiLine(raw.caption, 1500),
    cta: oneLine(raw.cta, 200),
  };
}