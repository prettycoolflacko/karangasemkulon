"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
const sections = [
  { href: "/admin/berita", label: "Berita" },
  { href: "/admin/galeri", label: "Galeri" },
  { href: "/admin/video", label: "Video YouTube" },
  { href: "/admin/statistik", label: "Statistik Desa" },
  { href: "/admin/perangkat", label: "Perangkat Desa" },
  { href: "/admin/tim", label: "Tim KKN" },
  { href: "/admin/proker", label: "Timeline Proker" },
  { href: "/admin/peta", label: "Titik Peta" },
  { href: "/admin/pengaturan", label: "⚙️ Pengaturan Footer" },
];

export default function AdminDashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar dari dashboard admin?")) {
      localStorage.removeItem("admin_token");
      router.push("/admin/login");
    }
  };

  return (
    <section className="px-6 py-10 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Dashboard Utama</h1>
          <p className="text-gray-500">Kelola konten dan pengaturan website Dusun Karangasem Kulon.</p>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-xl font-medium hover:bg-red-100 hover:text-red-700 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Keluar
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => (
          <Link key={s.href} href={s.href} className="flex flex-col justify-center border border-gray-200 rounded-xl p-6 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-all shadow-sm">
            <span className="font-semibold text-lg">{s.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
