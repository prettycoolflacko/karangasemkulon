import { apiFetch } from "@/lib/api";
import { News } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function BeritaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Wait for the dynamic params to resolve in Next.js 15
  const resolvedParams = await params;
  
  let newsItem: News;
  try {
    newsItem = await apiFetch<News>(`/api/news/${resolvedParams.slug}`);
  } catch (error) {
    notFound();
  }

  // Format date
  const dateObj = newsItem.published_at;
  const formattedDate = dateObj 
    ? new Date(dateObj).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Baru saja";

  return (
    <div className="min-h-screen bg-rice pt-24 pb-16 relative">
      {/* Tribuwhana Watermark Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 20 Q70 40 50 80 Q30 40 50 20 Z' fill='%232C4A3B'/%3E%3Cpath d='M20 50 Q40 60 50 80 Q30 70 20 50 Z' fill='%238B3A62'/%3E%3Cpath d='M80 50 Q60 60 50 80 Q70 70 80 50 Z' fill='%238B3A62'/%3E%3C/svg%3E\")", backgroundSize: "120px" }}></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <Link href="/berita" className="inline-flex items-center gap-2 text-forest/70 hover:text-shallot transition-colors mb-8 font-medium">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Daftar Berita
        </Link>
        
        <article className="bg-white rounded-3xl shadow-xl shadow-forest/5 border border-forest/10 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
          {newsItem.cover_image && (
            <div className="w-full aspect-[21/9] relative bg-forest/5">
              <Image
                src={newsItem.cover_image}
                alt={newsItem.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
              />
            </div>
          )}
          
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-2 text-forest/60 text-sm font-medium mb-4">
              <Calendar className="w-4 h-4" />
              <time>{formattedDate}</time>
            </div>
            
            <h1 className="font-display text-3xl md:text-4xl font-bold text-forest mb-8 leading-tight">
              {newsItem.title}
            </h1>
            
            <div className="prose prose-lg prose-p:text-forest/80 prose-headings:text-forest prose-headings:font-display prose-a:text-shallot prose-strong:text-forest max-w-none whitespace-pre-wrap">
              {newsItem.content}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
