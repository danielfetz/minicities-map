"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { miniCities, MiniCity } from "@/data/cities";
import Popup from "@/components/Popup";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

function MapPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState<MiniCity | null>(null);

  useEffect(() => {
    const cityId = searchParams.get("city");
    if (cityId) {
      const city = miniCities.find((c) => c.id === cityId) ?? null;
      setSelectedCity(city);
    }
  }, [searchParams]);

  const handleSelectCity = (city: MiniCity | null) => {
    setSelectedCity(city);
    if (city) {
      router.replace(`?city=${city.id}`, { scroll: false });
    } else {
      router.replace("/", { scroll: false });
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Map selectedCity={selectedCity} onSelectCity={handleSelectCity} />

      {/* Title overlay */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none z-10">
        <div className="mx-4 mt-4 md:mx-6 md:mt-6">
          <div className="inline-block pointer-events-auto bg-white/80 backdrop-blur-sm rounded-xl px-5 py-3 shadow-lg">
            <h1 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">
              Mini Cities
            </h1>
            <p className="text-xs md:text-sm text-gray-500">
              Children&apos;s play cities worldwide
            </p>
          </div>
        </div>
      </div>

      {/* City count badge */}
      <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
        <span className="inline-block bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-gray-600 shadow">
          {miniCities.length} cities
        </span>
      </div>

      {/* Detail popup */}
      {selectedCity && (
        <Popup city={selectedCity} onClose={() => handleSelectCity(null)} />
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense>
      <MapPage />
    </Suspense>
  );
}
