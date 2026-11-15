import Link from "next/link";
import { PawPrint } from "lucide-react";
import { categories } from "@/data/categories";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-4">
        <div>
          <p className="flex items-center gap-2 font-heading text-lg font-extrabold text-forest">
            <PawPrint size={18} /> Practo for Animals
          </p>
          <p className="mt-3 text-sm text-muted">
            Find trusted animal care near you.
          </p>
        </div>

        <nav aria-label="Services">
          <h3 className="text-sm font-bold text-forest">Services</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/search?category=${c.slug}`} className="hover:text-forest">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h3 className="text-sm font-bold text-forest">Company</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link href="/search" className="hover:text-forest">Find Care</Link></li>
            <li><Link href="/list-your-business" className="hover:text-forest">List Your Business</Link></li>
            <li><Link href="/correction" className="hover:text-forest">Submit a Correction</Link></li>
            <li><Link href="/legal" className="hover:text-forest">Privacy &amp; Terms</Link></li>
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-bold text-forest">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>hello@example.com (placeholder)</li>
            <li>+91 00000 00000 (placeholder)</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-4 text-center text-xs text-muted">
        Prototype built for assignment purposes. Listings shown are demonstration data.
      </div>
    </footer>
  );
}