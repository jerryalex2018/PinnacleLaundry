import Breadcrumb from "@/components/shared/Breadcrumb";
import TrackSearchSection from "@/components/landing/TrackSearchSection";

export default function TrackOrderPage() {
  return (
    <div className="min-h-[70vh]">
      <Breadcrumb currentPage="Track Order" />
      <TrackSearchSection />
    </div>
  );
}
