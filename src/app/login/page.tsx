'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth, useFirestore } from '@/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { setAuthCookie } from '@/lib/auth-cookies';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Shield, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';

// ── Helper: baca subdomain dari window.location ─────────────────────────────
const getActiveSubdomain = (): string | null => {
  if (typeof window === 'undefined') return null;
  const hostname = window.location.hostname.split(':')[0].toLowerCase();
  const parts = hostname.split('.');
  const excluded = ['www', 'localhost', '127', 'developer'];
  const sub = parts[0];
  // Hanya anggap subdomain jika bukan domain utama / excluded
  if (excluded.includes(sub) || parts.length === 1) return null;
  return sub;
};

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const auth = useAuth();
  const db = useFirestore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ── Ambil profil user dari Firestore ──────────────────────────────────
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      let userTenantId: string | null = null;
      let userRole: string = 'staff';

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        userTenantId = userData.tenantId || null;
        userRole = userData.role || 'staff';
      }

      const isSuperadmin = userRole === 'superadmin';
      const activeSubdomain = getActiveSubdomain();

      // ── Tenant-Scoped Validation ──────────────────────────────────────────
      if (activeSubdomain && !isSuperadmin) {
        // User login di subdomain tenant
        if (userTenantId && userTenantId !== activeSubdomain) {
          // Akun terdaftar di desa lain — tolak & sign out
          await signOut(auth);
          toast({
            title: 'Akses Ditolak',
            description: `Akun Anda terdaftar di desa "${userTenantId}", bukan di desa ini ("${activeSubdomain}"). Hubungi admin desa Anda.`,
            variant: 'destructive',
          });
          setIsLoading(false);
          return;
        }
        if (!userTenantId) {
          // Akun platform-level mencoba masuk ke tenant subdomain
          await signOut(auth);
          toast({
            title: 'Akses Ditolak',
            description: 'Akun Anda bukan bagian dari desa di subdomain ini. Hubungi administrator platform.',
            variant: 'destructive',
          });
          setIsLoading(false);
          return;
        }
      }

      // ── Simpan / update profil user (upsert) ─────────────────────────────
      await setDoc(userDocRef, {
        displayName: user.displayName || user.email?.split('@')[0],
        email: user.email,
        photoURL: user.photoURL || '',
      }, { merge: true });

      await setAuthCookie(user.uid);

      toast({
        title: 'Login Berhasil! 🎉',
        description: isSuperadmin
          ? 'Selamat datang, Superadmin!'
          : `Selamat datang kembali di ${activeSubdomain ? `Desa ${activeSubdomain}` : 'platform'}!`,
      });

      // ── Redirect ──────────────────────────────────────────────────────────
      // Superadmin dari domain developer → /developer
      // Superadmin dari tenant subdomain → /dashboard (review mode)
      // Admin/Staff biasa → /dashboard
      let callbackUrl = searchParams?.get('callbackUrl');
      if (!callbackUrl) {
        callbackUrl = isSuperadmin && !activeSubdomain ? '/developer' : '/dashboard';
      }
      
      // Gunakan router.replace untuk auth redirect agar tidak bisa back ke login
      router.replace(callbackUrl);

    } catch (error: any) {
      const code = error?.code || '';
      let desc = 'Terjadi kesalahan. Coba lagi.';
      if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        desc = 'Email atau password salah. Periksa kembali dan coba lagi.';
      } else if (code === 'auth/too-many-requests') {
        desc = 'Terlalu banyak percobaan login. Tunggu beberapa saat sebelum mencoba lagi.';
      } else if (code === 'auth/user-disabled') {
        desc = 'Akun ini dinonaktifkan. Hubungi administrator.';
      }
      toast({
        title: 'Login Gagal',
        description: desc,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-900/20 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo & header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-2xl shadow-emerald-500/40 mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Portal Desa</h1>
          <p className="text-emerald-400/80 text-sm mt-1">
            {getActiveSubdomain()
              ? `Masuk ke Desa ${getActiveSubdomain()}`
              : 'Sistem Informasi Desa'}
          </p>
        </div>

        {/* Card */}
        <div className="backdrop-blur-xl bg-white/[0.05] border border-white/10 rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="login-email" className="text-sm font-medium text-emerald-200/80">
                Alamat Email
              </Label>
              <Input
                id="login-email"
                type="email"
                placeholder="email@contoh.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-emerald-400 focus:ring-emerald-400/20 focus:bg-white/15 transition-all"
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-password" className="text-sm font-medium text-emerald-200/80">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-emerald-400 focus:ring-emerald-400/20 focus:bg-white/15 pr-10 transition-all"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button
              id="btn-login-submit"
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold h-11 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-200 disabled:opacity-60"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Memverifikasi...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn size={18} />
                  Masuk
                </span>
              )}
            </Button>
          </form>

          {/* Hint */}
          <div className="mt-6 flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <AlertCircle size={15} className="text-amber-400 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-300/80 leading-relaxed">
              Jika Anda lupa password, hubungi administrator desa atau platform untuk melakukan reset akun.
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-white/20 mt-6">
          © {new Date().getFullYear()} DesaHub Platform · Multi-Tenant Gov System
        </p>
      </div>
    </div>
  );
};

const LoginPage = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
