'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GaugeChart from "@/components/GaugeChart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, BarChart as BarChartIcon, Briefcase, ShieldCheck } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

// Data IKE (Indeks Ketahanan Ekonomi)
const ikeData = {
  score: 0.72,
  status: "Maju",
  components: [
    { name: 'Keragaman Ekonomi', score: 0.8, weight: 0.3 },
    { name: 'Akses Permodalan', score: 0.65, weight: 0.25 },
    { name: 'Keterampilan Kerja', score: 0.7, weight: 0.2 },
    { name: 'Infrastruktur Ekonomi', score: 0.75, weight: 0.15 },
    { name: 'Stabilitas Harga', score: 0.6, weight: 0.1 },
  ],
  trend: [
    { year: 2021, score: 0.65 },
    { year: 2022, score: 0.68 },
    { year: 2023, score: 0.70 },
    { year: 2024, score: 0.72 },
  ],
  recommendations: [
    "Pengembangan produk unggulan desa untuk meningkatkan diversifikasi ekonomi.",
    "Memfasilitasi akses UMKM ke lembaga keuangan formal dan program KUR.",
    "Pelatihan keterampilan digital dan manajemen keuangan untuk pelaku usaha.",
    "Perbaikan jalan produksi dan pasar desa untuk melancarkan distribusi.",
    "Membentuk koperasi desa untuk menjaga stabilitas harga komoditas."
  ]
};

const COLORS = ['#16a34a', '#4ade80', '#a3e635', '#facc15', '#fbbf24'];

const KetahananEkonomi = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
       <Breadcrumb
        items={[
          { title: "Indeks", path: "/indeks" },
          { title: "Ketahanan Ekonomi" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Indeks Ketahanan Ekonomi (IKE)</h2>
          <p className="text-muted-foreground">
            Mengukur kemampuan ekonomi desa untuk tumbuh, beradaptasi, dan mensejahterakan warganya.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center text-xl">Skor IKE Desa Saat Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <GaugeChart value={ikeData.score} status={ikeData.status} size="lg" />
            <p className="text-center text-muted-foreground mt-4">
              Skor {ikeData.score.toFixed(2)} menunjukkan tingkat ketahanan ekonomi yang <strong>{ikeData.status}</strong>.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChartIcon className="h-5 w-5 text-primary" />
                Komponen Penilaian IKE
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ikeData.components} layout="vertical" margin={{ left: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 1]} />
                    <YAxis dataKey="name" type="category" width={120} />
                    <Tooltip formatter={(value: number) => value.toFixed(2)} />
                    <Bar dataKey="score" name="Skor Komponen" barSize={20}>
                        {ikeData.components.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Tren Skor IKE (4 Tahun Terakhir)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                 <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ikeData.trend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis domain={[0.5, 1]}/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="score" fill="#16a34a" name="Skor IKE Tahunan"/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Rekomendasi Peningkatan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5">
              {ikeData.recommendations.map((rec, index) => (
                <li key={index} className="text-muted-foreground">{rec}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KetahananEkonomi;
