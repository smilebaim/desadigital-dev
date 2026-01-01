'use client';
import { notFound } from 'next/navigation';
import LKMD from '@/components/pages/kelembagaan/LKMD';
import PKK from '@/components/pages/kelembagaan/PKK';
import PublicLayout from '@/layouts/PublicLayout';

const pageComponents: { [key: string]: React.ComponentType } = {
  'lkmd': LKMD,
  'pkk': PKK,
};

export default function KelembagaanPage({ params }: { params: { slug: string } }) {
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
