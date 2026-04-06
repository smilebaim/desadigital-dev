'use client';
import { useEffect, useState } from 'react';
import PublicLayout from "@/layouts/PublicLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getStatistikByKey } from "@/lib/statistik-actions";
import {
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { TrendingUp, Wallet } from 'lucide-react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const COLORS = ['#2563eb', '#16a34a', '#d97706', '#dc2626', '#7c3aed', '#0891b2'];

const formatRupiah = (value: number) => {
    if (value >= 1_000_000_000) return `Rp ${(value / 1_000_000_000).toFixed(2)} M`;
    if (value >= 1_000_000) return `Rp ${(value / 1_000_000).toFixed(0)} Jt`;
    return `Rp ${value.toLocaleString('id-ID')}`;
};

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-background border rounded-lg p-3 shadow-lg text-sm">
                <p className="font-medium">{payload[0].name}</p>
                <p className="text-primary font-bold">{formatRupiah(payload[0].value)}</p>
            </div>
        );
    }
    return null;
};

interface SumberData { name: string; value: number; }

export default function PendapatanPage() {
    const [data, setData] = useState<SumberData[]>([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [title, setTitle] = useState('Pendapatan Desa');

    useEffect(() => {
        const fetchData = async () => {
            const stat = await getStatistikByKey('pendapatan_desa');
            if (stat && stat.data) {
                try {
                    const parsed = JSON.parse(stat.data);
                    const sumber: SumberData[] = parsed.sumber || [];
                    setData(sumber);
                    setTotal(sumber.reduce((sum, s) => sum + s.value, 0));
                    setTitle(stat.title || 'Pendapatan Desa');
                } catch { /* ignore parse error, use empty data */ }
            }
            setIsLoading(false);
        };
        fetchData();
    }, []);

    return (
        <PublicLayout>
            <div className="container mx-auto px-4 py-8 mt-24 mb-20">
                <div className="space-y-6 max-w-5xl mx-auto">
                    {/* Breadcrumb */}
                    <Link href="/dana-desa" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft className="h-4 w-4" /> Kembali ke Transparansi Dana Desa
                    </Link>

                    {/* Header */}
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900">
                            <TrendingUp className="h-7 w-7 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                            <p className="text-muted-foreground">Rincian sumber-sumber pendapatan desa dan proporsinya dalam APBDes.</p>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="h-80 bg-muted animate-pulse rounded-xl" />
                            <div className="h-80 bg-muted animate-pulse rounded-xl" />
                        </div>
                    ) : data.length === 0 ? (
                        <Card>
                            <CardContent className="py-16 text-center">
                                <Wallet className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <p className="text-muted-foreground">Data pendapatan belum tersedia.</p>
                                <p className="text-sm text-muted-foreground mt-1">Admin dapat menambahkan data melalui menu Statistik di dashboard.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <>
                            {/* Summary Card */}
                            <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0">
                                <CardContent className="p-6 flex items-center justify-between">
                                    <div>
                                        <p className="text-green-100 text-sm font-medium">Total Pendapatan Desa</p>
                                        <p className="text-3xl font-bold mt-1">{formatRupiah(total)}</p>
                                        <p className="text-green-100 text-xs mt-1">{data.length} sumber pendapatan</p>
                                    </div>
                                    <TrendingUp className="h-16 w-16 text-green-200 opacity-50" />
                                </CardContent>
                            </Card>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Pie Chart */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Proporsi Sumber Pendapatan</CardTitle>
                                        <CardDescription>Persentase tiap sumber dari total pendapatan</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ResponsiveContainer width="100%" height={300}>
                                            <PieChart>
                                                <Pie
                                                    data={data}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={70}
                                                    outerRadius={110}
                                                    paddingAngle={3}
                                                    dataKey="value"
                                                >
                                                    {data.map((_, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip content={<CustomTooltip />} />
                                                <Legend />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>

                                {/* Bar Chart */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Nominal Per Sumber</CardTitle>
                                        <CardDescription>Perbandingan jumlah dari tiap sumber pendapatan</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ResponsiveContainer width="100%" height={300}>
                                            <BarChart data={data} layout="vertical" margin={{ left: 16, right: 16 }}>
                                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                                <XAxis type="number" tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}Jt`} fontSize={11} />
                                                <YAxis type="category" dataKey="name" width={140} fontSize={11} />
                                                <Tooltip content={<CustomTooltip />} />
                                                <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                                                    {data.map((_, index) => (
                                                        <Cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Table Detail */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Rincian Pendapatan</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="divide-y">
                                        {data.map((item, idx) => (
                                            <div key={idx} className="flex items-center justify-between py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                                                    <span className="text-sm font-medium">{item.name}</span>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-bold">{formatRupiah(item.value)}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {((item.value / total) * 100).toFixed(1)}%
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="flex items-center justify-between py-3 font-bold">
                                            <span>Total</span>
                                            <span className="text-green-600">{formatRupiah(total)}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
