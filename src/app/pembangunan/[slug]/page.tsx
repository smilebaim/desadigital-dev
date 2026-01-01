'use client';
import { notFound } from 'next/navigation';
import DaftarProgram from '@/components/pages/pembangunan/DaftarProgram';
import RKPDes from '@/components/pages/pembangunan/RKPDes';
import RPJMDes from '@/components/pages/pembangunan/RPJMDes';
import PublicLayout from '@/layouts/PublicLayout';

const pageComponents: { [key: string]: React.ComponentType } = {
  'daftar-program': DaftarProgram,
  'rkpdes': RKPDes,
  'rpjmdes': RPJMDes,
};

export default function PembangunanPage({ params }: { params: { slug: string } }) {
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
