'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { MapPin, Users, Home, Maximize, User } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const ProfilDesa = () => {
  const profilData = {
    nama: "Remau Bako Tuo",
    kecamatan: "Sadu",
    kabupaten: "Tanjung Jabung Timur",
    provinsi: "Jambi",
    luas: "2,500 Ha",
    penduduk: "3.245 Jiwa",
    kepalaDesa: "Nama Kepala Desa",
    periode: "2020 - 2026",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ title: "Profil", path: "/profil/profil-desa" }, { title: "Profil Desa" }]} />
      <h1 className="text-3xl font-bold mb-6 mt-4">Profil Desa</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
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
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Peta Wilayah</CardTitle>
            <CardDescription>Lokasi geografis Desa {profilData.nama}.</CardDescription>
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
