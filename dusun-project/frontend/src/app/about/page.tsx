import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-rice pt-24 pb-16 relative">
      {/* Tribuwhana Watermark Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 20 Q70 40 50 80 Q30 40 50 20 Z' fill='%232C4A3B'/%3E%3Cpath d='M20 50 Q40 60 50 80 Q30 70 20 50 Z' fill='%238B3A62'/%3E%3Cpath d='M80 50 Q60 60 50 80 Q70 70 80 50 Z' fill='%238B3A62'/%3E%3C/svg%3E\")", backgroundSize: "120px" }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-forest mb-4">Tentang Desa</h1>
          <div className="h-1 w-20 bg-shallot mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] group animate-in fade-in slide-in-from-left-8 duration-1000 border border-forest/10">
            <div className="absolute inset-0 bg-forest/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
            {/* Menggunakan img biasa jika Image component belum dikonfigurasi untuk remote/local path dengan benar di next config */}
            <img 
              src="/images/tentang/kulonprogo2.webp" 
              alt="Pemandangan Karangasem Kulon" 
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
            <h2 className="font-display text-3xl font-bold text-forest">
              Dusun Karangasem Kulon
            </h2>
            <p className="text-lg text-forest/80 leading-relaxed">
              Terletak di hamparan asri <strong>Kabupaten Kulon Progo</strong>, Dusun Karangasem Kulon adalah representasi keindahan alam dan kehangatan sosial khas pedesaan Nusantara.
            </p>
            <p className="text-lg text-forest/80 leading-relaxed">
              Desa ini dikelilingi oleh bentang alam yang memukau—dari hijaunya lahan pertanian hingga rimbunnya kawasan kehutanan. Lebih dari sekadar alamnya, desa ini memiliki masyarakat yang senantiasa menjunjung tinggi nilai-nilai <strong>gotong royong</strong> serta kelestarian budaya lokal secara turun-temurun.
            </p>
            
            <div className="pt-6">
              <div className="inline-flex items-center space-x-2 bg-paddy/10 px-4 py-2 rounded-lg border border-paddy/20 text-forest font-medium">
                <svg className="w-5 h-5 text-shallot" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>Kabupaten Kulon Progo, Daerah Istimewa Yogyakarta</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
