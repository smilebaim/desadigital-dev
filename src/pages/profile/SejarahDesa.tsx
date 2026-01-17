'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Breadcrumb from "@/components/Breadcrumb";

const SejarahDesa = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ title: "Profil", path: "/profil/profil-desa" }, { title: "Sejarah Desa" }]} />
      <h1 className="text-3xl font-bold mb-6 mt-4">Sejarah Desa</h1>
      <Card>
        <CardHeader>
          <CardTitle>Asal Usul Desa Remau Bako Tuo</CardTitle>
          <CardDescription>Cerita di balik terbentuknya desa kita.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Menurut cerita dari para tetua desa, nama Remau Bako Tuo memiliki makna yang mendalam. "Remau" dalam bahasa setempat berarti Harimau, yang melambangkan kekuatan dan keberanian. "Bako" berarti Pangkalan atau tempat berkumpul, dan "Tuo" berarti Tua. Jadi, secara harfiah, nama desa ini dapat diartikan sebagai "Pangkalan Harimau Tua".
          </p>
          <p>
            Desa ini didirikan sekitar tahun 1920 oleh sekelompok perantau yang mencari lahan baru untuk bertani. Mereka membuka hutan belantara yang konon menurut cerita dihuni oleh seekor harimau tua yang bijaksana. Alih-alih menjadi ancaman, harimau tersebut justru dianggap sebagai penjaga wilayah.
          </p>
          <p>
            Seiring berjalannya waktu, desa ini berkembang menjadi pusat kegiatan ekonomi dan sosial di wilayah sekitarnya. Tonggak-tonggak sejarah penting termasuk pembangunan masjid pertama pada tahun 1950, masuknya listrik pada tahun 1985, dan pembangunan jalan aspal pertama yang menghubungkan desa dengan ibu kota kecamatan pada awal tahun 2000-an.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SejarahDesa;
