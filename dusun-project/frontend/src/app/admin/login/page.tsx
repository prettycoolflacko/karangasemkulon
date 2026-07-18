"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const body = new URLSearchParams({ username, password });

    const res = await fetch(`${apiUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    if (!res.ok) {
      setError("Username atau password salah");
      return;
    }

    const data = await res.json();
    // TODO: store token more securely (httpOnly cookie via a route handler) before production
    localStorage.setItem("admin_token", data.access_token);
    router.push("/admin/dashboard");
  }

  return (
    <section className="px-6 py-16 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-6">Login Admin</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full border rounded px-3 py-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="w-full bg-black text-white rounded px-3 py-2" type="submit">
          Masuk
        </button>
      </form>
    </section>
  );
}
