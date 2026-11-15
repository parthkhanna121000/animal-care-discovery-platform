import { Suspense } from "react";
import Navbar from "@/features/animals/Navbar";
import SearchResults from "@/features/animals/SearchResults";
import SearchLoading from "@/features/animals/SearchLoading";

export const metadata = { title: "Find care | Practo for Animals" };

export default function SearchPage() {
  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={<SearchLoading />}>
          <SearchResults />
        </Suspense>
      </main>
    </>
  );
}