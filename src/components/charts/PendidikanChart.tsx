'use client';
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getPendudukStream } from '@/lib/penduduk-client-actions';
import type { PendudukData } from '@/lib/penduduk-actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface Penduduk extends PendudukData {
  id: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const PendidikanChart = () => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getPendudukStream((pendudukList: Penduduk[]) => {
      const educationCounts: { [key: string]: number } = {};

      pendudukList.forEach(p => {
        if (p.pendidikan) {
          const key = p.pendidikan.trim() || 'Tidak Disebutkan';
          educationCounts[key] = (educationCounts[key] || 0) + 1;
        }
      });
      
      const formattedData = Object.entries(educationCounts).map(([name, value]) => ({
        name,
        value,
      }));

      setChartData(formattedData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Memuat data statistik...</p>;
  }
  
  if (chartData.length === 0) {
      return <p>Data pendidikan tidak cukup untuk menampilkan diagram.</p>
  }

  return (
    <Card className="my-8">
      <CardHeader>
        <CardTitle>Komposisi Pendidikan Penduduk</CardTitle>
        <CardDescription>Berdasarkan tingkat pendidikan terakhir</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [value, name]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PendidikanChart;
