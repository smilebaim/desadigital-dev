'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GaugeChart from "@/components/GaugeChart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Leaf, Recycle, Droplets, ShieldCheck } from "lucide-react";

const iklData = {
  score: 0.68,
  status: "Berkembang",
  components: [
    { name: 'Kualitas Lingkungan', score: 0.7, weight: 0.3 },
    { name: 'Pengelolaan SDA', score: 0.6, weight: 0.25 },
    { name: 'Pengelolaan Sampah', score: 0.75, weight: 0.2 },
    { name: 'Adaptasi Iklim', score: 0.65, weight: 0.15 },
    { name: 'Edukasi Lingkungan', score: 0.7, weight: 0.1 },
  ],
  trend: [
    { year: 2021, score: 0.62 },
    { year: 2022, score: 0.65 },
    { year: 2023, score: 0.66 },
    { year: 2024, score: 0.68 },
  ],
  recommendations: [
    "Program reboisasi di lahan kritis sekitar desa.",
    "Peningkatan efisiensi bank sampah dan sosialisasi pemilahan sampah dari rumah.",
    "Pembangunan sumur resapan untuk konservasi air tanah.",
    "Kampanye hemat energi dan penggunaan sumber energi terbarukan.",
    "Pengawasan lebih ketat terhadap pencemaran sungai."
  ]
};

const COLORS = ['#22c55e', '#84cc16', '#facc15', '#fb923c', '#4ade80'];

const IndeksLingkungan = ({ isPreview }: { isPreview?: boolean }) => {
  return (
    <div className={`space-y-6 ${isPreview ? 'h-full w-full' : ''}`}>
      {!isPreview && (
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Indeks Ketahanan Lingkungan (IKL)</h2>
          <p className="text-muted-foreground">
            Mengukur kapasitas desa dalam menjaga kelestarian lingkungan dan menghadapi tekanan ekologis.
          </p>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl">Skor IKL Desa</CardTitle>
        </CardHeader>
        <CardContent>
          <GaugeChart value={iklData.score} status={iklData.status} size={isPreview ? 'sm' : 'lg'} />
          <p className="text-center text-muted-foreground mt-4 text-sm">
            Skor {iklData.score.toFixed(2)} menunjukkan tingkat ketahanan lingkungan yang <strong>{iklData.status}</strong>.
          </p>
        </CardContent>
      </Card>

      <div className={`grid ${isPreview ? 'grid-cols-1' : 'md:grid-cols-2'} gap-6`}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Droplets className="h-5 w-5 text-primary" />
              Komponen Penilaian IKL
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={iklData.components} layout="vertical" margin={{ left: 50, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 1]} fontSize={12} />
                  <YAxis dataKey="name" type="category" width={100} fontSize={10} />
                  <Tooltip formatter={(value: number) => value.toFixed(2)} />
                  <Bar dataKey="score" name="Skor" barSize={15}>
                    {iklData.components.map((entry, index) => (
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
              <Recycle className="h-5 w-5 text-primary" />
              Tren Skor IKL
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={iklData.trend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" fontSize={12} />
                  <YAxis domain={[0.5, 1]} fontSize={12} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '10px' }} />
                  <Bar dataKey="score" fill="#22c55e" name="Skor IKL" />
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
              {iklData.recommendations.map((rec, index) => (
                <li key={index} className="text-muted-foreground">{rec}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IndeksLingkungan;
