"use client";

import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import { LocationPoint } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function AdminPetaPage() {
  const [items, setItems] = useState<LocationPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LocationPoint | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    lat: "",
    lng: "",
    description: "",
    icon: "",
  });

  const fetchData = async () => {
    try {
      const data = await apiFetch<LocationPoint[]>("/api/locations");
      setItems(data);
    } catch (error) {
      console.error("Gagal load data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = (item?: LocationPoint) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        category: item.category,
        lat: item.lat,
        lng: item.lng,
        description: item.description || "",
        icon: item.icon || "",
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: "",
        category: "",
        lat: "",
        lng: "",
        description: "",
        icon: "",
      });
    }
    setIsOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus lokasi ini?")) return;
    try {
      const token = localStorage.getItem("admin_token") || "";
      await apiFetch(`/api/locations/${id}`, { method: "DELETE", token });
      fetchData();
    } catch (error) {
      console.error("Gagal hapus", error);
      alert("Gagal menghapus data.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("admin_token") || "";
      
      // Ensure description and icon are null if empty
      const payload = {
        name: formData.name,
        category: formData.category,
        lat: formData.lat,
        lng: formData.lng,
        description: formData.description || null,
        icon: formData.icon || null,
      };

      if (editingItem) {
        await apiFetch(`/api/locations/${editingItem.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
          token,
        });
      } else {
        await apiFetch(`/api/locations`, {
          method: "POST",
          body: JSON.stringify(payload),
          token,
        });
      }
      setIsOpen(false);
      fetchData();
    } catch (error) {
      console.error("Gagal simpan", error);
      alert("Gagal menyimpan data.");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Kelola Peta (Lokasi)</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpen()} className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="mr-2 h-4 w-4" />
              Tambah Lokasi
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Lokasi" : "Tambah Lokasi"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lokasi</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Kategori (Fasilitas, UMKM, dll)</Label>
                <Input
                  id="category"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lat">Latitude</Label>
                  <Input
                    id="lat"
                    required
                    value={formData.lat}
                    onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lng">Longitude</Label>
                  <Input
                    id="lng"
                    required
                    value={formData.lng}
                    onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icon">URL Ikon (Opsional)</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                />
              </div>
              <div className="flex justify-end pt-4">
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                  Simpan
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md bg-white overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Lokasi</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Lat, Lng</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                  Belum ada data lokasi
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="text-gray-500 text-sm">
                    {item.lat}, {item.lng}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleOpen(item)}>
                      <Pencil className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
