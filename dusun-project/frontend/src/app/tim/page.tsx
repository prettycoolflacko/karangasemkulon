import Image from "next/image";
import { apiFetch } from "@/lib/api";
import { TeamMember, PerangkatDesa } from "@/types";

export const dynamic = "force-dynamic";

export default async function TimPage() {
  const [team, perangkat] = await Promise.all([
    apiFetch<TeamMember[]>("/api/team"),
    apiFetch<PerangkatDesa[]>("/api/perangkat-desa"),
  ]);

  return (
    <div className="min-h-screen bg-rice pt-24 pb-16 relative">
      {/* Tribuwhana Watermark Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 20 Q70 40 50 80 Q30 40 50 20 Z' fill='%232C4A3B'/%3E%3Cpath d='M20 50 Q40 60 50 80 Q30 70 20 50 Z' fill='%238B3A62'/%3E%3Cpath d='M80 50 Q60 60 50 80 Q70 70 80 50 Z' fill='%238B3A62'/%3E%3C/svg%3E\")", backgroundSize: "120px" }}></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 space-y-24">

        {/* ── Logo & Filosofi ── */}
        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-forest mb-4">Tim Kami</h1>
          <div className="h-1 w-20 bg-shallot mx-auto rounded-full mb-10"></div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            <Image
              src="/images/logo/logo-tribuwhana.webp"
              alt="Logo Tribuwhana Akasa"
              width={180}
              height={180}
              className="drop-shadow-lg"
            />
            <Image
              src="/images/logo/filosofi-tribuwhana.webp"
              alt="Filosofi Logo Tribuwhana Akasa"
              width={480}
              height={280}
              className="rounded-2xl shadow-xl"
            />
          </div>
        </div>

        {/* ── SEKSI 1: Struktur Kepemimpinan Dusun ── */}
        <section>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-forest mb-3">Struktur Kepemimpinan Dusun</h2>
            <div className="h-1 w-16 bg-paddy mx-auto rounded-full"></div>
            <p className="text-forest/70 mt-4">Karangasem Kulon, Kalurahan Salamrejo, Kulon Progo</p>
          </div>

          {perangkat.length === 0 ? (
            <p className="text-center text-forest/50">Belum ada data — tambahkan lewat admin dashboard.</p>
          ) : (
            <div className="flex flex-wrap justify-center gap-8">
              {perangkat.map((p, index) => (
                <div
                  key={p.id}
                  className="flex flex-col items-center bg-white border border-forest/10 rounded-3xl p-6 shadow-xl shadow-forest/5 w-56 animate-in fade-in slide-in-from-bottom-8 duration-700"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {p.photo_url ? (
                    <Image
                      src={p.photo_url}
                      alt={p.name}
                      width={100}
                      height={100}
                      className="w-24 h-24 rounded-full object-cover border-4 border-paddy/30 shadow-md mb-4"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-forest/10 flex items-center justify-center mb-4 border-4 border-paddy/20">
                      <span className="text-3xl">👤</span>
                    </div>
                  )}
                  <p className="font-bold text-forest text-center">{p.name}</p>
                  <p className="text-sm text-shallot font-semibold text-center mt-1">{p.position}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── SEKSI 2: Tim KKN UPN ── */}
        <section>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-forest mb-3">Tim KKN UPN &quot;Veteran&quot; YK 2026</h2>
            <div className="h-1 w-16 bg-shallot mx-auto rounded-full"></div>
            <p className="text-forest/70 mt-4">Kelompok KKN yang bertugas mendampingi dusun</p>
          </div>

          {team.length === 0 ? (
            <p className="text-center text-forest/50">Belum ada data tim.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <div
                  key={member.id}
                  className="flex flex-col items-center bg-white border border-forest/10 rounded-2xl p-5 shadow-lg shadow-forest/5 animate-in fade-in slide-in-from-bottom-8 duration-700"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {member.photo_url ? (
                    <Image
                      src={member.photo_url}
                      alt={member.name}
                      width={120}
                      height={120}
                      className="w-24 h-24 rounded-full object-cover border-4 border-shallot/20 shadow mb-3"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-forest/10 flex items-center justify-center mb-3">
                      <span className="text-3xl">👤</span>
                    </div>
                  )}
                  <p className="font-semibold text-forest text-center text-sm">{member.name}</p>
                  <p className="text-xs text-shallot font-medium text-center mt-0.5">{member.role_in_kkn}</p>
                  {member.dedication_message && (
                    <p className="text-xs text-forest/60 text-center mt-2 italic line-clamp-2">&ldquo;{member.dedication_message}&rdquo;</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Foto Bersama ── */}
        <section className="text-center">
          <Image
            src="/images/tim/group-photo.webp"
            alt="Foto Bersama Tim KKN"
            width={1000}
            height={600}
            className="rounded-3xl mx-auto shadow-2xl shadow-forest/20"
          />
        </section>

      </div>
    </div>
  );
}
