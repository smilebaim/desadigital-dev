'use client';
import { notFound } from 'next/navigation';
import Publikasi from '@/components/pages/informasi/Publikasi';
import PustakaDesa from '@/components/pages/informasi/PustakaDesa';
import PublicLayout from '@/layouts/PublicLayout';

const pageComponents: { [key: string]: React.ComponentType } = {
  'publikasi': Publikasi,
  'pustaka-desa': PustakaDesa,
};

export default function PustakaPage({ params }: { params: { slug: string } }) {
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
