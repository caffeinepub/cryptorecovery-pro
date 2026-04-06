import { ContactSection } from "@/components/ContactSection";
import { FaqSection } from "@/components/FaqSection";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { PricingSection } from "@/components/PricingSection";
import { ServicesSection } from "@/components/ServicesSection";
import { StatsBar } from "@/components/StatsBar";
import { TestimonialsSection } from "@/components/TestimonialsSection";

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <ServicesSection />
      <PricingSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
    </main>
  );
}
