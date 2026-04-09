import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Globe, Shield, Zap, Sparkles, Building2, ChevronRight, Menu } from "lucide-react";
import Image from "next/image";

export default function SaaSPage() {
  return (
    <div className="min-h-screen bg-[#020817] text-slate-50 selection:bg-blue-500/30 overflow-x-hidden">
      {/* Background Orbits & Gradients */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#020817] to-[#020817]"></div>
      
      {/* Animated glowing orbs for Glassmorphism base */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse-slow object-cover pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-emerald-600/10 blur-[100px] animate-pulse-slow object-cover pointer-events-none"></div>
      
      <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent blur-sm"></div>

      {/* Navbar w/ Backdrop Blur */}
      <nav className="border-b border-slate-800/40 bg-[#020817]/60 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-gradient-to-tr from-blue-600 to-blue-400 p-1.5 rounded-xl shadow-lg shadow-blue-500/20">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Desa<span className="text-blue-500">Hub</span></span>
          </div>
          
          <div className="hidden md:flex gap-4 items-center">
             <Link href="/login">
               <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800/50">Masuk</Button>
             </Link>
             <Link href="/developer">
               <Button className="bg-blue-600 hover:bg-blue-500 text-white border border-blue-500/50 shadow-[0_0_20px_-5px_rgba(37,99,235,0.5)] transition-all rounded-full px-6">
                  <Sparkles className="w-4 h-4 mr-2" /> Kelola Tenant
               </Button>
             </Link>
          </div>

          <div className="md:hidden flex items-center gap-4">
             <Link href="/login">
               <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">Masuk</Button>
             </Link>
             {/* Note: In a real app we would use a Sheet component here for mobile menu, but for now we keep it simple */}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-24 text-center">
        {/* Badge Hero */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-8 animate-fade-in backdrop-blur-sm shadow-inner transition-transform hover:scale-105 cursor-default">
          <Sparkles className="h-4 w-4" />
          <span className="font-medium tracking-wide">Platform Multi-Tenant Desa Digital</span>
        </div>
        
        {/* Main Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-8xl font-extrabold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-slate-500 animate-fade-up">
           Satu Platform,<br />
           <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
             Ribuan Desa Terhubung.
           </span>
        </h1>
        
        {/* Sub headline */}
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-up" style={{ animationDelay: '0.1s' }}>
          Instansiasi ruang digital paripurna untuk desa Anda secara otomatis. Dilengkapi keamanan berlapis, isolasi data mandiri, serta kerangka modern tangguh siap pakai.
        </p>
        
        {/* Call To Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <Link href="/developer" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto bg-white text-slate-950 hover:bg-slate-200 font-semibold px-8 h-12 md:h-14 md:text-lg rounded-full shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all hover:scale-105 active:scale-95">
              Mulai Instansiasi Desa <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/demo" className="w-full sm:w-auto hidden">
             {/* Optional secondary button for future */}
             <Button size="lg" variant="outline" className="w-full sm:w-auto border-slate-700 bg-slate-900/50 hover:bg-slate-800 backdrop-blur-sm h-12 md:h-14 font-semibold rounded-full px-8">
               Lihat Demo
             </Button>
          </Link>
        </div>

        {/* Features Glassmorphism Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 text-left max-w-6xl mx-auto animate-fade-up" style={{ animationDelay: '0.4s' }}>
          
          <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-3xl p-8 hover:bg-slate-800/60 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300 group">
            <div className="bg-gradient-to-br from-blue-500/20 to-transparent w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-transform border border-blue-500/10">
              <Zap className="h-7 w-7 text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-white">Instant Provisioning</h3>
            <p className="text-slate-400 leading-relaxed font-medium">Bawa desa Anda mengudara secara langsung tanpa tunggu. Subdomain diproses otomatis bersama dengan *database*.</p>
          </div>
          
          <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-3xl p-8 hover:bg-slate-800/60 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-900/20 transition-all duration-300 group">
            <div className="bg-gradient-to-br from-emerald-500/20 to-transparent w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-transform border border-emerald-500/10">
              <Shield className="h-7 w-7 text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-white">Data Isolation</h3>
            <p className="text-slate-400 leading-relaxed font-medium">Arsitektur proteksi Firebase Rules yang ketat. Menggunakan model "Satu Tenant Satu Bilik" untuk jaminan keutuhan privasi warga.</p>
          </div>

          <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-3xl p-8 hover:bg-slate-800/60 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-300 group">
             <div className="bg-gradient-to-br from-purple-500/20 to-transparent w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-transform border border-purple-500/10">
              <Building2 className="h-7 w-7 text-purple-400 drop-shadow-[0_0_10px_rgba(192,132,252,0.5)]" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-white">Custom Branding</h3>
            <p className="text-slate-400 leading-relaxed font-medium">Masing-masing instansi desa dapat merias palet warna, logo, dan profil pemerintahan agar mencerminkan ciri khas lokal.</p>
          </div>

        </div>
      </main>
    </div>
  );
}
