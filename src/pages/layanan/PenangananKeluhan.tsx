import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, AlertCircle, MessageSquare, CheckCircle } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const PenangananKeluhan = () => {
  const keluhanData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        deskripsi: "Layanan penanganan keluhan desa merupakan sarana bagi masyarakat untuk menyampaikan keluhan, kritik, dan saran terkait pelayanan publik di desa."
      }
    },
    jenis: {
      title: "Jenis Keluhan",
      icon: AlertCircle,
      content: {
        kategori: [
          {
            nama: "Pelayanan Publik",
            jenis: [
              "Pelayanan Administrasi",
              "Pelayanan Kesehatan",
              "Pelayanan Pendidikan",
              "Pelayanan Infrastruktur"
            ]
          },
          {
            nama: "Kesejahteraan",
            jenis: [
              "Bantuan Sosial",
              "Program Pemberdayaan",
              "Kesehatan Masyarakat",
              "Pendidikan"
            ]
          },
          {
            nama: "Keamanan dan Ketertiban",
            jenis: [
              "Keamanan Lingkungan",
              "Ketertiban Umum",
              "Penanganan Konflik",
              "Penegakan Peraturan"
            ]
          }
        ]
      }
    },
    prosedur: {
      title: "Prosedur Pengaduan",
      icon: MessageSquare,
      content: {
        tahap: [
          {
            nama: "Pengajuan",
            deskripsi: "Mengisi formulir pengaduan di kantor desa atau melalui aplikasi"
          },
          {
            nama: "Verifikasi",
            deskripsi: "Pemeriksaan dan verifikasi keluhan oleh petugas"
          },
          {
            nama: "Penanganan",
            deskripsi: "Proses penanganan keluhan oleh pihak terkait"
          },
          {
            nama: "Penyelesaian",
            deskripsi: "Pemberitahuan hasil penanganan kepada pengadu"
          }
        ]
      }
    },
    status: {
      title: "Status Pengaduan",
      icon: CheckCircle,
      content: {
        status: [
          {
            nama: "Menunggu Verifikasi",
            deskripsi: "Keluhan sedang dalam proses verifikasi"
          },
          {
            nama: "Dalam Penanganan",
            deskripsi: "Keluhan sedang ditangani oleh pihak terkait"
          },
          {
            nama: "Selesai",
            deskripsi: "Keluhan telah selesai ditangani"
          },
          {
            nama: "Ditolak",
            deskripsi: "Keluhan ditolak karena tidak memenuhi kriteria"
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
          { title: "Penanganan Keluhan" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Penanganan Keluhan</h2>
          <p className="text-muted-foreground">
            Informasi layanan penanganan keluhan desa
          </p>
        </div>

        <Tabs defaultValue="umum" className="space-y-4">
          <TabsList>
            <TabsTrigger value="umum">Informasi Umum</TabsTrigger>
            <TabsTrigger value="jenis">Jenis Keluhan</TabsTrigger>
            <TabsTrigger value="prosedur">Prosedur</TabsTrigger>
            <TabsTrigger value="status">Status</TabsTrigger>
          </TabsList>

          <TabsContent value="umum" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{keluhanData.umum.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Informasi dasar layanan penanganan keluhan
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-sm text-muted-foreground">
                    {keluhanData.umum.content.deskripsi}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jenis" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <AlertCircle className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{keluhanData.jenis.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Jenis-jenis keluhan yang dapat diajukan
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {keluhanData.jenis.content.kategori.map((kategori, index) => (
                  <div key={index} className="space-y-4">
                    <div>
                      <h4 className="font-semibold">{kategori.nama}</h4>
                      <ul className="space-y-2 mt-2">
                        {kategori.jenis.map((jenis, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <AlertCircle className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
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
                <MessageSquare className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{keluhanData.prosedur.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Prosedur pengajuan keluhan
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {keluhanData.prosedur.content.tahap.map((tahap, index) => (
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
                <CheckCircle className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{keluhanData.status.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Status pengajuan keluhan
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {keluhanData.status.content.status.map((status, index) => (
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

export default PenangananKeluhan; 