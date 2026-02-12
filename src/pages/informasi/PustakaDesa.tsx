'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Download } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";

const pustakaData = [
  {
    title: "Sejarah Lisan Desa Remau Bako Tuo",
    author: "Tim Peneliti Sejarah Lokal",
    year: 2022,
    category: "Sejarah & Budaya",
    imageUrl: "https://picsum.photos/seed/history/300/400",
    imageHint: "old book",
    fileUrl: "#"
  },
  {
    title: "Potensi Keanekaragaman Hayati Hutan Desa",
    author: "Fakultas Kehutanan Universitas Jambi",
    year: 2021,
    category: "Lingkungan",
    imageUrl: "https://picsum.photos/seed/forest/300/400",
    imageHint: "rainforest",
    fileUrl: "#"
  },
  {
    title: "Kumpulan Resep Masakan Khas Pesisir",
    author: "Tim PKK Desa Remau Bako Tuo",
    year: 2023,
    category: "Kuliner & Gaya Hidup",
    imageUrl: "https://picsum.photos/seed/recipe/300/400",
    imageHint: "food recipe",
    fileUrl: "#"
  },
  {
    title: "Panduan Budi Daya Ikan Air Tawar",
    author: "Dinas Perikanan Kab. Tanjung Jabung Timur",
    year: 2020,
    category: "Ekonomi & Pertanian",
    imageUrl: "https://picsum.photos/seed/fish/300/400",
    imageHint: "fish farming",
    fileUrl: "#"
  }
];

const PustakaDesa = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
       <Breadcrumb
        items={[
          { title: "Pustaka", path: "/pustaka" },
          { title: "Pustaka Desa" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pustaka Digital Desa</h2>
          <p className="text-muted-foreground">
            Koleksi buku, dokumen, dan karya tulis yang berkaitan dengan Desa Remau Bako Tuo.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pustakaData.map((item, index) => (
            <Card key={index} className="overflow-hidden flex flex-col group">
              <div className="relative aspect-[3/4]">
                <Image 
                    src={item.imageUrl} 
                    alt={item.title} 
                    fill 
                    className="object-cover transition-transform group-hover:scale-105"
                    data-ai-hint={item.imageHint}
                />
              </div>
              <CardContent className="p-4 flex flex-col flex-grow">
                <p className="text-xs font-semibold text-primary uppercase">{item.category}</p>
                <h3 className="text-md font-bold mt-1 flex-grow">{item.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.author} ({item.year})
                </p>
                <Button asChild className="mt-4 w-full" size="sm">
                  <a href={item.fileUrl} download>
                    <Download className="h-4 w-4 mr-2" />
                    Unduh
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PustakaDesa;
