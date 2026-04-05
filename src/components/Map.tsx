"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import { miniCities, MiniCity } from "@/data/cities";

// CARTO Positron vector style — allows us to control label language
const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

const citiesGeoJSON: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features: miniCities.map((city) => ({
    type: "Feature",
    properties: { cityId: city.id, name: city.name },
    geometry: {
      type: "Point",
      coordinates: city.coordinates,
    },
  })),
};

interface MapProps {
  selectedCity: MiniCity | null;
  onSelectCity: (city: MiniCity | null) => void;
}

export default function Map({ selectedCity, onSelectCity }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  const onSelectCityRef = useRef(onSelectCity);
  onSelectCityRef.current = onSelectCity;

  const selectedCityRef = useRef(selectedCity);
  selectedCityRef.current = selectedCity;

  const hoveredCityRef = useRef<string | null>(null);

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
      // Rewrite all labels to English
      map.getStyle().layers.forEach((layer) => {
        if (
          layer.type === "symbol" &&
          layer.layout &&
          "text-field" in layer.layout
        ) {
          map.setLayoutProperty(layer.id, "text-field", [
            "coalesce",
            ["get", "name:en"],
            ["get", "name"],
          ]);
        }
      });

      // Add GeoJSON source with all cities
      map.addSource("cities", {
        type: "geojson",
        data: citiesGeoJSON,
      });

      // White border ring (drawn below the fill)
      map.addLayer({
        id: "cities-border",
        type: "circle",
        source: "cities",
        paint: {
          "circle-radius": 9,
          "circle-color": "#ffffff",
          "circle-opacity": 1,
        },
      });

      // Main orange dot
      map.addLayer({
        id: "cities-fill",
        type: "circle",
        source: "cities",
        paint: {
          "circle-radius": 7,
          "circle-color": "#ff6d24",
          "circle-opacity": 1,
        },
      });

      // Active state: larger glow ring (filtered to selected city)
      map.addLayer({
        id: "cities-active-glow",
        type: "circle",
        source: "cities",
        filter: ["==", ["get", "cityId"], ""],
        paint: {
          "circle-radius": 18,
          "circle-color": "rgba(255, 109, 36, 0.2)",
          "circle-opacity": 1,
        },
      });

      // Active state: larger border
      map.addLayer({
        id: "cities-active-border",
        type: "circle",
        source: "cities",
        filter: ["==", ["get", "cityId"], ""],
        paint: {
          "circle-radius": 11,
          "circle-color": "#ffffff",
          "circle-opacity": 1,
        },
      });

      // Active state: larger fill
      map.addLayer({
        id: "cities-active-fill",
        type: "circle",
        source: "cities",
        filter: ["==", ["get", "cityId"], ""],
        paint: {
          "circle-radius": 9,
          "circle-color": "#ff4d00",
          "circle-opacity": 1,
        },
      });

      // Name labels — shown on hover or when selected
      map.addLayer({
        id: "cities-labels",
        type: "symbol",
        source: "cities",
        layout: {
          "text-field": ["get", "name"],
          "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
          "text-size": 13,
          "text-offset": [0, 1.8],
          "text-anchor": "top",
          "text-allow-overlap": true,
        },
        paint: {
          "text-color": "#1a1a1a",
          "text-halo-color": "#ffffff",
          "text-halo-width": 2,
        },
        // Initially filter to nothing — will update on hover/select
        filter: ["in", ["get", "cityId"], ["literal", []]],
      });

      // Apply selected state if one was set before map loaded
      if (selectedCityRef.current) {
        updateActiveFilter(map, selectedCityRef.current.id);
        updateLabelFilter(map, selectedCityRef.current.id, null);
      }
    });

    // Click on a city circle
    map.on("click", "cities-fill", (e) => {
      if (e.features && e.features.length > 0) {
        const cityId = e.features[0].properties?.cityId;
        const city = miniCities.find((c) => c.id === cityId) ?? null;
        onSelectCityRef.current(city);
      }
    });

    map.on("click", "cities-border", (e) => {
      if (e.features && e.features.length > 0) {
        const cityId = e.features[0].properties?.cityId;
        const city = miniCities.find((c) => c.id === cityId) ?? null;
        onSelectCityRef.current(city);
      }
    });

    // Click on empty map area → deselect
    map.on("click", (e) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["cities-fill", "cities-border"],
      });
      if (features.length === 0) {
        onSelectCityRef.current(null);
      }
    });

    // Hover: show label + pointer cursor
    map.on("mouseenter", "cities-fill", (e) => {
      map.getCanvas().style.cursor = "pointer";
      if (e.features && e.features.length > 0) {
        const cityId = e.features[0].properties?.cityId;
        hoveredCityRef.current = cityId;
        updateLabelFilter(
          map,
          selectedCityRef.current?.id ?? null,
          cityId
        );
      }
    });

    map.on("mouseleave", "cities-fill", () => {
      map.getCanvas().style.cursor = "";
      hoveredCityRef.current = null;
      updateLabelFilter(
        map,
        selectedCityRef.current?.id ?? null,
        null
      );
    });

    return () => {
      map.remove();
    };
  }, []);

  // Update active filter + flyTo when selection changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    const activeId = selectedCity?.id ?? "";
    updateActiveFilter(map, activeId);
    updateLabelFilter(map, selectedCity?.id ?? null, hoveredCityRef.current);

    if (selectedCity) {
      map.flyTo({
        center: selectedCity.coordinates,
        zoom: Math.max(map.getZoom(), 6),
        duration: 800,
      });
    }
  }, [selectedCity]);

  return (
    <div
      ref={mapContainer}
      className="absolute inset-0"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

function updateActiveFilter(map: maplibregl.Map, cityId: string) {
  const filter: maplibregl.FilterSpecification = [
    "==",
    ["get", "cityId"],
    cityId,
  ];
  map.setFilter("cities-active-glow", filter);
  map.setFilter("cities-active-border", filter);
  map.setFilter("cities-active-fill", filter);
}

function updateLabelFilter(
  map: maplibregl.Map,
  selectedId: string | null,
  hoveredId: string | null
) {
  const ids: string[] = [];
  if (selectedId) ids.push(selectedId);
  if (hoveredId && hoveredId !== selectedId) ids.push(hoveredId);

  if (ids.length === 0) {
    map.setFilter("cities-labels", ["in", ["get", "cityId"], ["literal", []]]);
  } else {
    map.setFilter("cities-labels", [
      "in",
      ["get", "cityId"],
      ["literal", ids],
    ]);
  }
}
