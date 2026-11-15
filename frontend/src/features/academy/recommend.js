import { programmes, quizQuestions, goalProjects } from "@/data/academy";

// Transparent scoring table. Each answer adds fixed points to a programme.
// The highest total wins. Ties go to the earlier (lower-level) programme.
const RULES = {
  role: {
    student: [
      { programme: "foundations", points: 1, why: "As a student, you can build up from the basics." },
    ],
    professional: [
      { programme: "practitioner", points: 1, why: "As a working professional, you can apply what you learn to real tasks straight away." },
    ],
    developer: [
      { programme: "builder", points: 2, why: "As a developer, you already have the coding background to move towards building." },
    ],
  },
  level: {
    beginner: [
      { programme: "foundations", points: 2, why: "You are new to AI, so a solid foundation comes first." },
    ],
    intermediate: [
      { programme: "practitioner", points: 1, why: "You already use AI tools, so applying them to real workflows is a natural step." },
    ],
    advanced: [
      { programme: "builder", points: 2, why: "With advanced experience, building and demoing is the natural next step." },
    ],
  },
  goal: {
    understand: [
      { programme: "foundations", points: 3, why: "You want to understand AI, which is the core focus of this programme." },
    ],
    automate: [
      { programme: "practitioner", points: 3, why: "You want to automate everyday work, which is the focus of this programme." },
    ],
    build: [
      { programme: "builder", points: 3, why: "You want to build AI applications, which is the focus of this programme." },
    ],
  },
};

export const EXPERIENCE_STEPS = { beginner: 1, intermediate: 2, advanced: 3 };

export function isComplete(answers) {
  return quizQuestions.every((q) => Boolean(answers[q.id]));
}

export function labelFor(questionId, value) {
  const question = quizQuestions.find((q) => q.id === questionId);
  return question?.options.find((o) => o.value === value)?.label ?? "";
}

export function projectFor(goal) {
  return goalProjects[goal] ?? null;
}

export function recommend(answers) {
  const scores = Object.fromEntries(programmes.map((p) => [p.id, 0]));
  const fired = [];

  for (const q of quizQuestions) {
    const rules = RULES[q.id]?.[answers[q.id]] ?? [];
    for (const rule of rules) {
      scores[rule.programme] += rule.points;
      fired.push(rule);
    }
  }

  const ranked = programmes
    .map((programme, index) => ({ programme, score: scores[programme.id], index }))
    .sort((a, b) => b.score - a.score || a.index - b.index);

  const [best, second] = ranked;

  return {
    programme: best.programme,
    alternative: second.score > 0 ? second.programme : null,
    tied: best.score === second.score,
    scores,
    reasons: fired.filter((r) => r.programme === best.programme.id).map((r) => r.why),
  };
}