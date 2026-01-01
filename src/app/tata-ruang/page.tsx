'use client';
import dynamic from 'next/dynamic';

const MapComponentWithNoSSR = dynamic(
  () => import('@/components/pages/tata-ruang/MapComponent'),
  { 
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-gray-200 flex items-center justify-center"><p>Memuat Peta...</p></div>
  }
);

export default function TataRuangPage() {
    return (
        <MapComponentWithNoSSR />
    )
}
