'use client';
import { notFound } from 'next/navigation';
import MonografiDesa from '@/components/pages/layanan/MonografiDesa';
import PenangananKeluhan from '@/components/pages/layanan/PenangananKeluhan';
import PeraturanDesa from '@/components/pages/layanan/PeraturanDesa';
import PerlindunganSosial from '@/components/pages/layanan/PerlindunganSosial';
import Persuratan from '@/components/pages/layanan/Persuratan';
import Posyandu from '@/components/pages/kesehatan/Posyandu';
import MPG from '@/components/pages/kesehatan/MPG';
import PublicLayout from '@/layouts/PublicLayout';

const pageComponents: { [key: string]: React.ComponentType } = {
  'monografi-desa': MonografiDesa,
  'penanganan-keluhan': PenangananKeluhan,
  'peraturan-desa': PeraturanDesa,
  'perlindungan-sosial': PerlindunganSosial,
  'persuratan': Persuratan,
  'posyandu': Posyandu,
  'mpg': MPG,
};

export default function LayananPage({ params }: { params: { slug: string } }) {
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
