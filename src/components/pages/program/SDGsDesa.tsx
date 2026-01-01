
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Target, Users, Leaf, DollarSign, Building2 } from "lucide-react";

const SDGsDesa = () => {
  const sdgsData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        tahun: "2023",
        deskripsi: "SDGs Desa adalah upaya terpadu mewujudkan desa tanpa kemiskinan dan kelaparan, desa ekonomi tumbuh merata, desa peduli kesehatan, desa peduli lingkungan, desa peduli pendidikan, desa ramah perempuan, desa berjejaring, dan desa tanggap budaya untuk percepatan pencapaian Tujuan Pembangunan Berkelanjutan."
      }
    },
    target: {
      title: "Target SDGs Desa",
      icon: Target,
      content: {
        kemiskinan: {
          nama: "Desa Tanpa Kemiskinan",
          target: [
            "Menurunkan angka kemiskinan",
            "Meningkatkan akses layanan dasar",
            "Meningkatkan kesejahteraan masyarakat"
          ],
          indikator: [
            {
              nama: "Angka Kemiskinan",
              nilai: "5%",
              target: "0%"
            },
            {
              nama: "Akses Layanan Dasar",
              nilai: "85%",
              target: "100%"
            }
          ]
        },
        ekonomi: {
          nama: "Desa Ekonomi Tumbuh Merata",
          target: [
            "Meningkatkan pertumbuhan ekonomi",
            "Mengembangkan UMKM",
            "Meningkatkan pendapatan masyarakat"
          ],
          indikator: [
            {
              nama: "Pertumbuhan Ekonomi",
              nilai: "5%",
              target: "7%"
            },
            {
              nama: "Jumlah UMKM",
              nilai: "50",
              target: "100"
            }
          ]
        },
        kesehatan: {
          nama: "Desa Peduli Kesehatan",
          target: [
            "Meningkatkan derajat kesehatan",
            "Meningkatkan akses layanan kesehatan",
            "Meningkatkan sanitasi"
          ],
          indikator: [
            {
              nama: "Angka Harapan Hidup",
              nilai: "70",
              target: "75"
            },
            {
              nama: "Akses Sanitasi",
              nilai: "80%",
              target: "100%"
            }
          ]
        },
        lingkungan: {
          nama: "Desa Peduli Lingkungan",
          target: [
            "Meningkatkan kualitas lingkungan",
            "Mengembangkan energi terbarukan",
            "Mengelola sampah"
          ],
          indikator: [
            {
              nama: "Kualitas Air",
              nilai: "75%",
              target: "100%"
            },
            {
              nama: "Pengelolaan Sampah",
              nilai: "70%",
              target: "100%"
            }
          ]
        }
      }
    },
    program: {
      title: "Program SDGs Desa",
      icon: Building2,
      content: {
        kemiskinan: [
          "Program Keluarga Harapan",
          "Bantuan Langsung Tunai",
          "Program Pemberdayaan Ekonomi"
        ],
        ekonomi: [
          "Pengembangan UMKM",
          "Pelatihan Kewirausahaan",
          "Pengembangan Sektor Pertanian"
        ],
        kesehatan: [
          "Posyandu Lansia",
          "Posyandu Balita",
          "Peningkatan Sanitasi"
        ],
        lingkungan: [
          "Pengelolaan Sampah",
          "Pengembangan Energi Terbarukan",
          "Penghijauan Desa"
        ]
      }
    },
    pencapaian: {
      title: "Pencapaian",
      icon: Target,
      content: {
        tahun: [
          {
            tahun: "2020",
            target_tercapai: "4",
            total_target: "8"
          },
          {
            tahun: "2021",
            target_tercapai: "5",
            total_target: "8"
          },
          {
            tahun: "2022",
            target_tercapai: "6",
            total_target: "8"
          },
          {
            tahun: "2023",
            target_tercapai: "7",
            total_target: "8"
          }
        ]
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">SDGs Desa</h2>
          <p className="text-muted-foreground">
            Sustainable Development Goals Desa tahun {sdgsData.umum.content.tahun}
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <FileText className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{sdgsData.umum.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Informasi dasar SDGs Desa tahun {sdgsData.umum.content.tahun}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Deskripsi</h4>
              <p className="text-sm text-muted-foreground">
                {sdgsData.umum.content.deskripsi}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Target className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{sdgsData.target.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Target SDGs Desa tahun {sdgsData.umum.content.tahun}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">{sdgsData.target.content.kemiskinan.nama}</h4>
                <ul className="space-y-2 mt-2">
                  {sdgsData.target.content.kemiskinan.target.map((target, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Target className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{target}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 space-y-2">
                  {sdgsData.target.content.kemiskinan.indikator.map((indikator, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <h5 className="font-medium">{indikator.nama}</h5>
                        <p className="text-sm text-muted-foreground">Target: {indikator.target}</p>
                      </div>
                      <span className="font-medium">{indikator.nilai}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">{sdgsData.target.content.ekonomi.nama}</h4>
                <ul className="space-y-2 mt-2">
                  {sdgsData.target.content.ekonomi.target.map((target, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <DollarSign className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{target}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 space-y-2">
                  {sdgsData.target.content.ekonomi.indikator.map((indikator, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <h5 className="font-medium">{indikator.nama}</h5>
                        <p className="text-sm text-muted-foreground">Target: {indikator.target}</p>
                      </div>
                      <span className="font-medium">{indikator.nilai}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
             <div className="space-y-4">
              <div>
                <h4 className="font-semibold">{sdgsData.target.content.kesehatan.nama}</h4>
                <ul className="space-y-2 mt-2">
                  {sdgsData.target.content.kesehatan.target.map((target, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Users className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{target}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 space-y-2">
                  {sdgsData.target.content.kesehatan.indikator.map((indikator, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <h5 className="font-medium">{indikator.nama}</h5>
                        <p className="text-sm text-muted-foreground">Target: {indikator.target}</p>
                      </div>
                      <span className="font-medium">{indikator.nilai}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
             <div className="space-y-4">
              <div>
                <h4 className="font-semibold">{sdgsData.target.content.lingkungan.nama}</h4>
                <ul className="space-y-2 mt-2">
                  {sdgsData.target.content.lingkungan.target.map((target, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Leaf className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{target}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 space-y-2">
                  {sdgsData.target.content.lingkungan.indikator.map((indikator, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <h5 className="font-medium">{indikator.nama}</h5>
                        <p className="text-sm text-muted-foreground">Target: {indikator.target}</p>
                      </div>
                      <span className="font-medium">{indikator.nilai}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Building2 className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{sdgsData.program.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Program SDGs Desa tahun {sdgsData.umum.content.tahun}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Program Penanggulangan Kemiskinan</h4>
                <ul className="space-y-2 mt-2">
                  {sdgsData.program.content.kemiskinan.map((program, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Target className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{program}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Program Pengembangan Ekonomi</h4>
                <ul className="space-y-2 mt-2">
                  {sdgsData.program.content.ekonomi.map((program, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <DollarSign className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{program}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Program Kesehatan</h4>
                <ul className="space-y-2 mt-2">
                  {sdgsData.program.content.kesehatan.map((program, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Users className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{program}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Program Lingkungan</h4>
                <ul className="space-y-2 mt-2">
                  {sdgsData.program.content.lingkungan.map((program, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Leaf className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{program}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Target className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{sdgsData.pencapaian.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Pencapaian SDGs Desa dari tahun ke tahun
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {sdgsData.pencapaian.content.tahun.map((tahun, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">Tahun {tahun.tahun}</h4>
                    <p className="text-sm text-muted-foreground">
                      Target tercapai: {tahun.target_tercapai} dari {tahun.total_target}
                    </p>
                  </div>
                  <span className="font-medium">
                    {Math.round((Number(tahun.target_tercapai) / Number(tahun.total_target)) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SDGsDesa;
