import { Search, GitCompareArrows, PhoneCall } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search by location and service",
    text: "Tell us where you are and what kind of care you need.",
  },
  {
    icon: GitCompareArrows,
    title: "Compare relevant providers",
    text: "Filter by distance, rating, emergency cover and facilities.",
  },
  {
    icon: PhoneCall,
    title: "Contact the provider",
    text: "Call directly from the listing. No middle steps.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-sage/60">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="max-w-md font-heading text-3xl font-extrabold tracking-tight text-forest">
          Three steps to the right care.
        </h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <li key={s.title} className="relative border-t-2 border-forest pt-5">
                <span className="font-heading text-sm font-bold text-green">0{i + 1}</span>
                <Icon size={24} className="mt-3 text-forest" aria-hidden />
                <h3 className="mt-3 font-heading text-lg font-bold text-forest">{s.title}</h3>
                <p className="mt-1 text-sm text-muted">{s.text}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}