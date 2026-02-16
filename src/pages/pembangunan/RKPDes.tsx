
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Breadcrumb from "@/components/Breadcrumb";
import PendapatanDesaChart from "@/components/charts/PendapatanDesaChart";
import { FileText, Target, ListChecks, DollarSign } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const rkpdesData = {
    info: {
        deskripsi: "Rencana Kerja Pemerintah Desa (RKPDes) adalah penjabaran dari RPJMDes untuk jangka waktu satu tahun. Dokumen ini lebih operasional dan menjadi dasar penyusunan Anggaran Pendapatan dan Belanja Desa (APBDes) setiap tahunnya.",
        tahun: "2024",
        dasarHukum: "Peraturan Desa No. 5 Tahun 2023"
    },
    prioritas: [
        "Peningkatan Kualitas Infrastruktur Jalan dan Drainase",
        "Pengembangan Kapasitas UMKM Lokal dan Ekonomi Kreatif",
        "Peningkatan Kualitas Layanan Kesehatan Primer di Poskesdes",
        "Program Digitalisasi Administrasi Desa dan Pelayanan Publik",
        "Penguatan Ketahanan Pangan Melalui Kelompok Tani"
    ],
    rencanaKegiatan: [
        { kegiatan: "Pembangunan Jalan Usaha Tani", lokasi: "Dusun Tani Makmur", anggaran: "Rp 250.000.000", jadwal: "April - Juni 2024" },
        { kegiatan: "Pelatihan Pemasaran Digital untuk UMKM", lokasi: "Aula Desa", anggaran: "Rp 50.000.000", jadwal: "Mei 2024" },
        { kegiatan: "Pengadaan Alat Kesehatan Poskesdes", lokasi: "Poskesdes", anggaran: "Rp 75.000.000", jadwal: "Juli 2024" },
        { kegiatan: "Normalisasi Saluran Drainase", lokasi: "Dusun Jaya & Dusun Makmur", anggaran: "Rp 150.000.000", jadwal: "Agustus - September 2024" },
    ]
};

const RKPDes = () => {
    return (
        <div className="container mx-auto px-4 py-8 mt-16 mb-20">
            <Breadcrumb
                items={[
                { title: "Pembangunan", path: "#" },
                { title: "RKPDes" }
                ]}
            />
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Rencana Kerja Pemerintah Desa (RKPDes)</h2>
                    <p className="text-muted-foreground">
                        Dokumen Perencanaan Pembangunan Tahunan Desa
                    </p>
                </div>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <FileText className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>Informasi Umum RKPDes {rkpdesData.info.tahun}</CardTitle>
                            <CardDescription>Dasar Pelaksanaan Pembangunan Tahun {rkpdesData.info.tahun}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">{rkpdesData.info.deskripsi}</p>
                        <p className="text-sm"><strong>Dasar Hukum:</strong> {rkpdesData.info.dasarHukum}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-primary" />
                            Prioritas Pembangunan Tahun {rkpdesData.info.tahun}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-decimal space-y-2 pl-5">
                            {rkpdesData.prioritas.map((item, index) => (
                                <li key={index} className="text-muted-foreground">{item}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <ListChecks className="h-5 w-5 text-primary" />
                            Matriks Rencana Kegiatan
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                       <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Nama Kegiatan</TableHead>
                            <TableHead>Lokasi</TableHead>
                            <TableHead>Perkiraan Anggaran</TableHead>
                            <TableHead>Jadwal Pelaksanaan</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rkpdesData.rencanaKegiatan.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{item.kegiatan}</TableCell>
                                    <TableCell>{item.lokasi}</TableCell>
                                    <TableCell>{item.anggaran}</TableCell>
                                    <TableCell>{item.jadwal}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <div className="pt-4">
                     <PendapatanDesaChart />
                </div>
            </div>
        </div>
    );
};

export default RKPDes;
