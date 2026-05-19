import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { ProductsSection } from "@/components/products-section";
import { BenefitsSection } from "@/components/benefits-section";
import { WhyChooseUsSection } from "@/components/why-choose-us-section";
import { StatsSection } from "@/components/stats-section";
import { ReviewsSection } from "@/components/reviews-section";
import { FAQSection } from "@/components/faq-section";
import { NewsletterSection } from "@/components/newsletter-section";
import { Footer } from "@/components/footer";
import { FloatingCTA } from "@/components/floating-cta";
import { CarFinderSection } from "./car-finder";
// import { CarFinderSection } from "./car-finder/car-finder-section";

export default function HomePage({
  carsSection,
}: {
  carsSection?: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProductsSection />
      <CarFinderSection />
      <BenefitsSection />
      <WhyChooseUsSection />
      <StatsSection />
      <ReviewsSection />
      <FAQSection />
      <NewsletterSection />
      <Footer />
      {carsSection}
      <FloatingCTA />
    </main>
  );
}
