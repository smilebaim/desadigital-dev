'use client';
import React from 'react';
import Hero from '@/components/Hero';
import PublicLayout from '@/layouts/PublicLayout';

const LandingPage = () => {
  return (
    <PublicLayout>
      <main className="relative">
        <Hero />
      </main>
    </PublicLayout>
  );
};

export default LandingPage;
