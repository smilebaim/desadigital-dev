import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, ScrollText, FileCheck, FileClock } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const PeraturanDesa = () => {
  const peraturanData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        deskripsi: "Peraturan Desa merupakan produk hukum yang ditetapkan oleh Kepala Desa setelah dibahas dan disepakati bersama Badan Permusyawaratan Desa (BPD)."
      }
    },
    jenis: {
      title: "Jenis Peraturan",
      icon: ScrollText,
      content: {
        kategori: [
          {
            nama: "Peraturan Desa",
            jenis: [
              "Peraturan Desa tentang APBDes",
              "Peraturan Desa tentang Pajak dan Retribusi",
              "Peraturan Desa tentang Pengelolaan Aset",
              "Peraturan Desa tentang Pelayanan Publik"
            ]
          },
          {
            nama: "Peraturan Kepala Desa",
            jenis: [
              "Peraturan tentang Struktur Organisasi",
              "Peraturan tentang Tata Kerja",
              "Peraturan tentang Pengelolaan Keuangan",
              "Peraturan tentang Pelayanan Masyarakat"
            ]
          },
          {
            nama: "Keputusan Kepala Desa",
            jenis: [
              "Keputusan tentang Pengangkatan Perangkat",
              "Keputusan tentang Penetapan Program",
              "Keputusan tentang Penetapan Anggaran",
              "Keputusan tentang Penetapan Kebijakan"
            ]
          }
        ]
      }
    },
    prosedur: {
      title: "Prosedur Pembentukan",
      icon: FileClock,
      content: {
        tahap: [
          {
            nama: "Penyusunan",
            deskripsi: "Penyusunan rancangan peraturan oleh tim perumus"
          },
          {
            nama: "Pembahasan",
            deskripsi: "Pembahasan rancangan dengan BPD dan masyarakat"
          },
          {
            nama: "Penetapan",
            deskripsi: "Penetapan peraturan oleh Kepala Desa"
          },
          {
            nama: "Pengundangan",
            deskripsi: "Pengundangan dan sosialisasi peraturan"
          }
        ]
      }
    },
    status: {
      title: "Status Peraturan",
      icon: FileCheck,
      content: {
        status: [
          {
            nama: "Berlaku",
            deskripsi: "Peraturan masih berlaku dan dapat diterapkan"
          },
          {
            nama: "Perubahan",
            deskripsi: "Peraturan sedang dalam proses perubahan"
          },
          {
            nama: "Pencabutan",
            deskripsi: "Peraturan telah dicabut dan tidak berlaku lagi"
          },
          {
            nama: "Evaluasi",
            deskripsi: "Peraturan sedang dalam proses evaluasi"
          }
        ]
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <Breadcrumb
        items={[
          { title: "Layanan", path: "/layanan" },
          { title: "Peraturan Desa" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Peraturan Desa</h2>
          <p className="text-muted-foreground">
            Informasi peraturan dan kebijakan desa
          </p>
        </div>

        <Tabs defaultValue="umum" className="space-y-4">
          <TabsList>
            <TabsTrigger value="umum">Informasi Umum</TabsTrigger>
            <TabsTrigger value="jenis">Jenis Peraturan</TabsTrigger>
            <TabsTrigger value="prosedur">Prosedur</TabsTrigger>
            <TabsTrigger value="status">Status</TabsTrigger>
          </TabsList>

          <TabsContent value="umum" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{peraturanData.umum.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Informasi dasar peraturan desa
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-sm text-muted-foreground">
                    {peraturanData.umum.content.deskripsi}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jenis" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <ScrollText className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{peraturanData.jenis.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Jenis-jenis peraturan desa
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {peraturanData.jenis.content.kategori.map((kategori, index) => (
                  <div key={index} className="space-y-4">
                    <div>
                      <h4 className="font-semibold">{kategori.nama}</h4>
                      <ul className="space-y-2 mt-2">
                        {kategori.jenis.map((jenis, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <ScrollText className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{jenis}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prosedur" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileClock className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{peraturanData.prosedur.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Prosedur pembentukan peraturan
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {peraturanData.prosedur.content.tahap.map((tahap, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{tahap.nama}</h4>
                        <p className="text-sm text-muted-foreground">{tahap.deskripsi}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="status" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileCheck className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{peraturanData.status.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Status peraturan desa
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {peraturanData.status.content.status.map((status, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{status.nama}</h4>
                        <p className="text-sm text-muted-foreground">{status.deskripsi}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PeraturanDesa; 