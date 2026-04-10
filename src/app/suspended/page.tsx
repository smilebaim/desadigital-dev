import Link from 'next/link';
import { ShieldX, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Akses Ditangguhkan | DesaHub',
  description: 'Akses ke website desa ini sedang ditangguhkan sementara.',
};

export default function SuspendedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-red-950/20 to-slate-900 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6 text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 shadow-2xl shadow-red-500/20 mb-6">
          <ShieldX className="w-10 h-10 text-red-400" />
        </div>

        {/* Text */}
        <h1 className="text-2xl font-bold text-white mb-3">
          Akses Ditangguhkan
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed mb-2">
          Website desa ini sementara tidak dapat diakses karena akses telah ditangguhkan oleh administrator platform.
        </p>
        <p className="text-slate-500 text-xs leading-relaxed mb-8">
          Jika Anda adalah admin desa dan merasa ini adalah kesalahan, silakan hubungi tim DesaHub untuk informasi lebih lanjut.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            asChild
            className="bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/30"
          >
            <a href="mailto:support@desahub.id" className="flex items-center gap-2">
              <Mail size={16} />
              Hubungi Support
            </a>
          </Button>
          <Button variant="ghost" asChild className="text-slate-400 hover:text-white hover:bg-slate-800">
            <Link href="/">
              Kembali ke Beranda
            </Link>
          </Button>
        </div>

        <p className="text-center text-xs text-white/20 mt-10">
          © {new Date().getFullYear()} DesaHub Platform
        </p>
      </div>
    </div>
  );
}
