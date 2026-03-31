import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';
import Link from 'next/link';

interface HeroProps {
  className?: string;
  heroUrl?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroBadge?: string;
  heroButtonText?: string;
  heroButtonLink?: string;
  heroOverlayOpacity?: number;
  heroOverlayColor?: string;
  heroHeight?: string;
}

const Hero: React.FC<HeroProps> = ({
  className,
  heroUrl,
  heroTitle,
  heroSubtitle,
  heroDescription,
  heroBadge,
  heroButtonText,
  heroButtonLink,
  heroOverlayOpacity = 20,
  heroOverlayColor = '#000000',
  heroHeight = 'full',
}) => {
  const heightClass =
    heroHeight === 'three-quarter'
      ? 'h-[75vh] min-h-[500px]'
      : heroHeight === 'half'
      ? 'h-[50vh] min-h-[400px]'
      : 'h-screen min-h-[600px]';

  // Convert hex to rgb for rgba overlay
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '0, 0, 0';
  };

  const overlayStyle = {
    backgroundColor: `rgba(${hexToRgb(heroOverlayColor || '#000000')}, ${(heroOverlayOpacity ?? 20) / 100})`,
  };

  return (
    <section className={cn(`relative ${heightClass} flex items-center overflow-hidden`, className)}>
      <div className="absolute inset-0 -z-10">
        <img
          src={heroUrl || '/Background utama.png'}
          alt="Desa Remau Bako Tuo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={overlayStyle}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-10 py-16 relative z-10 max-w-4xl">
        <div className="max-w-3xl mx-auto text-center">
          {heroBadge && (
            <FadeIn delay={100}>
              <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold tracking-widest uppercase backdrop-blur-sm">
                {heroBadge}
              </span>
            </FadeIn>
          )}

          <FadeIn delay={200}>
            <h1 className="text-sm sm:text-base lg:text-lg font-poppins font-semibold tracking-widest text-emerald-400 uppercase mb-3">
              {heroTitle || 'SELAMAT DATANG DI LAMAN INFORMASI'}
            </h1>
          </FadeIn>

          <FadeIn delay={300}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-poppins font-bold tracking-tight text-white leading-[1.1] mb-6">
              {heroSubtitle || 'DESA REMAU BAKO TUO'}
            </h1>
            <p className="text-sm sm:text-base md:text-lg font-poppins text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              {heroDescription ||
                'Laman ini merupakan pengembangan Sistem Informasi Desa untuk menampilkan layanan publik dan meningkatkan peran masyarakat dalam mendukung program pembangunan desa yang lebih partisipatif dan berkelanjutan'}
            </p>
          </FadeIn>

          {heroButtonText && heroButtonLink && (
            <FadeIn delay={400}>
              <Link
                href={heroButtonLink}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-emerald-900/30 hover:shadow-emerald-800/40 hover:scale-105"
              >
                {heroButtonText}
              </Link>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
