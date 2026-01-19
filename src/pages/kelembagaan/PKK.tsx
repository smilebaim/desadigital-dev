'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Breadcrumb from "@/components/Breadcrumb";

const PKK = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ title: "Kelembagaan", path: "/kelembagaan/pkk" }, { title: "PKK" }]} />
      <h1 className="text-3xl font-bold mb-6 mt-4">Pemberdayaan Kesejahteraan Keluarga (PKK)</h1>
      <Card>
        <CardHeader>
          <CardTitle>Tentang PKK</CardTitle>
          <CardDescription>Gerakan nasional dalam pembangunan masyarakat yang tumbuh dari bawah yang pengelolaannya dari, oleh, dan untuk masyarakat.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="leading-relaxed">
            Pemberdayaan Kesejahteraan Keluarga (PKK) adalah organisasi kemasyarakatan yang memberdayakan wanita untuk turut berpartisipasi dalam pembangunan Indonesia. PKK terkenal dengan "10 program pokok"-nya.
          </p>
          <h3 className="font-semibold text-lg pt-2">10 Program Pokok PKK</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Penghayatan dan Pengamalan Pancasila</li>
            <li>Gotong Royong</li>
            <li>Pangan</li>
            <li>Sandang</li>
            <li>Perumahan dan Tatalaksana Rumah Tangga</li>
            <li>Pendidikan dan Keterampilan</li>
            <li>Kesehatan</li>
            <li>Pengembangan Kehidupan Berkoperasi</li>
            <li>Kelestarian Lingkungan Hidup</li>
            <li>Perencanaan Sehat</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default PKK;
