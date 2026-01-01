'use client';
import dynamic from 'next/dynamic';
import PublicLayout from '@/layouts/PublicLayout';

const MapComponent = dynamic(
  () => import('@/components/MapComponent'),
  { 
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-gray-200 flex items-center justify-center"><p>Memuat Peta...</p></div>
  }
);

export default function TataRuangPage() {
    return (
        <PublicLayout>
            <MapComponent />
        </PublicLayout>
    )
}
