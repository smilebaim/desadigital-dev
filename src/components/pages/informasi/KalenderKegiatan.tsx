
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Briefcase, HeartHandshake } from "lucide-react";

const KalenderKegiatan = () => {
    const kalenderData = {
        umum: {
            title: "Kalender Kegiatan Rutin Desa",
            icon: Calendar,
            content: {
                deskripsi: "Kalender ini memuat jadwal kegiatan rutin yang diselenggarakan oleh Pemerintah Desa, Lembaga Kemasyarakatan, dan kelompok masyarakat di Desa Remau Bako Tuo. Tujuannya adalah untuk meningkatkan partisipasi warga dan menyebarkan informasi kegiatan secara luas.",
            }
        },
        kegiatan: {
            title: "Jadwal Kegiatan Rutin",
            icon: Calendar,
            content: {
                rutin: [
                    {
                        waktu: "Setiap Hari Jumat",
                        nama: "Jumat Bersih",
                        penyelenggara: "Pemerintah Desa & Masyarakat",
                        deskripsi: "Kegiatan gotong royong membersihkan area publik seperti masjid, jalan utama, dan pantai."
                    },
                    {
                        waktu: "Minggu Pertama Setiap Bulan",
                        nama: "Rapat Koordinasi Aparatur Desa",
                        penyelenggara: "Kepala Desa",
                        deskripsi: "Rapat internal untuk evaluasi kinerja dan perencanaan program kerja bulanan."
                    },
                    {
                        waktu: "Minggu Kedua Setiap Bulan",
                        nama: "Kegiatan Posyandu",
                        penyelenggara: "Kader PKK & Bidan Desa",
                        deskripsi: "Pelayanan kesehatan untuk ibu dan anak, meliputi penimbangan balita, imunisasi, dan penyuluhan gizi."
                    },
                    {
                        waktu: "Setiap Tanggal 15",
                        nama: "Arisan & Pertemuan PKK",
                        penyelenggara: "Tim Penggerak PKK",
                        deskripsi: "Pertemuan rutin anggota PKK untuk membahas program kerja, arisan, dan pelatihan keterampilan."
                    },
                    {
                        waktu: "Sabtu Malam (Dua Mingguan)",
                        nama: "Latihan Grup Kesenian Lokal",
                        penyelenggara: "Karang Taruna",
                        deskripsi: "Latihan rutin kelompok seni hadrah dan musik lokal sebagai persiapan acara desa."
                    },
                ]
            }
        },
        tahunan: {
            title: "Agenda Tahunan Utama",
            icon: Briefcase,
            content: {
                deskripsi: "Selain kegiatan rutin, desa kami juga memiliki agenda tahunan yang menjadi puncak kegiatan masyarakat.",
                agenda: [
                    {
                        waktu: "Januari",
                        nama: "Musrenbangdes (Musyawarah Perencanaan Pembangunan Desa)",
                        deskripsi: "Forum partisipatif untuk menyusun RKPDes tahun berikutnya."
                    },
                    {
                        waktu: "Agustus",
                        nama: "Peringatan Hari Kemerdekaan RI",
                        deskripsi: "Rangkaian lomba rakyat, upacara bendera, dan malam kesenian."
                    },
                    {
                        waktu: "Oktober",
                        nama: "Festival Pesisir & Sedekah Laut",
                        deskripsi: "Acara budaya tahunan sebagai wujud syukur atas hasil laut, dimeriahkan dengan lomba perahu hias dan kuliner."
                    },
                    {
                        waktu: "Desember",
                        nama: "Musyawarah Desa Pertanggungjawaban APBDes",
                        deskripsi: "Laporan akhir tahun pelaksanaan anggaran desa kepada masyarakat."
                    }
                ]
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 mt-16 mb-20">
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Kalender Kegiatan</h2>
                    <p className="text-muted-foreground">
                        Jadwal Kegiatan Rutin dan Tahunan Desa
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
                        <kalenderData.kegiatan.icon className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{kalenderData.kegiatan.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {kalenderData.kegiatan.content.rutin.map((item, index) => (
                            <div key={index} className="p-4 bg-muted/50 rounded-lg">
                                <h4 className="font-semibold">{item.nama}</h4>
                                <p className="text-xs font-medium text-primary mt-1">{item.waktu} | Penyelenggara: {item.penyelenggara}</p>
                                <p className="text-sm text-muted-foreground mt-2">{item.deskripsi}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <kalenderData.tahunan.icon className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{kalenderData.tahunan.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <p className="text-sm text-muted-foreground leading-relaxed">
                            {kalenderData.tahunan.content.deskripsi}
                        </p>
                        {kalenderData.tahunan.content.agenda.map((item, index) => (
                             <div key={index} className="p-4 bg-muted/50 rounded-lg">
                                <h4 className="font-semibold">{item.nama}</h4>
                                <p className="text-xs font-medium text-primary mt-1">Perkiraan Waktu: Bulan {item.waktu}</p>
                                <p className="text-sm text-muted-foreground mt-2">{item.deskripsi}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default KalenderKegiatan;
