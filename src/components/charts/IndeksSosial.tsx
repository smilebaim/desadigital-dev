'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GaugeChart from "@/components/GaugeChart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Users, Scale, HeartHandshake, ShieldCheck } from "lucide-react";
import { getStatistikByKey } from '@/lib/statistik-actions';
import { useState, useEffect } from 'react';

const COLORS = ['#3b82f6', '#10b981', '#f97316', '#8b5cf6', '#ef4444'];

const IndeksSosial = ({ isPreview }: { isPreview?: boolean }) => {
  const [iksData, setIksData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        const statData = await getStatistikByKey('indeks_sosial');
        if (statData?.data) {
            try {
                const parsed = JSON.parse(statData.data);
                setIksData(parsed);
            } catch {
                setIksData(null);
            }
        }
        setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-4">Memuat data IKS...</div>;
  if (!iksData) return <div className="p-4">Data Indeks Ketahanan Sosial tidak dapat dimuat.</div>;

  return (
    <div className={`space-y-6 ${isPreview ? 'h-full w-full' : ''}`}>
      {!isPreview && (
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Indeks Ketahanan Sosial (IKS)</h2>
          <p className="text-muted-foreground">
            Mengukur tingkat kesejahteraan, harmoni, dan keamanan dalam masyarakat desa.
          </p>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl">Skor IKS Desa</CardTitle>
        </CardHeader>
        <CardContent>
          <GaugeChart value={iksData.score} status={iksData.status} size={isPreview ? 'sm' : 'lg'} />
          <p className="text-center text-muted-foreground mt-4 text-sm">
            Skor {iksData.score.toFixed(2)} menunjukkan tingkat ketahanan sosial yang <strong>{iksData.status}</strong>.
          </p>
        </CardContent>
      </Card>

      <div className={`grid ${isPreview ? 'grid-cols-1' : 'md:grid-cols-2'} gap-6`}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Scale className="h-5 w-5 text-primary" />
              Komponen Penilaian IKS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={iksData.components} layout="vertical" margin={{ left: 50, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 1]} fontSize={12} />
                  <YAxis dataKey="name" type="category" width={100} fontSize={10} />
                  <Tooltip formatter={(value: number) => value.toFixed(2)} />
                  <Bar dataKey="score" name="Skor" barSize={15}>
                    {iksData.components.map((entry: any, index: number) => (
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
              <Users className="h-5 w-5 text-primary" />
              Tren Skor IKS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={iksData.trend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" fontSize={12} />
                  <YAxis domain={[0, 1]} fontSize={12} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '10px' }}/>
                  <Bar dataKey="score" fill="#3b82f6" name="Skor IKS" />
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
              <HeartHandshake className="h-5 w-5 text-primary" />
              Rekomendasi Peningkatan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5 text-sm">
              {iksData.recommendations?.map((rec: string, index: number) => (
                <li key={index} className="text-muted-foreground">{rec}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IndeksSosial;
