import { journey } from "@/data/academy";

export default function LearningJourney() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet">
          Learning journey
        </p>
        <h2 className="mt-3 max-w-2xl font-heading text-3xl font-extrabold tracking-tight text-graphite md:text-4xl">
          From first prompt to finished project.
        </h2>

        <ol className="mt-12 grid gap-0 border-t-2 border-graphite md:grid-cols-4">
          {journey.map((j) => (
            <li
              key={j.step}
              className="border-b border-graphite/15 py-6 md:border-b-0 md:border-r md:border-graphite/15 md:px-6 md:first:pl-0 md:last:border-r-0"
            >
              <span className="font-heading text-4xl font-extrabold text-lilac">
                {j.step}
              </span>
              <h3 className="mt-3 font-heading text-lg font-extrabold text-graphite">
                {j.title}
              </h3>
              <p className="mt-2 text-sm text-graphite/70">{j.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-xs text-graphite/50">
          Illustrative structure, not a confirmed curriculum.
        </p>
      </div>
    </section>
  );
}