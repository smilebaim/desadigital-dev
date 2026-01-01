
'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Baby, Activity, Syringe, Scale, BookOpen } from "lucide-react";

const Posyandu = () => {
  // Dummy icon for missing ones
  const Utensils = (props: any) => <BookOpen {...props} />;
  
  const posyanduData = {
    umum: {
      title: "Pos Pelayanan Terpadu (Posyandu)",
      icon: Activity,
      deskripsi: "Posyandu merupakan salah satu bentuk Upaya Kesehatan Bersumber Daya Masyarakat (UKBM) yang dikelola dan diselenggarakan dari, oleh, untuk, dan bersama masyarakat dalam penyelenggaraan pembangunan kesehatan guna memberdayakan masyarakat dan memberikan kemudahan kepada masyarakat dalam memperoleh pelayanan kesehatan dasar, terutama untuk mempercepat penurunan angka kematian ibu dan bayi."
    },
    layanan: {
      title: "Lima Layanan Utama Posyandu (5 Meja)",
      icon: Activity,
      items: [
        { icon: BookOpen, title: "Meja 1: Pendaftaran", description: "Pendaftaran balita, ibu hamil, dan ibu nifas." },
        { icon: Scale, title: "Meja 2: Penimbangan", description: "Penimbangan berat badan dan pengukuran tinggi badan balita untuk memantau pertumbuhan." },
        { icon: BookOpen, title: "Meja 3: Pencatatan", description: "Pencatatan hasil penimbangan dan pengukuran ke dalam KMS (Kartu Menuju Sehat)." },
        { icon: Utensils, title: "Meja 4: Penyuluhan dan Gizi", description: "Penyuluhan kesehatan, pemberian makanan tambahan (PMT), dan konsultasi gizi." },
        { icon: Syringe, title: "Meja 5: Pelayanan Kesehatan", description: "Pelayanan oleh tenaga kesehatan seperti imunisasi, pemeriksaan kehamilan, dan pelayanan KB." }
      ]
    },
    sasaran: {
      title: "Sasaran Utama Posyandu",
      icon: Baby,
      items: [
        "Bayi (usia 0-11 bulan)",
        "Anak balita (usia 12-59 bulan)",
        "Ibu hamil",
        "Ibu nifas dan menyusui",
        "Pasangan Usia Subur (PUS)"
      ]
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pos Pelayanan Terpadu (Posyandu)</h2>
          <p className="text-muted-foreground">
            Ujung Tombak Kesehatan Ibu dan Anak di Desa Remau Bako Tuo
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <posyanduData.umum.icon className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{posyanduData.umum.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">{posyanduData.umum.deskripsi}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <posyanduData.sasaran.icon className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{posyanduData.sasaran.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
                {posyanduData.sasaran.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                        <Baby className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                    </li>
                ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <posyanduData.layanan.icon className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{posyanduData.layanan.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {posyanduData.layanan.items.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="p-3 bg-muted/50 rounded-lg flex items-start gap-4">
                    <Icon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Posyandu;
