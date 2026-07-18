import { apiFetch } from "@/lib/api";
import { News } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BeritaPage() {
  const news = await apiFetch<News[]>("/api/news");

  return (
    <div className="min-h-screen bg-rice pt-24 pb-16 relative">
      {/* Tribuwhana Watermark Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 20 Q70 40 50 80 Q30 40 50 20 Z' fill='%232C4A3B'/%3E%3Cpath d='M20 50 Q40 60 50 80 Q30 70 20 50 Z' fill='%238B3A62'/%3E%3Cpath d='M80 50 Q60 60 50 80 Q70 70 80 50 Z' fill='%238B3A62'/%3E%3C/svg%3E\")", backgroundSize: "120px" }}></div>
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-forest mb-4">Berita &amp; Kegiatan</h1>
          <div className="h-1 w-20 bg-shallot mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-forest/80 max-w-2xl mx-auto">
            Informasi terbaru seputar kegiatan, pengumuman, dan dinamika warga Dusun Karangasem Kulon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, index) => {
            const dateObj = item.published_at;
            const formattedDate = dateObj 
              ? new Date(dateObj).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
              : "Baru saja";

            return (
              <Link 
                href={`/berita/${item.slug}`} 
                key={item.id} 
                className={`bg-white rounded-3xl overflow-hidden shadow-xl shadow-forest/5 border border-forest/10 hover:shadow-2xl hover:shadow-shallot/10 transition-all duration-300 group flex flex-col animate-in fade-in slide-in-from-bottom-8`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-full aspect-[4/3] relative bg-forest/5 overflow-hidden">
                  {item.cover_image ? (
                    <Image
                      src={item.cover_image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-forest/30 font-display text-lg">
                      Tanpa Gambar
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-forest/50 text-xs font-semibold mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    <time>{formattedDate}</time>
                  </div>
                  
                  <h2 className="font-display text-xl font-bold text-forest mb-3 line-clamp-2 group-hover:text-shallot transition-colors">
                    {item.title}
                  </h2>
                  
                  <p className="text-forest/70 text-sm line-clamp-3 mb-4 flex-grow">
                    {item.content}
                  </p>
                  
                  <div className="text-shallot text-sm font-semibold mt-auto flex items-center gap-1 group-hover:gap-2 transition-all">
                    Baca selengkapnya <span aria-hidden="true">&rarr;</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        
        {news.length === 0 && (
          <div className="text-center py-20 bg-white/50 rounded-3xl border border-forest/10 backdrop-blur-sm">
            <p className="text-forest/60 text-lg">Belum ada berita yang diterbitkan.</p>
          </div>
        )}
      </div>
    </div>
  );
}
