import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, LineChart, Briefcase } from "lucide-react";

const Poskamling = () => {
  const poskamlingData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        deskripsi: "Poskamling (Pos Keamanan Lingkungan) adalah sistem keamanan lingkungan yang dikelola oleh masyarakat secara swadaya untuk menjaga keamanan dan ketertiban di lingkungan masing-masing. Poskamling merupakan wujud partisipasi masyarakat dalam upaya pencegahan kejahatan dan penanganan gangguan keamanan.",
        data: [
          {
            label: "Nama Organisasi",
            value: "Poskamling Remaubakotuo"
          },
          {
            label: "Tahun Berdiri",
            value: "2010"
          },
          {
            label: "Jumlah Anggota",
            value: "30 Orang"
          },
          {
            label: "Status",
            value: "Aktif"
          }
        ]
      }
    },
    program: {
      title: "Program",
      icon: Users,
      content: {
        kategori: [
          {
            nama: "Keamanan",
            program: [
              "Ronda Malam",
              "Pengamanan Lingkungan",
              "Penanganan Gangguan",
              "Koordinasi dengan Aparat"
            ]
          },
          {
            nama: "Ketertiban",
            program: [
              "Pengaturan Lalu Lintas",
              "Penertiban PKL",
              "Penanganan Keributan",
              "Pengawasan Kegiatan"
            ]
          },
          {
            nama: "Pencegahan",
            program: [
              "Penyuluhan Keamanan",
              "Pencegahan Narkoba",
              "Pencegahan Tawuran",
              "Pencegahan Pencurian"
            ]
          },
          {
            nama: "Kemitraan",
            program: [
              "Kerja Sama dengan RT/RW",
              "Kerja Sama dengan Polisi",
              "Kerja Sama dengan Satpam",
              "Kerja Sama dengan Masyarakat"
            ]
          }
        ]
      }
    },
    kinerja: {
      title: "Kinerja",
      icon: LineChart,
      content: {
        tahun: [
          {
            tahun: "2020",
            patroli: 365,
            penanganan: 12,
            anggaran: "Rp 30.000.000",
            manfaat: "Penurunan Angka Kejahatan"
          },
          {
            tahun: "2021",
            patroli: 365,
            penanganan: 10,
            anggaran: "Rp 35.000.000",
            manfaat: "Peningkatan Keamanan"
          },
          {
            tahun: "2022",
            patroli: 365,
            penanganan: 8,
            anggaran: "Rp 40.000.000",
            manfaat: "Penurunan Gangguan"
          },
          {
            tahun: "2023",
            patroli: 365,
            penanganan: 5,
            anggaran: "Rp 45.000.000",
            manfaat: "Peningkatan Ketertiban"
          }
        ]
      }
    },
    pengelolaan: {
      title: "Pengelolaan",
      icon: Briefcase,
      content: {
        struktur: [
          {
            nama: "Ketua Poskamling",
            tugas: "Memimpin dan mengkoordinasikan seluruh kegiatan Poskamling"
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
            nama: "Anggota",
            tugas: "Melaksanakan tugas ronda dan pengamanan"
          }
        ]
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Poskamling</h2>
          <p className="text-muted-foreground">
            Pos Keamanan Lingkungan
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <FileText className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{poskamlingData.umum.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Informasi dasar Poskamling
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Deskripsi</h4>
              <p className="text-sm text-muted-foreground">
                {poskamlingData.umum.content.deskripsi}
              </p>
            </div>
            <div className="space-y-2">
              {poskamlingData.umum.content.data.map((item, index) => (
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
            <Users className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{poskamlingData.program.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Program dan kegiatan Poskamling
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {poskamlingData.program.content.kategori.map((kategori, index) => (
              <div key={index} className="space-y-4">
                <div>
                  <h4 className="font-semibold">{kategori.nama}</h4>
                  <ul className="space-y-2 mt-2">
                    {kategori.program.map((program, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Users className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
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
            <LineChart className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{poskamlingData.kinerja.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Kinerja Poskamling per tahun
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {poskamlingData.kinerja.content.tahun.map((tahun, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h5 className="font-medium">{tahun.tahun}</h5>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Jumlah Patroli:</span>
                        <span>{tahun.patroli}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Penanganan Kasus:</span>
                        <span>{tahun.penanganan}</span>
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
            <Briefcase className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{poskamlingData.pengelolaan.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Struktur pengelolaan Poskamling
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {poskamlingData.pengelolaan.content.struktur.map((item, index) => (
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
  );
};

export default Poskamling;