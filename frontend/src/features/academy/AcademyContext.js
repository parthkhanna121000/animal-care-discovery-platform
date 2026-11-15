"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { programmes } from "@/data/academy";

const AcademyContext = createContext(null);

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

export function AcademyProvider({ children }) {
  const [selectedId, setSelectedId] = useState(programmes[0].id);
  const [recommendedId, setRecommendedId] = useState(null);

  // scroll: "always" | "mobile" | undefined
  const chooseProgramme = useCallback((id, scroll) => {
    setSelectedId(id);
    if (!scroll) return;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    if (scroll === "mobile" && !mobile) return;
    scrollToId(mobile ? "programme-panel" : "programmes");
  }, []);

  const value = useMemo(
    () => ({ selectedId, recommendedId, setRecommendedId, chooseProgramme }),
    [selectedId, recommendedId, chooseProgramme]
  );

  return <AcademyContext.Provider value={value}>{children}</AcademyContext.Provider>;
}

export function useAcademy() {
  const ctx = useContext(AcademyContext);
  if (!ctx) throw new Error("useAcademy must be used inside AcademyProvider");
  return ctx;
}