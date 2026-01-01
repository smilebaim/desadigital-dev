import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, PieChart as PieChartIcon } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const pendapatanData = {
  total: 2300000000,
  tahun: "2024",
  sumber: [
    {
      name: "Dana Desa",
      value: 1250000000,
      status: "Diterima",
      progress: 100,
      details: "Alokasi Dana Desa dari APBN"
    },
    {
      name: "Alokasi Dana Desa (ADD)",
      value: 850000000,
      status: "Proses",
      progress: 60,
      details: "Alokasi Dana Desa dari APBD Kabupaten"
    },
    {
      name: "Bagi Hasil Pajak",
      value: 125000000,
      status: "Dianggarkan",
      progress: 30,
      details: "Bagi hasil pajak dan retribusi daerah"
    },
    {
      name: "Pendapatan Asli Desa",
      value: 75000000,
      status: "Dianggarkan",
      progress: 0,
      details: "Hasil usaha, aset, swadaya, dan lain-lain"
    }
  ],
  trendPendapatan: [
    { tahun: "2021", pendapatan: 1800 },
    { tahun: "2022", pendapatan: 2000 },
    { tahun: "2023", pendapatan: 2200 },
    { tahun: "2024", pendapatan: 2300 }
  ]
};

const Pendapatan: React.FC = () => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "diterima":
        return "text-green-600";
      case "proses":
        return "text-yellow-600";
      case "dianggarkan":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pendapatan Desa</h2>
          <p className="text-muted-foreground">
            Rincian Pendapatan Desa Tahun {pendapatanData.tahun}
          </p>
        </div>

        {/* Total Pendapatan Card */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <CardTitle>Total Pendapatan</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {formatRupiah(pendapatanData.total)}
            </div>
          </CardContent>
        </Card>

        {/* Grafik dan Tabel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Distribusi Pendapatan */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChartIcon className="h-5 w-5 text-blue-600" />
                Distribusi Sumber Pendapatan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pendapatanData.sumber}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${formatRupiah(value)}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pendapatanData.sumber.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatRupiah(Number(value))} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Trend Pendapatan */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Trend Pendapatan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pendapatanData.trendPendapatan}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="tahun" />
                    <YAxis />
                    <Tooltip formatter={(value) => `Rp ${value} Juta`} />
                    <Legend />
                    <Bar dataKey="pendapatan" fill="#10B981" name="Pendapatan (Juta)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detail Sumber Pendapatan */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Rincian Sumber Pendapatan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {pendapatanData.sumber.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-600 text-sm">{item.details}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-600">
                        {formatRupiah(item.value)}
                      </div>
                      <span className={`text-sm ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <div className="text-right text-sm text-gray-600 mt-1">
                    Progress: {item.progress}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Pendapatan; 
