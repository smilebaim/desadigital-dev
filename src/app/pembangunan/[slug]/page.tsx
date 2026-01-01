'use client';
import { notFound } from 'next/navigation';
import PublicLayout from '@/layouts/PublicLayout';
import DynamicPage from '@/components/pages/DynamicPage';

const validSlugs = ['daftar-program', 'rkpdes', 'rpjmdes'];

export default function PembangunanPage({ params }: { params: { slug: string } }) {
  if (!validSlugs.includes(params.slug)) {
    notFound();
  }

  return (
    <PublicLayout>
      <DynamicPage pageSlug={params.slug} category="pembangunan" />
    </PublicLayout>
  );
}
