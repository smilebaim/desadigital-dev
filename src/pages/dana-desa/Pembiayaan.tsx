import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { DollarSign, ArrowUpDown, PieChart as PieChartIcon } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const pembiayaanData = {
  title: "Pembiayaan Desa",
  description: "Rincian pembiayaan desa tahun anggaran 2024",
  penerimaan: [
    {
      category: "SILPA Tahun Sebelumnya",
      amount: "Rp. 150.000.000",
      details: "Sisa Lebih Perhitungan Anggaran Tahun 2023"
    },
    {
      category: "Pencairan Dana Cadangan",
      amount: "Rp. 100.000.000",
      details: "Dana cadangan untuk pembangunan kantor desa"
    },
    {
      category: "Hasil Penjualan Aset Desa",
      amount: "Rp. 75.000.000",
      details: "Penjualan aset desa yang sudah tidak produktif"
    }
  ],
  pengeluaran: [
    {
      category: "Pembentukan Dana Cadangan",
      amount: "Rp. 200.000.000",
      details: "Pembentukan dana cadangan untuk pembangunan pasar desa"
    },
    {
      category: "Penyertaan Modal BUMDes",
      amount: "Rp. 100.000.000",
      details: "Penambahan modal BUMDes untuk pengembangan usaha"
    }
  ]
};

const Pembiayaan: React.FC = () => {
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
      case "tersedia":
      case "terealisasi":
        return "bg-green-500";
      case "proses":
        return "bg-yellow-500";
      case "dianggarkan":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{pembiayaanData.title}</h1>
        <p className="text-gray-600 mt-2">{pembiayaanData.description}</p>
      </div>

      {/* Penerimaan Pembiayaan */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Penerimaan Pembiayaan</h2>
        <div className="grid gap-4">
          {pembiayaanData.penerimaan.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-green-500">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{item.category}</h3>
                  <p className="text-gray-600 mt-1">{item.details}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-green-600">{item.amount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pengeluaran Pembiayaan */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pengeluaran Pembiayaan</h2>
        <div className="grid gap-4">
          {pembiayaanData.pengeluaran.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-red-500">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{item.category}</h3>
                  <p className="text-gray-600 mt-1">{item.details}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-red-600">{item.amount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pembiayaan; 