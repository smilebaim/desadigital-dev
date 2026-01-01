
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingDown, PieChart as PieChartIcon } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const belanjaData = {
  total: 2300000000,
  tahun: "2024",
  bidang: [
    {
      name: "Penyelenggaraan Pemerintahan",
      value: 750000000,
      status: "Terealisasi",
      progress: 100,
      details: "Penghasilan tetap dan tunjangan, operasional perkantoran, dll"
    },
    {
      name: "Pembangunan",
      value: 950000000,
      status: "Proses",
      progress: 60,
      details: "Pembangunan infrastruktur desa, fasilitas umum, dll"
    },
    {
      name: "Pembinaan Masyarakat",
      value: 350000000,
      status: "Dianggarkan",
      progress: 30,
      details: "Pembinaan lembaga kemasyarakatan, kegiatan sosial budaya"
    },
    {
      name: "Pemberdayaan Masyarakat",
      value: 250000000,
      status: "Dianggarkan",
      progress: 0,
      details: "Pelatihan usaha ekonomi, pertanian, dan keterampilan"
    }
  ],
  rincianBelanja: [
    { name: "Belanja Pegawai", value: 500000000 },
    { name: "Belanja Barang/Jasa", value: 800000000 },
    { name: "Belanja Modal", value: 700000000 },
    { name: "Belanja Tak Terduga", value: 300000000 }
  ],
  trendBelanja: [
    { tahun: "2021", belanja: 1700 },
    { tahun: "2022", belanja: 1900 },
    { tahun: "2023", belanja: 2100 },
    { tahun: "2024", belanja: 2300 }
  ]
};

const Belanja: React.FC = () => {
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
      case "terealisasi":
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
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Belanja Desa</h2>
          <p className="text-muted-foreground">
            Rincian Belanja Desa Tahun {belanjaData.tahun}
          </p>
        </div>

        {/* Total Belanja Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <CardTitle>Total Belanja</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {formatRupiah(belanjaData.total)}
            </div>
          </CardContent>
        </Card>

        {/* Grafik dan Tabel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Distribusi Belanja per Bidang */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChartIcon className="h-5 w-5 text-blue-600" />
                Distribusi Belanja per Bidang
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={belanjaData.bidang}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${formatRupiah(value)}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {belanjaData.bidang.map((entry, index) => (
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

          {/* Trend Belanja */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-blue-600" />
                Trend Belanja
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={belanjaData.trendBelanja}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="tahun" />
                    <YAxis />
                    <Tooltip formatter={(value) => `Rp ${value} Juta`} />
                    <Legend />
                    <Bar dataKey="belanja" fill="#3B82F6" name="Belanja (Juta)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rincian Jenis Belanja */}
        <Card>
          <CardHeader>
            <CardTitle>Rincian Jenis Belanja</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {belanjaData.rincianBelanja.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                  <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatRupiah(item.value)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Status Belanja per Bidang */}
        <Card>
          <CardHeader>
            <CardTitle>Status Belanja per Bidang</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {belanjaData.bidang.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-600 text-sm">{item.details}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-blue-600">
                        {formatRupiah(item.value)}
                      </div>
                      <span className={`text-sm ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
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

export default Belanja;
