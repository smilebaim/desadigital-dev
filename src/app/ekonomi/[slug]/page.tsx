'use client';
import { notFound } from 'next/navigation';
import BUMDes from '@/components/pages/ekonomi/BUMDes';
import Koperasi from '@/components/pages/ekonomi/Koperasi';
import UMKM from '@/components/pages/ekonomi/UMKM';
import PublicLayout from '@/layouts/PublicLayout';

const pageComponents: { [key: string]: React.ComponentType } = {
  'bumdes': BUMDes,
  'koperasi': Koperasi,
  'umkm': UMKM,
};

export default function EkonomiPage({ params }: { params: { slug: string } }) {
  const PageComponent = pageComponents[params.slug];

  if (!PageComponent) {
    notFound();
  }

  return (
    <PublicLayout>
      <PageComponent />
    </PublicLayout>
  );
}
