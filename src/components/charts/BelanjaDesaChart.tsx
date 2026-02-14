'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const belanjaData = {
  bidang: [
    { name: "Penyelenggaraan Pemerintahan", value: 750000000 },
    { name: "Pembangunan", value: 950000000 },
    { name: "Pembinaan Masyarakat", value: 350000000 },
    { name: "Pemberdayaan Masyarakat", value: 250000000 }
  ]
};

const COLORS = ['#3b82f6', '#10b981', '#f97316', '#8b5cf6'];

const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

const BelanjaDesaChart = () => {
    return (
        <Card className="my-8">
            <CardHeader>
                <CardTitle>Distribusi Belanja Desa per Bidang</CardTitle>
                <CardDescription>Berdasarkan data APBDes tahun berjalan.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                        data={belanjaData.bidang}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                        >
                        {belanjaData.bidang.map((entry, index) => (
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

export default BelanjaDesaChart;
