export const DEMO_NOTE =
  "Placeholder content. Programme names, formats and durations are illustrative, not confirmed offerings.";

export const programmes = [
  {
    id: "foundations",
    level: "Beginner",
    title: "AI Foundations",
    summary:
      "Understand what modern AI tools can and cannot do, and build safe everyday habits for using them.",
    format: "Illustrative: live online cohort",
    duration: "Illustrative: 4 weeks",
    outcomes: [
      "Explain how generative AI works in plain language",
      "Write clear prompts for common tasks",
      "Spot errors and made-up answers",
    ],
  },
  {
    id: "practitioner",
    level: "Intermediate",
    title: "AI for Working Professionals",
    summary:
      "Apply AI to real workflows such as research, writing, analysis and reporting.",
    format: "Illustrative: evenings and weekends",
    duration: "Illustrative: 6 weeks",
    outcomes: [
      "Design repeatable AI-assisted workflows",
      "Review AI output before sharing it",
      "Document a workflow for your team",
    ],
  },
  {
    id: "builder",
    level: "Advanced",
    title: "AI Builder Studio",
    summary:
      "Move from using tools to shaping them: prototype a small AI-powered product from idea to demo.",
    format: "Illustrative: project-based studio",
    duration: "Illustrative: 8 weeks",
    outcomes: [
      "Scope a small AI product",
      "Build and test a working prototype",
      "Present a demo with honest limitations",
    ],
  },
];

export const journey = [
  { step: "01", title: "Orient", text: "Get a clear map of the field and pick your starting point." },
  { step: "02", title: "Practise", text: "Work through guided exercises on tasks you actually do." },
  { step: "03", title: "Apply", text: "Bring a real problem and build something around it." },
  { step: "04", title: "Share", text: "Present your work and get feedback from peers and mentors." },
];

export const faqs = [
  {
    q: "Are these programmes real and open for enrolment?",
    a: "Not yet. This page is a frontend prototype. The programmes, durations and formats shown are placeholders used to demonstrate the layout.",
  },
  {
    q: "Does the enquiry form send my details anywhere?",
    a: "No. The form validates input and shows a confirmation, but nothing is stored or transmitted. It needs a real endpoint before launch.",
  },
  {
    q: "Is there pricing, a syllabus or a start date?",
    a: "None of these are published because none are confirmed. They will be added once the offering is defined.",
  },
  {
    q: "Do I need a technical background?",
    a: "The illustrative Foundations programme assumes none. Prerequisites for the others are still to be decided.",
  },
];