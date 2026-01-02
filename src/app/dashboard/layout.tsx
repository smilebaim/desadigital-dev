
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
  Globe, 
  Map, 
  AppWindow, 
  Settings2,
  Home,
  History,
  Target,
  Compass,
  Building2,
  FileText,
  ListTodo,
  HeartHandshake,
  MessageSquareWarning,
  BookOpen,
  Scale,
  HandshakeIcon,
  Store,
  Users,
  Activity,
  Apple,
  Calendar,
  Library,
  FileSpreadsheet,
  ScrollText,
  ChevronDown,
  Palette,
  Newspaper,
  LayoutGrid,
  Briefcase
} from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useTheme } from "next-themes";
import Image from "next/image";


const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const { setTheme } = useTheme();
  
  const handleLogout = () => {
    toast({
      title: "Logout",
      description: "Anda akan dialihkan ke halaman utama.",
    });
    logout();
    router.push('/');
  };

  const webControlMenuItems: any[] = [];

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gray-50/50">
          <Sidebar className="bg-black shadow-sm">
            <SidebarHeader className="flex items-center gap-2 p-4">
              <div className="flex items-center gap-2">
                <Image src="/logo-desa.png" alt="Logo Desa" className="h-8 w-8" width={32} height={32} />
                <span className="font-semibold text-white">Dashboard</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <nav className="space-y-1 px-2 py-4">
                 <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                  <Home size={18} className="text-white" />
                  <span>Beranda</span>
                </Link>
                
                <Link href="/dashboard/workspaces" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                  <Briefcase size={18} className="text-white" />
                  <span>Workspaces</span>
                </Link>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="halaman" className="border-none">
                    <AccordionTrigger className="px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors">
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet size={18} className="text-white" />
                        <span className="text-white">Kelola Halaman</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-1 pl-4">
                        <li><Link href="/dashboard/pages" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                          <ListTodo size={16} className="text-white" />
                          <span>Daftar Halaman</span>
                        </Link></li>
                        <li><Link href="/dashboard/halaman-utama" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                          <LayoutGrid size={16} className="text-white" />
                          <span>Halaman Utama</span>
                        </Link></li>
                        <li><Link href="/dashboard/menu" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                            <ListTodo size={16} className="text-white" />
                            <span>Kelola Menu</span>
                        </Link></li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <Link href="/dashboard/info" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                  <Newspaper size={18} className="text-white" />
                  <span>Info & Berita</span>
                </Link>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="apps" className="border-none">
                    <AccordionTrigger className="px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors">
                      <div className="flex items-center gap-2">
                        <AppWindow size={18} className="text-white" />
                        <span className="text-white">Aplikasi Desa</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-1 pl-4">
                        <li><Link href="/dashboard/apps/surat-masuk" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                          <FileText size={16} className="text-white" />
                          <span>Surat Masuk</span>
                        </Link></li>
                        <li><Link href="/dashboard/apps/surat-keluar" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                          <FileText size={16} className="text-white" />
                          <span>Surat Keluar</span>
                        </Link></li>
                        <li><Link href="/dashboard/apps/surat-keterangan" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                          <FileText size={16} className="text-white" />
                          <span>Surat Keterangan</span>
                        </Link></li>
                        <li><Link href="/dashboard/apps/surat-pengantar" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                          <FileText size={16} className="text-white" />
                          <span>Surat Pengantar</span>
                        </Link></li>
                        <li><Link href="/dashboard/apps/surat-nikah" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                          <FileText size={16} className="text-white" />
                          <span>Surat Nikah</span>
                        </Link></li>
                        <li><Link href="/dashboard/apps/surat-domisili" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                          <FileText size={16} className="text-white" />
                          <span>Surat Domisili</span>
                        </Link></li>
                        <li><Link href="/dashboard/apps/surat-usaha" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                          <FileText size={16} className="text-white" />
                          <span>Surat Usaha</span>
                        </Link></li>
                        <li><Link href="/dashboard/apps/surat-kematian" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                          <FileText size={16} className="text-white" />
                          <span>Surat Kematian</span>
                        </Link></li>
                        <li><Link href="/dashboard/apps/surat-kelahiran" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                          <FileText size={16} className="text-white" />
                          <span>Surat Kelahiran</span>
                        </Link></li>
                        <li><Link href="/dashboard/apps/surat-pindah" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                          <FileText size={16} className="text-white" />
                          <span>Surat Pindah</span>
                        </Link></li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </nav>
            </SidebarContent>
            <SidebarFooter className="p-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-3 cursor-pointer hover:bg-emerald-100/10 p-2 rounded-md transition-colors">
                    <Avatar>
                      <AvatarFallback className="bg-white text-black">
                        {user?.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-white">Admin</span>
                    <ChevronDown size={16} className="ml-auto text-white" />
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
    </ProtectedRoute>
  );
};

export default DashboardLayout;

    