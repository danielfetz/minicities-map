"use client";

import { MiniCity } from "@/data/cities";

interface PopupProps {
  city: MiniCity;
  onClose: () => void;
}

export default function Popup({ city, onClose }: PopupProps) {
  return (
    <div
      className="
        fixed z-50
        bottom-0 left-0 right-0 max-h-[70vh]
        md:bottom-auto md:top-1/2 md:right-5 md:left-auto md:-translate-y-1/2
        md:w-[400px] md:max-h-[600px]
        bg-black/75 backdrop-blur-md
        text-white rounded-t-2xl md:rounded-2xl
        shadow-2xl overflow-hidden
        animate-slide-up md:animate-slide-in
      "
    >
      <div className="p-6 overflow-y-auto max-h-[70vh] md:max-h-[600px]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Close"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>

        {/* City name */}
        <h2 className="text-2xl font-bold pr-8 mb-1">{city.name}</h2>

        {/* Location */}
        <p className="text-sm text-white/60 uppercase tracking-wide mb-4">
          {city.city}, {city.country}
        </p>

        {/* Meta badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/20">
            Ages {city.ageRange}
          </span>
          {city.since && (
            <span className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/20">
              Since {city.since}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-white/80 mb-6">
          {city.description}
        </p>

        {/* Visit button */}
        <a
          href={city.website}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center gap-2
            px-5 py-2.5 rounded-full
            bg-orange-500 hover:bg-orange-400
            text-white font-medium text-sm
            transition-colors
          "
        >
          Visit Website
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 13L13 1M13 1H5M13 1v8" />
          </svg>
        </a>
      </div>
    </div>
  );
}
