"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface Statistik {
  id: number;
  key: string;
  label: string;
  value: string;
  unit: string | null;
}

// Tribuwhana Harvest Colors
const COLORS = ["#8B3A62", "#E5B32A", "#2C4A3B", "#CF5C36", "#743051", "#ca9c22"];

export default function StatistikPage() {
  const [data, setData] = useState<Statistik[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStatistik = async () => {
      try {
        const result = await apiFetch<Statistik[]>("/api/statistik");
        setData(result);
      } catch (error) {
        console.error("Gagal memuat statistik", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStatistik();
  }, []);

  // Filter data berdasarkan key prefix
  const genderData = data
    .filter((d) => d.key.startsWith("gender_"))
    .map((d) => ({ name: d.label, value: parseInt(d.value, 10) || 0 }));
    
  const umurData = data
    .filter((d) => d.key.startsWith("umur_"))
    .map((d) => ({ name: d.label, value: parseInt(d.value, 10) || 0 }));
    
  const jobData = data
    .filter((d) => d.key.startsWith("job_"))
    .map((d) => ({ name: d.label, value: parseInt(d.value, 10) || 0 }))
    .sort((a, b) => b.value - a.value); // Urutkan terbanyak

  const eduData = data
    .filter((d) => d.key.startsWith("edu_"))
    .map((d) => ({ name: d.label, value: parseInt(d.value, 10) || 0 }));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-rice pt-32 pb-16 flex items-center justify-center">
        <div className="flex items-center gap-3 text-forest">
          <span className="w-4 h-4 bg-shallot rounded-full animate-ping"></span>
          <span className="font-medium animate-pulse">Memuat data kependudukan...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rice pt-24 pb-16 relative overflow-hidden">
      {/* Tribuwhana Watermark Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 20 Q70 40 50 80 Q30 40 50 20 Z' fill='%232C4A3B'/%3E%3Cpath d='M20 50 Q40 60 50 80 Q30 70 20 50 Z' fill='%238B3A62'/%3E%3Cpath d='M80 50 Q60 60 50 80 Q70 70 80 50 Z' fill='%238B3A62'/%3E%3C/svg%3E\")", backgroundSize: "120px" }}></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-forest mb-4">Statistik Kependudukan</h1>
          <div className="h-1 w-20 bg-shallot mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-forest/80 max-w-2xl mx-auto">
            Visualisasi interaktif data demografi dan sosial ekonomi warga Dusun Karangasem Kulon secara transparan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Gender Pie Chart */}
          {genderData.length > 0 && (
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-forest/5 border border-forest/10 hover:shadow-2xl hover:shadow-forest/10 transition-shadow duration-300">
              <h2 className="font-display text-2xl font-bold text-forest mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-shallot rounded-full"></span>
                Distribusi Gender
              </h2>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={genderData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Legend iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Kelompok Umur Bar Chart */}
          {umurData.length > 0 && (
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-forest/5 border border-forest/10 hover:shadow-2xl hover:shadow-forest/10 transition-shadow duration-300">
              <h2 className="font-display text-2xl font-bold text-forest mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-paddy rounded-full"></span>
                Kelompok Usia
              </h2>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={umurData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#2C4A3B' }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: '#2C4A3B' }} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{ fill: '#f0fdf6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="value" fill="#E5B32A" radius={[6, 6, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Mata Pencaharian Bar Chart (Full Width) */}
          {jobData.length > 0 && (
            <div className="md:col-span-2 bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-forest/5 border border-forest/10 hover:shadow-2xl hover:shadow-forest/10 transition-shadow duration-300">
              <h2 className="font-display text-2xl font-bold text-forest mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-forest rounded-full"></span>
                Mata Pencaharian
              </h2>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={jobData} layout="vertical" margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                    <XAxis type="number" tick={{ fontSize: 12, fill: '#2C4A3B' }} tickLine={false} axisLine={false} />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fill: '#2C4A3B' }} tickLine={false} axisLine={false} width={100} />
                    <Tooltip cursor={{ fill: '#f0fdf6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="value" fill="#2C4A3B" radius={[0, 6, 6, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

        </div>
        
        {data.length === 0 && !isLoading && (
          <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-forest/10">
            <p className="text-forest/60">Belum ada data statistik yang tersedia.</p>
          </div>
        )}

      </div>
    </div>
  );
}
