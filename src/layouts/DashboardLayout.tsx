
"use client";
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
  LayoutTemplate,
  Image as ImageIcon,
  File as FileIcon
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const handleLogout = () => {
    toast({
      title: "Logout",
      description: "Anda akan dialihkan ke halaman utama.",
    });
    logout();
    router.push('/');
  };

  const displayControlMenuItems = [
      { title: "Kontrol Hero", path: "/dashboard/display/hero", icon: ImageIcon },
      { title: "Kontrol Logo", path: "/dashboard/display/logo", icon: ImageIcon },
      { title: "Kontrol TopNav", path: "/dashboard/display/top-nav", icon: LayoutTemplate },
      { title: "Kontrol BottomNav", path: "/dashboard/display/bottom-nav", icon: LayoutTemplate }
  ];

  return (
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
            <div className="space-y-1 px-2 py-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white">
                  <Globe size={18} className="text-white" />
                  <span>Kontrol Web</span>
                </div>
                <div className="space-y-1 pl-4">
                   <Link
                      href="/dashboard/pages"
                      className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white"
                    >
                      <FileIcon size={16} className="text-white" />
                      <span>Kontrol Halaman</span>
                    </Link>
                </div>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="display-control" className="border-none">
                  <AccordionTrigger className="px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors">
                      <div className="flex items-center gap-2">
                        <LayoutTemplate size={18} className="text-white" />
                        <span className="text-white">Kontrol Tampilan</span>
                      </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-1 pl-4">
                      {displayControlMenuItems.map((item, itemIndex) => (
                        <Link
                          key={itemIndex}
                          href={item.path}
                          className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white"
                        >
                          <item.icon size={16} className="text-white" />
                          <span>{item.title}</span>
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="apps" className="border-none">
                  <AccordionTrigger className="px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors">
                    <div className="flex items-center gap-2">
                      <AppWindow size={18} className="text-white" />
                      <span className="text-white">Aplikasi Desa</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-1 pl-4">
                      <Link href="/dashboard/apps/surat-masuk" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                        <FileText size={16} className="text-white" />
                        <span>Surat Masuk</span>
                      </Link>
                      <Link href="/dashboard/apps/surat-keluar" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                        <FileText size={16} className="text-white" />
                        <span>Surat Keluar</span>
                      </Link>
                      <Link href="/dashboard/apps/surat-keterangan" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                        <FileText size={16} className="text-white" />
                        <span>Surat Keterangan</span>
                      </Link>
                      <Link href="/dashboard/apps/surat-pengantar" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                        <FileText size={16} className="text-white" />
                        <span>Surat Pengantar</span>
                      </Link>
                      <Link href="/dashboard/apps/surat-nikah" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                        <FileText size={16} className="text-white" />
                        <span>Surat Nikah</span>
                      </Link>
                      <Link href="/dashboard/apps/surat-domisili" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                        <FileText size={16} className="text-white" />
                        <span>Surat Domisili</span>
                      </Link>
                      <Link href="/dashboard/apps/surat-usaha" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                        <FileText size={16} className="text-white" />
                        <span>Surat Usaha</span>
                      </Link>
                      <Link href="/dashboard/apps/surat-kematian" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                        <FileText size={16} className="text-white" />
                        <span>Surat Kematian</span>
                      </Link>
                      <Link href="/dashboard/apps/surat-kelahiran" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                        <FileText size={16} className="text-white" />
                        <span>Surat Kelahiran</span>
                      </Link>
                      <Link href="/dashboard/apps/surat-pindah" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                        <FileText size={16} className="text-white" />
                        <span>Surat Pindah</span>
                      </Link>
                    </div>
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
                    <div className="space-y-1 pl-4">
                      <Link href="/dashboard/settings/users" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                        <Users size={16} className="text-white" />
                        <span>Pengguna</span>
                      </Link>
                      <Link href="/dashboard/settings/backup" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                        <FileText size={16} className="text-white" />
                        <span>Backup Data</span>
                      </Link>
                      <Link href="/dashboard/settings/activity-log" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                        <Activity size={16} className="text-white" />
                        <span>Log Aktivitas</span>
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
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
  );
};

export default DashboardLayout;
