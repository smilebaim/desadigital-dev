'use client';
import { useEffect, useState } from 'react';
import Hero from "@/components/Hero";
import type { SiteSettings } from "@/lib/site-settings-actions";
import { useTenant } from "@/contexts/TenantContext";
import { getPostsStream } from "@/lib/posts-client-actions";
import { getKegiatanStream } from "@/lib/kegiatan-client-actions";
import type { PostData } from "@/lib/posts-actions";
import type { KegiatanData } from "@/lib/kegiatan-actions";
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Megaphone, FileText, FileBadge, Mail, Send, HomeIcon, Briefcase } from "lucide-react";

const LandingPage = ({ settings }: { settings: SiteSettings | null }) => {
  const { tenantId, isLoading: isTenantLoading } = useTenant();
  const [posts, setPosts] = useState<(PostData & { id: string })[]>([]);
  const [kegiatan, setKegiatan] = useState<(KegiatanData & { id: string })[]>([]);

  useEffect(() => {
    if (isTenantLoading) return;
    
    const unsubPosts = getPostsStream((data) => {
      // Filter for published & set to max 3 items
      const published = data.filter((p: any) => p.status === 'Published');
      setPosts(published.slice(0, 3));
    }, tenantId);

    const unsubKegiatan = getKegiatanStream((data) => {
      setKegiatan(data.slice(0, 4));
    }, tenantId);

    return () => {
      unsubPosts();
      unsubKegiatan();
    };
  }, [tenantId, isTenantLoading]);

  // Strip html safely for SSR
  const createSnippet = (html: string) => {
    if (!html) return '';
    const text = html.replace(/<[^>]+>/g, '');
    return text.length > 120 ? text.substring(0, 120) + '...' : text;
  };

  const quickServices = [
    { name: 'Surat Domisili', icon: <HomeIcon className="w-5 h-5" />, href: '/dashboard/apps/surat-domisili', color: 'bg-emerald-500/10 text-emerald-500' },
    { name: 'Surat Usaha', icon: <Briefcase className="w-5 h-5" />, href: '/dashboard/apps/surat-usaha', color: 'bg-blue-500/10 text-blue-500' },
    { name: 'Surat Keterangan', icon: <FileBadge className="w-5 h-5" />, href: '/dashboard/apps/surat-keterangan', color: 'bg-amber-500/10 text-amber-500' },
    { name: 'Surat Pengantar', icon: <Send className="w-5 h-5" />, href: '/dashboard/apps/surat-pengantar', color: 'bg-rose-500/10 text-rose-500' },
  ];

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 min-h-screen pb-20">
      <Hero
        heroUrl={settings?.heroUrl}
        heroTitle={settings?.heroTitle}
        heroSubtitle={settings?.heroSubtitle}
        heroDescription={settings?.heroDescription}
        heroBadge={settings?.heroBadge}
        heroBadgeColor={settings?.heroBadgeColor}
        heroTitleColor={settings?.heroTitleColor}
        heroSubtitleColor={settings?.heroSubtitleColor}
        heroDescriptionColor={settings?.heroDescriptionColor}
        heroOverlayOpacity={settings?.heroOverlayOpacity}
        heroOverlayColor={settings?.heroOverlayColor}
        heroHeight={settings?.heroHeight}
        heroFontFamily={settings?.heroFontFamily}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 space-y-20">
        
        {/* Sambutan Kepala Desa Section */}
        <section className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-8 md:p-12 backdrop-blur-md">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1 flex flex-col items-center text-center space-y-4">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40 p-1">
                <div className="w-full h-full rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden border-4 border-white dark:border-slate-900 shadow-inner">
                  {/* Placeholder Avatar Kades */}
                  <span className="text-5xl text-slate-400 font-bold uppercase">{settings?.kepalaDesaName?.charAt(0) || 'K'}</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white capitalize">{settings?.kepalaDesaName || 'Kepala Desa'}</h3>
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Kepala Desa {settings?.siteName || '...'} </p>
              </div>
            </div>
            <div className="md:col-span-2 space-y-4 text-center md:text-left">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">Sambutan Kepala Desa</h2>
              <div className="w-12 h-1 bg-emerald-500 rounded mx-auto md:mx-0"></div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg italic mt-4">
                "{settings?.siteDescription || 'Selamat datang di website resmi desa kami. Website ini merupakan wujud transformasi digital untuk mewujudkan pelayanan publik yang lebih transparan, responsif, dan mudah dijangkau oleh segenap warga desa.'}"
              </p>
            </div>
          </div>
        </section>

        {/* Layanan Cepat / Aplikasi Surat Section */}
        <section>
           <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">Layanan Mandiri</h2>
              <p className="text-slate-500 mt-2">Akses cepat portal e-surat untuk keperluan administrasi warga.</p>
            </div>
            <Button asChild variant="outline" className="shrink-0 group">
              <Link href="/dashboard">
                Semua Layanan <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {quickServices.map((service, idx) => (
              <Link key={idx} href={service.href} className="group block">
                <Card className="h-full border border-slate-200 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/50 backdrop-blur hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative group-hover:border-emerald-500/40">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <CardContent className="p-6 md:p-8 flex flex-col items-center text-center gap-4 relative z-10">
                    <div className={`p-4 rounded-2xl ${service.color} group-hover:scale-110 transition-transform duration-300`}>
                      {service.icon}
                    </div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm md:text-base">{service.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Berita & Informasi */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg"><Megaphone className="w-5 h-5 text-emerald-500" /></div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Info & Berita Terbaru</h2>
              </div>
              <Link href="/info" className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center group">
                Lihat Semua <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="space-y-5">
              {posts.length > 0 ? posts.map((post) => (
                <div key={post.id} className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-5 items-start">
                   {/* Date Badge */}
                   <div className="flex flex-col items-center justify-center min-w-[70px] p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 text-center shrink-0">
                     <span className="text-2xl font-bold text-emerald-600 block leading-none">{new Date(post.createdAt || '').getDate()}</span>
                     <span className="text-xs font-semibold text-slate-500 uppercase mt-1">
                       {new Date(post.createdAt || '').toLocaleString('id-ID', { month: 'short' })}
                     </span>
                   </div>
                   <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md ${post.category === 'Pengumuman' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400'}`}>
                          {post.category}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1"><FileText className="w-3 h-3"/> {post.views || 0} dibaca</span>
                      </div>
                      <Link href={`/berita/${post.id}`} className="block">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-2 leading-relaxed">
                        {createSnippet(post.content)}
                      </p>
                   </div>
                </div>
              )) : (
                <div className="text-center py-12 px-4 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-900/50">
                  <Megaphone className="w-10 h-10 text-slate-400 mx-auto mb-3 opacity-50" />
                  <p className="text-slate-500 font-medium">Belum ada publikasi informasi terbaru.</p>
                </div>
              )}
            </div>
          </div>

          {/* Agenda Kegiatan */}
          <div className="space-y-6">
             <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className="p-2 bg-teal-500/10 rounded-lg"><Calendar className="w-5 h-5 text-teal-500" /></div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Agenda Desa</h2>
             </div>
             <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                {kegiatan.length > 0 ? (
                  <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                    {kegiatan.map((item) => (
                      <div key={item.id} className="p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <h3 className="font-semibold text-slate-900 dark:text-white text-[15px] mb-2 leading-snug">{item.title}</h3>
                        <div className="flex flex-col gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium mt-3">
                          <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-emerald-500 shrink-0" /> {new Date(item.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'})} • {item.time} WIB</span>
                          <span className="flex items-center gap-2"><HomeIcon className="w-4 h-4 text-slate-400 shrink-0" /> {item.location}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <p className="text-sm text-slate-500">Belum ada agenda kegiatan terdekat.</p>
                  </div>
                )}
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 text-center">
                   <Link href="/aktivitas" className="text-sm font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 hover:underline">
                      Lihat Seluruh Kalender Agenda
                   </Link>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
