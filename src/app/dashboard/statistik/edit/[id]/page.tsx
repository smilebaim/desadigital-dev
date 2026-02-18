'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { getStatistikById, updateStatistik, type StatistikData } from '@/lib/statistik-actions';

const EditStatistikPage = () => {
    const router = useRouter();
    const params = useParams();
    const statId = params.id as string;
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statData, setStatData] = useState<StatistikData | null>(null);
    const [jsonData, setJsonData] = useState('');

    useEffect(() => {
        if (!statId) return;
        const fetchStat = async () => {
            setIsLoading(true);
            const data = await getStatistikById(statId);
            if (data) {
                setStatData(data);
                // Prettify JSON for editing
                try {
                    const parsed = JSON.parse(data.data);
                    setJsonData(JSON.stringify(parsed, null, 2));
                } catch {
                    setJsonData(data.data); // Fallback to raw string if not valid JSON
                }
            } else {
                toast({ title: "Data statistik tidak ditemukan.", variant: 'destructive' });
                router.push('/dashboard/statistik/data');
            }
            setIsLoading(false);
        };
        fetchStat();
    }, [statId, router, toast]);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Validate JSON before submitting
            JSON.parse(jsonData);
        } catch (error) {
            toast({ title: "Format JSON tidak valid.", description: "Silakan periksa kembali data yang Anda masukkan.", variant: 'destructive' });
            return;
        }

        setIsSubmitting(true);
        const result = await updateStatistik(statId, { data: jsonData });

        if (result.success) {
            toast({ title: "Data statistik berhasil diperbarui." });
            router.push('/dashboard/statistik/data');
        } else {
            toast({ title: "Gagal memperbarui data.", description: result.error, variant: 'destructive' });
        }
        setIsSubmitting(false);
    };

    if (isLoading) {
        return <div>Memuat data...</div>;
    }

    return (
        <div className="space-y-6">
             <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Edit Data Statistik</h2>
                    <p className="text-muted-foreground">Ubah data untuk: {statData?.title}</p>
                </div>
                <Button variant="outline" asChild>
                    <Link href="/dashboard/statistik/data"><ArrowLeft className="h-4 w-4 mr-2" />Kembali</Link>
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Editor Data JSON</CardTitle>
                    <CardDescription>
                        Ubah nilai di dalam teks JSON di bawah ini. Pastikan untuk menjaga struktur dan format JSON tetap valid (misalnya, koma, kurung kurawal, dan tanda kutip).
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                             <Label htmlFor="jsonData">Data JSON</Label>
                             <Textarea
                                id="jsonData"
                                value={jsonData}
                                onChange={(e) => setJsonData(e.target.value)}
                                rows={25}
                                className="font-mono text-xs"
                                placeholder="Masukkan data dalam format JSON..."
                                disabled={isSubmitting}
                             />
                        </div>
                         <div className="flex justify-end">
                            <Button type="submit" disabled={isSubmitting}>
                                <Save className="h-4 w-4 mr-2" />
                                {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
                            </Button>
                        </div>
                     </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditStatistikPage;
