import { Plus } from "lucide-react";
import { faqs } from "@/data/academy";

export default function AcademyFAQ() {
  return (
    <section className="bg-mist">
      <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet">
          FAQ
        </p>
        <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-graphite md:text-4xl">
          Straight answers.
        </h2>

        <div className="mt-8 divide-y divide-violet/20 border-y border-violet/20">
          {faqs.map((f) => (
            <details key={f.q} className="academy-faq group py-5">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-graphite focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet">
                {f.q}
                <Plus
                  size={20}
                  aria-hidden="true"
                  className="academy-faq-icon shrink-0 text-violet transition-transform duration-200"
                />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-graphite/70">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}