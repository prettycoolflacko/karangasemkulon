"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Timeline {
  id: number;
  type: "besar" | "individu";
  title: string;
  description: string | null;
  date_or_period: string | null;
  related_team_member_id: number | null;
  created_at: string | null;
}

export default function AdminProkerPage() {
  const [items, setItems] = useState<Timeline[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Timeline | null>(null);

  const [formData, setFormData] = useState({
    type: "besar",
    title: "",
    description: "",
    date_or_period: "",
    related_team_member_id: "",
  });

  const fetchItems = async () => {
    try {
      const data = await apiFetch<Timeline[]>("/api/timeline");
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
    setFormData({ type: "besar", title: "", description: "", date_or_period: "", related_team_member_id: "" });
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: Timeline) => {
    setEditingItem(item);
    setFormData({
      type: item.type,
      title: item.title,
      description: item.description || "",
      date_or_period: item.date_or_period || "",
      related_team_member_id: item.related_team_member_id?.toString() || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus proker ini?")) return;
    try {
      const token = localStorage.getItem("admin_token") || "";
      await apiFetch(`/api/timeline/${id}`, { method: "DELETE", token });
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
        type: formData.type,
        title: formData.title,
        description: formData.description || null,
        date_or_period: formData.date_or_period || null,
        related_team_member_id: formData.related_team_member_id ? parseInt(formData.related_team_member_id, 10) : null,
      };
      
      if (editingItem) {
        await apiFetch(`/api/timeline/${editingItem.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
          token,
        });
      } else {
        await apiFetch(`/api/timeline`, {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Kelola Program Kerja (Timeline)</h1>
        <Button onClick={openCreateDialog}>Tambah Proker</Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingItem ? "Edit Proker" : "Tambah Proker"}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="type">Tipe Program Kerja</Label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="besar">Proker Besar</option>
                <option value="individu">Proker Individu</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Judul Program Kerja</Label>
              <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date_or_period">Tanggal / Periode (Opsional)</Label>
              <Input id="date_or_period" name="date_or_period" value={formData.date_or_period} onChange={handleChange} placeholder="Contoh: Minggu 1 / 15 Juli" />
            </div>
            {formData.type === "individu" && (
              <div className="space-y-2">
                <Label htmlFor="related_team_member_id">ID Anggota Tim (Opsional)</Label>
                <Input id="related_team_member_id" name="related_team_member_id" type="number" value={formData.related_team_member_id} onChange={handleChange} />
              </div>
            )}
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
                <TableHead>Tipe</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>Periode</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">Belum ada proker.</TableCell></TableRow>
              ) : items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="capitalize">{item.type}</TableCell>
                  <TableCell className="font-medium max-w-[250px] truncate">{item.title}</TableCell>
                  <TableCell>{item.date_or_period}</TableCell>
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
