"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Video {
  id: number;
  title: string;
  youtube_id: string;
  description: string | null;
  created_at: string | null;
}

export default function AdminVideoPage() {
  const [items, setItems] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Video | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    youtube_id: "",
    description: "",
  });

  const fetchItems = async () => {
    try {
      const data = await apiFetch<Video[]>("/api/videos");
      setItems(data);
    } catch (e: any) {
      alert(e.message || "Gagal memuat data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openCreateDialog = () => {
    setEditingItem(null);
    setFormData({ title: "", youtube_id: "", description: "" });
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: Video) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      youtube_id: item.youtube_id,
      description: item.description || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus item ini?")) return;
    try {
      const token = localStorage.getItem("admin_token") || "";
      await apiFetch(`/api/videos/${id}`, { method: "DELETE", token });
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (e: any) {
      alert(e.message || "Gagal menghapus");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("admin_token") || "";
      const payload = {
        title: formData.title,
        youtube_id: formData.youtube_id,
        description: formData.description || null,
      };
      
      if (editingItem) {
        await apiFetch(`/api/videos/${editingItem.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
          token,
        });
      } else {
        await apiFetch(`/api/videos`, {
          method: "POST",
          body: JSON.stringify(payload),
          token,
        });
      }
      setIsDialogOpen(false);
      fetchItems();
    } catch (e: any) {
      alert(e.message || "Gagal menyimpan");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Kelola Video</h1>
        <Button onClick={openCreateDialog}>Tambah Video</Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingItem ? "Edit Video" : "Tambah Video"}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Judul Video</Label>
              <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="youtube_id">YouTube ID</Label>
              <Input id="youtube_id" name="youtube_id" placeholder="dQw4w9WgXcQ" value={formData.youtube_id} onChange={handleChange} required />
              <p className="text-xs text-muted-foreground">Contoh: Untuk https://youtu.be/dQw4w9WgXcQ, masukkan dQw4w9WgXcQ</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi (Opsional)</Label>
              <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
              <Button type="submit">Simpan</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {isLoading ? <div className="py-8 text-center text-muted-foreground">Memuat data...</div> : (
        <div className="border rounded-md bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul</TableHead>
                <TableHead>YouTube ID</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">Belum ada video.</TableCell></TableRow>
              ) : items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium max-w-[200px] truncate">{item.title}</TableCell>
                  <TableCell>{item.youtube_id}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{item.description}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="mr-2" onClick={() => openEditDialog(item)}>Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>Hapus</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
