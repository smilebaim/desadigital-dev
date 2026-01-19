
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Breadcrumb from "@/components/Breadcrumb";

const LKMD = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ title: "Kelembagaan", path: "/kelembagaan/lkmd" }, { title: "LKMD" }]} />
      <h1 className="text-3xl font-bold mb-6 mt-4">Lembaga Ketahanan Masyarakat Desa (LKMD)</h1>
      <Card>
        <CardHeader>
          <CardTitle>Tentang LKMD</CardTitle>
          <CardDescription>Peran dan fungsi LKMD dalam pembangunan desa.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="leading-relaxed">
            Lembaga Ketahanan Masyarakat Desa (LKMD) adalah lembaga kemasyarakatan yang dibentuk oleh masyarakat dan pemerintah desa sebagai wadah partisipasi masyarakat dalam perencanaan, pelaksanaan, dan pengendalian pembangunan.
          </p>
          <h3 className="font-semibold text-lg pt-2">Tugas Utama LKMD</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Menyusun rencana pembangunan secara partisipatif.</li>
            <li>Menggerakkan swadaya gotong royong masyarakat.</li>
            <li>Melaksanakan dan mengendalikan pembangunan.</li>
            <li>Memelihara dan mengembangkan hasil-hasil pembangunan.</li>
            <li>Mengembangkan potensi dan aset desa untuk kesejahteraan masyarakat.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default LKMD;
