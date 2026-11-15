import PawTrail from "./PawTrail";

export default function EmptySearchState({ onClear }) {
  return (
    <div
      role="status"
      className="animate-fade-up grid place-items-center rounded-2xl border border-dashed border-line bg-white px-6 py-16 text-center"
    >
      <PawTrail />
      <h2 className="mt-4 font-heading text-lg font-bold text-forest">
        No providers match your filters
      </h2>
      <p className="mt-1 max-w-sm text-sm text-muted">
        Try a wider distance, remove a facility, or search a nearby area.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-5 rounded-full bg-forest px-5 py-2 text-sm font-semibold text-white transition duration-150 hover:bg-green active:scale-95"
      >
        Clear filters
      </button>
    </div>
  );
}