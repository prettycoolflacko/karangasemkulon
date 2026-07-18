export const dynamic = "force-dynamic";

import { apiFetch } from "@/lib/api";
import { LocationPoint } from "@/types";
import { MapPin } from "lucide-react";
import MapWrapper from "@/components/MapWrapper";

export default async function PetaPage() {
  let locations: LocationPoint[] = [];
  try {
    locations = await apiFetch<LocationPoint[]>("/api/locations");
  } catch (error) {
    console.error("Failed to load map data");
  }

  return (
    <div className="min-h-screen bg-rice pt-24 pb-16 relative overflow-hidden">
      {/* Tribuwhana Watermark Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 20 Q70 40 50 80 Q30 40 50 20 Z' fill='%232C4A3B'/%3E%3Cpath d='M20 50 Q40 60 50 80 Q30 70 20 50 Z' fill='%238B3A62'/%3E%3Cpath d='M80 50 Q60 60 50 80 Q70 70 80 50 Z' fill='%238B3A62'/%3E%3C/svg%3E\")", backgroundSize: "120px" }}></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center bg-forest/10 text-forest p-3 rounded-2xl mb-4">
            <MapPin className="w-8 h-8" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-forest mb-4">Peta Interaktif</h1>
          <div className="h-1 w-20 bg-shallot mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-forest/80 max-w-2xl mx-auto">
            Jelajahi berbagai fasilitas publik, potensi lokal, titik UMKM, dan lokasi strategis lainnya di Dusun Karangasem Kulon.
          </p>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          <MapWrapper locations={locations} />
        </div>
        
      </div>
    </div>
  );
}
