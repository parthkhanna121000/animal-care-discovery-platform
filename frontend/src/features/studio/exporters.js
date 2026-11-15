import { drawSlide } from "./render";

const slug = (s) =>
  String(s || "carousel")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40) || "carousel";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function renderToCanvas(slide, i, total, themeId, fonts) {
  const c = document.createElement("canvas");
  drawSlide(c, slide, { themeId, index: i, total, scale: 1, fonts });
  return c;
}

function toBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Could not create the image."))), type, quality);
  });
}

function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export async function exportSlidePng(carousel, i, themeId, fonts) {
  const total = carousel.slides.length;
  const c = renderToCanvas(carousel.slides[i], i, total, themeId, fonts);
  download(await toBlob(c, "image/png"), `${slug(carousel.title)}-slide-${i + 1}.png`);
}

export async function exportAllPng(carousel, themeId, fonts) {
  const total = carousel.slides.length;
  for (let i = 0; i < total; i++) {
    const c = renderToCanvas(carousel.slides[i], i, total, themeId, fonts);
    download(await toBlob(c, "image/png"), `${slug(carousel.title)}-slide-${i + 1}.png`);
    await wait(350);
  }
}

// Minimal PDF writer: one JPEG image per page, no dependencies.
function buildPdf(jpegs) {
  const enc = new TextEncoder();
  const chunks = [];
  const offsets = {};
  let pos = 0;
  const push = (d) => {
    const u = typeof d === "string" ? enc.encode(d) : d;
    chunks.push(u);
    pos += u.length;
  };
  const PW = 540;
  const PH = 675;
  const n = 2 + jpegs.length * 3;

  push("%PDF-1.4\n");
  offsets[1] = pos;
  push("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");
  const kids = jpegs.map((_, i) => `${3 + i * 3} 0 R`).join(" ");
  offsets[2] = pos;
  push(`2 0 obj\n<< /Type /Pages /Kids [${kids}] /Count ${jpegs.length} >>\nendobj\n`);

  jpegs.forEach((jpeg, i) => {
    const pid = 3 + i * 3;
    const cid = pid + 1;
    const iid = pid + 2;
    offsets[pid] = pos;
    push(
      `${pid} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PW} ${PH}] /Resources << /XObject << /Im0 ${iid} 0 R >> >> /Contents ${cid} 0 R >>\nendobj\n`
    );
    const content = `q ${PW} 0 0 ${PH} 0 0 cm /Im0 Do Q`;
    offsets[cid] = pos;
    push(`${cid} 0 obj\n<< /Length ${content.length} >>\nstream\n${content}\nendstream\nendobj\n`);
    offsets[iid] = pos;
    push(
      `${iid} 0 obj\n<< /Type /XObject /Subtype /Image /Width 1080 /Height 1350 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`
    );
    push(jpeg);
    push("\nendstream\nendobj\n");
  });

  const xrefPos = pos;
  let x = `xref\n0 ${n + 1}\n0000000000 65535 f \n`;
  for (let id = 1; id <= n; id++) x += `${String(offsets[id]).padStart(10, "0")} 00000 n \n`;
  x += `trailer\n<< /Size ${n + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF\n`;
  push(x);
  return new Blob(chunks, { type: "application/pdf" });
}

export async function exportPdf(carousel, themeId, fonts) {
  const total = carousel.slides.length;
  const jpegs = [];
  for (let i = 0; i < total; i++) {
    const c = renderToCanvas(carousel.slides[i], i, total, themeId, fonts);
    const blob = await toBlob(c, "image/jpeg", 0.92);
    jpegs.push(new Uint8Array(await blob.arrayBuffer()));
  }
  download(buildPdf(jpegs), `${slug(carousel.title)}.pdf`);
}

export async function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  const ok = document.execCommand("copy");
  ta.remove();
  if (!ok) throw new Error("Copy was blocked by the browser.");
}