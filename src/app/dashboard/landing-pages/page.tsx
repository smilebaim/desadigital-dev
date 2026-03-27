'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Edit, Sparkles, Folders } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getAllLandingPages, seedLandingPages, type LandingPageData } from "@/lib/landing-pages-actions";

const LandingPagesPage = () => {
    const [pages, setPages] = useState<LandingPageData[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSeeding, setIsSeeding] = useState(false);
    const { toast } = useToast();

    const fetchPages = async () => {
        setLoading(true);
        const data = await getAllLandingPages();
        setPages(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchPages();
    }, []);

    const handleSeed = async () => {
        setIsSeeding(true);
        const result = await seedLandingPages();
        if (result.success) {
            toast({ title: "Berhasil!", description: result.message });
            await fetchPages();
        } else {
             toast({ title: "Gagal menyemai data.", description: result.error, variant: 'destructive' });
        }
        setIsSeeding(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Halaman Kategori</h2>
                    <p className="text-muted-foreground">
                        Kelola konten, teks perkenalan, dan kartu menu untuk halaman utama kategori.
                    </p>
                </div>
                <Button onClick={handleSeed} disabled={isSeeding || loading}>
                    <Sparkles className="h-4 w-4 mr-2" />
                    {isSeeding ? 'Memproses...' : 'Sinkronisasi Default Form'}
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Folders className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>Daftar Halaman Kategori Pilihan</CardTitle>
                            <CardDescription>Pilih halaman kategori (landing page) yang ingin Anda ubah kontennya.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Kategori</TableHead>
                                <TableHead>Judul Utama</TableHead>
                                <TableHead>Jumlah Kartu/Link</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow><TableCell colSpan={4} className="text-center">Memuat data...</TableCell></TableRow>
                            ) : pages.length > 0 ? (
                                pages.map((page) => (
                                    <TableRow key={page.id}>
                                        <TableCell className="font-medium capitalize">{page.id.replace('-', ' ')}</TableCell>
                                        <TableCell>{page.title}</TableCell>
                                        <TableCell>{page.links?.length || 0} item</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/dashboard/landing-pages/edit/${page.id}`}>
                                                    <Edit className="h-4 w-4 mr-2" />
                                                    Edit
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">Belum ada data. Silakan klik Sinkronisasi Default Form.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default LandingPagesPage;
