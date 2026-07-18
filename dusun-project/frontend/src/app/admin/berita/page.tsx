"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ImageUpload from "@/components/ImageUpload";

interface News {
  id: number;
  title: string;
  slug: string;
  content: string;
  cover_image: string | null;
  published_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export default function AdminBeritaPage() {
  const [news, setNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    cover_image: "",
  });

  const fetchNews = async () => {
    try {
      const data = await apiFetch<News[]>("/api/news");
      setNews(data);
    } catch (e: any) {
      console.error(e);
      alert(e.message || "Gagal memuat berita");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const openCreateDialog = () => {
    setEditingNews(null);
    setFormData({ title: "", slug: "", content: "", cover_image: "" });
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: News) => {
    setEditingNews(item);
    setFormData({
      title: item.title,
      slug: item.slug,
      content: item.content,
      cover_image: item.cover_image || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus berita ini?")) return;
    try {
      const token = localStorage.getItem("admin_token") || "";
      await apiFetch(`/api/news/${id}`, { method: "DELETE", token });
      setNews((prev) => prev.filter((n) => n.id !== id));
    } catch (e: any) {
      alert(e.message || "Gagal menghapus berita");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("admin_token") || "";
      const payload = { 
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        cover_image: formData.cover_image || null
      };
      
      if (editingNews) {
        await apiFetch(`/api/news/${editingNews.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
          token,
        });
      } else {
        await apiFetch(`/api/news`, {
          method: "POST",
          body: JSON.stringify(payload),
          token,
        });
      }
      setIsDialogOpen(false);
      fetchNews();
    } catch (e: any) {
      alert(e.message || "Gagal menyimpan berita");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => {
      // Auto-generate slug when creating if the slug matches the previous title
      const oldSlug = prev.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
      if (!editingNews && (prev.slug === oldSlug || prev.slug === "")) {
        return {
          ...prev,
          title,
          slug: title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")
        };
      }
      return { ...prev, title };
    });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Kelola Berita</h1>
        <Button onClick={openCreateDialog}>Tambah Berita</Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingNews ? "Edit Berita" : "Tambah Berita"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Judul Berita</Label>
              <Input
                id="title"
                name="title"
                placeholder="Contoh: Kegiatan KKN Desa..."
                value={formData.title}
                onChange={handleTitleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL)</Label>
              <Input
                id="slug"
                name="slug"
                placeholder="contoh-kegiatan-kkn-desa"
                value={formData.slug}
                onChange={handleChange}
                required
              />
              <p className="text-xs text-muted-foreground">URL ramah mesin pencari, gunakan huruf kecil dan strip (-).</p>
            </div>

            <div className="space-y-2">
              <Label>Cover Image (Opsional)</Label>
              <ImageUpload
                folder="berita"
                currentImageUrl={formData.cover_image}
                onUploadSuccess={(url) => setFormData(prev => ({ ...prev, cover_image: url }))}
              />
              <p className="text-xs text-muted-foreground mt-1 text-center">Path saat ini: {formData.cover_image || "Belum ada gambar"}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Konten Berita</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Tulis isi berita di sini..."
                value={formData.content}
                onChange={handleChange}
                required
                rows={10}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Batal
              </Button>
              <Button type="submit">Simpan</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {isLoading ? (
        <div className="py-8 text-center text-muted-foreground">Memuat data...</div>
      ) : (
        <div className="border rounded-md bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {news.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    Belum ada berita.
                  </TableCell>
                </TableRow>
              ) : (
                news.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium max-w-[200px] truncate">{item.title}</TableCell>
                    <TableCell className="max-w-[150px] truncate">{item.slug}</TableCell>
                    <TableCell>
                      {item.created_at ? new Date(item.created_at).toLocaleDateString("id-ID") : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="mr-2"
                        onClick={() => openEditDialog(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        Hapus
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
