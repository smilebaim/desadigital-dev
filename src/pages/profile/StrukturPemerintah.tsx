'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Breadcrumb from "@/components/Breadcrumb";
import { getPemerintahan, type PemerintahanEntry } from '@/lib/pemerintahan-actions';
import { Skeleton } from '@/components/ui/skeleton';

const StrukturPemerintah = () => {
  const [data, setData] = useState<PemerintahanEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getPemerintahan();
      setData(result);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ title: "Profil", path: "/profil/profil-desa" }, { title: "Struktur Pemerintahan" }]} />
      <h1 className="text-3xl font-bold mb-6 mt-4">Struktur Pemerintahan Desa</h1>
      <Card>
        <CardHeader>
          <CardTitle>Aparatur Desa</CardTitle>
          <CardDescription>Daftar aparat yang bertugas di pemerintahan Desa Remau Bako Tuo.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Jabatan</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Periode</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  </TableRow>
                ))
              ) : data.length > 0 ? (
                data.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">{item.jabatan}</TableCell>
                    <TableCell>{item.nama}</TableCell>
                    <TableCell>{item.periode}</TableCell>
                  </TableRow>
                ))
              ) : (
                 <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">Data tidak tersedia.</TableCell>
                 </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StrukturPemerintah;
