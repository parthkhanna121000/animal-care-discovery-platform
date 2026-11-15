"use client";

import { useEffect, useRef } from "react";
import { drawSlide } from "./render";

export default function SlideCanvas({ slide, themeId, index, total, scale, fonts, label, className }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && fonts) drawSlide(ref.current, slide, { themeId, index, total, scale, fonts });
  }, [slide, themeId, index, total, scale, fonts]);

  if (!fonts) return <div className={`${className} animate-pulse bg-[#E1E0DB]`} aria-hidden="true" />;
  return <canvas ref={ref} role="img" aria-label={label} className={className} />;
}