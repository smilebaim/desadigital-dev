'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Breadcrumb from "@/components/Breadcrumb";

const Posyandu = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ title: "Layanan", path: "/layanan/posyandu" }, { title: "Posyandu" }]} />
      <h1 className="text-3xl font-bold mb-6 mt-4">Layanan Posyandu</h1>
      <Card>
        <CardHeader>
          <CardTitle>Pos Pelayanan Terpadu (Posyandu)</CardTitle>
          <CardDescription>Layanan kesehatan dasar untuk ibu dan anak.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="leading-relaxed">
            Posyandu merupakan salah satu bentuk Upaya Kesehatan Berbasis Masyarakat (UKBM) yang dikelola dan diselenggarakan dari, oleh, untuk, dan bersama masyarakat dalam penyelenggaraan pembangunan kesehatan guna memberdayakan masyarakat dan memberikan kemudahan kepada masyarakat dalam memperoleh pelayanan kesehatan dasar/sosial dasar untuk mempercepat penurunan angka kematian ibu dan bayi.
          </p>
          <h3 className="font-semibold text-lg pt-2">Kegiatan Utama Posyandu</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Kesehatan ibu dan anak (KIA)</li>
            <li>Keluarga Berencana (KB)</li>
            <li>Imunisasi</li>
            <li>Peningkatan gizi</li>
            <li>Penanggulangan diare</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Posyandu;
