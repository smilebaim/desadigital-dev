'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GaugeChart from "@/components/GaugeChart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Users, Scale, HeartHandshake, ShieldCheck } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

// Data IKS (Indeks Ketahanan Sosial)
const iksData = {
  score: 0.75,
  status: "Maju",
  components: [
    { name: 'Pendidikan', score: 0.8, weight: 0.3 },
    { name: 'Kesehatan', score: 0.75, weight: 0.25 },
    { name: 'Modal Sosial', score: 0.7, weight: 0.2 },
    { name: 'Permukiman', score: 0.8, weight: 0.15 },
    { name: 'Keamanan & Ketertiban', score: 0.65, weight: 0.1 },
  ],
  trend: [
    { year: 2021, score: 0.68 },
    { year: 2022, score: 0.70 },
    { year: 2023, score: 0.72 },
    { year: 2024, score: 0.75 },
  ],
  recommendations: [
    "Peningkatan program beasiswa bagi siswa berprestasi dan kurang mampu.",
    "Penyuluhan kesehatan preventif secara berkala di Posyandu.",
    "Mengaktifkan kembali kegiatan gotong royong dan siskamling.",
    "Program bedah rumah untuk keluarga tidak mampu.",
    "Peningkatan kerjasama antara warga dengan Babinsa/Bhabinkamtibmas."
  ]
};

const COLORS = ['#3b82f6', '#10b981', '#f97316', '#8b5cf6', '#ef4444'];

const KetahananSosial = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
       <Breadcrumb
        items={[
          { title: "Indeks", path: "/indeks" },
          { title: "Ketahanan Sosial" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Indeks Ketahanan Sosial (IKS)</h2>
          <p className="text-muted-foreground">
            Mengukur tingkat kesejahteraan, harmoni, dan keamanan dalam masyarakat desa.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center text-xl">Skor IKS Desa Saat Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <GaugeChart value={iksData.score} status={iksData.status} size="lg" />
            <p className="text-center text-muted-foreground mt-4">
              Skor {iksData.score.toFixed(2)} menunjukkan tingkat ketahanan sosial yang <strong>{iksData.status}</strong>.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary" />
                Komponen Penilaian IKS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={iksData.components} layout="vertical" margin={{ left: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 1]} />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip formatter={(value: number) => value.toFixed(2)} />
                    <Bar dataKey="score" name="Skor Komponen" barSize={20}>
                        {iksData.components.map((entry, index) => (
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
                <Users className="h-5 w-5 text-primary" />
                Tren Skor IKS (4 Tahun Terakhir)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                 <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={iksData.trend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis domain={[0.5, 1]}/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="score" fill="#3b82f6" name="Skor IKS Tahunan"/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HeartHandshake className="h-5 w-5 text-primary" />
              Rekomendasi Peningkatan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5">
              {iksData.recommendations.map((rec, index) => (
                <li key={index} className="text-muted-foreground">{rec}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KetahananSosial;
