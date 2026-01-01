'use client';
import { notFound } from 'next/navigation';
import PublicLayout from '@/layouts/PublicLayout';
import DynamicPage from '@/components/pages/DynamicPage';

const validSlugs = [
  'monografi-desa',
  'penanganan-keluhan',
  'peraturan-desa',
  'perlindungan-sosial',
  'persuratan',
  'posyandu',
  'mpg',
];

export default function LayananPage({ params }: { params: { slug: string } }) {
  if (!validSlugs.includes(params.slug)) {
    notFound();
  }

  return (
    <PublicLayout>
      <DynamicPage pageSlug={params.slug} category="layanan" />
    </PublicLayout>
  );
}
