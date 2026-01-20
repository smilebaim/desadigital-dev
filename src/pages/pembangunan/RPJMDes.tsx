'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Breadcrumb from "@/components/Breadcrumb";

const RPJMDes = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ title: "Pembangunan", path: "/pembangunan/rpjmdes" }, { title: "RPJMDes" }]} />
      <h1 className="text-3xl font-bold mb-6 mt-4">Rencana Pembangunan Jangka Menengah Desa (RPJMDes)</h1>
      <Card>
        <CardHeader>
          <CardTitle>Dokumen RPJMDes</CardTitle>
          <CardDescription>
            Dokumen perencanaan untuk jangka waktu 6 (enam) tahun yang memuat visi, misi, tujuan, strategi, kebijakan, dan program pembangunan desa.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="leading-relaxed">
            RPJMDes merupakan dokumen perencanaan strategis yang menjadi acuan bagi penyusunan Rencana Kerja Pemerintah Desa (RKPDes) setiap tahunnya. Dokumen ini disusun secara partisipatif dengan melibatkan seluruh elemen masyarakat desa.
          </p>
          <h3 className="font-semibold text-lg pt-2">Tujuan RPJMDes</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Mewujudkan visi dan misi kepala desa terpilih.</li>
            <li>Menetapkan arah dan prioritas pembangunan desa dalam 6 tahun ke depan.</li>
            <li>Menjadi pedoman dalam penyusunan anggaran dan kegiatan tahunan desa.</li>
            <li>Meningkatkan partisipasi dan pemberdayaan masyarakat dalam pembangunan.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default RPJMDes;
