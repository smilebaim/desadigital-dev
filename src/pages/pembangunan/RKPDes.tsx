'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Breadcrumb from "@/components/Breadcrumb";

const RKPDes = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ title: "Pembangunan", path: "/pembangunan/rkpdes" }, { title: "RKPDes" }]} />
      <h1 className="text-3xl font-bold mb-6 mt-4">Rencana Kerja Pemerintah Desa (RKPDes)</h1>
      <Card>
        <CardHeader>
          <CardTitle>Dokumen RKPDes</CardTitle>
          <CardDescription>
            Dokumen perencanaan tahunan sebagai penjabaran dari RPJMDes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="leading-relaxed">
            Rencana Kerja Pemerintah Desa (RKPDes) adalah dokumen perencanaan untuk periode 1 (satu) tahun yang merupakan penjabaran dari Rencana Pembangunan Jangka Menengah Desa (RPJMDes). RKPDes menjadi dasar dalam penyusunan Anggaran Pendapatan dan Belanja Desa (APBDes).
          </p>
          <h3 className="font-semibold text-lg pt-2">Fungsi RKPDes</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Menjadi acuan dalam penyusunan APBDes.</li>
            <li>Menetapkan prioritas program dan kegiatan yang akan dilaksanakan dalam satu tahun.</li>
            <li>Memastikan kesinambungan antara perencanaan jangka menengah dan tahunan.</li>
            <li>Sebagai alat kendali dalam pelaksanaan pembangunan desa.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default RKPDes;
