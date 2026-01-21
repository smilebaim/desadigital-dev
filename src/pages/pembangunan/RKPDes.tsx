
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Target, Clock, AlertTriangle } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const RKPDes = () => {
  const rkpdesData = {
    title: "Rencana Kerja Pemerintah Desa (RKPDes)",
    tahun: 2024,
    deskripsi: "Dokumen perencanaan tahunan yang merupakan penjabaran dari RPJMDes, memuat rancangan kerangka ekonomi desa, program prioritas, serta rencana kerja dan pendanaan.",
    prioritas: [
      {
        nama: "Pembangunan Jalan Usaha Tani",
        bidang: "Infrastruktur",
        anggaran: "Rp 250.000.000",
        sumber: "Dana Desa",
        status: "Berjalan",
        progress: 60,
        prioritas: "Tinggi",
      },
      {
        nama: "Pelatihan Kewirausahaan Pemuda",
        bidang: "Pemberdayaan",
        anggaran: "Rp 75.000.000",
        sumber: "Dana Desa",
        status: "Selesai",
        progress: 100,
        prioritas: "Menengah",
      },
      {
        nama: "Pengadaan Sarana Air Bersih",
        bidang: "Infrastruktur",
        anggaran: "Rp 150.000.000",
        sumber: "Alokasi Dana Desa",
        status: "Perencanaan",
        progress: 10,
        prioritas: "Tinggi",
      },
      {
        nama: "Peningkatan Kapasitas Aparatur Desa",
        bidang: "Pemerintahan",
        anggaran: "Rp 50.000.000",
        sumber: "PADes",
        status: "Selesai",
        progress: 100,
        prioritas: "Rendah",
      },
    ],
    jadwal: [
        {
            kegiatan: "Musrenbangdes Penetapan RKPDes",
            waktu: "Januari - Minggu ke-2",
            status: "Selesai"
        },
        {
            kegiatan: "Penyusunan APBDes",
            waktu: "Januari - Minggu ke-4",
            status: "Selesai"
        },
        {
            kegiatan: "Pelaksanaan Kegiatan Triwulan I",
            waktu: "Februari - Maret",
            status: "Berjalan"
        },
        {
            kegiatan: "Monitoring & Evaluasi Triwulan I",
            waktu: "April - Minggu ke-1",
            status: "Belum Dimulai"
        },
        {
            kegiatan: "Laporan Realisasi Semester Pertama",
            waktu: "Juli - Minggu ke-2",
            status: "Belum Dimulai"
        }
    ]
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "tinggi":
        return "bg-red-500";
      case "menengah":
        return "bg-yellow-500";
      case "rendah":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };
  
    const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "selesai":
        return "bg-green-500";
      case "berjalan":
        return "bg-yellow-500";
      case "perencanaan":
        return "bg-blue-500";
      case "belum dimulai":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };


  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <Breadcrumb
        items={[
          { title: "Pembangunan", path: "/pembangunan" },
          { title: "RKPDes" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">RKPDes</h2>
          <p className="text-muted-foreground">
            Rencana Kerja Pemerintah Desa
          </p>
        </div>

        <Tabs defaultValue="program" className="space-y-4">
          <TabsList>
            <TabsTrigger value="program">Program Prioritas</TabsTrigger>
            <TabsTrigger value="jadwal">Jadwal Pelaksanaan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="program" className="space-y-4">
            {rkpdesData.prioritas.map((program, index) => (
                <Card key={index}>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <CardTitle>{program.nama}</CardTitle>
                             <Badge className={`${getPriorityColor(program.prioritas)} text-white`}>{program.prioritas}</Badge>
                        </div>
                         <p className="text-sm text-muted-foreground">{program.bidang}</p>
                    </CardHeader>
                     <CardContent className="space-y-4">
                         <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Anggaran:</span>
                            <span className="font-medium">{program.anggaran}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Sumber Dana:</span>
                            <span className="font-medium">{program.sumber}</span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                               <span className="text-muted-foreground">Status:</span>
                                <span className="font-medium">{program.status}</span>
                            </div>
                            <Progress value={program.progress} className="w-full" />
                        </div>
                     </CardContent>
                </Card>
            ))}
          </TabsContent>
          
           <TabsContent value="jadwal" className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Jadwal Pelaksanaan RKPDes {rkpdesData.tahun}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative pl-6">
                        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                        {rkpdesData.jadwal.map((item, index) => (
                             <div key={index} className="relative pb-8">
                                <div className={`absolute -left-[29px] top-1.5 h-4 w-4 rounded-full ${getStatusColor(item.status)}`}></div>
                                <p className="font-semibold">{item.kegiatan}</p>
                                <p className="text-sm text-muted-foreground">{item.waktu}</p>
                                <p className={`text-xs font-bold ${item.status === 'Selesai' ? 'text-green-600' : 'text-yellow-600'}`}>{item.status}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
          </TabsContent>
          
        </Tabs>
      </div>
    </div>
  );
};

export default RKPDes;
