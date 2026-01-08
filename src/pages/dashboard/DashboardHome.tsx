'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FileText, Settings, BarChart3, Map } from "lucide-react";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", visitors: 400, pageViews: 2400 },
  { name: "Feb", visitors: 300, pageViews: 1398 },
  { name: "Mar", visitors: 200, pageViews: 9800 },
  { name: "Apr", visitors: 278, pageViews: 3908 },
  { name: "Mei", visitors: 189, pageViews: 4800 },
  { name: "Jun", visitors: 239, pageViews: 3800 },
  { name: "Jul", visitors: 349, pageViews: 4300 },
];

const DashboardHome = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Selamat datang di panel admin Desa Remau Bakotuo.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pengunjung Hari Ini
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-muted-foreground">
              +10% dari kemarin
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Berita
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">54</div>
            <p className="text-xs text-muted-foreground">
              +2 berita baru bulan ini
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Permintaan Surat
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Menunggu persetujuan
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Data Penduduk
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,500</div>
            <p className="text-xs text-muted-foreground">
              Total penduduk terdaftar
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Analitik Pengunjung</CardTitle>
          <CardDescription>
            Data pengunjung website dalam 7 bulan terakhir.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="pageViews" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Akses Cepat</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" asChild>
                <Link href="/dashboard/info" className="flex flex-col h-24 justify-center items-center">
                    <FileText className="h-6 w-6 mb-2" />
                    <span>Info & Berita</span>
                </Link>
            </Button>
            <Button variant="outline" asChild>
                <Link href="/dashboard/penduduk" className="flex flex-col h-24 justify-center items-center">
                    <Users className="h-6 w-6 mb-2" />
                    <span>Data Penduduk</span>
                </Link>
            </Button>
            <Button variant="outline" asChild>
                <Link href="/dashboard/map-control" className="flex flex-col h-24 justify-center items-center">
                    <Map className="h-6 w-6 mb-2" />
                    <span>Kontrol Peta</span>
                </Link>
            </Button>
             <Button variant="outline" asChild>
                <Link href="/dashboard/pengaturan" className="flex flex-col h-24 justify-center items-center">
                    <Settings className="h-6 w-6 mb-2" />
                    <span>Pengaturan</span>
                </Link>
            </Button>
        </CardContent>
      </Card>

    </div>
  );
};

export default DashboardHome;
