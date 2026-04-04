"use client";

import { useEffect, useRef, useCallback } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { miniCities, MiniCity } from "@/data/cities";

const MAP_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  name: "Mini Cities",
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    },
  },
  layers: [
    {
      id: "osm-tiles",
      type: "raster",
      source: "osm",
      minzoom: 0,
      maxzoom: 19,
      paint: {
        "raster-saturation": -0.3,
        "raster-brightness-min": 0.1,
        "raster-brightness-max": 0.95,
        "raster-contrast": -0.1,
      },
    },
  ],
  glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
};

interface MapProps {
  selectedCity: MiniCity | null;
  onSelectCity: (city: MiniCity | null) => void;
}

export default function Map({ selectedCity, onSelectCity }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<globalThis.Map<string, HTMLDivElement>>(new globalThis.Map());

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

    map.on("load", () => {
      miniCities.forEach((city) => {
        const el = document.createElement("div");
        el.className = "city-marker";
        el.title = city.name;

        const dot = document.createElement("div");
        dot.className = "city-marker-dot";
        el.appendChild(dot);

        const pulse = document.createElement("div");
        pulse.className = "city-marker-pulse";
        el.appendChild(pulse);

        el.addEventListener("click", (e) => {
          e.stopPropagation();
          onSelectCityRef.current(city);
        });

        markersRef.current.set(city.id, el);

        new maplibregl.Marker({ element: el })
          .setLngLat(city.coordinates)
          .addTo(map);
      });
    });

    map.on("click", () => {
      onSelectCityRef.current(null);
    });

    return () => {
      map.remove();
    };
  }, []);

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

  return <div ref={mapContainer} className="absolute inset-0" />;
}
