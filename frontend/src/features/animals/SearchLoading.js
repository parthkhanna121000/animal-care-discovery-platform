import { ProviderSkeletonList } from "./ProviderCardSkeleton";

// Layout skeleton for the search page: heading, filter column, result grid.
export default function SearchLoading() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="mb-6">
        <div className="skeleton h-9 w-56" />
        <div className="skeleton mt-2 h-5 w-32" />
      </div>
      <div className="skeleton mb-6 h-8 w-full" />

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <div className="hidden space-y-6 lg:block" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i}>
              <div className="skeleton h-4 w-20" />
              <div className="skeleton mt-2 h-10 w-full" />
            </div>
          ))}
        </div>
        <ProviderSkeletonList />
      </div>
    </div>
  );
}