import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users2, Phone, Mail, MapPin } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const StrukturBadan = () => {
  const strukturData = {
    ketua: {
      nama: "H. La Ode Karim",
      periode: "2021-2026",
      pendidikan: "S1 Hukum",
      kontak: {
        telepon: "+62 812-3456-7891",
        email: "bpd.remaubakotuo@gmail.com",
        alamat: "Jl. Desa No. 2, Dusun II"
      }
    },
    anggota: [
      {
        jabatan: "Wakil Ketua",
        nama: "Wa Ode Aminah",
        tugas: [
          "Membantu ketua dalam menjalankan tugas",
          "Menggantikan ketua saat berhalangan",
          "Mengkoordinasikan kegiatan komisi",
          "Melakukan pengawasan kinerja"
        ]
      },
      {
        jabatan: "Sekretaris",
        nama: "La Ode Safar",
        tugas: [
          "Mengelola administrasi BPD",
          "Menyusun notulen rapat",
          "Mengelola arsip BPD",
          "Menyiapkan laporan kegiatan"
        ]
      },
      {
        jabatan: "Anggota",
        nama: "La Ode Rusli",
        tugas: [
          "Melakukan pengawasan kinerja",
          "Menampung aspirasi masyarakat",
          "Menyusun peraturan desa",
          "Melakukan evaluasi program"
        ]
      },
      {
        jabatan: "Anggota",
        nama: "Wa Ode Hasnia",
        tugas: [
          "Melakukan pengawasan kinerja",
          "Menampung aspirasi masyarakat",
          "Menyusun peraturan desa",
          "Melakukan evaluasi program"
        ]
      }
    ],
    fungsi: [
      "Membahas dan menyepakati Rancangan Peraturan Desa",
      "Menampung dan menyalurkan aspirasi masyarakat",
      "Melakukan pengawasan kinerja Kepala Desa",
      "Menyelenggarakan musyawarah desa",
      "Membahas dan menyepakati Rancangan Anggaran Pendapatan dan Belanja Desa",
      "Membahas dan menyepakati Rancangan Peraturan Desa tentang APBDes",
      "Membahas dan menyepakati Rancangan Peraturan Desa tentang perubahan APBDes",
      "Membahas dan menyepakati Rancangan Peraturan Desa tentang pertanggungjawaban pelaksanaan APBDes"
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { title: "Profil", path: "/profil" },
          { title: "Badan Permusyawaratan Desa" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Badan Permusyawaratan Desa</h2>
          <p className="text-muted-foreground">
            Struktur dan perangkat Badan Permusyawaratan Desa Remau Bakotuo
          </p>
        </div>

        <Tabs defaultValue="ketua" className="space-y-4">
          <TabsList>
            <TabsTrigger value="ketua">Ketua BPD</TabsTrigger>
            <TabsTrigger value="anggota">Anggota BPD</TabsTrigger>
            <TabsTrigger value="fungsi">Fungsi BPD</TabsTrigger>
          </TabsList>

          <TabsContent value="ketua">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Users2 className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>{strukturData.ketua.nama}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Periode: {strukturData.ketua.periode}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Profil</h4>
                  <p className="text-muted-foreground">
                    Pendidikan: {strukturData.ketua.pendidikan}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Kontak</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {strukturData.ketua.kontak.telepon}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {strukturData.ketua.kontak.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {strukturData.ketua.kontak.alamat}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="anggota" className="space-y-4">
            {strukturData.anggota.map((anggota, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{anggota.jabatan}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {anggota.nama}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {anggota.tugas.map((tugas, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-muted-foreground">{tugas}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="fungsi">
            <Card>
              <CardHeader>
                <CardTitle>Fungsi BPD</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Tugas dan wewenang Badan Permusyawaratan Desa
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {strukturData.fungsi.map((fungsi, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-muted-foreground">{fungsi}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StrukturBadan; 