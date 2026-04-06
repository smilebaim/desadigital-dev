import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Globe, Shield, Zap, Sparkles, Building2, ChevronRight } from "lucide-react";

export default function SaaSPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-blue-500/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950"></div>
      <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent blur-sm"></div>

      <nav className="border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Desa<span className="text-blue-500">Hub</span></span>
          </div>
          <div className="flex gap-4">
             <Link href="/login">
               <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">Masuk</Button>
             </Link>
             <Link href="/developer">
               <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_-5px_rgba(37,99,235,0.5)] transition-all">
                  Kelola Tenant
               </Button>
             </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 pt-32 pb-24 text-center">
        {/* Hero Section */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-8 animate-fade-in">
          <Sparkles className="h-4 w-4" />
          <span>Platform Multi-Tenant Desa Digital</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
          Satu Platform,<br />Ribuan Desa Terhubung.
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          Instansiasi otomatis ruang digital lengkap untuk setiap desa. Dilengkapi dengan subdomain mandiri, keamanan isolasi data, dan arsitektur modern Next.js Edge.
        </p>
        
        <div className="flex items-center justify-center gap-4 mb-24">
          <Link href="/developer">
            <Button size="lg" className="bg-white text-slate-950 hover:bg-slate-100 font-semibold px-8 h-12 shadow-xl shadow-white/5 transition-all">
              Mulai Instansiasi Desa <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:bg-slate-800/50 transition-colors group">
            <div className="bg-blue-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Instant Provisioning</h3>
            <p className="text-slate-400 leading-relaxed">Desa baru online dalam hitungan detik. Subdomain otomatis terbuat dan langsung aktif ke platform digital.</p>
          </div>
          
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:bg-slate-800/50 transition-colors group">
            <div className="bg-emerald-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Shield className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Data Isolation</h3>
            <p className="text-slate-400 leading-relaxed">Batas tegas antar tenant dengan keamanan Firebase Firestore Rules, menjaga data desa tetap independen.</p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:bg-slate-800/50 transition-colors group">
             <div className="bg-purple-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Building2 className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Custom Branding</h3>
            <p className="text-slate-400 leading-relaxed">Setiap instance desa memiliki konfigurasi tema, warna, dan logo unik tanpa mengubah struktur kode sumber.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
