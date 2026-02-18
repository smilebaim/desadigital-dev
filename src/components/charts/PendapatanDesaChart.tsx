'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getStatistikByKey } from '@/lib/statistik-actions';

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
    const [chartData, setChartData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const statData = await getStatistikByKey('pendapatan_desa');
            if (statData?.data) {
                try {
                    const parsedData = JSON.parse(statData.data);
                    setChartData(parsedData);
                } catch {
                    setChartData(null);
                }
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <Card className="my-8">
                <CardHeader>
                    <CardTitle>Distribusi Sumber Pendapatan Desa</CardTitle>
                </CardHeader>
                <CardContent><p>Memuat diagram...</p></CardContent>
            </Card>
        );
    }
    
    if (!chartData?.sumber) {
        return (
            <Card className="my-8">
                <CardHeader>
                    <CardTitle>Distribusi Sumber Pendapatan Desa</CardTitle>
                </CardHeader>
                <CardContent><p>Data pendapatan tidak dapat dimuat.</p></CardContent>
            </Card>
        );
    }

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
                                data={chartData.sumber}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={120}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                            >
                            {chartData.sumber.map((entry: any, index: number) => (
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
