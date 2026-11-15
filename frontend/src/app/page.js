import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";

export const metadata = {
  title: "Product Showcase | Three Product Experiences",
  description:
    "An integrated assignment showcase: Practo for Animals, AI Academy and AI Content Studio, each an independent product experience.",
};

// Flip to true once the /studio route exists. Until then its card is not a link.
const STUDIO_READY = false;

/* ---------- CSS-only previews (illustrative, not screenshots) ---------- */

function AnimalsPreview() {
  return (
    <div className="absolute inset-0 bg-ivory p-4" aria-hidden="true">
      <div className="flex items-center justify-between">
        <div className="h-2 w-16 rounded-full bg-forest" />
        <div className="flex gap-1.5">
          <div className="h-1.5 w-6 rounded-full bg-line" />
          <div className="h-1.5 w-6 rounded-full bg-line" />
          <div className="h-1.5 w-6 rounded-full bg-line" />
        </div>
      </div>
      <div className="mt-4 rounded-xl bg-forest p-4">
        <div className="h-2.5 w-3/4 rounded-full bg-white/90" />
        <div className="mt-2 h-2.5 w-1/2 rounded-full bg-white/60" />
        <div className="mt-4 flex gap-2 rounded-lg bg-white p-2">
          <div className="h-2 flex-1 rounded-full bg-sage" />
          <div className="h-2 w-8 rounded-full bg-amber" />
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg border border-line bg-white p-2">
            <div className="h-6 rounded bg-sage" />
            <div className="mt-2 h-1.5 w-3/4 rounded-full bg-line" />
          </div>
        ))}
      </div>
    </div>
  );
}

function AcademyPreview() {
  return (
    <div className="absolute inset-0 bg-paper p-4" aria-hidden="true">
      <div className="h-1.5 w-14 rounded-full bg-violet" />
      <div className="mt-3 h-4 w-11/12 rounded bg-graphite" />
      <div className="mt-1.5 h-4 w-2/3 rounded bg-graphite" />
      <div className="mt-3 h-6 w-24 rounded-full bg-violet" />
      <div className="mt-4 grid grid-cols-3 gap-2 rounded-lg bg-mist p-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded border border-violet/15 bg-white p-1.5">
            <div className="h-1.5 w-1/2 rounded-full bg-lilac" />
            <div className="mt-2 h-1.5 w-full rounded-full bg-graphite/20" />
            <div className="mt-1 h-1.5 w-3/4 rounded-full bg-graphite/20" />
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2 border-t-2 border-graphite pt-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-3 rounded bg-lilac/60" />
        ))}
      </div>
    </div>
  );
}

function StudioPreview() {
  return (
    <div className="absolute inset-0 bg-[#1F2430] p-4" aria-hidden="true">
      <div className="flex items-center gap-1.5">
        <div className="h-1.5 w-1.5 rounded-full bg-white/30" />
        <div className="h-1.5 w-1.5 rounded-full bg-white/30" />
        <div className="h-1.5 w-1.5 rounded-full bg-white/30" />
      </div>
      <div className="mt-4 flex items-end justify-center gap-3">
        <div className="aspect-[4/5] h-24 rounded-lg bg-[#2B59C3] p-2">
          <div className="h-1.5 w-3/4 rounded-full bg-white/90" />
          <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-white/60" />
        </div>
        <div className="aspect-[4/5] h-24 rounded-lg bg-white p-2">
          <div className="h-1.5 w-3/4 rounded-full bg-[#1F2430]" />
          <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-[#1F2430]/40" />
        </div>
        <div className="aspect-[4/5] h-24 rounded-lg border border-white/25 p-2">
          <div className="h-1.5 w-3/4 rounded-full bg-white/40" />
          <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-white/20" />
        </div>
      </div>
      <div className="mx-auto mt-4 h-1.5 w-2/3 rounded-full bg-white/15">
        <div className="h-full w-1/3 rounded-full bg-[#7FA2F2]" />
      </div>
    </div>
  );
}

/* ---------- Project data ---------- */

const projects = [
  {
    id: "animals",
    number: "01",
    category: "Healthcare discovery",
    title: "Practo for Animals",
    description:
      "A discovery prototype for finding veterinary clinics, hospitals, boarding, diagnostics and other animal-care services, built with clearly labelled demo data.",
    tags: ["Next.js", "React", "Responsive UI", "Search & Filtering"],
    href: "/animals",
    ready: true,
    status: "Prototype",
    Preview: AnimalsPreview,
    accent: {
      dot: "bg-forest",
      tag: "bg-sage text-forest",
      cta: "text-forest",
      border: "group-hover:border-forest/40",
    },
  },
  {
    id: "academy",
    number: "02",
    category: "AI education",
    title: "AI Academy",
    description:
      "A landing-page concept for practical AI education: programme cards, a learning journey, FAQs and an enquiry form. Programme details are labelled placeholders.",
    tags: ["Next.js", "React", "Responsive UI", "Learning Journey"],
    href: "/academy",
    ready: true,
    status: "Prototype",
    Preview: AcademyPreview,
    accent: {
      dot: "bg-violet",
      tag: "bg-mist text-violet",
      cta: "text-violet",
      border: "group-hover:border-violet/40",
    },
  },
  {
    id: "studio",
    number: "03",
    category: "AI content creation",
    title: "AI Content Studio",
    description:
      "An AI-assisted content creation workflow that transforms raw ideas into structured, editable and publish-ready social media carousels.",
    tags: ["AI Integration", "Content Workflow", "Carousel Workflow", "Automation"],
    href: "/studio",
    ready: STUDIO_READY,
    status: STUDIO_READY ? "Prototype" : "In progress",
    wide: true,
    Preview: StudioPreview,
    accent: {
      dot: "bg-[#2B59C3]",
      tag: "bg-[#E8EEFB] text-[#1F3F8F]",
      cta: "text-[#2B59C3]",
      border: "group-hover:border-[#2B59C3]/40",
    },
  },
];

/* ---------- Card ---------- */

function ProjectCard({ project, delay }) {
  const { id, number, category, title, description, tags, href, ready, status, wide, Preview, accent } =
    project;

  const card = (
    <article
      className={`flex h-full flex-col rounded-2xl border border-[#DDDBD5] bg-white p-4 transition duration-200 ${
        ready
          ? `motion-safe:group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-black/5 ${accent.border}`
          : ""
      }`}
    >
      <div
        className={`relative aspect-[4/3] overflow-hidden rounded-xl border border-[#DDDBD5] ${
          wide ? "md:aspect-[21/9] lg:aspect-[4/3]" : ""
        }`}
      >
        <div
          className={`absolute inset-0 transition-transform duration-300 ease-out ${
            ready ? "motion-safe:group-hover:scale-[1.03]" : ""
          }`}
        >
          <Preview />
        </div>
        <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-[#66645F]">
          Illustrative preview
        </span>
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#66645F]">
            {number} / {category}
          </p>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#DDDBD5] px-2.5 py-1 text-[11px] font-medium text-[#66645F]">
            <span
              aria-hidden="true"
              className={`h-1.5 w-1.5 rounded-full ${ready ? accent.dot : "bg-[#B9B6AE]"}`}
            />
            {status}
          </span>
        </div>

        <h3
          id={`${id}-title`}
          className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-[#191919]"
        >
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#66645F]">{description}</p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${title} technologies`}>
          {tags.map((t) => (
            <li key={t} className={`rounded-full px-3 py-1 text-xs font-medium ${accent.tag}`}>
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          {ready ? (
            <span className={`inline-flex items-center gap-2 text-sm font-semibold ${accent.cta}`}>
              Explore Project
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-200 motion-safe:group-hover:translate-x-1"
              />
            </span>
          ) : (
            <span className="text-sm font-medium text-[#66645F]">
              In progress. Not yet available.
            </span>
          )}
        </div>
      </div>
    </article>
  );

  const wrapperClass = `animate-fade-up group block h-full rounded-2xl ${
    wide ? "md:col-span-2 lg:col-span-1" : ""
  }`;

  return ready ? (
    <Link
      href={href}
      aria-labelledby={`${id}-title`}
      className={wrapperClass}
      style={{ animationDelay: delay }}
    >
      {card}
    </Link>
  ) : (
    <div className={wrapperClass} style={{ animationDelay: delay }}>
      {card}
    </div>
  );
}

/* ---------- Page ---------- */

export default function OverviewPage() {
  return (
    <div className="overview min-h-screen bg-[#F8F7F4] text-[#191919]">
      <header className="border-b border-[#DDDBD5]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2.5">
            <Layers size={20} aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em]">
              Product Showcase
            </span>
          </div>
          <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-[#66645F]">
            <span>2026</span>
            <span aria-hidden="true">·</span>
            <span>Portfolio</span>
          </p>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-5 pb-12 pt-16 md:pb-16 md:pt-24">
          <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.2em] text-[#66645F]">
            Three product experiences
          </p>
          <h1
            className="animate-fade-up mt-5 max-w-4xl font-heading text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-7xl"
            style={{ animationDelay: "60ms" }}
          >
            Building digital products that solve real problems.
          </h1>
          <p
            className="animate-fade-up mt-6 max-w-2xl text-lg text-[#191919]/80"
            style={{ animationDelay: "120ms" }}
          >
            From animal healthcare discovery to AI-powered learning and intelligent
            content creation.
          </p>
          <p
            className="animate-fade-up mt-3 max-w-xl text-base text-[#66645F]"
            style={{ animationDelay: "180ms" }}
          >
            Explore the projects below to see their interfaces, product thinking and
            implementation.
          </p>
        </section>

        <section aria-labelledby="projects-heading" className="mx-auto max-w-6xl px-5">
          <h2 id="projects-heading" className="sr-only">
            Projects
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} delay={`${240 + i * 80}ms`} />
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-16 border-t border-[#DDDBD5] md:mt-24">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <p className="font-heading text-2xl font-extrabold tracking-tight md:text-4xl">
            One assignment. Three experiences.
          </p>
          <p className="mt-3 text-[#66645F]">
            Designed and developed as an integrated product showcase.
          </p>
          <p className="mt-10 text-xs text-[#66645F]">
            © 2026 · Product & Engineering Showcase
          </p>
        </div>
      </footer>
    </div>
  );
}