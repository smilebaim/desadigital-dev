'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import {
  LogOut,
  ChevronRight,
  User,
  Settings,
  Map,
  AppWindow,
  Home,
  Users,
  FileSpreadsheet,
  ListTodo,
  Palette,
  Newspaper,
  LayoutGrid,
  Briefcase,
  BarChart3,
  ChevronDown,
  Mail,
  HomeIcon,
  HeartPulse,
  Baby,
  Skull,
  BookUser,
  ArrowRightLeft,
  FileBadge,
  Send,
  Calendar,
  Folders,
  ShieldAlert,
  ExternalLink,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUser, useAuth, useFirestore } from '@/firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { removeAuthCookie } from '@/lib/auth-cookies';
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { useState, useEffect } from "react";
import type { UserRole } from '@/lib/user-actions';

// ── Breadcrumb label mapping ──────────────────────────────────────────────────
const BREADCRUMB_MAP: Record<string, string> = {
  dashboard: 'Beranda',
  penduduk: 'Data Penduduk',
  workspaces: 'Workspaces',
  info: 'Info & Berita',
  kegiatan: 'Agenda Kegiatan',
  'map-control': 'Kontrol Peta',
  statistik: 'Statistik & Visualisasi',
  pages: 'Daftar Halaman',
  'halaman-utama': 'Halaman Utama',
  'landing-pages': 'Halaman Kategori',
  menu: 'Kelola Menu',
  apps: 'Aplikasi Desa',
  'surat-masuk': 'Surat Masuk',
  'surat-keluar': 'Surat Keluar',
  'surat-domisili': 'Surat Domisili',
  'surat-usaha': 'Surat Usaha',
  'surat-kelahiran': 'Surat Kelahiran',
  'surat-kematian': 'Surat Kematian',
  'surat-pindah': 'Surat Pindah',
  'surat-nikah': 'Surat Nikah',
  'surat-pengantar': 'Surat Pengantar',
  'surat-keterangan': 'Surat Keterangan',
  pengaturan: 'Pengaturan',
  profil: 'Profil Saya',
};

// ── Menu items yang hanya boleh diakses admin ke atas ─────────────────────────
const ADMIN_ONLY_PATHS = new Set([
  '/dashboard/pengaturan',
  '/dashboard/halaman-utama',
  '/dashboard/landing-pages',
  '/dashboard/menu',
  '/dashboard/pages',
]);

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useUser();
  const auth = useAuth();
  const db = useFirestore();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [userRole, setUserRole] = useState<UserRole>('staff');
  const [isLoadingRole, setIsLoadingRole] = useState(true);

  // Fallback: jika tidak ada user setelah mount, hentikan loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingRole(false);
    }, 3000); // Max 3 detik loading
    return () => clearTimeout(timer);
  }, []);

  // ── Ambil role user dari Firestore ────────────────────────────────────────
  useEffect(() => {
    if (!user) {
      // User belum ada (not logged in / still loading auth state)
      // Jangan biarkan isLoadingRole tetap true selamanya
      setIsLoadingRole(false);
      return;
    }
    const fetchRole = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'users', user.uid));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserRole(data.role || 'staff');
        }
      } catch {
        // keep default 'staff'
      } finally {
        setIsLoadingRole(false);
      }
    };
    fetchRole();
  }, [user, db]);

  // ── Access Interceptor: blokir staff dari menu admin-only ─────────────────
  useEffect(() => {
    if (isLoadingRole) return;
    const isStaff = userRole === 'staff' || userRole === 'pending';
    // Ekstrak pathname tanpa prefix tenant (misal /sukamaju/dashboard/pengaturan → /dashboard/pengaturan)
    const normalizedPath = (pathname || '').replace(/^\/[^/]+/, '');
    if (isStaff && ADMIN_ONLY_PATHS.has(normalizedPath)) {
      toast({
        title: 'Akses Dibatasi',
        description: 'Hanya Admin Desa yang dapat mengakses menu ini.',
        variant: 'destructive',
      });
      router.replace('/dashboard');
    }
  }, [pathname, userRole, isLoadingRole, router, toast]);

  // ── Breadcrumbs dari pathname ──────────────────────────────────────────────
  const buildBreadcrumbs = () => {
    // Hapus prefix tenant dari pathname
    const normalized = (pathname || '').replace(/^\/[^/]+(?=\/dashboard)/, '');
    const parts = normalized.split('/').filter(Boolean);
    const crumbs: { label: string; href: string }[] = [];
    let cumPath = '';
    for (const part of parts) {
      cumPath += `/${part}`;
      crumbs.push({
        label: BREADCRUMB_MAP[part] || part,
        href: cumPath,
      });
    }
    return crumbs;
  };

  const breadcrumbs = buildBreadcrumbs();
  const pageTitle = breadcrumbs[breadcrumbs.length - 1]?.label || 'Dashboard';

  const handleLogout = async () => {
    toast({
      title: 'Logout',
      description: 'Anda akan dialihkan ke halaman utama.',
    });
    await removeAuthCookie();
    await signOut(auth);
    router.push('/');
  };

  // ── Nav Link helper ───────────────────────────────────────────────────────
  const isActive = (href: string) => {
    const normalized = (pathname || '').replace(/^\/[^/]+(?=\/dashboard)/, '');
    return normalized === href || normalized.startsWith(href + '/');
  };

  const linkClass = (href: string, adminOnly = false) => {
    const active = isActive(href);
    const locked = adminOnly && (userRole === 'staff' || userRole === 'pending');
    return `flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all duration-150 ${
      active
        ? 'bg-emerald-500/20 text-emerald-300 font-medium'
        : locked
        ? 'text-emerald-700 cursor-not-allowed opacity-50'
        : 'text-emerald-100/80 hover:bg-emerald-800/70 hover:text-emerald-100'
    }`;
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50 dark:bg-slate-950">
        {/* ── Sidebar ────────────────────────────────────────────────────── */}
        <Sidebar className="bg-gradient-to-b from-emerald-950 to-slate-950 border-r border-emerald-900/50 shadow-xl">
          <SidebarHeader className="flex items-center gap-3 p-4 border-b border-emerald-900/40">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative flex-shrink-0">
                <Image src="/logo-desa.png" alt="Logo Desa" className="h-9 w-9 rounded-lg" width={36} height={36} />
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-emerald-950" />
              </div>
              <div className="min-w-0">
                <span className="font-bold text-emerald-100 block truncate text-sm">Dashboard Desa</span>
                <span className="text-xs text-emerald-500 truncate capitalize block">
                  {isLoadingRole ? '...' : userRole}
                </span>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="py-3 px-2">
            <nav className="space-y-0.5">
              <Link href="/dashboard" className={linkClass('/dashboard')}>
                <Home size={17} />
                <span>Beranda</span>
              </Link>

              <Link href="/dashboard/penduduk" className={linkClass('/dashboard/penduduk')}>
                <Users size={17} />
                <span>Data Penduduk</span>
              </Link>

              <Link href="/dashboard/workspaces" className={linkClass('/dashboard/workspaces')}>
                <Briefcase size={17} />
                <span>Workspaces</span>
              </Link>

              <Link href="/dashboard/info" className={linkClass('/dashboard/info')}>
                <Newspaper size={17} />
                <span>Info & Berita</span>
              </Link>

              <Link href="/dashboard/kegiatan" className={linkClass('/dashboard/kegiatan')}>
                <Calendar size={17} />
                <span>Agenda Kegiatan</span>
              </Link>

              <Link href="/dashboard/map-control" className={linkClass('/dashboard/map-control')}>
                <Map size={17} />
                <span>Kontrol Peta</span>
              </Link>

              <Accordion type="multiple" className="w-full" defaultValue={[]}>
                  {/* Kelola Halaman */}
                  <AccordionItem value="halaman" className="border-none">
                    <AccordionTrigger className="px-3 py-2 text-sm rounded-lg hover:bg-emerald-800/70 text-emerald-100/80 hover:text-emerald-100 transition-all [&>svg]:text-emerald-500">
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet size={17} />
                        <span>Kelola Halaman</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-0">
                      <ul className="space-y-0.5 pl-3 mt-0.5">
                        <li>
                          <Link href="/dashboard/statistik" className={linkClass('/dashboard/statistik')}>
                            <BarChart3 size={16} /><span>Statistik & Visualisasi</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="/dashboard/pages" className={linkClass('/dashboard/pages', true)}>
                            <ListTodo size={16} />
                            <span>Daftar Halaman</span>
                            {(userRole === 'staff' || userRole === 'pending') && <ShieldAlert size={12} className="ml-auto text-amber-500" />}
                          </Link>
                        </li>
                        <li>
                          <Link href="/dashboard/halaman-utama" className={linkClass('/dashboard/halaman-utama', true)}>
                            <LayoutGrid size={16} />
                            <span>Halaman Utama</span>
                            {(userRole === 'staff' || userRole === 'pending') && <ShieldAlert size={12} className="ml-auto text-amber-500" />}
                          </Link>
                        </li>
                        <li>
                          <Link href="/dashboard/landing-pages" className={linkClass('/dashboard/landing-pages', true)}>
                            <Folders size={16} />
                            <span>Halaman Kategori</span>
                            {(userRole === 'staff' || userRole === 'pending') && <ShieldAlert size={12} className="ml-auto text-amber-500" />}
                          </Link>
                        </li>
                        <li>
                          <Link href="/dashboard/menu" className={linkClass('/dashboard/menu', true)}>
                            <ListTodo size={16} />
                            <span>Kelola Menu</span>
                            {(userRole === 'staff' || userRole === 'pending') && <ShieldAlert size={12} className="ml-auto text-amber-500" />}
                          </Link>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Aplikasi Desa */}
                  <AccordionItem value="apps" className="border-none">
                    <AccordionTrigger className="px-3 py-2 text-sm rounded-lg hover:bg-emerald-800/70 text-emerald-100/80 hover:text-emerald-100 transition-all [&>svg]:text-emerald-500">
                      <div className="flex items-center gap-2">
                        <AppWindow size={17} />
                        <span>Aplikasi Desa</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-0">
                      <ul className="space-y-0.5 pl-3 mt-0.5">
                        {[
                          { href: '/dashboard/apps/surat-masuk', label: 'Surat Masuk', icon: <Mail size={15} /> },
                          { href: '/dashboard/apps/surat-keluar', label: 'Surat Keluar', icon: <Send size={15} /> },
                          { href: '/dashboard/apps/surat-domisili', label: 'Surat Domisili', icon: <HomeIcon size={15} /> },
                          { href: '/dashboard/apps/surat-usaha', label: 'Surat Usaha', icon: <Briefcase size={15} /> },
                          { href: '/dashboard/apps/surat-kelahiran', label: 'Surat Kelahiran', icon: <Baby size={15} /> },
                          { href: '/dashboard/apps/surat-kematian', label: 'Surat Kematian', icon: <Skull size={15} /> },
                          { href: '/dashboard/apps/surat-pindah', label: 'Surat Pindah', icon: <ArrowRightLeft size={15} /> },
                          { href: '/dashboard/apps/surat-nikah', label: 'Surat Nikah', icon: <HeartPulse size={15} /> },
                          { href: '/dashboard/apps/surat-pengantar', label: 'Surat Pengantar', icon: <BookUser size={15} /> },
                          { href: '/dashboard/apps/surat-keterangan', label: 'Surat Keterangan', icon: <FileBadge size={15} /> },
                        ].map((item) => (
                          <li key={item.href}>
                            <Link href={item.href} className={linkClass(item.href)}>
                              {item.icon}<span>{item.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
              </Accordion>

              {/* Pengaturan — admin only */}
              <Link href="/dashboard/pengaturan" className={linkClass('/dashboard/pengaturan', true)}>
                <Settings size={17} />
                <span>Pengaturan Situs</span>
                {(userRole === 'staff' || userRole === 'pending') && (
                  <ShieldAlert size={12} className="ml-auto text-amber-500 shrink-0" />
                )}
              </Link>
            </nav>
          </SidebarContent>

          <SidebarFooter className="p-3 border-t border-emerald-900/40">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-emerald-800/50 transition-colors text-left group">
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-teal-500 text-white text-xs font-bold">
                        {user?.email?.charAt(0).toUpperCase() ?? '?'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-emerald-100 truncate">{user?.email?.split('@')[0] ?? 'User'}</p>
                      <p className="text-xs text-emerald-500 capitalize">{userRole}</p>
                    </div>
                    <ChevronDown size={14} className="text-emerald-500 group-hover:text-emerald-300 transition-colors flex-shrink-0" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" side="top" className="w-56 mb-2">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold truncate">Akun Saya</span>
                      <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profil">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profil</span>
                    </Link>
                  </DropdownMenuItem>
                  {(userRole === 'admin' || userRole === 'superadmin') && (
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/pengaturan">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Pengaturan</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 focus:bg-red-50">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Keluar</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        {/* ── Main Area ──────────────────────────────────────────────────── */}
        <div className="flex flex-col flex-grow overflow-auto">
          {/* Header with breadcrumbs */}
          <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <SidebarTrigger className="flex-shrink-0 text-slate-500" />
              {/* Breadcrumbs */}
              <nav className="flex items-center gap-1 text-sm min-w-0" aria-label="Breadcrumb">
                {breadcrumbs.map((crumb, idx) => (
                  <span key={idx} className="flex items-center gap-1 min-w-0">
                    {idx > 0 && <ChevronRight size={13} className="text-slate-400 flex-shrink-0" />}
                    {idx === breadcrumbs.length - 1 ? (
                      <span className="font-semibold text-slate-700 dark:text-slate-200 truncate">{crumb.label}</span>
                    ) : (
                      <Link
                        href={crumb.href}
                        className="text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 truncate transition-colors"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </span>
                ))}
              </nav>
            </div>

            {/* Right: "Lihat Website" button */}
            <Link href="/" target="_blank" rel="noreferrer">
              <Button
                id="btn-view-website"
                variant="outline"
                size="sm"
                className="flex items-center gap-1.5 text-xs border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-900 dark:text-emerald-400 dark:hover:bg-emerald-950"
              >
                <ExternalLink size={13} />
                <span className="hidden sm:inline">Lihat Website</span>
              </Button>
            </Link>
          </header>

          <main className="flex-grow p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
