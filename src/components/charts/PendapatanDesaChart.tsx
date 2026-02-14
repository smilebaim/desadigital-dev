'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const pendapatanData = {
  sumber: [
    { name: "Dana Desa", value: 1250000000 },
    { name: "Alokasi Dana Desa (ADD)", value: 850000000 },
    { name: "Bagi Hasil Pajak", value: 125000000 },
    { name: "Pendapatan Asli Desa", value: 75000000 }
  ]
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

const PendapatanDesaChart = () => {
    return (
        <Card className="my-8">
            <CardHeader>
                <CardTitle>Distribusi Sumber Pendapatan Desa</CardTitle>
                <CardDescription>Berdasarkan data APBDes tahun berjalan.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pendapatanData.sumber}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={120}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                            >
                            {pendapatanData.sumber.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => formatRupiah(value)} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default PendapatanDesaChart;
