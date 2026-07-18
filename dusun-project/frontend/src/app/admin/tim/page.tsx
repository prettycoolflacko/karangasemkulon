"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ImageUpload from "@/components/ImageUpload";

interface TeamMember {
  id: number;
  name: string;
  role_in_kkn: string | null;
  photo_url: string | null;
  dedication_message: string | null;
  order: number;
}

export default function AdminTimPage() {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TeamMember | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    role_in_kkn: "",
    photo_url: "",
    dedication_message: "",
    order: "0",
  });

  const fetchItems = async () => {
    try {
      const data = await apiFetch<TeamMember[]>("/api/team");
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
    setFormData({ name: "", role_in_kkn: "", photo_url: "", dedication_message: "", order: "0" });
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: TeamMember) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      role_in_kkn: item.role_in_kkn || "",
      photo_url: item.photo_url || "",
      dedication_message: item.dedication_message || "",
      order: item.order.toString(),
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus anggota tim ini?")) return;
    try {
      const token = localStorage.getItem("admin_token") || "";
      await apiFetch(`/api/team/${id}`, { method: "DELETE", token });
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
        role_in_kkn: formData.role_in_kkn || null,
        photo_url: formData.photo_url || null,
        dedication_message: formData.dedication_message || null,
        order: parseInt(formData.order, 10) || 0,
      };
      
      if (editingItem) {
        await apiFetch(`/api/team/${editingItem.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
          token,
        });
      } else {
        await apiFetch(`/api/team`, {
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
        <h1 className="text-3xl font-bold tracking-tight">Kelola Tim KKN</h1>
        <Button onClick={openCreateDialog}>Tambah Anggota Tim</Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingItem ? "Edit Anggota Tim" : "Tambah Anggota Tim"}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role_in_kkn">Peran / Jabatan (Opsional)</Label>
              <Input id="role_in_kkn" name="role_in_kkn" value={formData.role_in_kkn} onChange={handleChange} placeholder="Ketua / Medinfo dll." />
            </div>
            <div className="space-y-2">
              <Label>Foto Profil (Opsional)</Label>
              <ImageUpload
                folder="tim"
                currentImageUrl={formData.photo_url}
                onUploadSuccess={(url) => setFormData(prev => ({ ...prev, photo_url: url }))}
              />
              <p className="text-xs text-muted-foreground mt-1 text-center">Path saat ini: {formData.photo_url || "Belum ada gambar"}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dedication_message">Pesan Dedikasi (Opsional)</Label>
              <Textarea id="dedication_message" name="dedication_message" value={formData.dedication_message} onChange={handleChange} rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="order">Urutan Tampil</Label>
              <Input id="order" name="order" type="number" value={formData.order} onChange={handleChange} />
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
                <TableHead>Peran</TableHead>
                <TableHead>Urutan</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">Belum ada anggota tim.</TableCell></TableRow>
              ) : items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.role_in_kkn || "-"}</TableCell>
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
