"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ImageUpload from "@/components/ImageUpload";

interface Perangkat {
  id: number;
  name: string;
  position: string;
  photo_url: string | null;
  order: number;
}

export default function AdminPerangkatPage() {
  const [items, setItems] = useState<Perangkat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Perangkat | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    position: "",
    photo_url: "",
    order: "0",
  });

  const fetchItems = async () => {
    try {
      const data = await apiFetch<Perangkat[]>("/api/perangkat-desa");
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
    setFormData({ name: "", position: "", photo_url: "", order: "0" });
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: Perangkat) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      position: item.position,
      photo_url: item.photo_url || "",
      order: item.order.toString(),
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus data ini?")) return;
    try {
      const token = localStorage.getItem("admin_token") || "";
      await apiFetch(`/api/perangkat-desa/${id}`, { method: "DELETE", token });
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
        name: formData.name,
        position: formData.position,
        photo_url: formData.photo_url || null,
        order: parseInt(formData.order, 10) || 0,
      };
      
      if (editingItem) {
        await apiFetch(`/api/perangkat-desa/${editingItem.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
          token,
        });
      } else {
        await apiFetch(`/api/perangkat-desa`, {
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
        <h1 className="text-3xl font-bold tracking-tight">Kelola Perangkat Desa</h1>
        <Button onClick={openCreateDialog}>Tambah Perangkat</Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingItem ? "Edit Perangkat" : "Tambah Perangkat"}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Jabatan</Label>
              <Input id="position" name="position" value={formData.position} onChange={handleChange} required placeholder="Kepala Dukuh" />
            </div>
            <div className="space-y-2">
              <Label>Foto Profil (Opsional)</Label>
              <ImageUpload
                folder="perangkat"
                currentImageUrl={formData.photo_url}
                onUploadSuccess={(url) => setFormData(prev => ({ ...prev, photo_url: url }))}
              />
              <p className="text-xs text-muted-foreground mt-1 text-center">Path saat ini: {formData.photo_url || "Belum ada gambar"}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="order">Urutan Tampil (Opsional)</Label>
              <Input id="order" name="order" type="number" value={formData.order} onChange={handleChange} />
              <p className="text-xs text-muted-foreground">Gunakan angka yang lebih kecil agar tampil lebih awal.</p>
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
                <TableHead>Nama</TableHead>
                <TableHead>Jabatan</TableHead>
                <TableHead>Urutan</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">Belum ada data.</TableCell></TableRow>
              ) : items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.position}</TableCell>
                  <TableCell>{item.order}</TableCell>
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
