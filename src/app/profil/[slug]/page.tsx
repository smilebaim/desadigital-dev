'use client';
import { notFound } from 'next/navigation';
import ArahKebijakan from '@/components/pages/profil/ArahKebijakan';
import Perkembangan from '@/components/pages/profil/Perkembangan';
import ProfilDesa from '@/components/pages/profil/ProfilDesa';
import SejarahDesa from '@/components/pages/profil/SejarahDesa';
import StrukturPemerintah from '@/components/pages/profil/StrukturPemerintah';
import VisiMisi from '@/components/pages/profil/VisiMisi';
import PublicLayout from '@/layouts/PublicLayout';

const pageComponents: { [key: string]: React.ComponentType } = {
  'arah-kebijakan': ArahKebijakan,
  'perkembangan': Perkembangan,
  'profil-desa': ProfilDesa,
  'sejarah-desa': SejarahDesa,
  'struktur-pemerintah': StrukturPemerintah,
  'visi-misi': VisiMisi,
};

export default function ProfilPage({ params }: { params: { slug: string } }) {
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
