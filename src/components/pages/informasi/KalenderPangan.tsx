
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Apple, Fish, Wind, Sprout } from "lucide-react";

const KalenderPangan = () => {
    const kalenderData = {
        umum: {
            title: "Kalender Pangan Musiman Desa Remau Bako Tuo",
            icon: Apple,
            content: {
                deskripsi: "Kalender Pangan ini adalah panduan bagi masyarakat dan pengunjung untuk mengetahui siklus hasil alam utama di Desa Remau Bako Tuo, terutama yang berkaitan dengan hasil laut dan perkebunan. Kalender ini membantu nelayan, petani, dan pelaku UMKM dalam merencanakan aktivitas ekonomi mereka sepanjang tahun.",
            }
        },
        ikan: {
            title: "Musim Tangkapan Ikan",
            icon: Fish,
            content: {
                deskripsi: "Pola musim tangkapan ikan sangat dipengaruhi oleh angin muson yang menentukan kondisi gelombang dan jenis ikan yang melimpah.",
                musim: [
                    {
                        nama: "Musim Angin Barat (Oktober - Maret)",
                        icon: Wind,
                        deskripsi: "Gelombang cenderung lebih besar, nelayan lebih fokus pada penangkapan di area yang lebih teduh atau menggunakan alat tangkap pasif.",
                        hasil: [
                            "Hasil utama: Ikan Sembilang, Udang, dan Kepiting Bakau.",
                            "Aktivitas: Musim puncak untuk mencari kepiting di kawasan mangrove.",
                            "Catatan: Nelayan dengan perahu lebih kecil mungkin mengurangi frekuensi melaut."
                        ]
                    },
                    {
                        nama: "Musim Angin Timur (April - September)",
                        icon: Wind,
                        deskripsi: "Dianggap sebagai musim puncak melaut. Laut lebih tenang, memungkinkan nelayan menjangkau area penangkapan yang lebih jauh.",
                        hasil: [
                            "Hasil utama: Ikan Tenggiri, Tongkol, Ikan Merah, dan berbagai jenis ikan karang.",
                            "Aktivitas: Waktu ideal untuk kegiatan lelang ikan di TPI karena volume tangkapan meningkat.",
                            "Catatan: Harga ikan cenderung lebih stabil karena pasokan melimpah."
                        ]
                    },
                ]
            }
        },
        kebun: {
            title: "Musim Hasil Perkebunan",
            icon: Sprout,
            content: {
                deskripsi: "Selain hasil laut, perkebunan kelapa dan tanaman lainnya juga menjadi penopang ekonomi desa.",
                musim: [
                    {
                        nama: "Panen Kelapa",
                        icon: Sprout,
                        deskripsi: "Pohon kelapa di desa kami berbuah sepanjang tahun, namun ada puncak-puncak panen yang biasanya terjadi setiap 3-4 bulan sekali.",
                        hasil: [
                            "Puncak panen biasanya terjadi di awal dan akhir musim penghujan.",
                            "Hasil panen diolah menjadi kopra putih, minyak kelapa, dan produk turunan lainnya oleh UMKM lokal."
                        ]
                    },
                    {
                        nama: "Tanaman Palawija",
                        icon: Sprout,
                        deskripsi: "Beberapa warga juga menanam tanaman palawija di lahan darat mereka.",
                        hasil: [
                            "Ubi, jagung, dan sayur-mayur biasanya ditanam saat musim hujan untuk konsumsi lokal."
                        ]
                    },
                ]
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 mt-16 mb-20">
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Kalender Pangan</h2>
                    <p className="text-muted-foreground">
                        Panduan Musim Panen dan Tangkapan Ikan Lokal
                    </p>
                </div>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <kalenderData.umum.icon className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{kalenderData.umum.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {kalenderData.umum.content.deskripsi}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <kalenderData.ikan.icon className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{kalenderData.ikan.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {kalenderData.ikan.content.deskripsi}
                        </p>
                        {kalenderData.ikan.content.musim.map((item, index) => (
                            <div key={index} className="p-4 bg-muted/50 rounded-lg">
                                <div className="flex items-center gap-3 mb-2">
                                    <item.icon className="h-6 w-6 text-primary" />
                                    <h4 className="font-semibold">{item.nama}</h4>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{item.deskripsi}</p>
                                <ul className="mt-2 space-y-1 list-disc list-inside text-sm text-muted-foreground">
                                    {item.hasil.map((p, i) => <li key={i}>{p}</li>)}
                                </ul>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <kalenderData.kebun.icon className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{kalenderData.kebun.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                         <p className="text-sm text-muted-foreground leading-relaxed">
                            {kalenderData.kebun.content.deskripsi}
                        </p>
                        {kalenderData.kebun.content.musim.map((item, index) => (
                            <div key={index} className="p-4 bg-muted/50 rounded-lg">
                                <div className="flex items-center gap-3 mb-2">
                                    <item.icon className="h-6 w-6 text-primary" />
                                    <h4 className="font-semibold">{item.nama}</h4>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{item.deskripsi}</p>
                                <ul className="mt-2 space-y-1 list-disc list-inside text-sm text-muted-foreground">
                                    {item.hasil.map((p, i) => <li key={i}>{p}</li>)}
                                </ul>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default KalenderPangan;
