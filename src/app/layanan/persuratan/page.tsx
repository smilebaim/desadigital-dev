import PublicLayout from "@/layouts/PublicLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { 
    FileSignature, 
    ArrowRight, 
    Clock, 
    FileText, 
    CheckCircle2, 
    Info
} from 'lucide-react';
import TrackingStatus from "@/components/TrackingStatus";

const letterTypes = [
    { 
        id: 'surat-usaha', 
        title: "Surat Keterangan Usaha", 
        description: "Untuk warga yang memiliki usaha dan memerlukan surat keterangan resmi.",
        icon: FileSignature 
    },
    { 
        id: 'surat-domisili', 
        title: "Surat Keterangan Domisili", 
        description: "Menerangkan tempat tinggal atau domisili warga saat ini.",
        icon: FileText 
    },
    { 
        id: 'surat-pengantar', 
        title: "Surat Pengantar", 
        description: "Surat pengantar untuk berbagai keperluan administrasi luar desa.",
        icon: ArrowRight 
    },
    { 
        id: 'surat-kelahiran', 
        title: "Surat Keterangan Kelahiran", 
        description: "Pelaporan dan permohonan surat kelahiran baru.",
        icon: CheckCircle2 
    },
];

export default function PersuratanPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8 mt-24 mb-20">
        <div className="max-w-5xl mx-auto space-y-12">
            {/* Header Section */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Layanan Persuratan Online</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Ajukan berbagai keperluan surat-menyurat desa secara mandiri, cepat, dan transparan dari mana saja.
                </p>
            </div>

            {/* Tracking Section */}
            <TrackingStatus />

            {/* Letter Grid */}
            <div className="space-y-6">
                <div className="flex items-center gap-2 border-b pb-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-semibold">Pilih Jenis Surat</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {letterTypes.map((letter) => {
                        const Icon = letter.icon;
                        return (
                            <Link key={letter.id} href={`/layanan/persuratan/${letter.id}`}>
                                <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 group">
                                    <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                                        <div className="p-3 rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <div className="space-y-1">
                                            <CardTitle className="text-xl flex items-center gap-2">
                                                {letter.title}
                                                <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                                            </CardTitle>
                                            <CardDescription>
                                                {letter.description}
                                            </CardDescription>
                                        </div>
                                    </CardHeader>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                <div className="flex flex-col items-center text-center space-y-2 p-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <Clock className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold">Hemat Waktu</h3>
                    <p className="text-sm text-muted-foreground">Tidak perlu bolak-balik ke kantor desa hanya untuk pengajuan awal.</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-2 p-4">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold">Transparan</h3>
                    <p className="text-sm text-muted-foreground">Status surat dapat dipantau secara real-time hingga selesai.</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-2 p-4">
                    <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                        <Info className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold">Bantuan AI</h3>
                    <p className="text-sm text-muted-foreground">Butuh bantuan? Tanyakan pada Asisten AI Desa di pojok kanan bawah.</p>
                </div>
            </div>
        </div>
      </div>
    </PublicLayout>
  );
}
