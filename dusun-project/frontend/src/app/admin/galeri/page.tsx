"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ImageUpload from "@/components/ImageUpload";

interface Gallery {
  id: number;
  image_url: string;
  caption: string | null;
  category: string | null;
  created_at: string | null;
}

export default function AdminGaleriPage() {
  const [items, setItems] = useState<Gallery[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Gallery | null>(null);

  const [formData, setFormData] = useState({
    image_url: "",
    caption: "",
    category: "",
  });

  const fetchItems = async () => {
    try {
      const data = await apiFetch<Gallery[]>("/api/gallery");
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
    setFormData({ image_url: "", caption: "", category: "" });
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: Gallery) => {
    setEditingItem(item);
    setFormData({
      image_url: item.image_url,
      caption: item.caption || "",
      category: item.category || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus item ini?")) return;
    try {
      const token = localStorage.getItem("admin_token") || "";
      await apiFetch(`/api/gallery/${id}`, { method: "DELETE", token });
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
        image_url: formData.image_url,
        caption: formData.caption || null,
        category: formData.category || null,
      };
      
      if (editingItem) {
        await apiFetch(`/api/gallery/${editingItem.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
          token,
        });
      } else {
        await apiFetch(`/api/gallery`, {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Kelola Galeri</h1>
        <Button onClick={openCreateDialog}>Tambah Foto</Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingItem ? "Edit Foto" : "Tambah Foto"}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>URL Gambar</Label>
              <ImageUpload
                folder="galeri"
                currentImageUrl={formData.image_url}
                onUploadSuccess={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
              />
              <p className="text-xs text-muted-foreground mt-1 text-center">Path saat ini: {formData.image_url || "Belum ada gambar"}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="caption">Caption (Opsional)</Label>
              <Input id="caption" name="caption" value={formData.caption} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Kategori (Opsional)</Label>
              <Input id="category" name="category" value={formData.category} onChange={handleChange} />
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
                <TableHead>URL / File</TableHead>
                <TableHead>Caption</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">Belum ada foto.</TableCell></TableRow>
              ) : items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="max-w-[200px] truncate">{item.image_url}</TableCell>
                  <TableCell>{item.caption}</TableCell>
                  <TableCell>{item.category}</TableCell>
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
