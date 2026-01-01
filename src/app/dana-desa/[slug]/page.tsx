'use client';
import { notFound } from 'next/navigation';
import PublicLayout from '@/layouts/PublicLayout';
import DynamicPage from '@/components/pages/DynamicPage';

const validSlugs = ['belanja', 'pendapatan', 'pembiayaan'];

export default function DanaDesaPage({ params }: { params: { slug: string } }) {
  if (!validSlugs.includes(params.slug)) {
    notFound();
  }

  return (
    <PublicLayout>
      <DynamicPage pageSlug={params.slug} category="dana-desa" />
    </PublicLayout>
  );
}
