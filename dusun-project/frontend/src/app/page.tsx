import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-forest text-rice overflow-hidden flex flex-col items-center justify-center">
      {/* Tribuwhana Watermark Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 20 Q70 40 50 80 Q30 40 50 20 Z' fill='%23F5F2EB'/%3E%3Cpath d='M20 50 Q40 60 50 80 Q30 70 20 50 Z' fill='%23E5B32A'/%3E%3Cpath d='M80 50 Q60 60 50 80 Q70 70 80 50 Z' fill='%23E5B32A'/%3E%3C/svg%3E\")", backgroundSize: "120px" }}></div>
      
      {/* Background with glassmorphism/gradient effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/hero/wallpaper1.webp')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/80 to-transparent"></div>
        {/* Decorative blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-shallot/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-paddy/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        
        <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-rice to-paddy/80 drop-shadow-sm">
          Dusun Karangasem Kulon
        </h1>
        
        <p className="text-lg md:text-xl text-rice/90 max-w-2xl mx-auto leading-relaxed">
          Menjelajahi keindahan alam, potensi agrikultur, dan inovasi desa yang dibangun di atas semangat gotong royong masyarakat Karangasem Kulon.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link 
            href="/about" 
            className="group flex items-center justify-center px-8 py-4 text-base font-semibold text-rice bg-shallot rounded-full hover:bg-shallot-600 transition-all duration-300 shadow-[0_0_20px_rgba(139,58,98,0.4)] hover:shadow-[0_0_30px_rgba(139,58,98,0.6)] w-full sm:w-auto"
          >
            Pelajari Lebih Lanjut
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/potensi" 
            className="group flex items-center justify-center px-8 py-4 text-base font-semibold text-rice bg-forest-600/50 border border-rice/20 rounded-full hover:bg-forest-600/80 backdrop-blur-md transition-all duration-300 w-full sm:w-auto"
          >
            Potensi Lokal
          </Link>
        </div>
      </div>
    </div>
  );
}
