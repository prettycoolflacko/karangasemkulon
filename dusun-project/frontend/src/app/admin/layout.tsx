"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

function isTokenValid(token: string | null): boolean {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    // Check if token has expired (payload.exp is in seconds)
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return false;
    }
    return true;
  } catch (e) {
    return false; // Invalid token format
  }
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Pengecualian untuk halaman login agar tidak terjadi infinite loop
    if (pathname === "/admin/login") {
      setIsAuthorized(true);
      return;
    }

    const token = localStorage.getItem("admin_token");

    if (!isTokenValid(token)) {
      // Hapus token jika invalid/expired
      localStorage.removeItem("admin_token");
      router.push("/admin/login");
    } else {
      setIsAuthorized(true);
    }
  }, [pathname, router]);

  // Hindari flash of protected content saat pengecekan di sisi klien,
  // sekaligus menghindari hydration mismatch dengan return null saat SSR
  // untuk rute yang dilindungi.
  if (!isAuthorized && pathname !== "/admin/login") {
    return null; 
  }

  return <>{children}</>;
}
