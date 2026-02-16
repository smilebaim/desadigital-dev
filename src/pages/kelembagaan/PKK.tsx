'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, LineChart, Briefcase, HeartHandshake } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const PKK = () => {
  const pkkData = {
    umum: {
      title: "Informasi Umum PKK",
      icon: FileText,
      content: {
        deskripsi: "Pemberdayaan Kesejahteraan Keluarga (PKK) adalah gerakan nasional dalam pembangunan masyarakat yang tumbuh dari bawah yang pengelolaannya dari, oleh, dan untuk masyarakat menuju terwujudnya keluarga yang beriman dan bertaqwa kepada Tuhan Yang Maha Esa, berakhlak mulia dan berbudi luhur, sehat sejahtera, maju dan mandiri, kesetaraan dan keadilan gender serta kesadaran hukum dan lingkungan.",
        data: [
          {
            label: "Nama Organisasi",
            value: "TP-PKK Desa Remau Bako Tuo"
          },
          {
            label: "Tahun Berdiri",
            value: "1998"
          },
          {
            label: "Jumlah Kader Aktif",
            value: "45 Orang"
          },
          {
            label: "Status",
            value: "Aktif"
          }
        ]
      }
    },
    program: {
      title: "10 Program Pokok PKK",
      icon: Users,
      content: {
        pokja: [
          {
            nama: "Pokja I",
            program: [
              "Penghayatan dan Pengamalan Pancasila",
              "Gotong Royong"
            ]
          },
          {
            nama: "Pokja II",
            program: [
              "Pendidikan dan Keterampilan",
              "Pengembangan Kehidupan Berkoperasi"
            ]
          },
          {
            nama: "Pokja III",
            program: [
              "Pangan",
              "Sandang",
              "Perumahan dan Tata Laksana Rumah Tangga"
            ]
          },
          {
            nama: "Pokja IV",
            program: [
              "Kesehatan",
              "Kelestarian Lingkungan Hidup",
              "Perencanaan Sehat"
            ]
          }
        ]
      }
    },
    kinerja: {
      title: "Kinerja & Kegiatan Unggulan",
      icon: LineChart,
      content: {
        tahun: [
          {
            tahun: "2022",
            kegiatan: "Penyuluhan Stunting & Pemberian Makanan Tambahan",
            peserta: 150,
            anggaran: "Rp 30.000.000",
            manfaat: "Penurunan angka stunting sebesar 5%"
          },
          {
            tahun: "2023",
            kegiatan: "Pelatihan Keterampilan Daur Ulang Sampah Plastik",
            peserta: 50,
            anggaran: "Rp 15.000.000",
            manfaat: "Terbentuknya 5 kelompok usaha kerajinan"
          },
        ]
      }
    },
    pengelolaan: {
      title: "Struktur Kepengurusan",
      icon: Briefcase,
      content: {
        struktur: [
          {
            nama: "Ibu Kepala Desa (Ketua)",
            tugas: "Sebagai Ketua Tim Penggerak PKK Desa"
          },
          {
            nama: "Wakil Ketua",
            tugas: "Membantu ketua dalam melaksanakan tugas dan fungsi organisasi"
          },
          {
            nama: "Sekretaris",
            tugas: "Mengelola administrasi dan dokumentasi organisasi"
          },
          {
            nama: "Bendahara",
            tugas: "Mengelola keuangan dan aset organisasi"
          },
          {
            nama: "Ketua Pokja I, II, III, IV",
            tugas: "Mengkoordinasikan program kerja sesuai bidang masing-masing"
          }
        ]
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <Breadcrumb
        items={[
          { title: "Kelembagaan", path: "#" },
          { title: "PKK" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">PKK Desa</h2>
          <p className="text-muted-foreground">
            Pemberdayaan dan Kesejahteraan Keluarga
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <pkkData.umum.icon className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>{pkkData.umum.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Deskripsi</h4>
                <p className="text-sm text-muted-foreground">
                  {pkkData.umum.content.deskripsi}
                </p>
              </div>
              <div className="space-y-2">
                {pkkData.umum.content.data.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="text-sm text-muted-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <pkkData.program.icon className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>{pkkData.program.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {pkkData.program.content.pokja.map((pokja, index) => (
                <div key={index} className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{pokja.nama}</h4>
                    <ul className="space-y-2 mt-2">
                      {pokja.program.map((program, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <HeartHandshake className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{program}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <pkkData.kinerja.icon className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>{pkkData.kinerja.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {pkkData.kinerja.content.tahun.map((tahun, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h5 className="font-medium">Tahun {tahun.tahun} - {tahun.kegiatan}</h5>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Jumlah Peserta:</span>
                          <span>{tahun.peserta} orang</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Anggaran:</span>
                          <span>{tahun.anggaran}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Manfaat:</span>
                          <span>{tahun.manfaat}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <pkkData.pengelolaan.icon className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>{pkkData.pengelolaan.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {pkkData.pengelolaan.content.struktur.map((item, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <h4 className="font-semibold">{item.nama}</h4>
                      <p className="text-sm text-muted-foreground">{item.tugas}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PKK;
