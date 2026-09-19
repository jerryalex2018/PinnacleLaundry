import Breadcrumb from "@/components/shared/Breadcrumb";
import HowItWorksSection from "@/components/landing/HowItWorksSection";

export default function HowItWorksPage() {
  return (
    <div className="min-h-[70vh]">
      <Breadcrumb currentPage="How It Works" />
      <HowItWorksSection />
    </div>
  );
}
