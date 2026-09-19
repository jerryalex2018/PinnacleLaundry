import Hero from "@/components/landing/Hero";
import ServicesSection from "@/components/landing/ServicesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import WhyChooseSection from "@/components/landing/WhyChooseSection";
import PricingSection from "@/components/landing/PricingSection";
import TrackSearchSection from "@/components/landing/TrackSearchSection";
import ContactCards from "@/components/landing/ContactCards";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <HowItWorksSection />
      <WhyChooseSection />
      <PricingSection />
      <TrackSearchSection />
      <ContactCards />
    </>
  );
}
