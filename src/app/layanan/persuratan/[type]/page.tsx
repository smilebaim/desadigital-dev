'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PublicLayout from "@/layouts/PublicLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
    ArrowLeft, 
    Send, 
    FileText, 
    User, 
    MapPin, 
    Briefcase,
    Info,
    CheckCircle2,
    Copy,
    Loader2
} from 'lucide-react';
import Link from 'next/link';

// Import actions
import { addSuratUsaha } from "@/lib/surat-usaha-actions";
import { addSuratDomisili } from "@/lib/surat-domisili-actions";
import { addSuratPengantar } from "@/lib/surat-pengantar-actions";
import { addSuratKelahiran } from "@/lib/surat-kelahiran-actions";

const letterConfigs: Record<string, any> = {
    'surat-usaha': {
        title: "Surat Keterangan Usaha",
        description: "Silakan isi data usaha Anda dengan benar.",
        fields: [
            { name: 'nikPemohon', label: 'NIK Pemohon', type: 'text', placeholder: 'Masukkan 16 digit NIK', required: true },
            { name: 'namaPemohon', label: 'Nama Lengkap', type: 'text', placeholder: 'Sesuai KTP', required: true },
            { name: 'namaUsaha', label: 'Nama Usaha', type: 'text', placeholder: 'Contoh: Toko Berkah Jaya', required: true },
            { name: 'jenisUsaha', label: 'Jenis Usaha', type: 'text', placeholder: 'Contoh: Perdagangan Sembako', required: true },
            { name: 'alamatUsaha', label: 'Alamat Usaha', type: 'textarea', placeholder: 'Alamat lengkap tempat usaha', required: true },
        ],
        action: addSuratUsaha
    },
    'surat-domisili': {
        title: "Surat Keterangan Domisili",
        description: "Permohonan keterangan tempat tinggal.",
        fields: [
            { name: 'nikPemohon', label: 'NIK Pemohon', type: 'text', placeholder: 'Masukkan 16 digit NIK', required: true },
            { name: 'namaPemohon', label: 'Nama Lengkap', type: 'text', placeholder: 'Sesuai KTP', required: true },
            { name: 'alasan', label: 'Tujuan Permohonan', type: 'textarea', placeholder: 'Contoh: Persyaratan melamar kerja', required: true },
        ],
        action: addSuratDomisili
    },
    'surat-pengantar': {
        title: "Surat Pengantar",
        description: "Surat pengantar untuk berbagai keperluan.",
        fields: [
            { name: 'nikPemohon', label: 'NIK Pemohon', type: 'text', placeholder: 'Masukkan 16 digit NIK', required: true },
            { name: 'namaPemohon', label: 'Nama Lengkap', type: 'text', placeholder: 'Sesuai KTP', required: true },
            { name: 'keperluan', label: 'Keperluan Surat', type: 'textarea', placeholder: 'Sebutkan alasan permohonan surat ini', required: true },
        ],
        action: addSuratPengantar
    },
    'surat-kelahiran': {
        title: "Surat Keterangan Kelahiran",
        description: "Data kelahiran bayi.",
        fields: [
            { name: 'namaBayi', label: 'Nama Bayi', type: 'text', placeholder: 'Nama lengkap bayi', required: true },
            { name: 'tempatLahirBayi', label: 'Tempat Lahir', type: 'text', required: true },
            { name: 'tanggalLahirBayi', label: 'Tanggal Lahir', type: 'date', required: true },
            { name: 'namaIbu', label: 'Nama Ibu Kandung', type: 'text', required: true },
            { name: 'nikIbu', label: 'NIK Ibu', type: 'text', required: true },
            { name: 'namaAyah', label: 'Nama Ayah Kandung', type: 'text', required: true },
            { name: 'nikAyah', label: 'NIK Ayah', type: 'text', required: true },
        ],
        action: addSuratKelahiran
    }
};

export default function LetterRequestPage() {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const type = params?.type as string;
    const config = letterConfigs[type];

    const [formData, setFormData] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [trackingCode, setTrackingCode] = useState('');

    if (!config) {
        return (
            <PublicLayout>
                <div className="container mx-auto px-4 py-32 text-center">
                    <h1 className="text-2xl font-bold">Jenis surat tidak ditemukan.</h1>
                    <Button variant="link" asChild className="mt-4">
                        <Link href="/layanan/persuratan">Kembali ke daftar surat</Link>
                    </Button>
                </div>
            </PublicLayout>
        );
    }

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const generateTrackingCode = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = 'TRK-';
        for (let i = 0; i < 8; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const code = generateTrackingCode();
        
        // Prepare data for Firestore
        const dataToSubmit = {
            ...formData,
            status: 'Diajukan',
            trackingCode: code,
            pendudukId: 'guest', // Mark as guest since no login
        };

        try {
            const result = await config.action(dataToSubmit);
            if (result.success) {
                setTrackingCode(code);
                setSubmitted(true);
                toast({ title: "Berhasil!", description: "Permohonan surat Anda telah terkirim." });
            } else {
                throw new Error(result.error);
            }
        } catch (error: any) {
            toast({ 
                title: "Gagal mengirim permohonan", 
                description: error.message || "Terjadi kesalahan pada server.",
                variant: "destructive" 
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(trackingCode);
        toast({ title: "Tersalin!", description: "Kode tracking telah disalin ke clipboard." });
    };

    if (submitted) {
        return (
            <PublicLayout>
                <div className="container mx-auto px-4 py-8 mt-24 mb-20 flex justify-center">
                    <Card className="max-w-md w-full border-green-200 bg-green-50/10">
                        <CardHeader className="text-center">
                            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                                <CheckCircle2 className="h-10 w-10" />
                            </div>
                            <CardTitle className="text-2xl font-bold text-green-800">Permohonan Terkirim!</CardTitle>
                            <CardDescription>
                                Surat Anda sedang dalam antrean untuk diproses oleh Admin Desa.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="bg-white dark:bg-slate-900 border rounded-xl p-4 text-center space-y-2">
                                <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Kode Tracking Anda</p>
                                <div className="flex items-center justify-center gap-2">
                                    <code className="text-2xl font-mono font-bold text-primary">{trackingCode}</code>
                                    <Button variant="ghost" size="icon" onClick={copyToClipboard} title="Salin Kode">
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                                <p className="text-[10px] text-muted-foreground">Simpan kode ini untuk mengecek status permohonan Anda.</p>
                            </div>

                            <Alert className="bg-blue-50 border-blue-100 text-blue-800">
                                <Info className="h-4 w-4 text-blue-600" />
                                <AlertTitle className="text-sm font-bold">Langkah Selanjutnya</AlertTitle>
                                <AlertDescription className="text-xs">
                                    Admin akan meninjau data Anda. Jika diperlukan, Anda mungkin akan dihubungi untuk verifikasi tambahan atau pengambilan surat fisik.
                                </AlertDescription>
                            </Alert>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2">
                            <Button className="w-full" asChild>
                                <Link href="/layanan/persuratan">Selesai</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout>
            <div className="container mx-auto px-4 py-8 mt-24 mb-20">
                <div className="max-w-2xl mx-auto space-y-6">
                    <Link href="/layanan/persuratan" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft className="h-4 w-4" /> Kembali ke Layanan Persuratan
                    </Link>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <FileText className="h-6 w-6" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl">{config.title}</CardTitle>
                                    <CardDescription>{config.description}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <form onSubmit={handleSubmit}>
                            <CardContent className="space-y-4">
                                {config.fields.map((field: any) => (
                                    <div key={field.name} className="space-y-2">
                                        <Label htmlFor={field.name}>{field.label}</Label>
                                        {field.type === 'textarea' ? (
                                            <Textarea 
                                                id={field.name} 
                                                name={field.name} 
                                                placeholder={field.placeholder} 
                                                required={field.required}
                                                onChange={handleInputChange}
                                                disabled={isSubmitting}
                                            />
                                        ) : (
                                            <Input 
                                                id={field.name} 
                                                name={field.name} 
                                                type={field.type} 
                                                placeholder={field.placeholder} 
                                                required={field.required}
                                                onChange={handleInputChange}
                                                disabled={isSubmitting}
                                            />
                                        )}
                                    </div>
                                ))}

                                <div className="pt-4 p-4 rounded-xl bg-orange-50 border border-orange-100 flex gap-3 text-orange-800">
                                    <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold">Pernyataan Kejujuran</p>
                                        <p className="text-xs leading-relaxed">
                                            Dengan menekan tombol "Kirim Permohonan", saya menyatakan bahwa data yang saya berikan adalah benar dan dapat dipertanggungjawabkan.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            Sedang Mengirim...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-4 w-4 mr-2" />
                                            Kirim Permohonan
                                        </>
                                    )}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </div>
        </PublicLayout>
    );
}
