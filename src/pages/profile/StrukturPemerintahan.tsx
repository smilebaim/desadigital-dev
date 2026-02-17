'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Breadcrumb from "@/components/Breadcrumb";
import { User } from "lucide-react";
import Image from "next/image";

const perangkatDesa = [
  {
    jabatan: "Kepala Desa",
    nama: "H. Abdullah",
    fotoUrl: "https://picsum.photos/seed/kades/200/200",
    imageHint: "man portrait"
  },
  {
    jabatan: "Sekretaris Desa",
    nama: "Muhammad Saleh, S.Kom",
    fotoUrl: "https://picsum.photos/seed/sekdes/200/200",
    imageHint: "man portrait"
  },
  {
    jabatan: "Kaur Keuangan",
    nama: "Siti Aminah, A.Md",
    fotoUrl: "https://picsum.photos/seed/kaurkeu/200/200",
    imageHint: "woman portrait"
  },
  {
    jabatan: "Kaur Perencanaan",
    nama: "Ahmad Yani",
    fotoUrl: "https://picsum.photos/seed/kaurplan/200/200",
    imageHint: "man portrait"
  },
  {
    jabatan: "Kaur Tata Usaha & Umum",
    nama: "Fatimah",
    fotoUrl: "https://picsum.photos/seed/kaurtu/200/200",
    imageHint: "woman portrait"
  },
  {
    jabatan: "Kasi Pemerintahan",
    nama: "La Ode Idrus",
    fotoUrl: "https://picsum.photos/seed/kasipem/200/200",
    imageHint: "man portrait"
  },
  {
    jabatan: "Kasi Kesejahteraan",
    nama: "Wa Ode Rahma",
    fotoUrl: "https://picsum.photos/seed/kasikesra/200/200",
    imageHint: "woman portrait"
  },
  {
    jabatan: "Kasi Pelayanan",
    nama: "Suparman",
    fotoUrl: "https://picsum.photos/seed/kasipel/200/200",
    imageHint: "man portrait"
  },
];

const kepalaDusun = [
    { jabatan: "Kepala Dusun I", nama: "Sulaiman", fotoUrl: "https://picsum.photos/seed/kadus1/200/200", imageHint: "man portrait"},
    { jabatan: "Kepala Dusun II", nama: "Junaidi", fotoUrl: "https://picsum.photos/seed/kadus2/200/200", imageHint: "man portrait"},
    { jabatan: "Kepala Dusun III", nama: "Rahmat", fotoUrl: "https://picsum.photos/seed/kadus3/200/200", imageHint: "man portrait"},
];


const StrukturPemerintahan = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <Breadcrumb
        items={[
          { title: "Profil", path: "/profil" },
          { title: "Struktur Pemerintahan" }
        ]}
      />
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Struktur Pemerintahan Desa</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Berikut adalah jajaran aparatur Pemerintah Desa Remau Bako Tuo periode 2021-2027 yang berdedikasi untuk melayani masyarakat dan memajukan desa.
          </p>
        </div>

        <Card className="bg-gradient-to-br from-background via-slate-50 to-muted/30 border-primary/10 shadow-lg">
            <CardHeader className="text-center py-8">
                <div className="mx-auto bg-background rounded-full p-1 border-2 border-primary/20 shadow-md inline-block">
                    <Avatar className="h-28 w-28">
                        <Image src={perangkatDesa[0].fotoUrl} alt={perangkatDesa[0].nama} width={112} height={112} data-ai-hint={perangkatDesa[0].imageHint} className="rounded-full" />
                    </Avatar>
                </div>
                <CardTitle className="mt-4 text-2xl">{perangkatDesa[0].nama}</CardTitle>
                <CardDescription className="text-primary font-semibold">{perangkatDesa[0].jabatan}</CardDescription>
            </CardHeader>
        </Card>
        
        <div className="text-center pt-4">
            <h3 className="text-2xl font-bold tracking-tight">Perangkat Desa</h3>
            <p className="text-muted-foreground mt-1">Tim yang mendukung operasional pemerintahan desa.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {perangkatDesa.slice(1).map((perangkat, index) => (
            <Card key={index} className="text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5">
              <CardContent className="pt-6">
                <Avatar className="h-24 w-24 mx-auto mb-4 border-2 border-muted">
                  <Image src={perangkat.fotoUrl} alt={perangkat.nama} width={96} height={96} data-ai-hint={perangkat.imageHint} className="rounded-full" />
                </Avatar>
                <h3 className="font-semibold text-lg">{perangkat.nama}</h3>
                <p className="text-sm text-muted-foreground">{perangkat.jabatan}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center pt-8">
            <h3 className="text-2xl font-bold tracking-tight">Kepala Dusun</h3>
            <p className="text-muted-foreground mt-1">Perpanjangan tangan pemerintah desa di tingkat dusun.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {kepalaDusun.map((kadus, index) => (
                <Card key={index} className="text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5">
                <CardContent className="pt-6">
                    <Avatar className="h-24 w-24 mx-auto mb-4 border-2 border-muted">
                      <Image src={kadus.fotoUrl} alt={kadus.nama} width={96} height={96} data-ai-hint={kadus.imageHint} className="rounded-full" />
                    </Avatar>
                    <h3 className="font-semibold text-lg">{kadus.nama}</h3>
                    <p className="text-sm text-muted-foreground">{kadus.jabatan}</p>
                </CardContent>
                </Card>
            ))}
        </div>

      </div>
    </div>
  );
};

export default StrukturPemerintahan;
