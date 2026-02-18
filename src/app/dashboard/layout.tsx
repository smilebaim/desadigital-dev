
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
  Calendar
} from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
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


const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const handleLogout = async () => {
    toast({
      title: "Logout",
      description: "Anda akan dialihkan ke halaman utama.",
    });
    await signOut(auth);
    router.push('/');
  };

  return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gray-50/50">
          <Sidebar className="bg-emerald-900 shadow-sm">
            <SidebarHeader className="flex items-center gap-2 p-4">
              <div className="flex items-center gap-2">
                <Image src="/logo-desa.png" alt="Logo Desa" className="h-8 w-8" width={32} height={32} />
                <span className="font-semibold text-emerald-100">Dashboard</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <nav className="space-y-1 px-2 py-4">
                 <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-800 transition-colors text-emerald-100">
                  <Home size={18} className="text-emerald-100" />
                  <span>Beranda</span>
                </Link>

                <Link href="/dashboard/penduduk" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-800 transition-colors text-emerald-100">
                  <Users size={18} className="text-emerald-100" />
                  <span>Data Penduduk</span>
                </Link>
                
                <Link href="/dashboard/workspaces" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-800 transition-colors text-emerald-100">
                  <Briefcase size={18} className="text-emerald-100" />
                  <span>Workspaces</span>
                </Link>

                <Link href="/dashboard/info" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-800 transition-colors text-emerald-100">
                    <Newspaper size={18} className="text-emerald-100" />
                    <span>Info & Berita</span>
                </Link>

                 <Link href="/dashboard/kegiatan" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-800 transition-colors text-emerald-100">
                    <Calendar size={18} className="text-emerald-100" />
                    <span>Agenda Kegiatan</span>
                </Link>

                <Link href="/dashboard/map-control" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-800 transition-colors text-emerald-100">
                    <Map size={18} className="text-emerald-100" />
                    <span>Kontrol Peta</span>
                </Link>

                {isClient && (
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="halaman" className="border-none">
                      <AccordionTrigger className="px-3 py-2 text-sm rounded-md hover:bg-emerald-800 transition-colors text-emerald-100">
                        <div className="flex items-center gap-2">
                          <FileSpreadsheet size={18} className="text-emerald-100" />
                          <span className="text-emerald-100">Kelola Halaman</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-1 pl-4">
                           <li><Link href="/dashboard/statistik" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-800 transition-colors text-emerald-100">
                              <BarChart3 size={16} className="text-emerald-100" />
                              <span>Statistik & Visualisasi</span>
                           </Link></li>
                          <li><Link href="/dashboard/pages" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-800 transition-colors text-emerald-100">
                            <ListTodo size={16} className="text-emerald-100" />
                            <span>Daftar Halaman</span>
                          </Link></li>
                          <li><Link href="/dashboard/halaman-utama" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-800 transition-colors text-emerald-100">
                            <LayoutGrid size={16} className="text-emerald-100" />
                            <span>Halaman Utama</span>
                          </Link></li>
                          <li><Link href="/dashboard/menu" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-800 transition-colors text-emerald-100">
                              <ListTodo size={16} className="text-emerald-100" />
                              <span>Kelola Menu</span>
                          </Link></li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="apps" className="border-none">
                      <AccordionTrigger className="px-3 py-2 text-sm rounded-md hover:bg-emerald-800 transition-colors text-emerald-100">
                        <div className="flex items-center gap-2">
                          <AppWindow size={18} className="text-emerald-100" />
                          <span className="text-emerald-100">Aplikasi Desa</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                         <ul className="space-y-1 pl-4">
                           <li><Link href="/dashboard/apps/surat-masuk" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-800 transition-colors text-emerald-100"><Mail size={16} className="text-emerald-100" /><span>Surat Masuk</span></Link></li>
                           <li><Link href="/dashboard/apps/surat-keluar" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-800 transition-colors text-emerald-100"><Send size={16} className="text-emerald-100" /><span>Surat Keluar</span></Link></li>
                           <li><Link href="/dashboard/apps/surat-domisili" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-800 transition-colors text-emerald-100"><HomeIcon size={16} className="text-emerald-100" /><span>Surat Domisili</span></Link></li>
                           <li><Link href="/dashboard/apps/surat-usaha" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-800 transition-colors text-emerald-100"><Briefcase size={16} className="text-emerald-100" /><span>Surat Usaha</span></Link></li>
                           <li><Link href="/dashboard/apps/surat-kelahiran" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-800 transition-colors text-emerald-100"><Baby size={16} className="text-emerald-100" /><span>Surat Kelahiran</span></Link></li>
                           <li><Link href="/dashboard/apps/surat-kematian" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-800 transition-colors text-emerald-100"><Skull size={16} className="text-emerald-100" /><span>Surat Kematian</span></Link></li>
                           <li><Link href="/dashboard/apps/surat-pindah" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-800 transition-colors text-emerald-100"><ArrowRightLeft size={16} className="text-emerald-100" /><span>Surat Pindah</span></Link></li>
                           <li><Link href="/dashboard/apps/surat-nikah" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-800 transition-colors text-emerald-100"><HeartPulse size={16} className="text-emerald-100" /><span>Surat Nikah</span></Link></li>
                           <li><Link href="/dashboard/apps/surat-pengantar" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-800 transition-colors text-emerald-100"><BookUser size={16} className="text-emerald-100" /><span>Surat Pengantar</span></Link></li>
                           <li><Link href="/dashboard/apps/surat-keterangan" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-800 transition-colors text-emerald-100"><FileBadge size={16} className="text-emerald-100" /><span>Surat Keterangan</span></Link></li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </nav>
            </SidebarContent>
            <SidebarFooter className="p-4">
              {isClient && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-3 cursor-pointer hover:bg-emerald-800 p-2 rounded-md transition-colors">
                      <Avatar>
                        <AvatarFallback className="bg-emerald-100 text-emerald-900">
                          {user?.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-emerald-100">Admin</span>
                      <ChevronDown size={16} className="ml-auto text-emerald-100" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="text-black">Akun Saya</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/profil" className="text-black">
                        <User className="mr-2 h-4 w-4 text-black" />
                        <span>Profil</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/pengaturan" className="text-black">
                        <Settings className="mr-2 h-4 w-4 text-black" />
                        <span>Pengaturan</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Keluar</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </SidebarFooter>
          </Sidebar>

          <div className="flex flex-col flex-grow overflow-auto">
            <header className="bg-white p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center">
                <SidebarTrigger className="mr-2" />
                <h1 className="text-xl font-semibold text-black">Dashboard</h1>
              </div>
              <div className="flex items-center gap-2">
                <Link href="/">
                  <Button variant="outline" className="flex items-center gap-1 border-gray-200 text-black hover:bg-emerald-100/10">
                    <span>Lihat Website</span>
                    <ChevronRight size={16} />
                  </Button>
                </Link>
              </div>
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
