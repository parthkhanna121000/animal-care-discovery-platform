"use client";

import { useEffect, useState } from "react";
import StudioHeader from "./StudioHeader";
import Landing from "./Landing";
import BriefForm from "./BriefForm";
import Editor from "./Editor";
import { loadFonts } from "./render";
import { DEFAULT_BRIEF } from "./constants";
import { SAMPLE_CAROUSEL } from "@/data/studio-sample";

export default function StudioApp() {
  const [view, setView] = useState("home");
  const [fonts, setFonts] = useState(null);
  const [brief, setBrief] = useState(DEFAULT_BRIEF);
  const [carousel, setCarousel] = useState(null);
  const [session, setSession] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    loadFonts().then((f) => {
      if (alive) setFonts(f);
    });
    return () => {
      alive = false;
    };
  }, []);

  const goTo = (v) => {
    setView(v);
    window.scrollTo({ top: 0 });
  };

  function openSample() {
    setCarousel(structuredClone(SAMPLE_CAROUSEL));
    setSession((s) => s + 1);
    setError("");
    goTo("editor");
  }

  async function generate() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/studio/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brief),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data || !data.carousel) {
        throw new Error((data && data.error) || "The server could not generate the carousel.");
      }
      setCarousel(data.carousel);
      setSession((s) => s + 1);
      goTo("editor");
    } catch (e) {
      setError(e && e.message ? e.message : "Could not reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const updateSlide = (i, patch) =>
    setCarousel((c) => ({ ...c, slides: c.slides.map((s, k) => (k === i ? { ...s, ...patch } : s)) }));
  const updateCarousel = (patch) => setCarousel((c) => ({ ...c, ...patch }));

  return (
    <div className="studio min-h-screen bg-[#F5F3ED] font-sans text-[#171C2B]">
      <StudioHeader onHome={() => goTo("home")} onCreate={() => goTo("brief")} onSample={openSample} />
      {view === "home" && <Landing fonts={fonts} onCreate={() => goTo("brief")} onSample={openSample} />}
      {view === "brief" && (
        <BriefForm brief={brief} onChange={setBrief} onSubmit={generate} onSample={openSample} loading={loading} error={error} />
      )}
      {view === "editor" && carousel && (
        <Editor
          key={session}
          carousel={carousel}
          fonts={fonts}
          onBack={() => goTo("home")}
          onUpdateSlide={updateSlide}
          onUpdateCarousel={updateCarousel}
        />
      )}
    </div>
  );
}