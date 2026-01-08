"use client";
import { usePathname } from 'next/navigation';
import TopNav from '@/components/TopNav';
import BottomNav from '@/components/BottomNav';

const PublicLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const pathname = usePathname();
  const isProfileRoute = pathname.startsWith('/profil');
  const isPembangunanRoute = pathname.startsWith('/pembangunan');
  const isDanaDesaRoute = pathname.startsWith('/dana-desa');
  const isIndeksRoute = pathname.startsWith('/indeks');
  const isLayananRoute = pathname.startsWith('/layanan');
  const isEkonomiRoute = pathname.startsWith('/ekonomi');
  const isKelembagaanRoute = pathname.startsWith('/kelembagaan');
  const isAktivitasRoute = pathname.startsWith('/aktivitas');
  const isPustakaRoute = pathname.startsWith('/pustaka');

  const needsSidebar = isProfileRoute || isPembangunanRoute || isDanaDesaRoute || 
    isIndeksRoute || isLayananRoute || isEkonomiRoute || isKelembagaanRoute || 
    isAktivitasRoute || isPustakaRoute;

  return (
    <div className="flex flex-col min-h-screen">
      <TopNav hasNewNews={false} />
      <main className={`flex-grow ${needsSidebar ? 'md:pl-72 pl-12' : ''}`}>
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

export default PublicLayout;
