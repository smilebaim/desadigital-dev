
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

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

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">{pembiayaanData.title}</h1>
          <p className="text-muted-foreground mt-2">{pembiayaanData.description}</p>
        </div>

        {/* Penerimaan Pembiayaan */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <DollarSign className="h-5 w-5 text-green-600" />
              Penerimaan Pembiayaan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pembiayaanData.penerimaan.map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg border-l-4 border-green-500">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{item.category}</h3>
                    <p className="text-sm text-muted-foreground">{item.details}</p>
                  </div>
                  <span className="text-xl font-bold text-green-600">{item.amount}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pengeluaran Pembiayaan */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <DollarSign className="h-5 w-5 text-red-600" />
              Pengeluaran Pembiayaan
              </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pembiayaanData.pengeluaran.map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg border-l-4 border-red-500">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{item.category}</h3>
                    <p className="text-sm text-muted-foreground">{item.details}</p>
                  </div>
                  <span className="text-xl font-bold text-red-600">{item.amount}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Pembiayaan;
