'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";

const data = [
  { name: '2020', pembiayaan: 1000 },
  { name: '2021', pembiayaan: 1200 },
  { name: '2022', pembiayaan: 1100 },
  { name: '2023', pembiayaan: 1500 },
  { name: '2024', pembiayaan: 1800 },
];

const Pembiayaan = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Pembiayaan Desa</h1>
      <Card>
        <CardHeader>
          <CardTitle>Grafik Pembiayaan Desa</CardTitle>
          <CardDescription>Visualisasi data pembiayaan desa per tahun.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pembiayaan" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Pembiayaan;
