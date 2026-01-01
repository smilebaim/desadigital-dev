
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Map, Users, Leaf, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const MonografiDesa = () => {
    const monografiData = {
        umum: {
            title: "Monografi Desa Remau Bako Tuo",
            icon: BookOpen,
            content: {
                deskripsi: "Monografi Desa adalah himpunan data yang dilaksanakan oleh Pemerintah Desa yang menyajikan gambaran menyeluruh tentang kondisi dan potensi desa. Data ini mencakup aspek geografi, demografi, sosial, ekonomi, dan kelembagaan yang diperbarui secara berkala.",
                tahun: "Data per Akhir Tahun 2023"
            }
        },
        geografi: {
            title: "Data Geografi dan Wilayah",
            icon: Map,
            items: [
                { label: "Luas Wilayah", value: "± 2.500 Ha" },
                { label: "Batas Utara", value: "Desa Labuhan Pering" },
                { label: "Batas Timur", value: "Selat Berhala" },
                { label: "Batas Selatan", value: "Desa Sungai Cemara" },
                { label: "Batas Barat", value: "Kawasan Hutan Produksi" },
                { label: "Jumlah Dusun", value: "3 Dusun" },
                { label: "Jumlah RT", value: "9 RT" }
            ]
        },
        demografi: {
            title: "Data Demografi",
            icon: Users,
            items: [
                { label: "Jumlah Penduduk", value: "2.900 Jiwa" },
                { label: "Jumlah Laki-laki", value: "1.500 Jiwa" },
                { label: "Jumlah Perempuan", value: "1.400 Jiwa" },
                { label: "Jumlah Kepala Keluarga", value: "800 KK" },
                { label: "Kepadatan Penduduk", value: "116 jiwa/km²" }
            ]
        },
        potensi: {
            title: "Data Potensi Sumber Daya Alam",
            icon: Leaf,
            items: [
                { label: "Perkebunan Dominan", value: "Kelapa" },
                { label: "Hasil Laut Utama", value: "Ikan, Udang, Kepiting" },
                { label: "Potensi Tambak", value: "Udang Vaname, Ikan Bandeng" },
                { label: "Kawasan Hutan", value: "Hutan Mangrove" }
            ]
        },
        dokumen: {
            title: "Unduh Dokumen Monografi",
            icon: Download,
            deskripsi: "Data lengkap monografi desa tersedia dalam format PDF dan dapat diunduh melalui tautan di bawah ini.",
            link: "#"
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 mt-16 mb-20">
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Monografi Desa</h2>
                    <p className="text-muted-foreground">
                        Potret Data dan Potensi Desa Remau Bako Tuo
                    </p>
                </div>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <monografiData.umum.icon className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{monografiData.umum.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">{monografiData.umum.content.tahun}</p>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            {monografiData.umum.content.deskripsi}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <monografiData.geografi.icon className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{monografiData.geografi.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                        {monografiData.geografi.items.map((item, index) => (
                             <div key={index} className="flex justify-between border-b py-2">
                                <span className="text-sm font-medium text-foreground">{item.label}</span>
                                <span className="text-sm text-muted-foreground">{item.value}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <monografiData.demografi.icon className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{monografiData.demografi.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                        {monografiData.demografi.items.map((item, index) => (
                             <div key={index} className="flex justify-between border-b py-2">
                                <span className="text-sm font-medium text-foreground">{item.label}</span>
                                <span className="text-sm text-muted-foreground">{item.value}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <monografiData.potensi.icon className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{monografiData.potensi.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                        {monografiData.potensi.items.map((item, index) => (
                             <div key={index} className="flex justify-between border-b py-2">
                                <span className="text-sm font-medium text-foreground">{item.label}</span>
                                <span className="text-sm text-muted-foreground">{item.value}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                
                 <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <monografiData.dokumen.icon className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{monografiData.dokumen.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{monografiData.dokumen.deskripsi}</p>
                        <Button asChild>
                            <a href={monografiData.dokumen.link}>
                                <Download className="h-4 w-4 mr-2"/>
                                Unduh Dokumen Monografi 2023
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default MonografiDesa;
