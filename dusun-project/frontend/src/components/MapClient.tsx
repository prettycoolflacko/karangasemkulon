"use client";

import { useEffect, useRef, useState } from "react";
import { LocationPoint } from "@/types";
import "leaflet/dist/leaflet.css";

// NOTE: We intentionally don't import from react-leaflet here.
// react-leaflet's MapContainer has a known "already initialized" bug in
// React 18 Strict Mode (double-invoke effects). Instead we use raw Leaflet
// and manually manage the lifecycle so the map is only ever created once and
// properly destroyed on unmount.

export default function MapClient({ locations }: { locations: LocationPoint[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Leaflet only works in the browser, so guard against SSR/hydration
    if (typeof window === "undefined") return;
    // Already mounted (StrictMode second call) — skip
    if (mapRef.current) return;

    // Dynamically import leaflet to avoid SSR issues
    import("leaflet").then((L) => {
      if (!containerRef.current) return;
      // If leaflet already attached to this div (StrictMode), remove it first
      if ((containerRef.current as any)._leaflet_id) return;

      // Fix default icon path broken by webpack
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      const defaultCenter: [number, number] =
        locations.length > 0
          ? [-7.892, 110.226] // Karangasem Kulon center
          : [-7.892, 110.226];

      const map = L.map(containerRef.current!, {
        center: defaultCenter,
        zoom: 15, // Zoom level cocok untuk dusun
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Category color mapping
      // Category color mapping with Tribuwhana Palette
      const categoryColors: Record<string, string> = {
        "Fasilitas Publik": "#2C4A3B", // Forest
        UMKM: "#E5B32A", // Paddy
        Posko: "#8B3A62", // Shallot
        Pertanian: "#CF5C36", // Ember
        "Toko Sparepart": "#743051", 
        default: "#2C4A3B", // Default to forest
      };

      locations.forEach((loc) => {
        const lat = parseFloat(loc.lat);
        const lng = parseFloat(loc.lng);
        if (isNaN(lat) || isNaN(lng)) return;

        const color = categoryColors[loc.category] ?? categoryColors.default;

        // Custom colored circle marker as SVG icon
        const svgIcon = L.divIcon({
          html: `
            <div style="
              width:32px;height:32px;
              background:${color};
              border:3px solid white;
              border-radius:50% 50% 50% 0;
              transform:rotate(-45deg);
              box-shadow:0 2px 8px rgba(0,0,0,0.25);
            "></div>
          `,
          className: "",
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -34],
        });

        L.marker([lat, lng], { icon: svgIcon })
          .addTo(map)
          .bindPopup(`
            <div style="font-family:'Plus Jakarta Sans', sans-serif;min-width:160px;">
              <strong style="font-size:15px;color:#2C4A3B;font-family:'Fraunces', serif;">${loc.name}</strong><br/>
              <span style="display:inline-block;margin:6px 0;background:${color}22;color:${color};border:1px solid ${color}55;border-radius:999px;padding:3px 12px;font-size:12px;font-weight:600;">${loc.category}</span>
              ${loc.description ? `<p style="font-size:13px;color:#2C4A3B;margin-top:4px;opacity:0.8;">${loc.description}</p>` : ""}
            </div>
          `);
      });

      mapRef.current = map;
      setReady(true);
    });

    // Cleanup on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative">
      {!ready && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-rice rounded-3xl">
          <div className="text-center space-y-2">
            <div className="w-10 h-10 border-4 border-shallot border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-forest/70 text-sm font-medium">Memuat Peta Dusun...</p>
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        className="h-[550px] w-full rounded-3xl overflow-hidden shadow-xl shadow-forest/5 border border-forest/10"
      />
    </div>
  );
}
