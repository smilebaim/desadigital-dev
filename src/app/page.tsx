'use client';
import React, { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import PublicLayout from '@/layouts/PublicLayout';
import { getSiteSettings } from '@/lib/site-settings-actions';

const LandingPage = () => {
  const [heroUrl, setHeroUrl] = useState('/Background utama.png');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      const settings = await getSiteSettings();
      if (settings?.heroUrl) {
        setHeroUrl(settings.heroUrl);
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  return (
    <PublicLayout>
      <main className="relative">
        {loading ? (
          <div className="h-screen w-full flex items-center justify-center bg-gray-200">
            Memuat...
          </div>
        ) : (
          <Hero heroImageUrl={heroUrl} />
        )}
      </main>
    </PublicLayout>
  );
};

export default LandingPage;
