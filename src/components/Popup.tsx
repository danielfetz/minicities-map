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
        bottom-0 left-0 right-0 h-[60vh]
        md:top-0 md:right-0 md:bottom-0 md:left-auto md:h-full md:w-[400px]
        bg-white border-t md:border-t-0 md:border-l border-gray-200
        shadow-2xl
        overflow-y-auto
        animate-slide-up md:animate-slide-in
      "
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Close"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="#666"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M2 2l12 12M14 2L2 14" />
        </svg>
      </button>

      <div className="p-8 pt-6">
        {/* City name */}
        <h2 className="text-3xl font-bold text-gray-900 pr-10 mb-1 tracking-tight">
          {city.name}
        </h2>

        {/* Location */}
        <p className="text-sm text-gray-400 uppercase tracking-widest font-mono mb-5">
          {city.city}, {city.country}
        </p>

        {/* Meta badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border border-gray-200 text-gray-600">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="7" cy="5" r="3" />
              <path d="M2 13c0-2.8 2.2-5 5-5s5 2.2 5 5" />
            </svg>
            Ages {city.ageRange}
          </span>
          {city.since && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border border-gray-200 text-gray-600">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="7" cy="7" r="6" />
                <path d="M7 3v4l3 2" />
              </svg>
              Since {city.since}
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-6" />

        {/* Description */}
        <p className="text-sm leading-relaxed text-gray-600 mb-8">
          {city.description}
        </p>

        {/* Connect section */}
        <p className="text-sm font-semibold text-gray-900 mb-3">Connect</p>
        <a
          href={city.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-colors mb-8"
          title="Website"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="9" r="7.5" />
            <path d="M1.5 9h15M9 1.5c2 2.5 3 5 3 7.5s-1 5-3 7.5M9 1.5c-2 2.5-3 5-3 7.5s1 5 3 7.5" />
          </svg>
        </a>
      </div>

      {/* Sticky bottom button */}
      <div className="sticky bottom-0 p-6 pt-0 bg-gradient-to-t from-white via-white to-transparent">
        <a
          href={city.website}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center justify-center gap-2
            w-full py-3.5 rounded-full
            bg-gray-900 hover:bg-gray-800
            text-white font-medium text-sm
            transition-colors
          "
        >
          VISIT
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
