'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/Breadcrumb";

const Persuratan = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ title: "Layanan", path: "/layanan/persuratan" }, { title: "Layanan Persuratan" }]} />
      <h1 className="text-3xl font-bold mb-6 mt-4">Layanan Persuratan</h1>
      <Card>
        <CardHeader>
          <CardTitle>Pengajuan Surat Online</CardTitle>
          <CardDescription>Urus keperluan administrasi surat-menyurat Anda secara online.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Sistem layanan persuratan online ini dirancang untuk memudahkan warga dalam mengajukan berbagai jenis surat keterangan tanpa harus datang ke kantor desa. Silakan pilih jenis surat yang Anda butuhkan di bawah ini.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
                'Surat Keterangan Usaha',
                'Surat Keterangan Domisili',
                'Surat Keterangan Tidak Mampu',
                'Surat Pengantar Nikah',
                'Surat Keterangan Kelahiran',
                'Surat Keterangan Kematian',
                'Surat Pengantar SKCK',
                'Surat Izin Keramaian'
            ].map((surat, index) => (
              <Button key={index} variant="outline" className="h-auto py-4 flex-col">
                <span className="text-center">{surat}</span>
              </Button>
            ))}
          </div>
           <div className="pt-6 text-center">
                <p className="text-muted-foreground mb-2">Sudah mengajukan surat?</p>
                <Button>Lacak Status Pengajuan Surat Anda</Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Persuratan;
