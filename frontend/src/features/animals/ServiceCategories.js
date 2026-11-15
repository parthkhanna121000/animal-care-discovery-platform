import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/categories";

// Bento layout: first card is large, last card spans the full row on desktop
const spans = [
  "lg:col-span-2 lg:row-span-2",
  "",
  "",
  "",
  "",
  "sm:col-span-2 lg:col-span-4",
];

export default function ServiceCategories() {
  return (
    <section id="services" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16">
      <div className="mb-8 max-w-xl">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-forest">
          Every kind of animal care, one search.
        </h2>
        <p className="mt-3 text-muted">Pick a service to see providers near you.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c, i) => {
          const Icon = c.icon;
          const featured = i === 0;
          return (
            <Link
              key={c.slug}
              href={`/search?category=${c.slug}`}
              className={`group flex flex-col justify-between rounded-2xl border border-line p-6 transition hover:-translate-y-0.5 hover:border-green hover:shadow-md ${
                featured ? "bg-forest text-white" : "bg-white"
              } ${spans[i]}`}
            >
              <div className="flex items-start justify-between">
                <span
                  className={`grid h-11 w-11 place-items-center rounded-xl ${
                    featured ? "bg-white/15" : "bg-sage text-forest"
                  }`}
                >
                  <Icon size={22} />
                </span>
                <ArrowUpRight
                  size={18}
                  className={`transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                    featured ? "text-white/70" : "text-muted"
                  }`}
                />
              </div>
              <div className={featured ? "mt-24" : "mt-8"}>
                <h3 className="font-heading text-lg font-bold">{c.title}</h3>
                <p className={`mt-1 text-sm ${featured ? "text-white/75" : "text-muted"}`}>
                  {c.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}