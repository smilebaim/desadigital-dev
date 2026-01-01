'use client';
import dynamic from 'next/dynamic';
import TopNav from '@/components/TopNav';
import BottomNav from '@/components/BottomNav';

const MapComponentWithNoSSR = dynamic(
  () => import('@/components/pages/tata-ruang/MapComponent'),
  { 
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-gray-200 flex items-center justify-center"><p>Memuat Peta...</p></div>
  }
);

export default function TataRuangPage() {
    return (
      <>
        <div className="fixed top-0 left-0 right-0 z-[1001]">
          <TopNav hasNewNews={false} />
        </div>
        <div className="fixed inset-0 z-[1000]">
          <MapComponentWithNoSSR />
        </div>
        <div className="fixed bottom-0 left-0 right-0 z-[1001]">
          <BottomNav />
        </div>
      </>
    )
}
