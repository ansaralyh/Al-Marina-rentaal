"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function CarDetailsPage() {
  const searchParams = useSearchParams();
  const idOrSlug = searchParams.get("id") || searchParams.get("slug");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  const {
    data: car,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["car-detail", idOrSlug],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/vehicles/${idOrSlug || ""}`);
      if (!res.ok) throw new Error("Failed to fetch vehicle");
      return res.json();
    },
    enabled: Boolean(idOrSlug),
  });

  const [activeTab, setActiveTab] = useState("description");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const normalizedCar = useMemo(() => {
    if (!car) return null;
    const primaryImage =
      car.images?.find?.((img) => img.isPrimary)?.url ||
      car.images?.[0]?.url ||
      car.images?.[0] ||
      car.image ||
      "/cars/1.jpg";
    
    // Build specifications object from individual fields
    const specifications = {};
    if (car.engine) specifications.engine = car.engine;
    if (car.horsepower) specifications.power = car.horsepower;
    if (car.acceleration) specifications.acceleration = car.acceleration;
    if (car.transmission) specifications.transmission = car.transmission;
    if (car.seats) specifications.seats = car.seats.toString();
    if (car.doors) specifications.doors = car.doors.toString();
    if (car.luggage) specifications.luggage = car.luggage.toString();
    if (car.fuelType) specifications.fuelType = car.fuelType;
    if (car.mileage) specifications.mileage = car.mileage;
    
    return {
      ...car,
      id: car._id || car.id,
      name: car.name || `${car.make || ""} ${car.model || ""}`.trim(),
      price: car.pricePerDay ?? car.price ?? 0,
      currency: car.currency || "د.إ",
      period: "per day",
      availability: car.availability || "Available",
      category: car.category || "Luxury",
      type: car.bodyType || car.type || "SUV",
      images:
        car.images?.map((img) => img.url || img) ??
        (car.image ? [car.image] : []),
      primaryImage,
      specifications,
      features: car.features || [],
      description: car.description || "",
      make: car.make || "",
      model: car.model || "",
    };
  }, [car]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading vehicle...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isError || !normalizedCar) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Vehicle not found</h1>
            <p className="text-gray-600 mb-6">{error?.message || "We couldn't find that vehicle."}</p>
            <Link
              href="/fleet"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Fleet
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const carData = normalizedCar;
  const images = carData.images?.length ? carData.images : [carData.primaryImage];
  const mainImage = images[selectedImageIndex] || images[0];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Hero */}
      <section
        className="relative h-72 md:h-96 text-white flex items-end mt-16"
        style={{
          backgroundImage: `url(${mainImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="w-full relative z-10 max-w-6xl mx-auto px-4 pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="uppercase text-xs md:text-sm tracking-[0.25em] text-blue-200 mb-2">
              Vehicle Details
            </p>
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{carData.name}</h1>
          </div>
          <div className="bg-yellow-500 rounded-xl px-6 py-4">
            <div className="text-md mb-1">From</div>
            <div className="text-3xl font-bold">
              {carData.price} {carData.currency}
              <span className="text-base font-medium ml-1">
                {carData.period}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: image + tabs content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main image with gallery */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Main Image */}
            <div className="relative w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mainImage}
                alt={carData.name}
                className="w-full h-[500px] object-cover"
                onError={(e) => {
                  e.target.src = '/cars/1.jpg';
                }}
              />
            </div>
            
            {/* Image Thumbnails */}
            {images.length > 1 && (
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2 overflow-x-auto">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index
                          ? 'border-blue-600 ring-2 ring-blue-200'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        alt={`${carData.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/cars/1.jpg';
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tabs like RentAnyCar: Description / Features & Options / Contact */}
          <div className="bg-white rounded-xl shadow-md">
            <div className="px-4 pt-4 flex flex-wrap gap-4 text-md font-bold">
              <button
                type="button"
                onClick={() => setActiveTab("description")}
                className={`pb-3 border-b-2 ${
                  activeTab === "description"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}>
                Vehicle Description
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("features")}
                className={`pb-3 border-b-2 ${
                  activeTab === "features"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}>
                Features &amp; Options
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("contact")}
                className={`pb-3 border-b-2 ${
                  activeTab === "contact"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}>
                Contact
              </button>
            </div>

            <div className="p-6 space-y-6 text-sm md:text-base text-gray-700 leading-relaxed">
              {activeTab === "description" && (
                <>
                  <p>{carData.description || "No description available."}</p>

                  {/* Simple spec table similar to RentAnyCar */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                      <tbody>
                        {carData.make && (
                          <tr className="bg-gray-50">
                            <th className="w-32 px-4 py-2 text-left font-semibold border-b border-gray-200">
                              Make
                            </th>
                            <td className="px-4 py-2 border-b border-gray-200">
                              {carData.make}
                            </td>
                          </tr>
                        )}
                        {carData.model && (
                          <tr>
                            <th className="px-4 py-2 text-left font-semibold border-b border-gray-200">
                              Model
                            </th>
                            <td className="px-4 py-2 border-b border-gray-200">
                              {carData.model}
                            </td>
                          </tr>
                        )}
                        {carData.year && (
                          <tr className="bg-gray-50">
                            <th className="px-4 py-2 text-left font-semibold border-b border-gray-200">
                              Year
                            </th>
                            <td className="px-4 py-2 border-b border-gray-200">
                              {carData.year}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {Object.keys(carData.specifications || {}).length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      {Object.entries(carData.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between gap-4">
                          <span className="text-gray-500 capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </span>
                          <span className="font-medium text-gray-900 text-right">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {activeTab === "features" && (
                <>
                  {carData.features && carData.features.length > 0 ? (
                    <ul className="list-disc list-inside space-y-2">
                      {carData.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No features listed for this vehicle.</p>
                  )}
                </>
              )}

              {activeTab === "contact" && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Contact Information
                    </h3>
                    <div className="space-y-3 text-gray-700">
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Address:</p>
                        <p>Empire Heights Area, Downtown, Business Bay, Dubai, UAE</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Email:</p>
                        <a
                          href="mailto:info@rentanycar.ae"
                          className="text-blue-600 hover:text-blue-800 hover:underline">
                          info@rentanycar.ae
                        </a>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Phone:</p>
                        <div className="space-y-1">
                          <a
                            href="tel:+971555660466"
                            className="block text-blue-600 hover:text-blue-800 hover:underline">
                            +971555660466
                          </a>
                          <a
                            href="tel:+971565114114"
                            className="block text-blue-600 hover:text-blue-800 hover:underline">
                            +971565114114
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: booking panel, similar to sidebar on reference site */}
        <aside className="bg-white rounded-xl shadow-md p-6 h-fit space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-1">Rental Price</h2>
            <p className="text-3xl font-bold text-blue-600">
              {carData.price} {carData.currency}
            </p>
            <p className="text-sm text-gray-500">{carData.period}</p>
          </div>

          <div className="border-t pt-4 space-y-1 text-sm text-gray-700">
            <p>Availability: {carData.availability}</p>
            <p>Free delivery within Dubai (T&C apply).</p>
            <p>Security deposit & documents required as per UAE law.</p>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <Link href="/contactus" className="w-full">
              <span className="inline-flex w-full justify-center bg-yellow-500 text-white py-2.5 rounded-md text-sm font-semibold hover:bg-yellow-600 transition-colors">
                Inquire Now
              </span>
            </Link>
            <a
              href="https://wa.me/971502093966"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full justify-center border-2 border-green-500 text-green-600 py-2.5 rounded-md text-sm font-semibold hover:bg-green-50 transition-colors">
              Chat on WhatsApp
            </a>
            <Link
              href="/fleet"
              className="inline-flex w-full justify-center text-sm text-gray-600 hover:text-gray-900">
              ← Back to Fleet
            </Link>
          </div>
        </aside>

        {/* Bottom spacer to keep layout similar in height */}
        <section className="lg:col-span-3" />
      </main>

      <Footer />
    </div>
  );
}


