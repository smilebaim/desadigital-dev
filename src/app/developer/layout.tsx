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
  Server,
  Globe,
  Plus
} from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
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
import Image from "next/image";
import { useState, useEffect } from "react";

const DeveloperLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const db = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const checkRole = async () => {
      if (isUserLoading) return;
      if (!user) {
         router.push('/login?callbackUrl=/developer');
         return;
      }
      
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const role = userDoc.data()?.role;
          if (role === 'superadmin' || role === 'developer') {
            setIsAuthorized(true);
          } else {
             toast({
               title: "Akses Ditolak",
               description: "Anda bukan superadmin.",
               variant: "destructive"
             });
             router.push('/dashboard');
          }
        } else {
           router.push('/dashboard');
        }
      } catch(e) {
        console.error(e);
        router.push('/dashboard');
      }
    };
    checkRole();
  }, [user, isUserLoading, db, router, toast]);
  
  const handleLogout = async () => {
    toast({
      title: "Logout",
      description: "Anda akan dialihkan ke halaman utama.",
    });
    await removeAuthCookie();
    await signOut(auth);
    router.push('/');
  };

  if (isAuthorized === null) {
      return (
         <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-400">
             Memeriksa otorisasi keamanan...
         </div>
      );
  }

  return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-slate-900 text-slate-100">
          <Sidebar className="bg-slate-950 border-r border-slate-800 shadow-sm text-slate-100">
            <SidebarHeader className="flex items-center gap-2 p-4">
              <div className="flex items-center gap-2">
                <Server className="h-6 w-6 text-blue-400" />
                <span className="font-semibold text-white tracking-wider">SUPERADMIN</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <nav className="space-y-1 px-2 py-4">
                 <Link href="/developer" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-slate-800 transition-colors text-slate-300 hover:text-white">
                  <Globe size={18} />
                  <span>Daftar Desa (Tenants)</span>
                </Link>
                 <Link href="/developer/settings" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-slate-800 transition-colors text-slate-300 hover:text-white">
                  <Settings size={18} />
                  <span>Sistem Global</span>
                </Link>
              </nav>
            </SidebarContent>
            <SidebarFooter className="p-4">
              {isClient && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-800 p-2 rounded-md transition-colors">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-blue-600 text-white text-xs">
                          {user?.email?.charAt(0).toUpperCase() || 'SA'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white truncate max-w-[120px]">{user?.email}</span>
                        <span className="text-xs text-blue-400">Developer</span>
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-slate-900 text-slate-100 border-slate-800">
                    <DropdownMenuLabel>Akun Root</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-800" />
                    <DropdownMenuItem asChild className="hover:bg-slate-800 focus:bg-slate-800">
                      <Link href="/dashboard">
                        <ChevronRight className="mr-2 h-4 w-4" />
                        <span>Ke Dashboard Reguler</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-slate-800" />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-400 hover:bg-slate-800 hover:text-red-300 focus:bg-slate-800 focus:text-red-300">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Keluar Sistem</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </SidebarFooter>
          </Sidebar>

          <div className="flex flex-col flex-grow overflow-auto">
            <header className="bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center">
                <SidebarTrigger className="mr-2 text-slate-400 hover:text-white" />
                <h1 className="text-xl font-semibold text-white">Developer Mode</h1>
              </div>
              <div className="flex items-center gap-2">
                <Link href="/">
                  <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white">
                    Lihat Main Site
                  </Button>
                </Link>
              </div>
            </header>
            <main className="flex-grow p-6 text-slate-100">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
  );
};

export default DeveloperLayout;
