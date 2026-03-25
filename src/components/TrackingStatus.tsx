'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
    Search, 
    FileText, 
    Clock, 
    CheckCircle2, 
    XCircle,
    Loader2,
    Calendar,
    Send
} from 'lucide-react';
import { db } from '@/firebase/config';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function TrackingStatus() {
    const [trackingCode, setTrackingCode] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState('');

    const handleSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!trackingCode.trim()) return;

        setIsSearching(true);
        setError('');
        setResult(null);

        try {
            // We need to search across multiple collections because we don't know the type from the code.
            // For efficiency, we'll search the most common ones first.
            const collections = [
                'surat_usaha', 'surat_domisili', 'surat_pengantar', 
                'surat_kelahiran', 'surat_kematian', 'surat_pindah', 
                'surat_nikah', 'surat_keterangan'
            ];

            let foundDoc = null;
            let foundType = '';

            for (const colName of collections) {
                const q = query(collection(db, colName), where("trackingCode", "==", trackingCode), limit(1));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    foundDoc = querySnapshot.docs[0].data();
                    foundType = colName.replace('surat_', '').replace('_', ' ').toUpperCase();
                    break;
                }
            }

            if (foundDoc) {
                setResult({ ...foundDoc, typeName: foundType });
            } else {
                setError('Kode tracking tidak ditemukan. Pastikan kode yang Anda masukkan benar.');
            }
        } catch (err: any) {
            setError('Terjadi kesalahan saat mencari data.');
        } finally {
            setIsSearching(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Diajukan': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Diproses': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'Selesai': return 'bg-green-100 text-green-700 border-green-200';
            case 'Ditolak': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Diajukan': return <Clock className="h-5 w-5 text-blue-500" />;
            case 'Diproses': return <Loader2 className="h-5 w-5 text-amber-500 animate-spin" />;
            case 'Selesai': return <CheckCircle2 className="h-5 w-5 text-green-500" />;
            case 'Ditolak': return <XCircle className="h-5 w-5 text-red-500" />;
            default: return <FileText className="h-5 w-5 text-slate-500" />;
        }
    };

    return (
        <div className="space-y-6">
            <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Search className="h-5 w-5 text-primary" />
                        <CardTitle className="text-xl">Lacak Status Surat</CardTitle>
                    </div>
                    <CardDescription>
                        Masukkan kode tracking Anda untuk melihat progres permohonan.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
                        <Input 
                            placeholder="Contoh: TRK-12345678" 
                            className="bg-background max-w-sm"
                            value={trackingCode}
                            onChange={(e) => setTrackingCode(e.target.value)}
                            disabled={isSearching}
                        />
                        <Button type="submit" disabled={isSearching || !trackingCode.trim()} className="min-w-[120px]">
                            {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Cek Status'}
                        </Button>
                    </form>
                    {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
                </CardContent>
            </Card>

            {result && (
                <Card className="animate-in fade-in slide-in-from-top-4 duration-500">
                    <CardHeader className="border-b bg-slate-50/50">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <Badge variant="outline" className="bg-white">{result.typeName}</Badge>
                                <CardTitle className="text-2xl font-bold">{result.namaPemohon || result.namaBayi || 'Permohonan Surat'}</CardTitle>
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    Diajukan pada: {result.createdAt ? new Date(result.createdAt.seconds * 1000).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}
                                </p>
                            </div>
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor(result.status)}`}>
                                {getStatusIcon(result.status)}
                                <span className="font-bold">{result.status}</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-6">
                            {/* Stepper Status */}
                            <div className="relative">
                                <div className="absolute top-5 left-5 right-5 h-0.5 bg-slate-200 -z-1" />
                                <div className="flex justify-between">
                                    <div className="flex flex-col items-center gap-2 bg-slate-50 p-2 rounded-lg z-10 w-24">
                                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${result.status === 'Diajukan' ? 'bg-primary text-white shadow-lg ring-4 ring-primary/20' : 'bg-green-500 text-white'}`}>
                                            <Send className="h-5 w-5" />
                                        </div>
                                        <span className="text-[10px] font-bold text-center uppercase">Diajukan</span>
                                    </div>

                                    <div className="flex flex-col items-center gap-2 bg-slate-50 p-2 rounded-lg z-10 w-24">
                                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${(result.status === 'Diproses') ? 'bg-primary text-white shadow-lg ring-4 ring-primary/20' : (result.status === 'Selesai' || result.status === 'Ditolak') ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                                            <Clock className="h-5 w-5" />
                                        </div>
                                        <span className="text-[10px] font-bold text-center uppercase">Diproses</span>
                                    </div>

                                    <div className="flex flex-col items-center gap-2 bg-slate-50 p-2 rounded-lg z-10 w-24">
                                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${(result.status === 'Selesai') ? 'bg-green-500 text-white shadow-lg ring-4 ring-green-500/20' : (result.status === 'Ditolak') ? 'bg-red-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                                            {result.status === 'Ditolak' ? <XCircle className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
                                        </div>
                                        <span className="text-[10px] font-bold text-center uppercase">{result.status === 'Ditolak' ? 'Ditolak' : 'Selesai'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Detail Result */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 text-sm">
                                <div className="space-y-3">
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="text-muted-foreground">Nomor Tracking</span>
                                        <span className="font-mono font-bold text-primary">{trackingCode}</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="text-muted-foreground">NIK Pemohon</span>
                                        <span className="font-medium">{result.nikPemohon || result.nikIbu || '-'}</span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {result.namaUsaha && (
                                        <div className="flex justify-between border-b pb-2">
                                            <span className="text-muted-foreground">Nama Usaha</span>
                                            <span className="font-medium">{result.namaUsaha}</span>
                                        </div>
                                    )}
                                    {result.nomorSurat && (
                                        <div className="flex justify-between border-b pb-2">
                                            <span className="text-muted-foreground">Nomor Surat Resmi</span>
                                            <span className="font-medium">{result.nomorSurat}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {result.status === 'Selesai' && (
                                <Alert className="bg-green-50 border-green-200 text-green-800">
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                    <AlertTitle>Surat Sudah Selesai!</AlertTitle>
                                    <AlertDescription className="text-xs">
                                        Silakan datang ke kantor desa pada jam kerja untuk mengambil fisik surat dengan membawa syarat-syarat pendukung asli.
                                    </AlertDescription>
                                </Alert>
                            )}

                            {result.status === 'Ditolak' && (
                                <Alert className="bg-red-50 border-red-200 text-red-800">
                                    <XCircle className="h-4 w-4 text-red-600" />
                                    <AlertTitle>Permohonan Ditolak</AlertTitle>
                                    <AlertDescription className="text-xs">
                                        Maaf, permohonan Anda belum dapat kami proses. Hubungi kantor desa atau cek kelengkapan data Anda.
                                    </AlertDescription>
                                </Alert>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
