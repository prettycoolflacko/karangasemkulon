import { useState, useRef } from "react";
import { UploadCloud, Loader2, X, ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  folder: "berita" | "galeri" | "tim" | "perangkat" | "logo" | "lainnya";
  currentImageUrl?: string | null;
  onUploadSuccess: (url: string) => void;
}

export default function ImageUpload({ folder, currentImageUrl, onUploadSuccess }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Harap pilih file gambar (JPG/PNG).");
      return;
    }

    // Buat object URL lokal untuk preview cepat sementara upload berjalan
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const token = localStorage.getItem("admin_token") || "";
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

      const res = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Upload gagal");
      }

      const data = await res.json();
      onUploadSuccess(data.url);
      setPreview(data.url); // update preview dengan path asli
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Gagal mengunggah gambar. Silakan coba lagi.");
      setPreview(currentImageUrl || null); // revert ke gambar awal jika gagal
    } finally {
      setIsUploading(false);
      // Bersihkan input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input 
        type="file" 
        accept="image/jpeg, image/png, image/webp" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileChange}
      />
      
      {preview ? (
        <div className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-video bg-gray-50 flex items-center justify-center">
          <Image 
            src={preview} 
            alt="Preview" 
            fill 
            className="object-contain" 
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
            <button
              type="button"
              disabled={isUploading}
              onClick={triggerUpload}
              className="px-4 py-2 bg-white text-gray-900 font-medium rounded-lg text-sm shadow-sm hover:bg-gray-100 flex items-center gap-2"
            >
              <UploadCloud className="w-4 h-4" />
              Ganti Gambar
            </button>
          </div>
          {isUploading && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center backdrop-blur-sm">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={triggerUpload}
          disabled={isUploading}
          className="w-full flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-300 rounded-xl p-8 hover:bg-gray-50 hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-gray-500"
        >
          {isUploading ? (
            <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
          ) : (
            <ImageIcon className="w-10 h-10 text-gray-400" />
          )}
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700">Klik untuk upload gambar</p>
            <p className="text-xs mt-1">PNG, JPG akan dikonversi ke WebP</p>
          </div>
        </button>
      )}
    </div>
  );
}
