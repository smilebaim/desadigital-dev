'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GaugeChart from "@/components/GaugeChart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, BarChart as BarChartIcon, Briefcase, ShieldCheck } from "lucide-react";

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

const IndeksEkonomi = ({ isPreview }: { isPreview?: boolean }) => {
  return (
    <div className={`space-y-6 ${isPreview ? 'h-full w-full' : ''}`}>
        {!isPreview && (
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Indeks Ketahanan Ekonomi (IKE)</h2>
                <p className="text-muted-foreground">
                    Mengukur kemampuan ekonomi desa untuk tumbuh, beradaptasi, dan mensejahterakan warganya.
                </p>
            </div>
        )}
        <Card>
            <CardHeader>
                <CardTitle className="text-center text-xl">Skor IKE Desa</CardTitle>
            </CardHeader>
            <CardContent>
                <GaugeChart value={ikeData.score} status={ikeData.status} size={isPreview ? 'sm' : 'lg'} />
                <p className="text-center text-muted-foreground mt-4 text-sm">
                    Skor {ikeData.score.toFixed(2)} menunjukkan tingkat ketahanan ekonomi yang <strong>{ikeData.status}</strong>.
                </p>
            </CardContent>
        </Card>

        <div className={`grid ${isPreview ? 'grid-cols-1' : 'md:grid-cols-2'} gap-6`}>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                        <BarChartIcon className="h-5 w-5 text-primary" />
                        Komponen Penilaian IKE
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={ikeData.components} layout="vertical" margin={{ left: 50, right: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" domain={[0, 1]} fontSize={12} />
                            <YAxis dataKey="name" type="category" width={100} fontSize={10} />
                            <Tooltip formatter={(value: number) => value.toFixed(2)} />
                            <Bar dataKey="score" name="Skor" barSize={15}>
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
                    <CardTitle className="flex items-center gap-2 text-base">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Tren Skor IKE
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={ikeData.trend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" fontSize={12} />
                            <YAxis domain={[0.5, 1]} fontSize={12}/>
                            <Tooltip />
                            <Legend wrapperStyle={{ fontSize: '10px' }} />
                            <Bar dataKey="score" fill="#16a34a" name="Skor IKE"/>
                        </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>

        {!isPreview && (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    Rekomendasi Peningkatan
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc space-y-2 pl-5 text-sm">
                    {ikeData.recommendations.map((rec, index) => (
                        <li key={index} className="text-muted-foreground">{rec}</li>
                    ))}
                    </ul>
                </CardContent>
            </Card>
        )}
    </div>
  );
};

export default IndeksEkonomi;
