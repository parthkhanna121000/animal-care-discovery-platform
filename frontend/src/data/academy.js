export const DEMO_NOTE =
  "Placeholder content. Programme names, formats, durations and projects are illustrative, not confirmed offerings.";

export const programmes = [
  {
    id: "foundations",
    number: "01",
    level: "Beginner",
    title: "AI Foundations",
    summary:
      "Understand what modern AI tools can and cannot do, and build safe everyday habits for using them.",
    format: "Illustrative: live online cohort",
    duration: "Illustrative: 4 weeks",
    skills: ["How generative AI works", "Prompt writing", "Checking AI output", "Responsible use"],
    project: "A short, sourced research brief written with an AI assistant and checked by you.",
    outcomes: [
      "Explain how generative AI works in plain language",
      "Write clear prompts for common tasks",
      "Spot errors and made-up answers",
    ],
  },
  {
    id: "practitioner",
    number: "02",
    level: "Intermediate",
    title: "AI for Working Professionals",
    summary:
      "Apply AI to real workflows such as research, writing, analysis and reporting.",
    format: "Illustrative: evenings and weekends",
    duration: "Illustrative: 6 weeks",
    skills: ["Workflow mapping", "Prompt chains", "Automation tools", "Reviewing outputs"],
    project: "A repeatable, AI-assisted weekly reporting workflow with a human review step.",
    outcomes: [
      "Design repeatable AI-assisted workflows",
      "Review AI output before sharing it",
      "Document a workflow for your team",
    ],
  },
  {
    id: "builder",
    number: "03",
    level: "Advanced",
    title: "AI Builder Studio",
    summary:
      "Move from using tools to shaping them: prototype a small AI-powered product from idea to demo.",
    format: "Illustrative: project-based studio",
    duration: "Illustrative: 8 weeks",
    skills: ["Scoping AI features", "Prototyping with APIs", "Evaluating outputs", "Demo and documentation"],
    project: "A small AI-powered application, demoed together with its honest limitations.",
    outcomes: [
      "Scope a small AI product",
      "Build and test a working prototype",
      "Present a demo with honest limitations",
    ],
  },
];

export const quizQuestions = [
  {
    id: "role",
    prompt: "Who are you?",
    options: [
      { value: "student", label: "Student", detail: "Studying, or recently finished." },
      { value: "professional", label: "Working Professional", detail: "Using AI at or for work." },
      { value: "developer", label: "Developer", detail: "Comfortable writing code." },
    ],
  },
  {
    id: "level",
    prompt: "How would you describe your AI experience?",
    options: [
      { value: "beginner", label: "Beginner", detail: "New to AI tools." },
      { value: "intermediate", label: "Intermediate", detail: "Use AI tools fairly regularly." },
      { value: "advanced", label: "Advanced", detail: "Build with or around AI already." },
    ],
  },
  {
    id: "goal",
    prompt: "What do you want to achieve?",
    options: [
      { value: "understand", label: "Understand AI", detail: "Know what it is and how to use it well." },
      { value: "automate", label: "Automate everyday work", detail: "Save time on repetitive tasks." },
      { value: "build", label: "Build AI applications", detail: "Ship something that uses AI." },
    ],
  },
];

export const goalProjects = {
  understand: {
    title: "An AI-powered research assistant",
    text: "Collect sources on a topic you care about, then use AI to summarise, compare and fact-check them.",
  },
  automate: {
    title: "An automated workflow",
    text: "Pick a repetitive task such as weekly reporting and design an AI-assisted workflow with a human review step.",
  },
  build: {
    title: "An AI-powered application",
    text: "Scope, build and demo a small application where AI handles one clearly defined job.",
  },
};

export const roadmapSteps = [
  { title: "Learn the fundamentals", text: "Get a working picture of how AI tools behave and where they fail." },
  { title: "Practise with AI tools", text: "Try guided exercises on tasks drawn from your own work or studies." },
  { title: "Complete a practical project", text: "Apply what you learned to one real task, start to finish." },
  { title: "Build and showcase an application", text: "Turn the result into something you can demo and explain." },
];

export const journeyStages = [
  {
    id: "explore",
    title: "Explore",
    doing: "Map the AI landscape and try a few tools on small, low-risk tasks.",
    skills: ["AI literacy", "Tool awareness"],
    output: "A personal list of AI use cases worth trying.",
  },
  {
    id: "learn",
    title: "Learn",
    doing: "Work through guided lessons on how models behave and how to prompt them well.",
    skills: ["Prompting", "Evaluating answers"],
    output: "A prompt library for your own tasks.",
  },
  {
    id: "experiment",
    title: "Experiment",
    doing: "Test ideas on real tasks, compare tools and note what works and what fails.",
    skills: ["Iteration", "Critical review"],
    output: "An experiment log with your findings.",
  },
  {
    id: "build",
    title: "Build",
    doing: "Turn the strongest idea into a working workflow or small application.",
    skills: ["Workflow design", "Prototyping"],
    output: "A working prototype.",
  },
  {
    id: "showcase",
    title: "Showcase",
    doing: "Present the result, explain your decisions and say what you would improve.",
    skills: ["Communication", "Documentation"],
    output: "A short demo and write-up you can share.",
  },
];

export const faqs = [
  {
    q: "Are these programmes real and open for enrolment?",
    a: "Not yet. This page is a frontend prototype. The programmes, durations, formats and projects shown are placeholders used to demonstrate the layout.",
  },
  {
    q: "How does the Learning Path Finder work?",
    a: "It is a rule-based prototype. Each of your three answers adds fixed points to a programme, and the highest total is suggested. No AI model is used, and your answers are not stored or sent anywhere.",
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