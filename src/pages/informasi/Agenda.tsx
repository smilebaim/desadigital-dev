'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const agendaData = [
  {
    title: "Musyawarah Desa (Musdes) Rencana Pembangunan",
    date: "Senin, 25 Juli 2024",
    time: "09:00 - Selesai",
    location: "Aula Kantor Desa",
    organizer: "Pemerintah Desa & BPD",
    description: "Pembahasan dan penetapan prioritas pembangunan desa untuk tahun anggaran berikutnya. Diharapkan kehadiran perwakilan dari setiap RT."
  },
  {
    title: "Pelatihan Pembuatan Pupuk Kompos",
    date: "Rabu, 27 Juli 2024",
    time: "13:00 - 16:00",
    location: "Kelompok Tani Maju Jaya",
    organizer: "Dinas Pertanian & Karang Taruna",
    description: "Pelatihan praktis bagi para petani dan warga untuk mengelola sampah organik menjadi pupuk yang bernilai ekonomis."
  },
  {
    title: "Posyandu Balita dan Lansia",
    date: "Jumat, 29 Juli 2024",
    time: "08:00 - 11:00",
    location: "Poskesdes Remau Bako Tuo",
    organizer: "Kader PKK & Bidan Desa",
    description: "Pemeriksaan kesehatan rutin, imunisasi, dan pemberian vitamin untuk balita. Serta pemeriksaan tensi dan gula darah untuk lansia."
  },
  {
    title: "Kerja Bakti Membersihkan Saluran Irigasi",
    date: "Minggu, 31 Juli 2024",
    time: "07:00 - 10:00",
    location: "Area Persawahan Desa",
    organizer: "Seluruh Warga Desa",
    description: "Gotong royong membersihkan saluran irigasi primer dan sekunder untuk persiapan musim tanam. Alat-alat diharapkan membawa dari rumah masing-masing."
  }
];

const Agenda = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
       <Breadcrumb
        items={[
          { title: "Aktivitas", path: "/aktivitas" },
          { title: "Agenda" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Agenda Desa</h2>
          <p className="text-muted-foreground">
            Jadwal kegiatan dan acara yang akan datang di Desa Remau Bako Tuo.
          </p>
        </div>

        <div className="space-y-6">
          {agendaData.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{item.title}</CardTitle>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground pt-2">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>{item.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                 <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <User className="h-3 w-3" />
                    <span>Penyelenggara: {item.organizer}</span>
                  </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Agenda;
