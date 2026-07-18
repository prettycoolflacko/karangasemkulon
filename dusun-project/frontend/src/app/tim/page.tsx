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
    <section className="px-6 py-10 max-w-3xl mx-auto">
      {/* Logo & filosofi — migrated from old site, images are static (not admin-managed) */}
      <div className="text-center mb-12">
        <h1 className="text-2xl font-bold mb-4">Logo Tribuwhana Akasa</h1>
        <Image
          src="/images/logo/logo-tribuwhana.webp"
          alt="Logo Tribuwhana Akasa"
          width={200}
          height={200}
          className="mx-auto"
        />
        <h2 className="text-xl font-semibold mt-8 mb-4">Filosofi Logo</h2>
        <Image
          src="/images/logo/filosofi-tribuwhana.webp"
          alt="Filosofi Logo Tribuwhana Akasa"
          width={500}
          height={300}
          className="mx-auto"
        />
      </div>

      <h2 className="text-xl font-semibold mb-6 text-center">Profil Tim</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {team.map((member) => (
          <div key={member.id} className="text-center">
            {member.photo_url && (
              <Image src={member.photo_url} alt={member.name} width={150} height={150} className="rounded mx-auto mb-2" />
            )}
            <p className="font-semibold">{member.name}</p>
            <p className="text-sm text-gray-500">{member.role_in_kkn}</p>
          </div>
        ))}
      </div>
      {/* TODO: kalau tim belum di-seed, jalankan backend/seed_content.py */}

      <h2 className="text-xl font-semibold mt-12 mb-4">Perangkat Desa</h2>
      {perangkat.length === 0 && (
        <p className="text-gray-400 text-sm">Belum ada data — tambahkan lewat admin dashboard.</p>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {perangkat.map((p) => (
          <div key={p.id} className="text-center">
            <p className="font-semibold">{p.name}</p>
            <p className="text-sm text-gray-500">{p.position}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <Image
          src="/images/tim/group-photo.webp"
          alt="Foto Bersama Tim KKN"
          width={900}
          height={500}
          className="rounded mx-auto"
        />
      </div>
    </section>
  );
}
