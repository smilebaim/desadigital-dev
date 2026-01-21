'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users } from "lucide-react";
import type { PemerintahanEntry } from "@/lib/pemerintahan-actions";
import { useState, useEffect } from "react";

const StrukturPemerintah = ({ data }: { data: PemerintahanEntry[] | null }) => {
  const [strukturData, setStrukturData] = useState(data);

  useEffect(() => {
    setStrukturData(data);
  }, [data]);

  if (!strukturData) {
    return <div>Memuat data...</div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Struktur Pemerintahan Desa</h2>
          <p className="text-muted-foreground">
            Struktur organisasi dan lembaga pemerintahan Desa Remau Bakotuo
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
                <Users className="h-8 w-8 text-primary" />
                <CardTitle>Aparatur Desa</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jabatan</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Periode</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {strukturData.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.jabatan}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.nama}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.periode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StrukturPemerintah;
