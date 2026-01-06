import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, FileCheck, FileX, FileClock } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const Persuratan = () => {
  const persuratanData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        deskripsi: "Layanan persuratan desa meliputi pengajuan, pengolahan, dan pengiriman surat-surat resmi yang diperlukan oleh masyarakat desa."
      }
    },
    jenis: {
      title: "Jenis Surat",
      icon: FileCheck,
      content: {
        kategori: [
          {
            nama: "Surat Keterangan",
            jenis: [
              "Surat Keterangan Domisili",
              "Surat Keterangan Usaha",
              "Surat Keterangan Tidak Mampu",
              "Surat Keterangan Belum Menikah"
            ]
          },
          {
            nama: "Surat Pengantar",
            jenis: [
              "Surat Pengantar KTP",
              "Surat Pengantar KK",
              "Surat Pengantar Nikah",
              "Surat Pengantar SKCK"
            ]
          },
          {
            nama: "Surat Rekomendasi",
            jenis: [
              "Surat Rekomendasi Beasiswa",
              "Surat Rekomendasi Kerja",
              "Surat Rekomendasi Usaha"
            ]
          }
        ]
      }
    },
    prosedur: {
      title: "Prosedur Pengajuan",
      icon: FileClock,
      content: {
        langkah: [
          {
            tahap: "Persiapan",
            deskripsi: "Menyiapkan dokumen yang diperlukan sesuai jenis surat"
          },
          {
            tahap: "Pengajuan",
            deskripsi: "Mengisi formulir pengajuan di kantor desa"
          },
          {
            tahap: "Verifikasi",
            deskripsi: "Pemeriksaan dan verifikasi dokumen oleh petugas"
          },
          {
            tahap: "Penerbitan",
            deskripsi: "Penerbitan surat setelah proses verifikasi selesai"
          }
        ]
      }
    },
    status: {
      title: "Status Pengajuan",
      icon: FileX,
      content: {
        status: [
          {
            nama: "Menunggu Verifikasi",
            deskripsi: "Surat sedang dalam proses verifikasi oleh petugas"
          },
          {
            nama: "Dokumen Kurang",
            deskripsi: "Perlu melengkapi dokumen yang kurang"
          },
          {
            nama: "Selesai",
            deskripsi: "Surat telah selesai diproses dan dapat diambil"
          },
          {
            nama: "Ditolak",
            deskripsi: "Pengajuan surat ditolak karena tidak memenuhi syarat"
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
          { title: "Persuratan" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Layanan Persuratan</h2>
          <p className="text-muted-foreground">
            Informasi layanan persuratan desa
          </p>
        </div>

        <Tabs defaultValue="umum" className="space-y-4">
          <TabsList>
            <TabsTrigger value="umum">Informasi Umum</TabsTrigger>
            <TabsTrigger value="jenis">Jenis Surat</TabsTrigger>
            <TabsTrigger value="prosedur">Prosedur</TabsTrigger>
            <TabsTrigger value="status">Status</TabsTrigger>
          </TabsList>

          <TabsContent value="umum" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{persuratanData.umum.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Informasi dasar layanan persuratan desa
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-sm text-muted-foreground">
                    {persuratanData.umum.content.deskripsi}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jenis" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileCheck className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{persuratanData.jenis.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Daftar jenis surat yang dapat diajukan
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {persuratanData.jenis.content.kategori.map((kategori, index) => (
                  <div key={index} className="space-y-4">
                    <div>
                      <h4 className="font-semibold">{kategori.nama}</h4>
                      <ul className="space-y-2 mt-2">
                        {kategori.jenis.map((jenis, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <FileText className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
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
                  <CardTitle>{persuratanData.prosedur.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Prosedur pengajuan surat
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {persuratanData.prosedur.content.langkah.map((langkah, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{langkah.tahap}</h4>
                        <p className="text-sm text-muted-foreground">{langkah.deskripsi}</p>
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
                <FileX className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{persuratanData.status.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Status pengajuan surat
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {persuratanData.status.content.status.map((status, index) => (
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

export default Persuratan; 