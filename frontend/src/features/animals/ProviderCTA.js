import Link from "next/link";
import { Building2 } from "lucide-react";

export default function ProviderCTA() {
  return (
    <section id="providers" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16">
      <div className="grid items-center gap-8 rounded-3xl bg-forest p-8 text-white md:grid-cols-[1fr_auto] md:p-12">
        <div>
          <Building2 size={28} className="text-amber" aria-hidden />
          <h2 className="mt-4 max-w-lg font-heading text-3xl font-extrabold tracking-tight">
            Run a clinic, hospital or shelter? Get found by pet owners.
          </h2>
          <p className="mt-3 max-w-lg text-white/75">
            Add your service so people nearby can find and contact you directly.
          </p>
        </div>
        <Link
          href="/list-your-business"
          className="rounded-full bg-amber px-7 py-3 text-center text-sm font-bold text-ink transition hover:brightness-95 active:scale-95"
        >
          List Your Business
        </Link>
      </div>
    </section>
  );
}