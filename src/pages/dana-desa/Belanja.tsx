'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";

const data = [
  { name: 'Jan', belanja: 4000 },
  { name: 'Feb', belanja: 3000 },
  { name: 'Mar', belanja: 2000 },
  { name: 'Apr', belanja: 2780 },
  { name: 'Mei', belanja: 1890 },
  { name: 'Jun', belanja: 2390 },
  { name: 'Jul', belanja: 3490 },
];

const Belanja = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Belanja Desa</h1>
      <Card>
        <CardHeader>
          <CardTitle>Grafik Belanja Desa</CardTitle>
          <CardDescription>Visualisasi data belanja desa per bulan.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="belanja" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Belanja;
