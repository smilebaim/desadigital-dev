'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Landmark, Users, Building, Scale, Shield } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const lkdData = {
    lpm: {
        title: "Lembaga Pemberdayaan Masyarakat (LPM)",
        icon: Landmark,
        description: "LPM adalah lembaga atau wadah yang dibentuk atas prakarsa masyarakat sebagai mitra Pemerintah Desa dalam menampung dan mewujudkan aspirasi serta kebutuhan masyarakat di bidang pembangunan.",
        tugas: [
            "Menyusun rencana pembangunan secara partisipatif.",
            "Menggerakkan swadaya gotong royong masyarakat.",
            "Melaksanakan dan mengendalikan pembangunan.",
            "Melakukan evaluasi terhadap pelaksanaan pembangunan."
        ]
    },
    rtrw: {
        title: "Rukun Tetangga (RT) & Rukun Warga (RW)",
        icon: Building,
        description: "RT dan RW adalah lembaga kemasyarakatan yang dibentuk melalui musyawarah masyarakat setempat dalam rangka pelayanan pemerintahan dan kemasyarakatan yang ditetapkan oleh Pemerintah Desa.",
        tugas: [
            "Membantu menjalankan tugas pelayanan kepada masyarakat.",
            "Memelihara kerukunan hidup warga.",
            "Menampung dan menyalurkan aspirasi masyarakat.",
            "Menggerakkan swadaya gotong royong dalam pelaksanaan pembangunan."
        ]
    },
    adat: {
        title: "Lembaga Adat Desa",
        icon: Scale,
        description: "Lembaga Adat Desa adalah lembaga yang menyelenggarakan fungsi adat istiadat dan menjadi bagian dari susunan asli desa yang tumbuh dan berkembang atas prakarsa masyarakat desa.",
        tugas: [
            "Membantu pemerintah desa dalam penyelenggaraan urusan adat.",
            "Melestarikan nilai sosial budaya dan adat istiadat.",
            "Menyelesaikan sengketa perdata/adat yang berkenaan dengan warga.",
            "Memberdayakan, melestarikan, dan mengembangkan kelembagaan adat."
        ]
    },
};

const LKD = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <Breadcrumb
        items={[
          { title: "Kelembagaan", path: "#" },
          { title: "LKD" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Lembaga Kemasyarakatan Desa (LKD)</h2>
          <p className="text-muted-foreground">
            Mitra Pemerintah Desa dalam Pembangunan dan Pemberdayaan
          </p>
        </div>

        <div className="space-y-6">
          {Object.values(lkdData).map((lembaga, index) => {
            const Icon = lembaga.icon;
            return (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Icon className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle>{lembaga.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{lembaga.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2 text-md">Tugas Pokok dan Fungsi:</h4>
                    <ul className="list-disc space-y-1 pl-5 text-sm">
                      {lembaga.tugas.map((tugas, idx) => (
                        <li key={idx} className="text-muted-foreground">{tugas}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default LKD;
