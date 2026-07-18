import { MapPin } from "lucide-react";

export default function KontakPage() {
  return (
    <div className="min-h-screen bg-rice pt-24 pb-16 relative">
      {/* Tribuwhana Watermark Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 20 Q70 40 50 80 Q30 40 50 20 Z' fill='%232C4A3B'/%3E%3Cpath d='M20 50 Q40 60 50 80 Q30 70 20 50 Z' fill='%238B3A62'/%3E%3Cpath d='M80 50 Q60 60 50 80 Q70 70 80 50 Z' fill='%238B3A62'/%3E%3C/svg%3E\")", backgroundSize: "120px" }}></div>
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-forest mb-4">Hubungi Kami</h1>
          <div className="h-1 w-20 bg-shallot mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-forest/80 max-w-2xl mx-auto">
            Mari terhubung! Kunjungi balai desa kami atau ikuti perkembangan Dusun Karangasem Kulon melalui media sosial.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Card Kontak */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-forest/5 border border-forest/10 animate-in fade-in slide-in-from-left-8 duration-700 flex flex-col gap-10">
            
            {/* Kontak Karang Taruna */}
            <div>
              <h2 className="font-display text-2xl font-bold text-forest mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-shallot hidden sm:inline-block"></span>
                Kontak Karang Taruna
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-forest/10 p-3 rounded-xl text-forest mr-4 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-forest mb-1">Sekretariat Dusun</h3>
                    <p className="text-forest/80 text-sm leading-relaxed">
                      Balai Desa Karangasem Kulon<br/>
                      Kulon Progo, Daerah Istimewa Yogyakarta
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-shallot/10 p-3 rounded-xl text-shallot mr-4 shrink-0">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-forest mb-1">Instagram Desa</h3>
                    <a href="https://instagram.com/karangasemkulon" target="_blank" rel="noopener noreferrer" className="text-shallot hover:text-shallot-600 font-medium transition-colors text-sm">
                      @karangasemkulon
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Kontak KKN */}
            <div className="pt-8 border-t border-forest/10">
              <h2 className="font-display text-2xl font-bold text-forest mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-paddy hidden sm:inline-block"></span>
                Kontak Posko KKN
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-forest text-rice p-3 rounded-xl mr-4 shrink-0">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.61-5.66-.02-.85-.02-1.7 0-2.55.18-2.14 1.25-4.04 2.96-5.26 1.3-.96 2.87-1.5 4.49-1.52.01 1.34-.01 2.67.01 4.01-.76.06-1.51.3-2.16.71-1.18.73-1.87 2.06-1.74 3.46.12 1.32.96 2.45 2.18 2.97.97.43 2.11.41 3.05-.08 1.13-.58 1.84-1.75 1.87-3.04v-15.7z"/></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-forest mb-1">TikTok KKN</h3>
                    <a href="https://tiktok.com/@kkn.karangasemkulon" target="_blank" rel="noopener noreferrer" className="text-shallot hover:text-shallot-600 font-medium transition-colors text-sm">
                      @kkn.karangasemkulon
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-paddy/20 text-forest p-3 rounded-xl mr-4 shrink-0">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-forest mb-1">Telepon Posko</h3>
                    <p className="text-forest/80 text-sm leading-relaxed">
                      +62 812-3456-7890
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Placeholder atau Box Estetik */}
          <div className="bg-forest p-8 md:p-12 rounded-3xl shadow-xl shadow-forest/30 text-rice relative overflow-hidden animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-paddy rounded-full blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-shallot rounded-full blur-3xl opacity-30"></div>
            
            <div className="relative z-10">
              <h2 className="font-display text-2xl font-bold mb-4">Mari Berkolaborasi</h2>
              <p className="text-rice/80 mb-8 leading-relaxed">
                Punya pertanyaan tentang potensi desa, atau ingin berkolaborasi untuk memajukan perekonomian Dusun Karangasem Kulon? Kami (Karang Taruna) siap mendengar dari Anda.
              </p>
              
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                <p className="font-medium text-paddy mb-2">Jejak Kolaborasi KKN UPN 2026</p>
                <p className="text-rice text-sm mb-4 leading-relaxed">Website ini awalnya diinisiasi bersama mahasiswa KKN UPN "Veteran" Yogyakarta 2026 (Tribuwhana Akasa) sebagai bentuk pengabdian kepada bumi pertiwi.</p>
                <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="text-xs font-semibold tracking-wider uppercase text-paddy">Tribuwhana Akasa</span>
                  <a href="/tim" className="text-xs text-rice hover:text-paddy transition-colors underline">Lihat Profil Tim &rarr;</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
