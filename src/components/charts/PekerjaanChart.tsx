'use client';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getPendudukStream } from '@/lib/penduduk-client-actions';
import type { PendudukData } from '@/lib/penduduk-actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface Penduduk extends PendudukData {
  id: string;
}

const PekerjaanChart = () => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getPendudukStream((pendudukList: Penduduk[]) => {
      const jobCounts: { [key: string]: number } = {};

      pendudukList.forEach(p => {
        if (p.pekerjaan) {
          jobCounts[p.pekerjaan] = (jobCounts[p.pekerjaan] || 0) + 1;
        }
      });
      
      const formattedData = Object.entries(jobCounts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 10); // Show top 10 jobs

      setChartData(formattedData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Memuat data statistik...</p>;
  }
  
  if (chartData.length === 0) {
      return <p>Data pekerjaan tidak cukup untuk menampilkan diagram.</p>
  }

  return (
     <Card className="my-8">
      <CardHeader>
        <CardTitle>Sebaran Pekerjaan Penduduk</CardTitle>
        <CardDescription>10 Jenis pekerjaan paling umum</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip cursor={{fill: 'rgba(230, 230, 230, 0.4)'}} />
              <Bar dataKey="value" fill="#82ca9d" name="Jumlah" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PekerjaanChart;
