import { Suspense } from "react";
import Navbar from "@/features/animals/Navbar";
import SearchResults from "@/features/animals/SearchResults";

export const metadata = { title: "Find care | Practo for Animals" };

export default function SearchPage() {
  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={<p className="mx-auto max-w-6xl px-5 py-10 text-muted">Loading providers…</p>}>
          <SearchResults />
        </Suspense>
      </main>
    </>
  );
}