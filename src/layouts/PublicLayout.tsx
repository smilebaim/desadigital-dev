'use client';
import { usePathname } from 'next/navigation';
import TopNav from '@/components/TopNav';
import BottomNav from '@/components/BottomNav';

const PublicLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  if (isHomePage) {
    return (
      <div className="relative min-h-screen">
        <header className="fixed top-0 left-0 right-0 z-50">
          <TopNav hasNewNews={false} />
        </header>
        
        <main className="relative z-0">
           {children}
        </main>

        <footer className="fixed bottom-0 left-0 right-0 z-40">
          <BottomNav />
        </footer>
      </div>
    );
  }
  
  const isTataRuangRoute = pathname === '/tata-ruang';
  
  if (isTataRuangRoute) {
    return (
      <>
        <div className="fixed inset-0 z-0">
          {children}
        </div>
        <header className="fixed top-0 left-0 right-0 z-[1001]">
          <TopNav hasNewNews={false} />
        </header>
        <footer className="fixed bottom-0 left-0 right-0 z-[1001]">
          <BottomNav />
        </footer>
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50">
        <TopNav hasNewNews={false} />
      </header>
      
      <div className="flex flex-1 pt-14 sm:pt-16">
        {/* Sidebar Slot for Desktop */}
        <div className="hidden md:block w-72 flex-shrink-0">
          {/* This area is reserved for the absolutely positioned sidebars from TopNav and BottomNav */}
        </div>

        <main className="flex-1 overflow-y-auto">
           {children}
        </main>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 z-40">
        <BottomNav />
      </footer>
    </div>
  );
};

export default PublicLayout;
