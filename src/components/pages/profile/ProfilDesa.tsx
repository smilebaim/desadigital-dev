
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Users, MapPin, FileText } from "lucide-react";

const ProfilDesa = () => {
  const profilData = {
    umum: {
      title: "Profil Umum",
      icon: Home,
      content: {
        deskripsi: "Selamat datang di Desa Remau Bako Tuo, sebuah desa pesisir yang dinamis di Kecamatan Sadu. Terletak di pesisir timur Provinsi Jambi, desa kami diberkahi dengan kekayaan sumber daya laut dan perkebunan kelapa yang luas. Mayoritas penduduk kami adalah nelayan dan petani yang terampil, hidup berdampingan dengan ekosistem mangrove yang menjadi urat nadi kehidupan.",
        data: [
          { label: "Nama Desa", value: "Remau Bako Tuo" },
          { label: "Kecamatan", value: "Sadu" },
          { label: "Kabupaten", value: "Tanjung Jabung Timur" },
          { label: "Provinsi", value: "Jambi" }
        ]
      }
    },
    demografi: {
      title: "Demografi",
      icon: Users,
      content: {
        deskripsi: "Berikut adalah data kependudukan Desa Remau Bako Tuo yang dihimpun dari data administrasi terakhir.",
        data: [
          { label: "Jumlah Penduduk", value: "Sekitar 2.900 Jiwa" },
          { label: "Jumlah Laki-laki", value: "Sekitar 1.500 Jiwa" },
          { label: "Jumlah Perempuan", value: "Sekitar 1.400 Jiwa" },
          { label: "Jumlah Kepala Keluarga", value: "Sekitar 800 KK" }
        ]
      }
    },
    geografi: {
      title: "Geografi dan Potensi",
      icon: MapPin,
      content: {
        deskripsi: "Terletak di tepi Selat Berhala, desa kami memiliki garis pantai yang panjang dan lahan subur yang didominasi perkebunan kelapa dan area pertambakan.",
        data: [
          { label: "Batas Utara", value: "Desa Labuhan Pering" },
          { label: "Batas Selatan", value: "Desa Sungai Cemara" },
          { label: "Batas Barat", value: "Kawasan Hutan Produksi" },
          { label: "Batas Timur", value: "Selat Berhala" }
        ]
      }
    },
    dokumen: {
      title: "Dokumen Profil",
      icon: FileText,
      content: {
        dokumen: [
          { judul: "Profil Desa Lengkap", tahun: "2024", status: "Dokumen Resmi" },
          { judul: "Data Statistik Desa", tahun: "2024", status: "Dokumen Resmi" }
        ]
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Profil Desa</h2>
          <p className="text-muted-foreground">
            Informasi umum mengenai Desa Remau Bako Tuo
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Home className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>Profil Umum</CardTitle>
              <p className="text-sm text-muted-foreground">
                Informasi dasar mengenai Desa Remau Bako Tuo
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Deskripsi</h4>
              <p className="text-sm text-muted-foreground">
                {profilData.umum.content.deskripsi}
              </p>
            </div>
            <div className="space-y-2">
              {profilData.umum.content.data.map((item, index) => (
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
              <CardTitle>Demografi</CardTitle>
              <p className="text-sm text-muted-foreground">
                Data kependudukan Desa Remau Bako Tuo
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Deskripsi</h4>
              <p className="text-sm text-muted-foreground">
                {profilData.demografi.content.deskripsi}
              </p>
            </div>
            <div className="space-y-2">
              {profilData.demografi.content.data.map((item, index) => (
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
            <MapPin className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>Geografi dan Potensi</CardTitle>
              <p className="text-sm text-muted-foreground">
                Letak geografis dan potensi Desa Remau Bako Tuo
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Deskripsi</h4>
              <p className="text-sm text-muted-foreground">
                {profilData.geografi.content.deskripsi}
              </p>
            </div>
            <div className="space-y-2">
              {profilData.geografi.content.data.map((item, index) => (
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
            <FileText className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>Dokumen Profil</CardTitle>
              <p className="text-sm text-muted-foreground">
                Dokumen terkait profil Desa Remau Bako Tuo
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {profilData.dokumen.content.dokumen.map((item, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-semibold">{item.judul}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tahun</span>
                    <span className="font-medium">{item.tahun}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-medium">{item.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilDesa;
