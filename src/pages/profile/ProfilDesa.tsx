'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { MapPin, Users, Home, Maximize, User } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { getProfilDesa, type ProfilDesaData } from '@/lib/profil-desa-actions';
import { Skeleton } from '@/components/ui/skeleton';

const ProfilDesa = () => {
  const [profilData, setProfilData] = useState<ProfilDesaData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfil = async () => {
      setLoading(true);
      const data = await getProfilDesa();
      setProfilData(data);
      setLoading(false);
    };
    fetchProfil();
  }, []);

  const renderSkeleton = () => (
    <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="space-y-2 mt-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
        </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ title: "Profil", path: "/profil/profil-desa" }, { title: "Profil Desa" }]} />
      <h1 className="text-3xl font-bold mb-6 mt-4">Profil Desa</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          {loading ? (
             <CardContent className="p-6">{renderSkeleton()}</CardContent>
          ) : profilData ? (
            <>
              <CardHeader>
                <CardTitle>Informasi Umum Desa</CardTitle>
                <CardDescription>Data umum mengenai Desa {profilData.nama}.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium"><MapPin className="inline-block mr-2 h-4 w-4" />Lokasi</TableCell>
                      <TableCell>{profilData.kecamatan}, {profilData.kabupaten}, {profilData.provinsi}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium"><Maximize className="inline-block mr-2 h-4 w-4" />Luas Wilayah</TableCell>
                      <TableCell>{profilData.luas}</TableCell>
                    </TableRow>
                     <TableRow>
                      <TableCell className="font-medium"><Users className="inline-block mr-2 h-4 w-4" />Jumlah Penduduk</TableCell>
                      <TableCell>{profilData.penduduk}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium"><User className="inline-block mr-2 h-4 w-4" />Kepala Desa</TableCell>
                      <TableCell>{profilData.kepalaDesa}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium"><Home className="inline-block mr-2 h-4 w-4" />Periode Jabatan</TableCell>
                      <TableCell>{profilData.periode}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </>
          ) : (
            <CardContent><p className="text-muted-foreground">Gagal memuat data profil desa.</p></CardContent>
          )}
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Peta Wilayah</CardTitle>
            <CardDescription>Lokasi geografis Desa {profilData?.nama || '...'}.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Peta akan ditampilkan di sini</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilDesa;
