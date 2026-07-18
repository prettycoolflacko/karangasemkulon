import Image from "next/image";

// Real content migrated from the old vanilla site's footer.
// TODO: ganti email/nomor telepon placeholder dengan yang asli.
export default function Footer() {
  return (
    <footer className="px-6 py-12 bg-forest text-rice/80 border-t border-forest/20 relative overflow-hidden">
      {/* Footer Watermark */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 20 Q70 40 50 80 Q30 40 50 20 Z' fill='%23F5F2EB'/%3E%3C/svg%3E\")", backgroundSize: "80px" }}></div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
        <div className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-rice">Dusun Karangasem Kulon</h2>
          <p className="text-rice/80 leading-relaxed">
            Menjalin harmoni dengan alam, melestarikan budaya, dan berinovasi untuk kemandirian warga desa.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <Image src="/images/logo/logo-upn.webp" alt="Logo UPN Veteran Yogyakarta" width={40} height={40} className="opacity-70" />
            <span className="text-xs text-rice/60">Didukung oleh KKN UPN "Veteran" YK 2026</span>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-display text-xl font-bold text-rice mb-4">Hubungi Kami</h3>
          <p className="flex items-start gap-2">
            <span className="text-paddy">📍</span> Sekretariat Dusun / Balai Desa,<br/>Karangasem Kulon, Kulon Progo, DIY
          </p>
          <p className="flex items-center gap-2">
            <span className="text-paddy">✉️</span> email.kkn@placeholder.com
          </p>
          <p className="flex items-center gap-2">
            <span className="text-paddy">📱</span> +62 812-3456-7890 (Placeholder)
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="font-display text-xl font-bold text-rice mb-4">Media Sosial</h3>
          <p>
            <a href="https://instagram.com/karangasemkulon" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-paddy transition-colors">
              <span className="text-shallot">📸</span> Instagram @karangasemkulon
            </a>
          </p>
          <p>
            <a href="https://tiktok.com/@kkn.karangasemkulon" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-paddy transition-colors">
              <span className="text-shallot">🎵</span> TikTok @kkn.karangasemkulon
            </a>
          </p>
        </div>
      </div>
      
      <div className="relative z-10 text-center mt-12 pt-8 border-t border-rice/10">
        <p className="text-rice/50 text-sm tracking-wide">&copy; 2026 Dusun Karangasem Kulon. Dikelola oleh Karang Taruna.</p>
      </div>
    </footer>
  );
}
