'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Users, Newspaper, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";

const DashboardHome = () => {
  const statsItems = [
    {
      title: "Total Artikel",
      value: "4",
      icon: Newspaper,
      color: "text-blue-600",
      description: "Berita & pengumuman"
    },
    {
      title: "Total Halaman",
      value: "23",
      icon: FileText,
      color: "text-green-600",
      description: "Halaman konten publik"
    },
    {
      title: "Total Pengguna",
      value: "1",
      icon: Users,
      color: "text-purple-600",
      description: "Admin terdaftar"
    }
  ];

  const recentActivities = [
    {
      description: "Artikel baru ditambahkan: 'Peringatan HUT RI ke-79'",
      time: "2 jam yang lalu",
      author: "Admin"
    },
    {
      description: "Halaman 'Visi & Misi' telah diperbarui.",
      time: "Kemarin",
      author: "Admin"
    },
    {
      description: "Workspace 'Proyek Desa Digital' dibuat.",
      time: "3 hari yang lalu",
      author: "Admin"
    }
  ];
  
  const recentArticles = [
    { id: 1, title: "Peringatan HUT RI ke-79", category: "Pengumuman", date: "2024-08-01" },
    { id: 2, title: "Rehabilitasi Mangrove Tahap II", category: "Berita", date: "2024-07-28" },
    { id: 3, title: "Jadwal Penyaluran Bantuan Pangan", category: "Pengumuman", date: "2024-07-25" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-3xl font-bold tracking-tight">Beranda Dashboard</h2>
            <p className="text-muted-foreground">
                Selamat datang! Kelola konten dan layanan desa dari sini.
            </p>
        </div>
        <div className="flex gap-2">
            <Button asChild>
                <Link href="/dashboard/info">
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Artikel Baru
                </Link>
            </Button>
            <Button variant="outline" asChild>
                <Link href="/dashboard/pages">
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Halaman
                </Link>
            </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statsItems.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              <item.icon className={`h-4 w-4 ${item.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Aktivitas Terbaru</CardTitle>
                <CardDescription>Perubahan terakhir yang dilakukan di sistem.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 bg-muted rounded-full h-8 w-8 flex items-center justify-center">
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time} oleh {activity.author}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Artikel Terbaru</CardTitle>
                <CardDescription>Berita dan pengumuman yang baru saja dipublikasikan.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Judul</TableHead>
                            <TableHead>Kategori</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentArticles.map((article) => (
                        <TableRow key={article.id}>
                            <TableCell className="font-medium">{article.title}</TableCell>
                            <TableCell>{article.category}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href="/dashboard/info">
                                        Lihat <ArrowRight className="h-4 w-4 ml-2" />
                                    </Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
