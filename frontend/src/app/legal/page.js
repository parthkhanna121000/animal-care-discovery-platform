import Navbar from "@/features/animals/Navbar";
import Footer from "@/features/animals/Footer";

export const metadata = { title: "Privacy & Terms | Practo for Animals" };

export default function Legal() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-2xl px-5 py-12">
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-forest">
          Privacy &amp; Terms
        </h1>
        <p className="mt-4 leading-relaxed text-muted">
          This is a prototype built for an assignment. It does not collect or
          store personal data, and all listings are fictional demonstration
          data. Real privacy and terms pages will be added before any public
          launch.
        </p>
      </main>
      <Footer />
    </>
  );
}