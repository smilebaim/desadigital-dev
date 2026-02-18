'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getStatistikStream } from "@/lib/statistik-client-actions";
import { seedInitialStatistik, type StatistikData } from "@/lib/statistik-actions";
import { useToast } from "@/components/ui/use-toast";

interface Statistik extends StatistikData {
  id: string;
}

const StatistikDataPage = () => {
  const [stats, setStats] = useState<Statistik[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = getStatistikStream((data) => {
      setStats(data as Statistik[]);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  
  const handleSeedData = async () => {
    setIsSeeding(true);
    const result = await seedInitialStatistik();
    if (result.success) {
      toast({ title: result.message });
    } else {
      toast({ title: 'Gagal', description: result.error, variant: 'destructive' });
    }
    setIsSeeding(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Kelola Data Statistik</h2>
          <p className="text-muted-foreground">
            Ubah data yang menjadi sumber untuk diagram dan grafik di halaman publik.
          </p>
        </div>
        {stats.length === 0 && !loading && (
             <Button variant="outline" size="sm" onClick={handleSeedData} disabled={isSeeding}>
              <Sparkles className="h-4 w-4 mr-2" />
              {isSeeding ? 'Membuat...' : 'Buat Data Statistik Awal'}
            </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Data Statistik</CardTitle>
          <CardDescription>
            Pilih item di bawah untuk mengedit datanya.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul Data</TableHead>
                <TableHead>Grup</TableHead>
                <TableHead>Terakhir Diperbarui</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">Memuat data...</TableCell>
                </TableRow>
              ) : stats.length > 0 ? (
                stats.map((stat) => (
                  <TableRow key={stat.id}>
                    <TableCell className="font-medium">{stat.title}</TableCell>
                    <TableCell>{stat.group}</TableCell>
                    <TableCell>
                      {stat.updatedAt ? new Date(stat.updatedAt.seconds * 1000).toLocaleString('id-ID') : 'Belum pernah'}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                         <Link href={`/dashboard/statistik/edit/${stat.id}`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Data
                          </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                      Belum ada data. Klik "Buat Data Statistik Awal" untuk memulai.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatistikDataPage;
