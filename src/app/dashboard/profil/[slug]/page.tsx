'use client'
import DashboardLayout from '@/app/dashboard/layout';
import ProfilDesa from '@/components/pages/dashboard/ProfilDesa';
import { notFound } from 'next/navigation';

const pageComponents: { [key: string]: React.ComponentType } = {
  'profil-desa': ProfilDesa,
  'sejarah-desa': ProfilDesa,
  'perkembangan': ProfilDesa,
  'visi-misi': ProfilDesa,
  'arah-kebijakan': ProfilDesa,
  'struktur-pemerintah': ProfilDesa,
};


export default function DashboardProfilPage({ params }: { params: { slug: string } }) {
    const PageComponent = pageComponents[params.slug];

    if (!PageComponent) {
        notFound();
    }
    
  return (
    <DashboardLayout>
      <PageComponent />
    </DashboardLayout>
  );
}
