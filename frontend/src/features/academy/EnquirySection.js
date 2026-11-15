import SimpleForm from "@/features/animals/SimpleForm";

const fields = [
  { name: "name", label: "Full name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  {
    name: "programme",
    label: "Programme of interest",
    type: "select",
    required: true,
    options: [
      "AI Foundations (placeholder)",
      "AI for Working Professionals (placeholder)",
      "AI Builder Studio (placeholder)",
      "Not sure yet",
    ],
  },
  { name: "message", label: "Anything you'd like to ask?", type: "textarea" },
];

export default function EnquirySection() {
  return (
    <section id="enquire" className="scroll-mt-4 bg-graphite">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lilac">
            Enquire
          </p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Tell us what you want to learn.
          </h2>
          <p className="mt-4 max-w-md text-sm text-white/70">
            This is a frontend prototype. The form checks your input and shows
            a confirmation, but nothing is stored or sent. A real endpoint is
            needed before any lead is collected.
          </p>
        </div>

        <div className="rounded-2xl bg-paper p-6 md:p-8">
          <SimpleForm
            fields={fields}
            submitLabel="Send enquiry"
            successTitle="Prototype confirmation"
            successMessage="Thanks. This is a prototype, so your details were not stored or sent."
          />
        </div>
      </div>
    </section>
  );
}