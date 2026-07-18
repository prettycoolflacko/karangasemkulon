"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Statistik {
  id: number;
  key: string;
  label: string;
  value: string;
  unit: string | null;
  updated_at: string | null;
}

export default function AdminStatistikPage() {
  const [items, setItems] = useState<Statistik[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Statistik | null>(null);

  const [formData, setFormData] = useState({
    key: "",
    label: "",
    value: "",
    unit: "",
  });

  const fetchItems = async () => {
    try {
      const data = await apiFetch<Statistik[]>("/api/statistik");
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
    setFormData({ key: "", label: "", value: "", unit: "" });
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: Statistik) => {
    setEditingItem(item);
    setFormData({
      key: item.key,
      label: item.label,
      value: item.value,
      unit: item.unit || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus statistik ini?")) return;
    try {
      const token = localStorage.getItem("admin_token") || "";
      await apiFetch(`/api/statistik/${id}`, { method: "DELETE", token });
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
        key: formData.key,
        label: formData.label,
        value: formData.value,
        unit: formData.unit || null,
      };
      
      if (editingItem) {
        // Statistik endpoint update mungkin tidak perlu key, tetapi payload update biasanya mengabaikan field tak terduga.
        await apiFetch(`/api/statistik/${editingItem.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
          token,
        });
      } else {
        await apiFetch(`/api/statistik`, {
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
        <h1 className="text-3xl font-bold tracking-tight">Kelola Statistik Desa</h1>
        <Button onClick={openCreateDialog}>Tambah Statistik</Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingItem ? "Edit Statistik" : "Tambah Statistik"}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="key">Kunci / Key</Label>
              <Input id="key" name="key" value={formData.key} onChange={handleChange} required disabled={!!editingItem} placeholder="contoh: populasi" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="label">Label (Tampilan)</Label>
              <Input id="label" name="label" value={formData.label} onChange={handleChange} required placeholder="contoh: Jumlah Penduduk" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="value">Nilai</Label>
              <Input id="value" name="value" value={formData.value} onChange={handleChange} required placeholder="contoh: 1250" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Satuan (Opsional)</Label>
              <Input id="unit" name="unit" value={formData.unit} onChange={handleChange} placeholder="contoh: Jiwa" />
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
                <TableHead>Key</TableHead>
                <TableHead>Label</TableHead>
                <TableHead>Nilai</TableHead>
                <TableHead>Satuan</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Belum ada data.</TableCell></TableRow>
              ) : items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-sm">{item.key}</TableCell>
                  <TableCell className="font-medium">{item.label}</TableCell>
                  <TableCell>{item.value}</TableCell>
                  <TableCell>{item.unit}</TableCell>
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
