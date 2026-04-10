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
import { ArrowLeft, Save, Plus, Trash2, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { getStatistikById, updateStatistik, type StatistikData } from '@/lib/statistik-actions';
import DynamicStatChart from '@/components/charts/DynamicStatChart';

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

// Generic Chart Form for Custom Visualizations (Bar, Line, Pie, Doughnut)
const GenericChartEditor = ({ initialData, onSave, isSubmitting }: { initialData: any, onSave: (data: string) => void, isSubmitting: boolean }) => {
    const [chartType, setChartType] = useState(initialData.chartType || 'bar');
    const [labels, setLabels] = useState<string[]>(initialData.labels || ['Kategori 1']);
    const [datasets, setDatasets] = useState<any[]>(initialData.datasets || [{ label: 'Dataset 1', data: [0] }]);

    const handleLabelChange = (index: number, value: string) => {
        const newLabels = [...labels];
        newLabels[index] = value;
        setLabels(newLabels);
    }

    const handleDataChange = (datasetIndex: number, dataIndex: number, value: string) => {
        const newDatasets = [...datasets];
        newDatasets[datasetIndex].data[dataIndex] = Number(value) || 0;
        setDatasets(newDatasets);
    }
    
    const handleDatasetLabelChange = (datasetIndex: number, value: string) => {
        const newDatasets = [...datasets];
        newDatasets[datasetIndex].label = value;
        setDatasets(newDatasets);
    }

    const handleDatasetColorChange = (datasetIndex: number, color: string) => {
        const newDatasets = [...datasets];
        newDatasets[datasetIndex].color = color;
        setDatasets(newDatasets);
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, startRowIdx: number, startColIdx: number | null) => {
        const text = e.clipboardData.getData('Text');
        if (!text) return;
        
        if (text.includes('\t') || text.includes('\n')) {
            e.preventDefault();
            
            const rows = text.split(/\r?\n/).filter(r => r.trim() !== '');
            let newLabels = [...labels];
            let newDatasets = [...datasets];
            
            rows.forEach((row, rIdx) => {
                const cells = row.split('\t');
                const targetRowIdx = startRowIdx + rIdx;
                
                // create rows if they don't exist
                while (targetRowIdx >= newLabels.length) {
                    newLabels.push(`Kategori ${newLabels.length + 1}`);
                    newDatasets.forEach(ds => ds.data.push(0)); // pad vertically
                }
                
                let cellDataOffset = 0;
                
                cells.forEach((val, cIdx) => {
                    const parsedVal = val.trim();
                    // if startColIdx === null and we're at cIdx === 0, this is the Label column
                    if (startColIdx === null && cIdx === 0) {
                        newLabels[targetRowIdx] = parsedVal;
                        cellDataOffset = 1; 
                    } else {
                        const targetDsIdx = (startColIdx === null ? -1 : startColIdx) + cIdx - cellDataOffset + (startColIdx === null ? 1 : 0);
                        
                        if (targetDsIdx >= 0) {
                            while (targetDsIdx >= newDatasets.length) {
                                newDatasets.push({ label: `Dataset ${newDatasets.length + 1}`, data: newLabels.map(() => 0) });
                            }
                            
                            const numVal = Number(parsedVal.replace(/[^0-9.-]+/g,"")); // Clean strings to valid numbers
                            if (!isNaN(numVal) && parsedVal !== '') {
                                newDatasets[targetDsIdx].data[targetRowIdx] = numVal;
                            }
                        }
                    }
                });
            });
            
            setLabels([...newLabels]);
            setDatasets([...newDatasets]);
        }
    };

    const addRow = () => {
        setLabels([...labels, `Kategori ${labels.length + 1}`]);
        setDatasets(datasets.map(ds => ({ ...ds, data: [...ds.data, 0] })));
    }

    const removeRow = (index: number) => {
        setLabels(labels.filter((_, i) => i !== index));
        setDatasets(datasets.map(ds => ({ ...ds, data: ds.data.filter((_: any, i: number) => i !== index) })));
    }

    const addDataset = () => {
        setDatasets([...datasets, { label: `Dataset ${datasets.length + 1}`, data: labels.map(() => 0) }]);
    }
    
    const removeDataset = (index: number) => {
        setDatasets(datasets.filter((_, i) => i !== index));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalData = { ...initialData, chartType, labels, datasets };
        onSave(JSON.stringify(finalData, null, 2));
    };

    const previewData = {
        title: "Pratinjau Grafik",
         group: "Pratinjau",
         data: JSON.stringify({ chartType, labels, datasets })
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="chart-type">Tipe Visualisasi</Label>
                    <Select value={chartType} onValueChange={setChartType} disabled={isSubmitting}>
                        <SelectTrigger id="chart-type"><SelectValue/></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="bar">Diagram Batang (Bar)</SelectItem>
                            <SelectItem value="line">Diagram Garis (Line)</SelectItem>
                            <SelectItem value="area">Diagram Area (Area)</SelectItem>
                            <SelectItem value="pie">Diagram Lingkaran (Pie)</SelectItem>
                            <SelectItem value="doughnut">Diagram Donat (Doughnut)</SelectItem>
                            <SelectItem value="radar">Diagram Jaring (Radar)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-4 pt-4 overflow-x-auto">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h4 className="font-semibold text-muted-foreground">Tabel Data Grafik</h4>
                        <div className="flex gap-2">
                             <Button type="button" size="sm" variant="outline" onClick={addDataset}><Plus className="h-4 w-4 mr-2" />Kolom</Button>
                             <Button type="button" size="sm" variant="outline" onClick={addRow}><Plus className="h-4 w-4 mr-2" />Baris</Button>
                        </div>
                    </div>

                    <div className="border rounded-md overflow-x-auto bg-white dark:bg-black w-full">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="p-3 border-b font-medium min-w-[150px] whitespace-nowrap">Kategori (Sumbu X)</th>
                                    {datasets.map((ds, dIdx) => (
                                        <th key={dIdx} className="p-3 border-b border-l font-medium min-w-[200px]">
                                            <div className="flex items-center gap-1.5 focus-within:ring-1 focus-within:ring-ring rounded-md ring-offset-background">
                                                <input 
                                                    type="color" 
                                                    value={ds.color || '#3b82f6'} 
                                                    onChange={(e) => handleDatasetColorChange(dIdx, e.target.value)}
                                                    className="w-8 h-8 p-0 border-0 rounded cursor-pointer shrink-0 appearance-none bg-transparent"
                                                    title="Pilih warna untuk dataset ini"
                                                    disabled={isSubmitting}
                                                />
                                                <Input value={ds.label} onChange={(e) => handleDatasetLabelChange(dIdx, e.target.value)} className="h-8 font-semibold bg-background border-none focus-visible:ring-0 px-2" disabled={isSubmitting}/>
                                                {datasets.length > 1 && (
                                                    <Button type="button" size="icon" variant="ghost" className="h-8 w-8 text-destructive flex-shrink-0" onClick={() => removeDataset(dIdx)}><Trash2 className="h-4 w-4"/></Button>
                                                )}
                                            </div>
                                        </th>
                                    ))}
                                    <th className="p-3 border-b border-l w-12 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                 {labels.map((label, lIdx) => (
                                     <tr key={lIdx} className="hover:bg-muted/50 transition-colors">
                                        <td className="p-2 border-b">
                                            <Input 
                                               value={label} 
                                               onChange={(e) => handleLabelChange(lIdx, e.target.value)} 
                                               onPaste={(e) => handlePaste(e, lIdx, null)}
                                               className="h-8" 
                                               disabled={isSubmitting} 
                                               title="Tip: Copy-Paste Excel Data Di Sini"
                                            />
                                        </td>
                                        {datasets.map((ds, dIdx) => (
                                            <td key={dIdx} className="p-2 border-b border-l">
                                                <Input 
                                                    type="number" 
                                                    value={ds.data[lIdx]} 
                                                    onChange={(e) => handleDataChange(dIdx, lIdx, e.target.value)} 
                                                    onPaste={(e) => handlePaste(e, lIdx, dIdx)}
                                                    className="h-8" 
                                                    disabled={isSubmitting} 
                                                />
                                            </td>
                                        ))}
                                        <td className="p-2 border-b border-l text-center">
                                            {labels.length > 1 && (
                                                <Button type="button" size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => removeRow(lIdx)}><Trash2 className="h-4 w-4"/></Button>
                                            )}
                                        </td>
                                     </tr>
                                 ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={isSubmitting}>
                        <Save className="h-4 w-4 mr-2" />
                        {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
                    </Button>
                </div>
            </form>
            <div className="space-y-4 sticky top-6 self-start hidden lg:block border rounded-xl overflow-hidden shadow-sm bg-muted/20">
                 <div className="bg-muted px-4 py-3 border-b border-border/50">
                    <h3 className="text-sm font-semibold flex items-center"><BarChart3 className="w-4 h-4 mr-2 text-primary" /> Pratinjau Tampilan Web</h3>
                 </div>
                 <div className="p-4 scale-[0.85] origin-top -mt-4">
                     <DynamicStatChart previewData={previewData} />
                 </div>
            </div>
        </div>
    );
};

const EditStatistikPage = () => {
    const router = useRouter();
    const params = useParams();
    const statId = (Array.isArray(params?.id) ? params.id[0] : params?.id) as string;
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
                    if (parsedData.chartType && ['bar', 'line', 'pie', 'doughnut'].includes(parsedData.chartType)) {
                        return <GenericChartEditor initialData={parsedData} onSave={handleSave} isSubmitting={isSubmitting} />;
                    }
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
