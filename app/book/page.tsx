"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Shirt,
  Flame,
  Layers,
  PackageCheck,
  Camera,
  Upload,
  Truck,
  MapPin,
  Copy,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const STEPS = ["Service", "Quantity", "Photos", "Collection", "Review"];

export default function BookLaundryPage() {
  const router = useRouter();
  const supabase = createClient();
  const [currentStep, setCurrentStep] = useState(1);

  // Hidden inputs for camera capture & file picking
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [services, setServices] = useState<string[]>(["washing"]);
  const [weightKg, setWeightKg] = useState<number>(3);
  const [isCustomWeight, setIsCustomWeight] = useState<boolean>(false);
  const [customWeightInput, setCustomWeightInput] = useState<string>("");
  const [photos, setPhotos] = useState<
    { id: string; url: string; file: File }[]
  >([]);
  const [collectionMethod, setCollectionMethod] = useState<
    "pickup" | "dropoff"
  >("pickup");
  const [phone, setPhone] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [pickupCoords, setPickupCoords] = useState<{
    lat: number | null;
    lng: number | null;
  }>({
    lat: null,
    lng: null,
  });
  const [locationStatus, setLocationStatus] = useState<
    "idle" | "getting" | "success" | "denied"
  >("idle");
  const [copiedTill, setCopiedTill] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Load existing user profile phone if logged in
  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("phone")
          .eq("id", user.id)
          .single();
        if (profile?.phone) setPhone(profile.phone);
      }
    }
    loadUser();
  }, [supabase]);

  // Pricing calculation
  const pricePerKg = 50;
  const activeWeight = isCustomWeight
    ? parseFloat(customWeightInput) || 0
    : weightKg;
  const estimatedTotal = Math.round(activeWeight * pricePerKg);

  // --- Photos Handlers ---
  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newPhotos = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substring(7),
      url: URL.createObjectURL(file),
      file,
    }));

    setPhotos((prev) => [...prev, ...newPhotos]);
    e.target.value = ""; // Reset input so same photo or next capture works seamlessly
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  // --- Location Handler ---
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setLocationStatus("getting");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPickupCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLocationStatus("success");
      },
      () => setLocationStatus("denied"),
      { enableHighAccuracy: true },
    );
  };

  // --- Step Validation Guards ---
  const isStepValid = (): boolean => {
    switch (currentStep) {
      case 1:
        // Must select at least 1 service
        return services.length > 0;
      case 2:
        // Must have valid weight > 0
        return isCustomWeight
          ? parseFloat(customWeightInput) > 0
          : weightKg > 0;
      case 3:
        // Must have taken or uploaded at least 1 photo
        return photos.length > 0;
      case 4:
        // If pickup, phone is mandatory
        if (collectionMethod === "pickup") {
          return phone.trim().length >= 9;
        }
        return true;
      case 5:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isStepValid()) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  // --- Final Booking Submission ---
  const handleConfirmBooking = async () => {
    setSubmitting(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const bookingPayload = {
      services,
      weightKg: activeWeight,
      collectionMethod,
      phone,
      instructions,
      photosCount: photos.length,
      latitude: pickupCoords.lat,
      longitude: pickupCoords.lng,
    };

    if (!user) {
      // Stash booking and send to login/signup
      localStorage.setItem("pending_booking", JSON.stringify(bookingPayload));
      router.push("/login?redirect=/dashboard");
      return;
    }

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });

      if (!res.ok) throw new Error("Booking failed");
      router.push("/dashboard");
    } catch (err: any) {
      alert(err.message || "Failed to submit booking");
    } finally {
      setSubmitting(false);
    }
  };

  const copyTillNumber = () => {
    navigator.clipboard.writeText("522522");
    setCopiedTill(true);
    setTimeout(() => setCopiedTill(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      {/* Hidden File & Native Camera Inputs */}
      <input
        type="file"
        ref={cameraInputRef}
        accept="image/*"
        capture="environment"
        multiple
        className="hidden"
        onChange={handlePhotoCapture}
      />
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        multiple
        className="hidden"
        onChange={handlePhotoCapture}
      />

      {/* Stepper Header */}
      <header className="bg-white border-b border-slate-100 py-4 px-6 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#0088cc] text-white flex items-center justify-center font-bold text-sm">
              P
            </div>
            <span className="font-bold text-slate-800 text-sm leading-tight hidden sm:block">
              Pinnacle
              <br />
              Laundry
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4 text-xs font-medium">
            {STEPS.map((step, idx) => {
              const stepNumber = idx + 1;
              const isCompleted = stepNumber < currentStep;
              const isActive = stepNumber === currentStep;

              return (
                <div key={step} className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                      isCompleted
                        ? "bg-emerald-500 text-white"
                        : isActive
                          ? "bg-[#0088cc] text-white ring-4 ring-sky-100"
                          : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    ) : (
                      stepNumber
                    )}
                  </div>
                  <span
                    className={`hidden md:inline ${
                      isActive
                        ? "text-[#0088cc] font-semibold"
                        : "text-slate-500"
                    }`}
                  >
                    {step}
                  </span>
                  {stepNumber < STEPS.length && (
                    <div className="w-4 sm:w-8 h-[2px] bg-slate-200" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </header>

      {/* Stepper Body */}
      <main className="flex-1 max-w-2xl w-full mx-auto p-4 sm:p-8">
        {/* STEP 1: SERVICES */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Select Services
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Choose what you need done. Select all that apply.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  id: "washing",
                  name: "Washing",
                  price: "KSh 50/kg",
                  icon: Shirt,
                  color: "text-sky-500 bg-sky-50",
                },
                {
                  id: "ironing",
                  name: "Ironing",
                  icon: Flame,
                  color: "text-emerald-500 bg-emerald-50",
                },
                {
                  id: "folding",
                  name: "Folding",
                  icon: Layers,
                  color: "text-purple-500 bg-purple-50",
                },
                {
                  id: "blankets",
                  name: "Blankets",
                  price: "KSh 250/each",
                  icon: PackageCheck,
                  color: "text-amber-500 bg-amber-50",
                },
              ].map((srv) => {
                const checked = services.includes(srv.id);
                return (
                  <div
                    key={srv.id}
                    onClick={() => {
                      setServices((prev) =>
                        checked
                          ? prev.filter((s) => s !== srv.id)
                          : [...prev, srv.id],
                      );
                    }}
                    className={`p-5 rounded-2xl border cursor-pointer flex flex-col justify-between transition-all select-none ${
                      checked
                        ? "border-[#0088cc] bg-sky-50/20 shadow-sm"
                        : "border-slate-100 bg-white hover:border-slate-200"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${srv.color}`}
                      >
                        <srv.icon className="w-5 h-5" />
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                          checked
                            ? "bg-[#0088cc] border-[#0088cc] text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {checked && (
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-800">
                        {srv.name}
                      </p>
                      {srv.price && (
                        <p className="text-xs font-semibold text-[#0088cc] mt-0.5">
                          {srv.price}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: QUANTITY & CUSTOM INPUT */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Laundry Quantity
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Estimate your laundry weight. Final price is confirmed after
                weighing.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 space-y-4">
              <label className="text-xs font-bold text-slate-800">
                Laundry Weight
              </label>

              <div className="grid grid-cols-3 gap-3">
                {[0.5, 1, 2, 3, 5, 10].map((kg) => (
                  <button
                    key={kg}
                    type="button"
                    onClick={() => {
                      setIsCustomWeight(false);
                      setWeightKg(kg);
                    }}
                    className={`py-3 rounded-xl border text-xs font-bold transition-all ${
                      !isCustomWeight && weightKg === kg
                        ? "border-[#0088cc] text-[#0088cc] bg-sky-50/40"
                        : "border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {kg} kg
                  </button>
                ))}
              </div>

              {/* Custom Weight Selector Button */}
              <button
                type="button"
                onClick={() => setIsCustomWeight(true)}
                className={`w-full py-3 rounded-xl border text-xs font-bold transition-all ${
                  isCustomWeight
                    ? "border-[#0088cc] text-[#0088cc] bg-sky-50/40"
                    : "border-slate-200 text-slate-700 hover:border-slate-300"
                }`}
              >
                Custom Weight
              </button>

              {/* Custom Weight Input Box */}
              {isCustomWeight && (
                <div className="pt-2">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Enter Exact Weight (Kg)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      min="0.5"
                      placeholder="e.g. 7.5"
                      value={customWeightInput}
                      onChange={(e) => setCustomWeightInput(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-[#0088cc] outline-none"
                    />
                    <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 font-bold">
                      kg
                    </span>
                  </div>
                </div>
              )}

              <div className="pt-2 flex justify-between text-xs text-slate-500 border-t border-slate-100 mt-4">
                <span>
                  {activeWeight} kg × KSh {pricePerKg}
                </span>
                <span className="font-bold text-slate-800">
                  KSh {estimatedTotal}
                </span>
              </div>
            </div>

            <div className="bg-sky-50/50 border border-sky-100 p-5 rounded-2xl flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Estimated Total
                </p>
                <p className="text-[11px] text-amber-600 mt-0.5">
                  ⓘ Estimated price — final amount confirmed after weighing.
                </p>
              </div>
              <span className="text-xl font-extrabold text-[#0088cc]">
                KSh {estimatedTotal}
              </span>
            </div>
          </div>
        )}

        {/* STEP 3: SHOW US YOUR LAUNDRY (CAMERA PILE) */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Show Us Your Laundry
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Take photos of your clothes so our team can identify your order.
              </p>
              <p className="text-xs text-[#0088cc] font-medium mt-0.5">
                Make sure the clothes are clearly visible.
              </p>
            </div>

            {/* Camera & Upload Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="border-2 border-dashed border-sky-400 bg-sky-50/20 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-sky-50/40 transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0088cc] text-white flex items-center justify-center shadow-sm">
                  <Camera className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-800">
                  Take Photo with Phone
                </span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-200 bg-white rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-slate-50 transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
                  <Upload className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-800">
                  Upload From Device
                </span>
              </button>
            </div>

            {/* Piled Photos Gallery */}
            {photos.length > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-700">
                    Piled Photos ({photos.length})
                  </span>
                  <span className="text-[11px] text-emerald-600 font-medium">
                    ✓ Ready for submission
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-slate-100">
                  {photos.map((photo) => (
                    <div
                      key={photo.id}
                      className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200"
                    >
                      <img
                        src={photo.url}
                        alt="Laundry"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(photo.id)}
                        className="absolute top-1 right-1 w-6 h-6 bg-rose-600 text-white rounded-full flex items-center justify-center opacity-90 hover:opacity-100 transition shadow"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 bg-sky-50/60 border border-sky-100 rounded-xl text-xs text-sky-800">
              Your laundry photos are used only to help identify and process
              your order. They are visible only to authorized Pinnacle staff.
            </div>
          </div>
        )}

        {/* STEP 4: COLLECTION & PRECISE GPS */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                How Would You Like to Receive Your Laundry?
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Choose your preferred collection method.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setCollectionMethod("pickup")}
                className={`p-5 rounded-2xl border cursor-pointer transition-all select-none ${
                  collectionMethod === "pickup"
                    ? "border-[#0088cc] bg-white shadow-sm"
                    : "border-slate-200 bg-white opacity-70"
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center mb-3">
                  <Truck className="w-5 h-5" />
                </div>
                <p className="text-sm font-bold text-slate-900">
                  Request Pickup
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Pinnacle crew collects clothes from your location.
                </p>
                {collectionMethod === "pickup" && (
                  <p className="text-xs font-bold text-[#0088cc] mt-3">
                    ✓ Selected
                  </p>
                )}
              </div>

              <div
                onClick={() => setCollectionMethod("dropoff")}
                className={`p-5 rounded-2xl border cursor-pointer transition-all select-none ${
                  collectionMethod === "dropoff"
                    ? "border-[#0088cc] bg-white shadow-sm"
                    : "border-slate-200 bg-white opacity-70"
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center mb-3">
                  <MapPin className="w-5 h-5" />
                </div>
                <p className="text-sm font-bold text-slate-900">
                  Manual Drop-Off / Retrieval
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Bring laundry to Pinnacle or collect manually.
                </p>
                {collectionMethod === "dropoff" && (
                  <p className="text-xs font-bold text-[#0088cc] mt-3">
                    ✓ Selected
                  </p>
                )}
              </div>
            </div>

            {/* Pickup Specific Sub-Form */}
            {collectionMethod === "pickup" && (
              <div className="bg-white p-5 rounded-2xl border border-slate-100 space-y-4">
                <p className="text-xs font-bold text-slate-800">
                  Pickup Details
                </p>

                {/* Map with Interactive GPS Pinning */}
                <div className="h-32 bg-sky-50/80 rounded-xl border border-sky-100 flex flex-col items-center justify-center relative p-3">
                  <MapPin className="w-6 h-6 text-[#0088cc]" />
                  <span className="text-xs font-semibold text-slate-700 mt-1">
                    {locationStatus === "success"
                      ? `Pinned: ${pickupCoords.lat?.toFixed(4)}, ${pickupCoords.lng?.toFixed(4)}`
                      : "Near Student Center"}
                  </span>

                  <button
                    type="button"
                    onClick={handleGetLocation}
                    className={`absolute bottom-3 left-3 px-3 py-1.5 rounded-lg text-xs font-bold border transition shadow-sm flex items-center gap-1.5 ${
                      locationStatus === "success"
                        ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {locationStatus === "success" ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Location Updated
                      </>
                    ) : locationStatus === "getting" ? (
                      "Detecting GPS..."
                    ) : (
                      "📍 Use My Current Location"
                    )}
                  </button>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Your Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0793002308"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0088cc] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Pickup Instructions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Hostel / block / room number or building name..."
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0088cc] outline-none resize-none"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 5: REVIEW */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Review Your Order
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Confirm your booking details before proceeding.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100 text-xs">
              <div className="p-4">
                <span className="text-slate-400 block mb-1">Services</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {services.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-0.5 bg-sky-50 text-[#0088cc] rounded-md font-bold capitalize"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 flex justify-between items-center">
                <div>
                  <span className="text-slate-400 block mb-1">Laundry</span>
                  <span className="font-bold text-slate-800">
                    {activeWeight} kg × KSh {pricePerKg}
                  </span>
                </div>
                <span className="font-bold text-slate-800 text-sm">
                  KSh {estimatedTotal}
                </span>
              </div>

              <div className="p-4">
                <span className="text-slate-400 block mb-1">Photos</span>
                <span className="font-bold text-slate-800">
                  {photos.length} photos added
                </span>
              </div>

              <div className="p-4">
                <span className="text-slate-400 block mb-1">
                  Collection Method
                </span>
                <span className="font-bold text-slate-800 capitalize">
                  {collectionMethod === "pickup"
                    ? "Pickup Requested"
                    : "Manual Drop-off"}
                </span>
                {collectionMethod === "pickup" && phone && (
                  <span className="block text-slate-500 text-[11px] mt-0.5">
                    Contact: {phone}
                  </span>
                )}
              </div>

              <div className="p-4 flex justify-between items-center bg-slate-50/50">
                <div>
                  <span className="font-bold text-slate-800">
                    Estimated Total
                  </span>
                  <span className="text-[11px] text-amber-600 block">
                    Final amount confirmed after weighing
                  </span>
                </div>
                <span className="text-xl font-extrabold text-[#0088cc]">
                  KSh {estimatedTotal}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-3">
              <p className="text-xs font-bold text-slate-800">
                Payment via M-Pesa
              </p>

              <div className="bg-emerald-50/60 border border-emerald-200/60 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">
                    M-Pesa Till Number
                  </p>
                  <p className="text-lg font-extrabold text-emerald-800 tracking-wider">
                    522522
                  </p>
                  <p className="text-[10px] text-amber-600">
                    Placeholder — real number to be added
                  </p>
                </div>
                <button
                  type="button"
                  onClick={copyTillNumber}
                  className="px-3 py-1.5 bg-white border border-emerald-300 rounded-lg text-xs font-bold text-emerald-700 flex items-center gap-1 shadow-sm"
                >
                  <Copy className="w-3 h-3" /> {copiedTill ? "Copied" : "Copy"}
                </button>
              </div>

              <ol className="list-decimal list-inside text-[11px] text-slate-600 space-y-1 pl-1">
                <li>Open M-Pesa</li>
                <li>Select Lipa na M-Pesa</li>
                <li>Select Buy Goods and Services</li>
                <li>Enter the Pinnacle Till Number</li>
                <li>Enter KSh {estimatedTotal} (estimated)</li>
                <li>Confirm payment and save the code</li>
              </ol>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="mt-8 flex items-center justify-between pt-4">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <Link
              href="/"
              className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Home
            </Link>
          )}

          {currentStep < 5 ? (
            <button
              type="button"
              disabled={!isStepValid()}
              onClick={handleNext}
              className="px-6 py-3 rounded-full bg-[#0088cc] hover:bg-[#0077b3] disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-all"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={submitting}
              onClick={handleConfirmBooking}
              className="px-8 py-3.5 rounded-full bg-[#0088cc] hover:bg-[#0077b3] disabled:bg-slate-300 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              {submitting ? "Processing..." : "Confirm Booking"}{" "}
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
