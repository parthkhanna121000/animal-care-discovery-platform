export const PLATFORMS = ["Instagram", "LinkedIn"];
export const OBJECTIVES = ["Educate", "Engage", "Promote", "Explain", "Build Authority"];
export const TONES = ["Professional", "Conversational", "Bold", "Educational", "Thought-provoking"];
export const SLIDE_COUNTS = [5, 7, 10];

export const LAYOUTS = [
  { id: "editorial", label: "Editorial" },
  { id: "centered", label: "Centered" },
  { id: "spotlight", label: "Spotlight" },
];

export const THEMES = [
  { id: "midnight", label: "Midnight", bg: "#171C2B", fg: "#F5F3ED", muted: "#9AA3BF", accent: "#D9DFF0", rule: "#2C3550" },
  { id: "ivory", label: "Ivory", bg: "#F5F3ED", fg: "#171C2B", muted: "#777A83", accent: "#40598D", rule: "#E1E0DB" },
  { id: "lavender", label: "Lavender", bg: "#D9DFF0", fg: "#171C2B", muted: "#4B5472", accent: "#40598D", rule: "#B9C3E0" },
];

export const DEFAULT_BRIEF = {
  topic: "",
  platform: "Instagram",
  audience: "Startup founders and small business owners",
  objective: "Educate",
  tone: "Professional",
  slideCount: 7,
  instructions: "",
};