'use client';
import dynamic from 'next/dynamic';
import TopNav from '@/components/TopNav';
import BottomNav from '@/components/BottomNav';

const MapComponentWithNoSSR = dynamic(
  () => import('@/components/pages/tata-ruang/MapComponent'), 
  {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center bg-gray-100">Memuat Peta...</div>
  }
);

export default function TataRuangPage() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[1000]">
        <TopNav hasNewNews={false} />
      </div>
      <div className="fixed inset-0 pt-14 sm:pt-16 pb-14 sm:pb-16">
        <MapComponentWithNoSSR />
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-[1000]">
        <BottomNav />
      </div>
    </>
  );
}
