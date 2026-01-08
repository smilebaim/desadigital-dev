'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts";
import Breadcrumb from "@/components/Breadcrumb";

const data = [
  { subject: 'Pendidikan', A: 120, B: 110, fullMark: 150 },
  { subject: 'Kesehatan', A: 98, B: 130, fullMark: 150 },
  { subject: 'Modal Sosial', A: 86, B: 130, fullMark: 150 },
  { subject: 'Pemukiman', A: 99, B: 100, fullMark: 150 },
  { subject: 'Kesejahteraan', A: 85, B: 90, fullMark: 150 },
];

const KetahananSosial = () => {
  return (
    <div className="container mx-auto px-4 py-8">
       <Breadcrumb items={[{ title: "Indeks", path: "/indeks/ketahanan-sosial" }, { title: "Ketahanan Sosial" }]} />
      <h1 className="text-3xl font-bold mb-6 mt-4">Indeks Ketahanan Sosial</h1>
      <Card>
        <CardHeader>
          <CardTitle>Dimensi Ketahanan Sosial</CardTitle>
          <CardDescription>Perbandingan berbagai aspek dalam dimensi ketahanan sosial desa.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar name="Desa Remau Bako Tuo" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="Rata-rata Nasional" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KetahananSosial;
