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
  Palette
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

  const webControlMenuItems = [
    {
      title: "Profil Desa",
      items: [
        { title: "Profil Desa", path: "/dashboard/profil/profil-desa", icon: Home },
        { title: "Sejarah Desa", path: "/dashboard/profil/sejarah-desa", icon: History },
        { title: "Perkembangan", path: "/dashboard/profil/perkembangan", icon: ChevronRight },
        { title: "Visi dan Misi", path: "/dashboard/profil/visi-misi", icon: Target },
        { title: "Arah Kebijakan", path: "/dashboard/profil/arah-kebijakan", icon: Compass },
        { title: "Pemerintahan Desa", path: "/dashboard/profil/struktur-pemerintah", icon: Building2 },
      ]
    },
    {
      title: "Layanan",
      items: [
        { title: "Persuratan", path: "/dashboard/layanan/persuratan", icon: ScrollText },
        { title: "Perlindungan Sosial", path: "/dashboard/layanan/perlindungan-sosial", icon: HeartHandshake },
        { title: "Penanganan Keluhan", path: "/dashboard/layanan/penanganan-keluhan", icon: MessageSquareWarning },
        { title: "Monografi Desa", path: "/dashboard/layanan/monografi-desa", icon: BookOpen },
        { title: "Peraturan Desa", path: "/dashboard/layanan/peraturan-desa", icon: Scale }
      ]
    },
    {
      title: "Ekonomi",
      items: [
        { title: "BUMDes", path: "/dashboard/ekonomi/bumdes", icon: Building2 },
        { title: "Koperasi Merah Putih", path: "/dashboard/ekonomi/koperasi", icon: HandshakeIcon },
        { title: "UMKM", path: "/dashboard/ekonomi/umkm", icon: Store }
      ]
    },
    {
      title: "Kelembagaan",
      items: [
        { title: "LKMD", path: "/dashboard/kelembagaan/lkmd", icon: Users },
        { title: "PKK", path: "/dashboard/kelembagaan/pkk", icon: Users },
        { title: "Posyandu", path: "/dashboard/layanan/posyandu", icon: Activity },
        { title: "MPG", path: "/dashboard/layanan/mpg", icon: Activity }
      ]
    },
    {
      title: "Aktivitas",
      items: [
        { title: "Kalender Pangan", path: "/dashboard/aktivitas/kalender-pangan", icon: Apple },
        { title: "Kalender Kegiatan", path: "/dashboard/aktivitas/kalender-kegiatan", icon: Calendar },
        { title: "Agenda", path: "/dashboard/aktivitas/agenda", icon: ListTodo }
      ]
    },
    {
      title: "Literasi",
      items: [
        { title: "Pustaka Desa", path: "/dashboard/pustaka/pustaka-desa", icon: Library },
        { title: "Publikasi", path: "/dashboard/pustaka/publikasi", icon: FileSpreadsheet }
      ]
    }
  ];

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gray-50/50">
          <Sidebar className="bg-black shadow-sm">
            <SidebarHeader className="flex items-center gap-2 p-4">
              <div className="flex items-center gap-2">
                <img src="/lovable-uploads/logo-desa.png" alt="Logo Desa" className="h-8 w-8" />
                <span className="font-semibold text-white">Dashboard</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <nav className="space-y-1 px-2 py-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white">
                    <Globe size={18} className="text-white" />
                    <span>Kontrol Web</span>
                  </div>
                  <div className="space-y-1 pl-4">
                    <Accordion type="single" collapsible className="w-full">
                      {webControlMenuItems.map((category, index) => (
                        <AccordionItem key={index} value={`category-${index}`} className="border-none">
                          <AccordionTrigger className="px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors">
                            <span className="text-white">{category.title}</span>
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-1 pl-4">
                              {category.items.map((item, itemIndex) => (
                                <li key={itemIndex}>
                                  <Link
                                    href={item.path}
                                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white"
                                  >
                                    <item.icon size={16} className="text-white" />
                                    <span>{item.title}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>

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

                <Link href="/dashboard/map-control" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                  <Map size={18} className="text-white" />
                  <span>Kontrol Peta</span>
                </Link>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="settings" className="border-none">
                    <AccordionTrigger className="px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors">
                      <div className="flex items-center gap-2">
                        <Settings2 size={18} className="text-white" />
                        <span className="text-white">Pengaturan</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-1 pl-4">
                        <li><Link href="/dashboard/settings/users" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                          <Users size={16} className="text-white" />
                          <span>Pengguna</span>
                        </Link></li>
                        <li><Link href="/dashboard/settings/backup" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                          <FileText size={16} className="text-white" />
                          <span>Backup Data</span>
                        </Link></li>
                        <li><Link href="/dashboard/settings/activity-log" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                          <Activity size={16} className="text-white" />
                          <span>Log Aktivitas</span>
                        </Link></li>
                        <li>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                                <Palette size={16} className="text-white" />
                                <span>Tema</span>
                                <ChevronDown size={16} className="ml-auto" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="right" align="start">
                              <DropdownMenuItem onClick={() => setTheme("light")}>
                                Terang
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => setTheme("dark")}>
                                Gelap
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </li>
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
                  <DropdownMenuItem className="text-black">
                    <User className="mr-2 h-4 w-4 text-black" />
                    <span>Profil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-black">
                    <Settings className="mr-2 h-4 w-4 text-black" />
                    <span>Pengaturan</span>
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
