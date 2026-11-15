// Mirrors the structure and spacing of ProviderCard so nothing jumps when real cards arrive.
export default function ProviderCardSkeleton() {
  return (
    <div aria-hidden="true" className="flex flex-col rounded-2xl border border-line bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="skeleton h-4 w-24" />
          <div className="skeleton mt-1 h-7 w-3/4" />
        </div>
        <div className="skeleton h-7 w-14 rounded-full" />
      </div>

      <div className="skeleton mt-3 h-5 w-full" />

      <div className="mt-4 flex gap-2">
        <div className="skeleton h-[26px] w-20 rounded-full" />
        <div className="skeleton h-[26px] w-16 rounded-full" />
        <div className="skeleton h-[26px] w-24 rounded-full" />
      </div>

      <div className="mt-5 flex gap-2 pt-1">
        <div className="skeleton h-[38px] flex-1 rounded-full" />
        <div className="skeleton h-[38px] flex-1 rounded-full" />
      </div>
    </div>
  );
}

export function ProviderSkeletonList({ count = 6 }) {
  return (
    <div role="status" aria-label="Loading providers" className="grid gap-4 md:grid-cols-2">
      <span className="sr-only">Loading providers…</span>
      {Array.from({ length: count }).map((_, i) => (
        <ProviderCardSkeleton key={i} />
      ))}
    </div>
  );
}