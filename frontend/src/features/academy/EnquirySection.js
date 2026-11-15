"use client";

import SimpleForm from "@/features/animals/SimpleForm";
import { programmes } from "@/data/academy";
import { useAcademy } from "./AcademyContext";

const fields = [
  { name: "name", label: "Full name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  {
    name: "programme",
    label: "Programme of interest",
    type: "select",
    required: true,
    options: [...programmes.map((p) => `${p.title} (placeholder)`), "Not sure yet"],
  },
  { name: "message", label: "Anything you would like to ask?", type: "textarea" },
];

export default function EnquirySection() {
  const { recommendedId } = useAcademy();
  const suggested = programmes.find((p) => p.id === recommendedId);

  return (
    <section id="enquire" className="scroll-mt-4 bg-graphite">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lilac">
            Enquire
          </p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            Enquire about a programme.
          </h2>
          <p className="mt-4 max-w-md text-sm text-white/70">
            This is a frontend prototype. The form checks your input and shows a
            confirmation, but nothing is stored or sent. A real endpoint is needed
            before any enquiry is collected.
          </p>

          <div
            aria-live="polite"
            className="mt-8 max-w-md rounded-2xl border border-white/15 bg-white/5 p-5 text-sm text-white/80"
          >
            {suggested ? (
              <p>
                Your learning path suggested <strong className="text-white">{suggested.title}</strong>.
                Choose it in the programme field.
              </p>
            ) : (
              <p>
                Not sure which programme fits?{" "}
                <a href="#path-finder" className="font-semibold text-lilac underline underline-offset-4">
                  Find My Learning Path
                </a>
              </p>
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-paper p-6 md:p-8">
          <SimpleForm
            fields={fields}
            submitLabel="Submit an Enquiry"
            successTitle="Prototype confirmation"
            successMessage="Thanks. This is a prototype, so your details were not stored or sent."
          />
        </div>
      </div>
    </section>
  );
}