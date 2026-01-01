
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListTodo, Calendar, Clock, MapPin, Info, Users } from "lucide-react";

const Agenda = () => {
    const agendaData = {
        umum: {
            title: "Agenda Kegiatan Desa",
            icon: ListTodo,
            content: {
                deskripsi: "Halaman ini berisi informasi detail mengenai kegiatan-kegiatan yang akan diselenggarakan di Desa Remau Bako Tuo dalam waktu dekat. Pastikan untuk memeriksa halaman ini secara berkala agar tidak ketinggalan informasi.",
            }
        },
        kegiatan: {
            title: "Kegiatan Akan Datang",
            icon: Calendar,
            content: [
                {
                    nama: "Gotong Royong Persiapan Peringatan 17 Agustus",
                    tanggal: "Minggu, 11 Agustus 2024",
                    waktu: "08:00 WIB - Selesai",
                    lokasi: "Lingkungan RT 01 s/d RT 05",
                    penyelenggara: "Pemerintah Desa & Karang Taruna",
                    deskripsi: "Kegiatan kerja bakti membersihkan lingkungan, memasang umbul-umbul, dan mempersiapkan lapangan untuk upacara dan aneka lomba dalam rangka menyambut HUT RI."
                },
                {
                    nama: "Musyawarah Desa Khusus (Musdesus) Validasi Data DTKS",
                    tanggal: "Rabu, 14 Agustus 2024",
                    waktu: "13:30 WIB - Selesai",
                    lokasi: "Aula Kantor Desa",
                    penyelenggara: "Pemerintah Desa & BPD",
                    deskripsi: "Forum musyawarah untuk memvalidasi dan menetapkan data keluarga penerima manfaat yang masuk dalam Data Terpadu Kesejahteraan Sosial (DTKS) sebagai dasar penyaluran bantuan sosial."
                },
                {
                    nama: "Upacara Bendera Peringatan HUT RI ke-79",
                    tanggal: "Sabtu, 17 Agustus 2024",
                    waktu: "07:30 WIB - Selesai",
                    lokasi: "Lapangan Sepak Bola Desa",
                    penyelenggara: "Pemerintah Desa",
                    deskripsi: "Upacara pengibaran bendera Merah Putih dalam rangka memperingati Hari Kemerdekaan Republik Indonesia. Dihadiri oleh aparatur desa, lembaga, siswa sekolah, dan seluruh masyarakat."
                },
                {
                    nama: "Penyaluran Bantuan Pangan Cadangan Pangan Pemerintah (CPP)",
                    tanggal: "Senin, 19 Agustus 2024",
                    waktu: "09:00 WIB - 14:00 WIB",
                    lokasi: "Aula Kantor Desa",
                    penyelenggara: "Pemerintah Desa & Dinas Ketahanan Pangan",
                    deskripsi: "Distribusi bantuan pangan berupa beras kepada Keluarga Penerima Manfaat (KPM) yang terdaftar."
                }
            ]
        },
        info: {
            title: "Informasi Tambahan",
            icon: Info,
            content: "Untuk informasi lebih lanjut mengenai setiap kegiatan, masyarakat dapat menghubungi Ketua RT masing-masing atau datang langsung ke Kantor Desa pada jam kerja. Jadwal dapat berubah sewaktu-waktu dan akan diinformasikan lebih lanjut."
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 mt-16 mb-20">
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Agenda Desa</h2>
                    <p className="text-muted-foreground">
                        Jadwal Kegiatan Terdekat di Desa Remau Bako Tuo
                    </p>
                </div>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <agendaData.umum.icon className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{agendaData.umum.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {agendaData.umum.content.deskripsi}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <agendaData.kegiatan.icon className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{agendaData.kegiatan.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {agendaData.kegiatan.content.length > 0 ? (
                            agendaData.kegiatan.content.map((item, index) => (
                                <div key={index} className="p-4 bg-muted/50 rounded-lg">
                                    <h4 className="font-semibold text-lg">{item.nama}</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm text-muted-foreground mt-2">
                                        <p className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> {item.tanggal}</p>
                                        <p className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> {item.waktu}</p>
                                        <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {item.lokasi}</p>
                                        <p className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> {item.penyelenggara}</p>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-3">{item.deskripsi}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted-foreground text-center py-4">Belum ada agenda kegiatan dalam waktu dekat.</p>
                        )}
                    </CardContent>
                </Card>

                <Card className="bg-primary/10 border-primary/20">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <agendaData.info.icon className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{agendaData.info.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-primary/80 font-medium leading-relaxed">
                            {agendaData.info.content}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default Agenda;
