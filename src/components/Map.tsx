"use client";

import { useEffect, useRef, useCallback } from "react";
import maplibregl from "maplibre-gl";
import { miniCities, MiniCity } from "@/data/cities";

// Inline style as primary — no external style.json fetch needed.
// Uses CARTO Positron raster tiles (free, no API key, CORS-friendly).
const MAP_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  name: "Mini Cities",
  sources: {
    carto: {
      type: "raster",
      tiles: [
        "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
        "https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
        "https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
      ],
      tileSize: 256,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      maxzoom: 20,
    },
  },
  layers: [
    {
      id: "carto-tiles",
      type: "raster",
      source: "carto",
      minzoom: 0,
      maxzoom: 20,
    },
  ],
};

interface MapProps {
  selectedCity: MiniCity | null;
  onSelectCity: (city: MiniCity | null) => void;
}

export default function Map({ selectedCity, onSelectCity }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<globalThis.Map<string, HTMLDivElement>>(
    new globalThis.Map()
  );

  const onSelectCityRef = useRef(onSelectCity);
  onSelectCityRef.current = onSelectCity;

  const updateMarkers = useCallback((activeId: string | null) => {
    markersRef.current.forEach((el, id) => {
      if (id === activeId) {
        el.classList.add("marker-active");
      } else {
        el.classList.remove("marker-active");
      }
    });
  }, []);

  const addMarkers = useCallback((map: maplibregl.Map) => {
    miniCities.forEach((city) => {
      const el = document.createElement("div");
      el.className = "city-marker";
      el.title = city.name;

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        onSelectCityRef.current(city);
      });

      markersRef.current.set(city.id, el);

      new maplibregl.Marker({ element: el, anchor: "center" })
        .setLngLat(city.coordinates)
        .addTo(map);
    });
  }, []);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: MAP_STYLE,
      center: [13, 48],
      zoom: 4,
      minZoom: 2,
      maxZoom: 18,
    });

    map.addControl(new maplibregl.NavigationControl(), "bottom-right");
    mapRef.current = map;

    // Add markers once map is ready
    map.on("load", () => addMarkers(map));

    // Also try on style load in case "load" already fired
    if (map.isStyleLoaded()) {
      addMarkers(map);
    }

    map.on("click", () => {
      onSelectCityRef.current(null);
    });

    return () => {
      map.remove();
    };
  }, [addMarkers]);

  useEffect(() => {
    updateMarkers(selectedCity?.id ?? null);

    if (selectedCity && mapRef.current) {
      mapRef.current.flyTo({
        center: selectedCity.coordinates,
        zoom: Math.max(mapRef.current.getZoom(), 6),
        duration: 800,
      });
    }
  }, [selectedCity, updateMarkers]);

  return (
    <div
      ref={mapContainer}
      className="absolute inset-0"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
