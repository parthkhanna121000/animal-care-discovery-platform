import Image from "next/image";
import SearchBar from "./SearchBar";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 lg:grid-cols-2 lg:py-20">
      <div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-green">
          Animal care discovery
        </p>
        <h1 className="font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-forest sm:text-5xl lg:text-6xl">
          Better care for every paw, everywhere.
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
          Find vets, hospitals, boarding, diagnostics, ambulances and animal
          welfare organizations near you, all in one place.
        </p>
        <div className="mt-8 max-w-xl">
          <SearchBar />
        </div>
      </div>

      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-sage lg:aspect-square">
        <Image
          src="/images/hero.jpg"
          alt="A veterinarian gently examining a dog"
          fill
          priority
          sizes="(min-width: 1024px) 560px, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}