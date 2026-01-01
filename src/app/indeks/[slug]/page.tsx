'use client';
import { notFound } from 'next/navigation';
import KetahananEkonomi from '@/components/pages/indeks/KetahananEkonomi';
import KetahananLingkungan from '@/components/pages/indeks/KetahananLingkungan';
import KetahananSosial from '@/components/pages/indeks/KetahananSosial';
import PublicLayout from '@/layouts/PublicLayout';

const pageComponents: { [key: string]: React.ComponentType } = {
  'ketahanan-ekonomi': KetahananEkonomi,
  'ketahanan-lingkungan': KetahananLingkungan,
  'ketahanan-sosial': KetahananSosial,
};

export default function IndeksPage({ params }: { params: { slug: string } }) {
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
