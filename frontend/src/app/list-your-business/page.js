import Navbar from "@/features/animals/Navbar";
import Footer from "@/features/animals/Footer";
import SimpleForm from "@/features/animals/SimpleForm";

export const metadata = { title: "List your business | Practo for Animals" };

const fields = [
  { name: "business", label: "Business name", required: true },
  {
    name: "category",
    label: "Service type",
    type: "select",
    required: true,
    options: ["Veterinary Clinic", "Hospital", "Boarding", "Diagnostics", "Ambulance", "NGO"],
  },
  { name: "city", label: "City or area", required: true },
  { name: "email", label: "Contact email", type: "email", required: true },
  { name: "phone", label: "Phone number" },
];

export default function ListYourBusiness() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-xl px-5 py-12">
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-forest">
          List your business
        </h1>
        <p className="mb-8 mt-2 text-muted">Tell us about your service and we will be in touch.</p>
        <SimpleForm
          fields={fields}
          submitLabel="Request listing"
          successTitle="Thanks, we got your request"
          successText="In a live version, our team would review your details and contact you."
        />
      </main>
      <Footer />
    </>
  );
}