"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Setting } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save, CheckCircle } from "lucide-react";

const SETTING_LABELS: Record<string, string> = {
  contact_email: "📧 Email Kontak",
  contact_phone: "📱 Nomor Telepon",
  address: "📍 Alamat",
  instagram_url: "📸 URL Instagram",
  instagram_handle: "📸 Handle Instagram (tampilan)",
  tiktok_url: "🎵 URL TikTok",
  tiktok_handle: "🎵 Handle TikTok (tampilan)",
};

export default function AdminPengaturanPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [savedKey, setSavedKey] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<Setting[]>("/api/settings")
      .then((data) => {
        const map: Record<string, string> = {};
        data.forEach((s) => { map[s.key] = s.value ?? ""; });
        setSettings(map);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const handleSave = async (key: string) => {
    setSavingKey(key);
    try {
      const token = localStorage.getItem("admin_token") || "";
      await apiFetch(`/api/settings/${key}`, {
        method: "PUT",
        body: JSON.stringify({ value: settings[key] }),
        token,
      });
      setSavedKey(key);
      setTimeout(() => setSavedKey(null), 2000);
    } catch (e: any) {
      alert(e.message || "Gagal menyimpan");
    } finally {
      setSavingKey(null);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-muted-foreground">Memuat pengaturan...</div>;
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Pengaturan Website</h1>
        <p className="text-muted-foreground mt-1">Kelola informasi kontak dan media sosial yang tampil di footer.</p>
      </div>

      <div className="space-y-6 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        {Object.keys(SETTING_LABELS).map((key) => (
          <div key={key} className="space-y-2">
            <Label htmlFor={key}>{SETTING_LABELS[key]}</Label>
            <div className="flex gap-2">
              <Input
                id={key}
                value={settings[key] ?? ""}
                onChange={(e) => setSettings((prev) => ({ ...prev, [key]: e.target.value }))}
                placeholder={`Isi ${SETTING_LABELS[key]}...`}
              />
              <Button
                onClick={() => handleSave(key)}
                disabled={savingKey === key}
                variant={savedKey === key ? "default" : "outline"}
                className={savedKey === key ? "bg-emerald-600 text-white" : ""}
              >
                {savedKey === key ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
