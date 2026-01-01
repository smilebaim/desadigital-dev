'use client';
import { notFound } from 'next/navigation';
import Agenda from '@/components/pages/informasi/Agenda';
import KalenderKegiatan from '@/components/pages/informasi/KalenderKegiatan';
import KalenderPangan from '@/components/pages/informasi/KalenderPangan';
import PublicLayout from '@/layouts/PublicLayout';

const pageComponents: { [key: string]: React.ComponentType } = {
  'agenda': Agenda,
  'kalender-kegiatan': KalenderKegiatan,
  'kalender-pangan': KalenderPangan,
};

export default function AktivitasPage({ params }: { params: { slug: string } }) {
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
