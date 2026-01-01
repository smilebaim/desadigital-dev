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
  ChevronDown,
  Palette,
  Wallet
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
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useTheme } from "next-themes";
import { webControlMenuItems } from "@/lib/menu-data";


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
                                    href={`/dashboard/konten/${category.basePath}/${item.slug}`}
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

                <Link href="/dashboard/map-control" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white">
                  <Map size={18} className="text-white" />
                  <span>Kontrol Peta</span>
                </Link>

                {/* Other menu items can be added here */}
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
