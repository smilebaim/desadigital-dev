'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getPendudukStream } from '@/lib/penduduk-client-actions';
import type { PendudukData } from '@/lib/penduduk-actions';

interface Penduduk extends PendudukData {
  id: string;
}

const PopulationStatChart = () => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getPendudukStream((pendudukList: Penduduk[]) => {
      const ageGroups = {
        '0-4': { 'Laki-laki': 0, 'Perempuan': 0 },
        '5-9': { 'Laki-laki': 0, 'Perempuan': 0 },
        '10-14': { 'Laki-laki': 0, 'Perempuan': 0 },
        '15-19': { 'Laki-laki': 0, 'Perempuan': 0 },
        '20-24': { 'Laki-laki': 0, 'Perempuan': 0 },
        '25-29': { 'Laki-laki': 0, 'Perempuan': 0 },
        '30-34': { 'Laki-laki': 0, 'Perempuan': 0 },
        '35-39': { 'Laki-laki': 0, 'Perempuan': 0 },
        '40-44': { 'Laki-laki': 0, 'Perempuan': 0 },
        '45-49': { 'Laki-laki': 0, 'Perempuan': 0 },
        '50-54': { 'Laki-laki': 0, 'Perempuan': 0 },
        '55-59': { 'Laki-laki': 0, 'Perempuan': 0 },
        '60-64': { 'Laki-laki': 0, 'Perempuan': 0 },
        '65+': { 'Laki-laki': 0, 'Perempuan': 0 },
      };

      const getAge = (birthDate: string) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
          age--;
        }
        return age;
      };

      pendudukList.forEach(p => {
        const age = getAge(p.tanggalLahir);
        let group = '65+';
        if (age <= 4) group = '0-4';
        else if (age <= 9) group = '5-9';
        else if (age <= 14) group = '10-14';
        else if (age <= 19) group = '15-19';
        else if (age <= 24) group = '20-24';
        else if (age <= 29) group = '25-29';
        else if (age <= 34) group = '30-34';
        else if (age <= 39) group = '35-39';
        else if (age <= 44) group = '40-44';
        else if (age <= 49) group = '45-49';
        else if (age <= 54) group = '50-54';
        else if (age <= 59) group = '55-59';
        else if (age <= 64) group = '60-64';
        
        if (p.jenisKelamin === 'Laki-laki' || p.jenisKelamin === 'Perempuan') {
             if (ageGroups[group as keyof typeof ageGroups]) {
                ageGroups[group as keyof typeof ageGroups][p.jenisKelamin]++;
            }
        }
      });
      
      const formattedData = Object.entries(ageGroups).map(([key, value]) => ({
        name: key,
        'Laki-laki': -value['Laki-laki'], // Negative for pyramid effect
        'Perempuan': value['Perempuan'],
      }));

      setChartData(formattedData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Memuat data statistik...</p>;
  }

  return (
    <Card className="my-8">
      <CardHeader>
        <CardTitle>Piramida Penduduk</CardTitle>
        <CardDescription>Berdasarkan Kelompok Usia dan Jenis Kelamin</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                tickFormatter={(value) => Math.abs(value).toString()} 
              />
              <YAxis type="category" dataKey="name" width={60} />
              <Tooltip formatter={(value: number) => Math.abs(value)} />
              <Legend />
              <Bar dataKey="Laki-laki" fill="#3b82f6" name="Laki-laki" />
              <Bar dataKey="Perempuan" fill="#ec4899" name="Perempuan" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PopulationStatChart;
