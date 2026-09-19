import Breadcrumb from "@/components/shared/Breadcrumb";
import ServicesSection from "@/components/landing/ServicesSection";

export default function ServicesPage() {
  return (
    <div className="min-h-[70vh]">
      <Breadcrumb currentPage="Services" />
      <ServicesSection />
    </div>
  );
}
