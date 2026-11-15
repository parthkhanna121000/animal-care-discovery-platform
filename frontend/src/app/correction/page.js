import Navbar from "@/features/animals/Navbar";
import Footer from "@/features/animals/Footer";
import SimpleForm from "@/features/animals/SimpleForm";
import { providers } from "@/data/providers";

export const metadata = { title: "Submit a correction | Practo for Animals" };

const fields = [
  {
    name: "provider",
    label: "Which listing?",
    type: "select",
    required: true,
    options: providers.map((p) => p.name),
  },
  { name: "details", label: "What is incorrect?", type: "textarea", required: true },
  { name: "email", label: "Your email (optional)", type: "email" },
];

export default function Correction() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-xl px-5 py-12">
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-forest">
          Submit a correction
        </h1>
        <p className="mb-8 mt-2 text-muted">Help us keep listings accurate.</p>
        <SimpleForm
          fields={fields}
          submitLabel="Send correction"
          successTitle="Thanks for helping"
          successText="In a live version, this would go to our review queue."
        />
      </main>
      <Footer />
    </>
  );
}