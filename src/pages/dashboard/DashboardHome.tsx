'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FileText, Settings, BarChart3, Map, Mail } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getPendudukStream } from "@/lib/penduduk-client-actions";
import { getPostsStream } from "@/lib/posts-client-actions";
import dynamic from 'next/dynamic';

import { getSuratUsahaStream } from "@/lib/surat-usaha-client-actions";
import { getSuratDomisiliStream } from "@/lib/surat-domisili-client-actions";
import { getSuratKelahiranStream } from "@/lib/surat-kelahiran-client-actions";
import { getSuratKematianStream } from "@/lib/surat-kematian-client-actions";
import { getSuratNikahStream } from "@/lib/surat-nikah-client-actions";
import { getSuratPindahStream } from "@/lib/surat-pindah-client-actions";
import { getSuratPengantarStream } from "@/lib/surat-pengantar-client-actions";
import { getSuratKeteranganStream } from "@/lib/surat-keterangan-client-actions";


const VisitorChart = dynamic(() => import('@/components/dashboard/VisitorChart'), {
    ssr: false,
    loading: () => <div className="h-[300px] flex items-center justify-center"><p>Memuat diagram...</p></div>
});

const DashboardHome = () => {
  const [residentCount, setResidentCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [visitorCount, setVisitorCount] = useState(0);
  const [visitorChange, setVisitorChange] = useState(0);


  useEffect(() => {
    // Set visitor stats on client mount to avoid hydration errors
    setVisitorCount(Math.floor(Math.random() * (2000 - 500 + 1) + 500));
    setVisitorChange(Math.floor(Math.random() * (25 - -10 + 1) + -10));

    const unsubPenduduk = getPendudukStream((data) => setResidentCount(data.length));
    const unsubPosts = getPostsStream((data) => setPostCount(data.length));

    const letterStreams = [
      getSuratUsahaStream,
      getSuratDomisiliStream,
      getSuratKelahiranStream,
      getSuratKematianStream,
      getSuratNikahStream,
      getSuratPindahStream,
      getSuratPengantarStream,
      getSuratKeteranganStream,
    ];

    const pendingCounts = Array(letterStreams.length).fill(0);

    const updateLetterCount = () => {
      const totalPending = pendingCounts.reduce((acc, count) => acc + count, 0);
      setLetterCount(totalPending);
    };

    const unsubscribers = letterStreams.map((stream, index) => {
      return stream((data: any[]) => {
        pendingCounts[index] = data.filter(s => s.status === 'Diproses').length;
        updateLetterCount();
      });
    });

    return () => {
      unsubPenduduk();
      unsubPosts();
      unsubscribers.forEach(unsub => unsub());
    };
  }, []);


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
              Total Penduduk
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{residentCount}</div>
            <p className="text-xs text-muted-foreground">
              Total penduduk terdaftar
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Berita & Info
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{postCount}</div>
            <p className="text-xs text-muted-foreground">
              Total artikel dipublikasikan
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Permintaan Surat
            </CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{letterCount}</div>
            <p className="text-xs text-muted-foreground">
              Menunggu persetujuan
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pengunjung Hari Ini
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{visitorCount > 0 ? visitorCount.toLocaleString('id-ID') : '...'}</div>
             <p className={`text-xs ${visitorChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {visitorCount > 0 ? `${visitorChange >= 0 ? '+' : ''}${visitorChange}% dari kemarin` : 'Memuat...'}
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
          <VisitorChart />
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
