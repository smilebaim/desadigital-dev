'use client';
import { notFound } from 'next/navigation';
import Belanja from '@/components/pages/dana-desa/Belanja';
import Pendapatan from '@/components/pages/dana-desa/Pendapatan';
import Pembiayaan from '@/components/pages/dana-desa/Pembiayaan';
import PublicLayout from '@/layouts/PublicLayout';

const pageComponents: { [key: string]: React.ComponentType } = {
  'belanja': Belanja,
  'pendapatan': Pendapatan,
  'pembiayaan': Pembiayaan,
};

export default function DanaDesaPage({ params }: { params: { slug: string } }) {
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
