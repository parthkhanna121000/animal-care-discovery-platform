import { THEMES } from "./constants";

export const SLIDE_W = 1080;
export const SLIDE_H = 1350;
const PAD = 96;

const pad2 = (n) => String(n).padStart(2, "0");

// Reads the Manrope / Inter family names that next/font registered in layout.js.
export async function loadFonts() {
  const cs = getComputedStyle(document.documentElement);
  const h = cs.getPropertyValue("--font-manrope").trim();
  const b = cs.getPropertyValue("--font-inter").trim();
  const fonts = {
    heading: h ? `${h}, sans-serif` : "sans-serif",
    body: b ? `${b}, sans-serif` : "sans-serif",
  };
  try {
    await Promise.all([
      document.fonts.load(`800 40px ${fonts.heading}`),
      document.fonts.load(`700 24px ${fonts.body}`),
      document.fonts.load(`600 24px ${fonts.body}`),
      document.fonts.load(`400 32px ${fonts.body}`),
    ]);
    await document.fonts.ready;
  } catch {
    // Fall back to system fonts if the web fonts cannot be loaded.
  }
  return fonts;
}

function setSpacing(ctx, v) {
  if ("letterSpacing" in ctx) ctx.letterSpacing = v;
}

function wrap(ctx, text, maxWidth) {
  const out = [];
  String(text || "")
    .split("\n")
    .forEach((par) => {
      const words = par.split(/\s+/).filter(Boolean);
      if (!words.length) {
        out.push("");
        return;
      }
      let line = "";
      for (const w of words) {
        const test = line ? `${line} ${w}` : w;
        if (!line || ctx.measureText(test).width <= maxWidth) line = test;
        else {
          out.push(line);
          line = w;
        }
      }
      out.push(line);
    });
  return out;
}

function measure(ctx, text, size, o) {
  ctx.font = `${o.weight} ${size}px ${o.family}`;
  const lines = wrap(ctx, text, o.maxWidth);
  const tooWide = lines.some((l) => ctx.measureText(l).width > o.maxWidth);
  return { size, lines, lh: o.lh, height: lines.length * size * o.lh, tooWide };
}

// Shrinks the font size until the text fits the box (or the minimum size is reached).
function fit(ctx, text, o) {
  let size = o.max;
  let m = measure(ctx, text, size, o);
  while ((m.height > o.maxHeight || m.tooWide) && size > o.min) {
    size -= 4;
    m = measure(ctx, text, size, o);
  }
  return m;
}

function drawBlock(ctx, m, x, y, o) {
  ctx.font = `${o.weight} ${m.size}px ${o.family}`;
  ctx.fillStyle = o.color;
  ctx.textAlign = o.align;
  ctx.globalAlpha = o.alpha ?? 1;
  m.lines.forEach((line, i) => ctx.fillText(line, x, y + i * m.size * m.lh));
  ctx.globalAlpha = 1;
}

// Draws one slide. Used for the preview, the thumbnails and the exports.
export function drawSlide(canvas, slide, opts) {
  const { themeId, index, total, scale = 1, fonts } = opts;
  const t = THEMES.find((x) => x.id === themeId) || THEMES[0];
  const W = SLIDE_W;
  const H = SLIDE_H;
  const inner = W - PAD * 2;

  canvas.width = Math.round(W * scale);
  canvas.height = Math.round(H * scale);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.textBaseline = "top";
  ctx.fillStyle = t.bg;
  ctx.fillRect(0, 0, W, H);

  // Header row: purpose label and slide counter
  setSpacing(ctx, "4px");
  ctx.font = `700 24px ${fonts.body}`;
  ctx.textAlign = "left";
  ctx.fillStyle = t.accent;
  ctx.fillText(String(slide.purpose || "").toUpperCase().slice(0, 36), PAD, PAD);
  ctx.textAlign = "right";
  ctx.fillStyle = t.muted;
  ctx.fillText(`${pad2(index + 1)} / ${pad2(total)}`, W - PAD, PAD);
  setSpacing(ctx, "0px");

  // Footer: progress bar and swipe cue
  const barY = H - PAD - 6;
  ctx.fillStyle = t.rule;
  ctx.fillRect(PAD, barY, inner, 6);
  ctx.fillStyle = t.accent;
  ctx.fillRect(PAD, barY, (inner * (index + 1)) / total, 6);
  if (index < total - 1) {
    ctx.font = `600 26px ${fonts.body}`;
    ctx.fillStyle = t.muted;
    ctx.textAlign = "right";
    ctx.fillText("Swipe >", W - PAD, barY - 50);
  }

  const top = PAD + 90;
  const bottom = barY - 90;
  const hSpec = (max, maxHeight) =>
    fit(ctx, slide.headline, { weight: 800, family: fonts.heading, maxWidth: inner, maxHeight, max, min: 52, lh: 1.08 });
  const bSpec = (maxHeight) =>
    fit(ctx, slide.body, { weight: 400, family: fonts.body, maxWidth: inner, maxHeight, max: 40, min: 26, lh: 1.5 });
  const hStyle = (align) => ({ weight: 800, family: fonts.heading, color: t.fg, align });
  const bStyle = (align) => ({ weight: 400, family: fonts.body, color: t.fg, align, alpha: 0.82 });

  if (slide.layout === "centered") {
    const hl = hSpec(100, 500);
    const bd = bSpec(360);
    const block = hl.height + 56 + bd.height;
    const y = top + Math.max(0, (bottom - top - block) / 2);
    ctx.fillStyle = t.accent;
    ctx.fillRect(W / 2 - 36, y - 40, 72, 8);
    drawBlock(ctx, hl, W / 2, y, hStyle("center"));
    drawBlock(ctx, bd, W / 2, y + hl.height + 56, bStyle("center"));
  } else if (slide.layout === "spotlight") {
    const m = String(slide.headline).match(/\d+/);
    const glyph = m && m[0].length <= 2 ? m[0] : pad2(index + 1);
    ctx.save();
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = t.accent;
    ctx.font = `800 ${glyph.length > 1 ? 440 : 560}px ${fonts.heading}`;
    ctx.textAlign = "left";
    ctx.fillText(glyph, PAD - 12, top - 10);
    ctx.restore();
    const hl = hSpec(92, 400);
    const bd = bSpec(220);
    const y = bottom - (hl.height + 40 + bd.height);
    drawBlock(ctx, hl, PAD, y, hStyle("left"));
    drawBlock(ctx, bd, PAD, y + hl.height + 40, bStyle("left"));
  } else {
    ctx.fillStyle = t.accent;
    ctx.fillRect(PAD, top + 10, 72, 8);
    const hl = hSpec(104, 520);
    const hy = top + 70;
    drawBlock(ctx, hl, PAD, hy, hStyle("left"));
    const by = hy + hl.height + 48;
    const bd = bSpec(bottom - by);
    drawBlock(ctx, bd, PAD, by, bStyle("left"));
  }
}