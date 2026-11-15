import { PawPrint } from "lucide-react";

// Three small paw prints appearing one after another. Decorative only.
const paws = [
  { wrap: "mt-4 -rotate-12", delay: 0 },
  { wrap: "mb-2 rotate-6", delay: 150 },
  { wrap: "mt-3 -rotate-6", delay: 300 },
];

export default function PawTrail() {
  return (
    <div className="flex items-center gap-3 text-green" aria-hidden="true">
      {paws.map((p, i) => (
        <span key={i} className={p.wrap}>
          <PawPrint size={26} className="paw-step" style={{ animationDelay: `${p.delay}ms` }} />
        </span>
      ))}
    </div>
  );
}