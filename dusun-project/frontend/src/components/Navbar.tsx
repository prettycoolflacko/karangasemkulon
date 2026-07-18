"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronDown, Lock } from "lucide-react";
import { usePathname } from "next/navigation";

const mainLinks = [
  { href: "/about", label: "Tentang" },
  { href: "/potensi", label: "Potensi" },
  { href: "/statistik", label: "Statistik" },
  { href: "/berita", label: "Berita" },
  { href: "/galeri", label: "Galeri" },
  { href: "/peta", label: "Peta" },
  { href: "/kontak", label: "Kontak" },
];

const kknLinks = [
  { href: "/tim", label: "Tim KKN 2026" },
  { href: "/program-kerja", label: "Program Kerja" },
];

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Periksa ulang token setiap kali halaman berubah (agar update setelah login/logout)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("admin_token");
      setIsAdmin(!!token);
    }
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-rice/80 backdrop-blur-md border-b border-forest/10 shadow-sm text-forest">
      <Link href="/" className="flex items-center gap-3">
        <Image src="/images/logo/logo-kkn.webp" alt="Logo KKN Karangasem Kulon" width={40} height={40} className="drop-shadow-sm" />
        <span className="font-display font-bold text-xl tracking-tight">Dusun Karangasem Kulon</span>
      </Link>
      <div className="flex flex-wrap items-center gap-6 font-medium">
        {mainLinks.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-shallot transition-colors duration-200">
            {link.label}
          </Link>
        ))}
        
        {/* Dropdown Jejak KKN */}
        <div className="relative group">
          <button className="flex items-center gap-1 hover:text-shallot transition-colors duration-200 focus:outline-none">
            Jejak KKN <ChevronDown className="w-4 h-4" />
          </button>
          
          <div className="absolute right-0 top-full mt-2 w-48 bg-rice border border-forest/10 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
            <div className="flex flex-col py-2">
              <div className="px-4 py-2 text-xs font-semibold text-forest/50 uppercase tracking-wider bg-forest/5">
                Arsip Kolaborasi
              </div>
              {kknLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="px-4 py-3 hover:bg-forest/5 hover:text-shallot transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {isAdmin ? (
          <Link href="/admin/dashboard" className="ml-2 px-4 py-2 bg-shallot text-rice text-sm font-bold rounded-full shadow-md hover:bg-[#743051] transition-colors">
            Admin Panel
          </Link>
        ) : (
          <Link
            href="/admin/login"
            className="ml-2 p-2 text-forest/30 hover:text-shallot transition-colors rounded-full hover:bg-forest/5"
            title="Login Admin"
          >
            <Lock className="w-4 h-4" />
          </Link>
        )}
      </div>
    </nav>
  );
}
