import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function TrustCommunity() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-5 pb-20">
      <div className="grid gap-8 border-t border-line pt-12 md:grid-cols-2">
        <div>
          <ShieldCheck size={28} className="text-green" aria-hidden />
          <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-forest">
            Built on accurate listings.
          </h2>
        </div>
        <div>
          <p className="leading-relaxed text-muted">
            Practo for Animals helps people find animal care quickly and
            responsibly. Listing details can change, so please confirm hours,
            services and availability with the provider before you travel,
            especially in an emergency.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            Spotted something wrong? Tell us and we will review it.
          </p>
          <Link
            href="/correction"
            className="mt-6 inline-block rounded-full border border-forest px-6 py-2.5 text-sm font-semibold text-forest transition hover:bg-sage active:scale-95"
          >
            Submit a Correction
          </Link>
        </div>
      </div>
    </section>
  );
}