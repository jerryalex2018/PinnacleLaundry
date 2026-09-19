import Breadcrumb from "@/components/shared/Breadcrumb";
import PricingSection from "@/components/landing/PricingSection";

export default function PricingPage() {
  return (
    <div className="min-h-[70vh]">
      <Breadcrumb currentPage="Pricing" />
      <PricingSection />
    </div>
  );
}
