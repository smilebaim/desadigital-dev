'use client';
import { notFound } from 'next/navigation';
import PublicLayout from '@/layouts/PublicLayout';
import DynamicPage from '@/components/pages/DynamicPage';

const validSlugs = ['ketahanan-ekonomi', 'ketahanan-lingkungan', 'ketahanan-sosial'];

export default function IndeksPage({ params }: { params: { slug: string } }) {
  if (!validSlugs.includes(params.slug)) {
    notFound();
  }

  return (
    <PublicLayout>
      <DynamicPage pageSlug={params.slug} category="indeks" />
    </PublicLayout>
  );
}
