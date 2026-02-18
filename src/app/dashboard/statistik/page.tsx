'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbulb, Copy, Edit, Sparkles, MoreVertical, Trash2 } from 'lucide-react';
import { visualizationTemplates } from '@/lib/visualization-templates';
import type { VisualizationTemplate } from '@/lib/visualization-templates';
import { useToast } from "@/components/ui/use-toast";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getStatistikStream } from "@/lib/statistik-client-actions";
import { deleteStatistik, seedInitialStatistik, type StatistikData } from "@/lib/statistik-actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";


// --- Pustaka Visualisasi Components ---

const StatCard = ({ template }: { template: VisualizationTemplate }) => {
    const { toast } = useToast();

    const handleCopy = () => {
        navigator.clipboard.writeText(template.placeholder);
        toast({
            title: "Tersalin!",
            description: `Placeholder "${template.placeholder}" telah disalin ke clipboard.`,
        });
    };

    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle>{template.title}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
                <div className="h-48 w-full flex items-center justify-center bg-muted/50 rounded-md overflow-hidden mb-4 p-2">
                    {template.previewComponent}
                </div>
                 <div className="mt-auto">
                    <p className="text-xs text-muted-foreground mb-1">Sisipkan di halaman dengan placeholder ini:</p>
                    <div className="flex items-center gap-2">
                        <Input readOnly value={template.placeholder} className="text-xs" />
                        <Button variant="ghost" size="icon" onClick={handleCopy}>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const PustakaTab = () => {
    const groupedTemplates = visualizationTemplates.reduce((acc, template) => {
        (acc[template.group] = acc[template.group] || []).push(template);
        return acc;
    }, {} as Record<string, VisualizationTemplate[]>);

    const groupOrder: (keyof typeof groupedTemplates)[] = ['Demografi', 'Anggaran', 'Indeks Desa Membangun', 'Lainnya'];

    return (
        <div className="space-y-8 mt-6">
             {groupOrder.map(groupName => (
                groupName in groupedTemplates && (
                    <div key={groupName}>
                        <h3 className="text-xl font-semibold tracking-tight mb-4 border-b pb-2">{groupName}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {groupedTemplates[groupName]?.map(template => (
                                 <StatCard key={template.placeholder} template={template} />
                            ))}
                        </div>
                    </div>
                )
            ))}
        </div>
    )
}

// --- Kelola Data Components ---

interface Statistik extends StatistikData {
  id: string;
}

const DataTab = () => {
  const [stats, setStats] = useState<Statistik[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);
  const { toast } = useToast();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [statToDelete, setStatToDelete] = useState<Statistik | null>(null);

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

  const openDeleteDialog = (stat: Statistik) => {
      setStatToDelete(stat);
      setIsDeleteOpen(true);
  };

  const handleDelete = async () => {
      if (!statToDelete) return;
      const result = await deleteStatistik(statToDelete.id);
      if (result.success) {
          toast({ title: 'Data statistik berhasil dihapus.' });
      } else {
          toast({ title: 'Gagal menghapus data.', variant: 'destructive' });
      }
      setIsDeleteOpen(false);
  }

  return (
    <>
      <Card className="mt-6">
        <CardHeader>
          <div className="flex justify-between items-center">
              <div>
                  <CardTitle>Daftar Data Statistik</CardTitle>
                  <CardDescription>
                      Ubah atau pulihkan data yang menjadi sumber untuk diagram.
                  </CardDescription>
              </div>
              <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleSeedData} disabled={isSeeding}>
                    <Sparkles className="h-4 w-4 mr-2" />
                    {isSeeding ? 'Memproses...' : 'Buat/Pulihkan Data Awal'}
                  </Button>
              </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul Data</TableHead>
                <TableHead>Grup</TableHead>
                <TableHead>Kunci (Placeholder)</TableHead>
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
                    <TableCell className="font-mono text-xs">{`[STAT_${stat.key.toUpperCase()}]`}</TableCell>
                    <TableCell className="text-right">
                       <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                             <Link href={`/dashboard/statistik/edit/${stat.id}`}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => openDeleteDialog(stat)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                      Belum ada data. Klik "Buat/Pulihkan Data Awal" untuk memulai.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Delete Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                <AlertDialogDescription>Tindakan ini akan menghapus data statistik &quot;{statToDelete?.title}&quot; secara permanen.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Hapus</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};


// --- Main Page Component ---
const StatistikPage = () => {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Statistik & Visualisasi</h2>
                <p className="text-muted-foreground">Kelola pustaka visualisasi dan sumber datanya dari satu tempat.</p>
            </div>
            <Tabs defaultValue="pustaka" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="pustaka">Pustaka Visualisasi</TabsTrigger>
                    <TabsTrigger value="data">Kelola Data</TabsTrigger>
                </TabsList>
                <TabsContent value="pustaka">
                    <PustakaTab />
                </TabsContent>
                <TabsContent value="data">
                    <DataTab />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default StatistikPage;
