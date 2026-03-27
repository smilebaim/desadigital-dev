'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { getStatistikById, updateStatistik, type StatistikData } from '@/lib/statistik-actions';

// --- Form Components ---

// Generic JSON Editor (Fallback)
const JsonEditor = ({ initialData, onSave, isSubmitting }: { initialData: string, onSave: (data: string) => void, isSubmitting: boolean }) => {
    const { toast } = useToast();
    const [jsonData, setJsonData] = useState(() => {
        try {
            return JSON.stringify(JSON.parse(initialData), null, 2);
        } catch {
            return initialData;
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            JSON.parse(jsonData);
        } catch (error) {
            toast({ title: "Format JSON tidak valid.", description: "Silakan periksa kembali data yang Anda masukkan.", variant: 'destructive' });
            return;
        }
        onSave(jsonData);
    };

    return (
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
    );
}

// Form for Anggaran (Pendapatan & Belanja)
const AnggaranForm = ({ initialData, onSave, isSubmitting }: { initialData: any, onSave: (data: string) => void, isSubmitting: boolean }) => {
    const dataKey = initialData.sumber ? 'sumber' : 'bidang';
    const [items, setItems] = useState(initialData[dataKey]);

    const handleValueChange = (index: number, value: string) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], value: parseInt(value, 10) || 0 };
        setItems(newItems);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalData = { [dataKey]: items };
        onSave(JSON.stringify(finalData, null, 2));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                {items.map((item: any, index: number) => (
                    <div key={item.name} className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor={`item-${index}`} className="col-span-1">{item.name}</Label>
                        <Input
                            id={`item-${index}`}
                            type="number"
                            value={item.value}
                            onChange={(e) => handleValueChange(index, e.target.value)}
                            className="col-span-2"
                            disabled={isSubmitting}
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isSubmitting}>
                    <Save className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
            </div>
        </form>
    );
};


// Form for Indeks Desa Membangun (IKS, IKE, IKL)
const IdmForm = ({ initialData, onSave, isSubmitting }: { initialData: any, onSave: (data: string) => void, isSubmitting: boolean }) => {
    const [score, setScore] = useState(initialData.score);
    const [status, setStatus] = useState(initialData.status);
    const [components, setComponents] = useState(initialData.components);
    const [trend, setTrend] = useState(initialData.trend || []);
    const [recommendations, setRecommendations] = useState(initialData.recommendations || []);

    const handleComponentScoreChange = (index: number, value: string) => {
        const newComponents = [...components];
        const newScore = parseFloat(value);
        if (newScore >= 0 && newScore <= 1) {
            newComponents[index] = { ...newComponents[index], score: newScore };
            setComponents(newComponents);
        }
    };
    
    const handleTrendChange = (index: number, field: 'year' | 'score', value: string) => {
        const newTrend = [...trend];
        newTrend[index] = {...newTrend[index], [field]: field === 'year' ? parseInt(value) : parseFloat(value)};
        setTrend(newTrend);
    }
    
    const handleRecommendationChange = (index: number, value: string) => {
        const newRecs = [...recommendations];
        newRecs[index] = value;
        setRecommendations(newRecs);
    }

    const addTrendRow = () => setTrend([...trend, { year: new Date().getFullYear(), score: 0.0 }]);
    const removeTrendRow = (index: number) => setTrend(trend.filter((_: any, i: number) => i !== index));
    const addRecommendation = () => setRecommendations([...recommendations, '']);
    const removeRecommendation = (index: number) => setRecommendations(recommendations.filter((_: any, i: number) => i !== index));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalData = { ...initialData, score, status, components, trend, recommendations };
        onSave(JSON.stringify(finalData, null, 2));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Skor dan Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="total-score">Skor Total (0-1)</Label>
                    <Input id="total-score" type="number" step="0.01" min="0" max="1" value={score} onChange={(e) => setScore(parseFloat(e.target.value))} disabled={isSubmitting}/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={status} onValueChange={setStatus} disabled={isSubmitting}>
                        <SelectTrigger id="status"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Maju">Maju</SelectItem>
                            <SelectItem value="Berkembang">Berkembang</SelectItem>
                            <SelectItem value="Tertinggal">Tertinggal</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Komponen Penilaian */}
            <div className="space-y-4 pt-4">
                <h4 className="font-semibold text-muted-foreground border-b pb-2">Komponen Penilaian</h4>
                {components.map((comp: any, index: number) => (
                     <div key={index} className="grid grid-cols-3 items-center gap-4">
                        <Input defaultValue={comp.name} className="col-span-1 bg-muted" readOnly />
                        <Input id={`comp-${index}`} type="number" step="0.01" min="0" max="1" value={comp.score} onChange={(e) => handleComponentScoreChange(index, e.target.value)} className="col-span-2" disabled={isSubmitting} />
                    </div>
                ))}
            </div>

            {/* Tren Skor */}
            <div className="space-y-4 pt-4">
                <div className="flex justify-between items-center border-b pb-2">
                    <h4 className="font-semibold text-muted-foreground">Tren Skor Tahunan</h4>
                    <Button type="button" size="sm" variant="outline" onClick={addTrendRow}><Plus className="h-4 w-4 mr-2" />Tambah Tahun</Button>
                </div>
                 {trend.map((item: any, index: number) => (
                     <div key={index} className="flex items-center gap-2">
                        <Input type="number" placeholder="Tahun" value={item.year} onChange={(e) => handleTrendChange(index, 'year', e.target.value)} disabled={isSubmitting} />
                        <Input type="number" step="0.01" min="0" max="1" placeholder="Skor" value={item.score} onChange={(e) => handleTrendChange(index, 'score', e.target.value)} disabled={isSubmitting} />
                        <Button type="button" size="icon" variant="ghost" onClick={() => removeTrendRow(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                ))}
            </div>

             {/* Rekomendasi */}
            <div className="space-y-4 pt-4">
                <div className="flex justify-between items-center border-b pb-2">
                    <h4 className="font-semibold text-muted-foreground">Teks Rekomendasi</h4>
                     <Button type="button" size="sm" variant="outline" onClick={addRecommendation}><Plus className="h-4 w-4 mr-2" />Tambah Rekomendasi</Button>
                </div>
                 {recommendations.map((rec: string, index: number) => (
                     <div key={index} className="flex items-center gap-2">
                        <Textarea value={rec} onChange={(e) => handleRecommendationChange(index, e.target.value)} placeholder={`Rekomendasi #${index + 1}`} rows={2} disabled={isSubmitting} />
                        <Button type="button" size="icon" variant="ghost" onClick={() => removeRecommendation(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                ))}
            </div>
            
            <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isSubmitting}>
                    <Save className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
            </div>
        </form>
    )
}

const EditStatistikPage = () => {
    const router = useRouter();
    const params = useParams();
    const statId = params?.id as string;
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statData, setStatData] = useState<(StatistikData & {id: string}) | null>(null);

    useEffect(() => {
        if (!statId) return;
        const fetchStat = async () => {
            setIsLoading(true);
            const data = await getStatistikById(statId);
            if (data) {
                setStatData(data);
            } else {
                toast({ title: "Data statistik tidak ditemukan.", variant: 'destructive' });
                router.push('/dashboard/statistik');
            }
            setIsLoading(false);
        };
        fetchStat();
    }, [statId, router, toast]);
    
    const handleSave = async (jsonDataString: string) => {
        setIsSubmitting(true);
        const result = await updateStatistik(statId, { data: jsonDataString });

        if (result.success) {
            toast({ title: "Data statistik berhasil diperbarui." });
            router.push('/dashboard/statistik');
        } else {
            toast({ title: "Gagal memperbarui data.", description: result.error, variant: 'destructive' });
        }
        setIsSubmitting(false);
    };

    const renderForm = () => {
        if (!statData) return null;

        try {
            const parsedData = JSON.parse(statData.data);
            switch (statData.key) {
                case 'pendapatan_desa':
                case 'belanja_desa':
                    return <AnggaranForm initialData={parsedData} onSave={handleSave} isSubmitting={isSubmitting} />;
                case 'indeks_sosial':
                case 'indeks_ekonomi':
                case 'indeks_lingkungan':
                    return <IdmForm initialData={parsedData} onSave={handleSave} isSubmitting={isSubmitting} />;
                default:
                    return <JsonEditor initialData={statData.data} onSave={handleSave} isSubmitting={isSubmitting} />;
            }
        } catch (e) {
            // If JSON is invalid, fall back to the text editor so the user can fix it.
            return <JsonEditor initialData={statData.data} onSave={handleSave} isSubmitting={isSubmitting} />;
        }
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
                    <Link href="/dashboard/statistik"><ArrowLeft className="h-4 w-4 mr-2" />Kembali</Link>
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Editor Data</CardTitle>
                    <CardDescription>
                        Ubah nilai-nilai di bawah ini, kemudian simpan perubahan.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {renderForm()}
                </CardContent>
            </Card>
        </div>
    );
};

export default EditStatistikPage;
