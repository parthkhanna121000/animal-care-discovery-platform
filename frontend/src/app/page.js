import Navbar from "@/features/animals/Navbar";
import Hero from "@/features/animals/Hero";
import ServiceCategories from "@/features/animals/ServiceCategories";
import FeaturedProviders from "@/features/animals/FeaturedProviders";
import HowItWorks from "@/features/animals/HowItWorks";
import ProviderCTA from "@/features/animals/ProviderCTA";
import TrustCommunity from "@/features/animals/TrustCommunity";
import Footer from "@/features/animals/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServiceCategories />
        <FeaturedProviders />
        <HowItWorks />
        <ProviderCTA />
        <TrustCommunity />
      </main>
      <Footer />
    </>
  );
}