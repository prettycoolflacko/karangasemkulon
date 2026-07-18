"use client";
import dynamic from "next/dynamic";
import { LocationPoint } from "@/types";

// SSR must be disabled — Leaflet uses window/document APIs
const MapClient = dynamic(() => import("./MapClient"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full bg-slate-100 animate-pulse rounded-2xl flex items-center justify-center">
      <p className="text-slate-500 font-medium">Memuat Peta...</p>
    </div>
  ),
});

export default function MapWrapper({ locations }: { locations: LocationPoint[] }) {
  return <MapClient locations={locations} />;
}
