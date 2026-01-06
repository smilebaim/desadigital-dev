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
  const isTataRuangRoute = pathname.startsWith('/tata-ruang');
  
  const needsSidebar = isProfileRoute || isPembangunanRoute || isDanaDesaRoute || 
    isIndeksRoute || isLayananRoute || isEkonomiRoute || isKelembagaanRoute || 
    isAktivitasRoute || isPustakaRoute;

  if (isTataRuangRoute) {
    return (
      <>
        <div className="fixed inset-0">
          {children}
        </div>
        <div className="fixed top-0 left-0 right-0 z-[1000]">
          <TopNav hasNewNews={false} />
        </div>
        <div className="fixed bottom-0 left-0 right-0 z-[1000]">
          <BottomNav />
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <TopNav hasNewNews={false} />
      <main className={`flex-grow pt-16 pb-20 ${needsSidebar ? 'md:pl-72 pl-12' : ''}`}>
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

export default PublicLayout;
