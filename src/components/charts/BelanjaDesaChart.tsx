'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getStatistikByKey } from '@/lib/statistik-actions';

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
    const [chartData, setChartData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const statData = await getStatistikByKey('belanja_desa');
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
                    <CardTitle>Distribusi Belanja Desa per Bidang</CardTitle>
                </CardHeader>
                <CardContent><p>Memuat diagram...</p></CardContent>
            </Card>
        );
    }
    
    if (!chartData?.bidang) {
        return (
            <Card className="my-8">
                <CardHeader>
                    <CardTitle>Distribusi Belanja Desa per Bidang</CardTitle>
                </CardHeader>
                <CardContent><p>Data belanja tidak dapat dimuat.</p></CardContent>
            </Card>
        );
    }

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
                        data={chartData.bidang}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                        >
                        {chartData.bidang.map((entry: any, index: number) => (
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
