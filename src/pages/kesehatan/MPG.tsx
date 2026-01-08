'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Breadcrumb from "@/components/Breadcrumb";

const MPG = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ title: "Layanan", path: "/layanan/persuratan" }, { title: "MPG" }]} />
      <h1 className="text-3xl font-bold mb-6 mt-4">Mitra Pembangunan Desa (MPG)</h1>
      <Card>
        <CardHeader>
          <CardTitle>Tentang MPG</CardTitle>
          <CardDescription>Peran dan fungsi Mitra Pembangunan Desa dalam sektor kesehatan.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Mitra Pembangunan Desa (MPG) adalah kader masyarakat yang secara sukarela berperan serta dalam pembangunan desa, khususnya di bidang kesehatan. Mereka menjadi jembatan antara masyarakat dengan pemerintah desa dan tenaga kesehatan.
          </p>
          <h3 className="font-semibold text-lg">Tugas Utama MPG</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Membantu pelaksanaan kegiatan Posyandu (Penimbangan balita, imunisasi, dll).</li>
            <li>Melakukan pendataan kesehatan ibu dan anak di lingkungannya.</li>
            <li>Memberikan penyuluhan tentang Pola Hidup Bersih dan Sehat (PHBS).</li>
            <li>Membantu dalam deteksi dini masalah gizi dan kesehatan lainnya.</li>
            <li>Menggerakkan masyarakat untuk memanfaatkan pelayanan kesehatan.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default MPG;
