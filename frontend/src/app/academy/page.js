import Link from "next/link";
import { AcademyProvider } from "@/features/academy/AcademyContext";
import AcademyHero from "@/features/academy/AcademyHero";
import LearningPathFinder from "@/features/academy/LearningPathFinder";
import ProgrammeExplorer from "@/features/academy/ProgrammeExplorer";
import LearningJourney from "@/features/academy/LearningJourney";
import AcademyFAQ from "@/features/academy/AcademyFAQ";
import EnquirySection from "@/features/academy/EnquirySection";

export const metadata = {
  title: "AI Education (Prototype)",
  description:
    "A frontend prototype of an AI education landing page with a rule-based learning path finder. Programmes shown are placeholders.",
};

export default function AcademyPage() {
  return (
    <AcademyProvider>
      <main className="academy bg-paper text-graphite">
        <header className="border-b border-graphite/10">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <span className="font-heading text-lg font-extrabold">AI Academy</span>
            <Link
              href="/"
              className="text-sm font-medium text-graphite/70 hover:text-violet focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
            >
              &larr; Assignment overview
            </Link>
          </div>
        </header>
        <AcademyHero />
        <LearningPathFinder />
        <ProgrammeExplorer />
        <LearningJourney />
        <AcademyFAQ />
        <EnquirySection />
        <footer className="bg-graphite px-5 pb-8 text-center text-xs text-white/50">
          Frontend prototype. All programme details are placeholders.
        </footer>
      </main>
    </AcademyProvider>
  );
}