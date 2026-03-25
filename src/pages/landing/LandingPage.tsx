'use client';
import Hero from "@/components/Hero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, FileSignature, HeartPulse, Shield, BarChart3, Users, TrendingUp } from "lucide-react";
import type { SiteSettings } from "@/lib/site-settings-actions";

const LandingPage = ({ settings }: { settings: SiteSettings | null }) => {
  const features = [
    { title: "Persuratan", desc: "Layanan mandiri pengurusan surat keterangan desa.", icon: FileSignature, href: "/layanan/persuratan" },
    { title: "Kesehatan", desc: "Informasi jadwal Posyandu dan layanan Poskesdes.", icon: HeartPulse, href: "/layanan/poskesdes" },
    { title: "Keamanan", desc: "Sistem keamanan swadaya untuk ketertiban warga.", icon: Shield, href: "/layanan/poskamling" },
  ];

  const quickStats = [
    { label: "Jumlah Penduduk", value: "1,245", unit: "Jiwa", icon: Users, color: "text-blue-600" },
    { label: "Status Desa", value: "Maju", unit: "IDM 2024", icon: TrendingUp, color: "text-green-600" },
    { label: "Anggaran 2024", value: "Rp 2,1M", unit: "APBDes", icon: BarChart3, color: "text-orange-600" },
  ];

  return (
    <div className="flex-1 pb-0">
      <Hero 
        heroUrl={settings?.heroUrl} 
        heroTitle={settings?.heroTitle}
        heroSubtitle={settings?.heroSubtitle}
        heroDescription={settings?.heroDescription}
      />

      <div className="container mx-auto px-4 md:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <Card key={idx} className="border border-white/20 shadow-2xl bg-white/80 backdrop-blur-xl group hover:-translate-y-2 transition-all duration-300 rounded-3xl overflow-hidden">
              <CardHeader className="pb-2">
                <div className="mb-4 p-3 w-fit rounded-2xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  <feat.icon className="h-7 w-7" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800">{feat.title}</CardTitle>
                <CardDescription className="text-gray-500 leading-relaxed">{feat.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" asChild className="p-0 h-auto font-bold text-emerald-600 hover:bg-transparent hover:text-emerald-700 group/btn">
                  <Link href={feat.href} className="flex items-center gap-2">
                    Buka Layanan <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistik Singkat */}
        <div className="mt-32 md:mt-48">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 italic">Sekilas Desa</h2>
            <div className="h-1.5 w-20 bg-emerald-500 mx-auto mt-4 rounded-full" />
            <p className="text-lg text-muted-foreground mt-6 leading-relaxed">Gambaran umum perkembangan dan kondisi Desa Remau Bako Tuo untuk transparansi publik.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {quickStats.map((stat, idx) => (
              <div key={idx} className="group relative flex flex-col items-center text-center p-8 rounded-[2rem] bg-white border border-gray-100 shadow-sm transition-all hover:shadow-xl hover:border-emerald-100">
                <div className={`mb-6 p-5 rounded-3xl bg-gray-50 group-hover:scale-110 transition-transform duration-500 ${stat.color}`}>
                  <stat.icon className="h-10 w-10" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-1">{stat.label}</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-black tracking-tighter text-gray-900">{stat.value}</span>
                    <span className="text-xs font-bold uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">{stat.unit}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-40 mb-32 rounded-[2.5rem] bg-emerald-950 overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-800/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-700/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 p-10 md:p-20 text-center md:text-left flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-[1.15]">
                Mari Wujudkan Desa Digital yang Transparan dan Mandiri
              </h2>
              <p className="text-emerald-100/70 mt-8 text-xl leading-relaxed">
                Dapatkan kemudahan akses informasi pembangunan, dana desa, dan layanan administrasi dalam satu genggaman untuk masa depan desa yang lebih cerdas.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto">
              <Button size="lg" className="h-16 bg-white text-emerald-950 hover:bg-emerald-50 rounded-2xl px-10 font-black text-lg transition-all hover:scale-105 active:scale-95 shadow-xl" asChild>
                <Link href="/info">Jelajahi Berita</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-16 border-white/20 text-white hover:bg-white/10 rounded-2xl px-10 font-bold text-lg transition-all" asChild>
                <Link href="/tata-ruang">Lihat Peta Desa</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
