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
  Settings, 
  Server,
  Globe,
  LayoutDashboard,
  ExternalLink,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
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
import { useState, useEffect } from "react";

// ─── Nav Item ─────────────────────────────────────────────────────────────────
const NavItem = ({ href, icon: Icon, label, active }: { href: string; icon: any; label: string; active: boolean }) => (
  <Link
    href={href}
    className={`flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-lg transition-all duration-150 ${
      active
        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20 shadow-sm font-medium'
        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
    }`}
  >
    <Icon size={16} className={active ? 'text-blue-400' : 'text-slate-500'} />
    <span>{label}</span>
    {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400" />}
  </Link>
);

// ─── Layout ───────────────────────────────────────────────────────────────────
const DeveloperLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const db = useFirestore();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<string>('Developer');

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
            setUserRole(role === 'superadmin' ? 'Super Admin' : 'Developer');
          } else {
            toast({
              title: "Akses Ditolak",
              description: "Anda tidak memiliki hak akses ke Developer Mode.",
              variant: "destructive",
            });
            router.push('/dashboard');
          }
        } else {
          router.push('/dashboard');
        }
      } catch (e) {
        console.error('Role check error:', e);
        router.push('/dashboard');
      }
    };
    checkRole();
  }, [user, isUserLoading, db, router, toast]);

  const handleLogout = async () => {
    await removeAuthCookie();
    await signOut(auth);
    toast({ title: "Berhasil Keluar", description: "Sesi Anda telah diakhiri." });
    router.push('/');
  };

  // Loading / Authorization state
  if (isAuthorized === null) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-10 h-10 border-2 border-slate-700 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-slate-400 text-sm">Memverifikasi otorisasi...</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-950 text-slate-100">

        {/* ── Sidebar ── */}
        <Sidebar className="bg-slate-950 border-r border-slate-800/70 shadow-xl text-slate-100">
          <SidebarHeader className="p-4 border-b border-slate-800/70">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-blue-600/20 rounded-lg border border-blue-500/20">
                <Server className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <span className="font-bold text-white text-sm tracking-wide">Developer Mode</span>
                <p className="text-[10px] text-slate-500">DesaHub Platform</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="py-4">
            <nav className="space-y-1 px-3">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-600 px-2 mb-2">Management</p>
              <NavItem
                href="/developer"
                icon={Globe}
                label="Daftar Desa (Tenants)"
                active={pathname === '/developer'}
              />
              <NavItem
                href="/developer/users"
                icon={Users}
                label="Manajemen User"
                active={pathname === '/developer/users'}
              />
              <NavItem
                href="/developer/settings"
                icon={Settings}
                label="Sistem Global"
                active={pathname === '/developer/settings'}
              />
            </nav>
          </SidebarContent>

          <SidebarFooter className="p-3 border-t border-slate-800/70">
            {isClient && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-800/60 p-2 rounded-lg transition-colors">
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 to-blue-800 text-white text-xs font-bold">
                        {user?.email?.charAt(0).toUpperCase() ?? 'SA'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-semibold text-white truncate">{user?.email}</span>
                      <span className="text-[10px] text-blue-400 font-medium">{userRole}</span>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" side="top" className="w-56 bg-slate-900 text-slate-100 border-slate-800 shadow-2xl mb-2">
                  <DropdownMenuLabel className="text-slate-400 text-xs">Akun Administrator</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-800" />
                  <DropdownMenuItem asChild className="hover:bg-slate-800 focus:bg-slate-800 gap-2 cursor-pointer">
                    <Link href="/dashboard">
                      <LayoutDashboard className="h-4 w-4 text-slate-400" />
                      Dashboard Reguler
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-slate-800 focus:bg-slate-800 gap-2 cursor-pointer">
                    <a href="/" target="_blank">
                      <ExternalLink className="h-4 w-4 text-slate-400" />
                      Lihat Main Site
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-800" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-400 hover:bg-red-950/30 hover:text-red-300 focus:bg-red-950/30 focus:text-red-300 gap-2 cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    Keluar Sistem
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </SidebarFooter>
        </Sidebar>

        {/* ── Main Content ── */}
        <div className="flex flex-col flex-grow overflow-auto">
          <header className="bg-slate-950/80 backdrop-blur border-b border-slate-800/70 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg p-1.5 transition-colors" />
              <div className="h-4 w-px bg-slate-800" />
              <div className="text-sm text-slate-400 flex items-center gap-1.5">
                <span className="text-slate-600">Developer Mode</span>
                <ChevronRight size={13} className="text-slate-700" />
                <span className="text-white font-medium">
                  {pathname === '/developer/settings'
                    ? 'Sistem Global'
                    : pathname === '/developer/users'
                    ? 'Manajemen User'
                    : 'Dashboard Tenant'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/" target="_blank">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-800 gap-1.5 text-xs">
                  <ExternalLink size={13} />
                  Main Site
                </Button>
              </Link>
            </div>
          </header>

          <main className="flex-grow p-6 text-slate-100">
            {children}
          </main>

          <footer className="px-6 py-3 border-t border-slate-800/70 text-center text-[10px] text-slate-700">
            DesaHub Platform — Developer Console · Semua perubahan disinkronisasi ke Firestore secara real-time
          </footer>
        </div>

      </div>
    </SidebarProvider>
  );
};

export default DeveloperLayout;
