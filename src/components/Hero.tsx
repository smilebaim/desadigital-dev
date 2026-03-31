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
  heroBadgeColor?: string;
  heroTitleColor?: string;
  heroSubtitleColor?: string;
  heroDescriptionColor?: string;
  heroOverlayOpacity?: number;
  heroOverlayColor?: string;
  heroHeight?: string;
  heroFontFamily?: string;
}

const Hero: React.FC<HeroProps> = ({
  className,
  heroUrl,
  heroTitle,
  heroSubtitle,
  heroDescription,
  heroBadge,
  heroBadgeColor = '#34d399',
  heroTitleColor = '#34d399',
  heroSubtitleColor = '#ffffff',
  heroDescriptionColor = '#ffffffcc',
  heroOverlayOpacity = 20,
  heroOverlayColor = '#000000',
  heroHeight = 'full',
  heroFontFamily = 'Poppins',
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

  const fontStyle = {
    fontFamily: heroFontFamily,
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
              <span 
                className="inline-block mb-4 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-xs font-semibold tracking-widest uppercase backdrop-blur-sm"
                style={{ ...fontStyle, color: heroBadgeColor, borderColor: `${heroBadgeColor}4d` }}
              >
                {heroBadge}
              </span>
            </FadeIn>
          )}

          <FadeIn delay={200}>
            <h1 
              className="text-sm sm:text-base lg:text-lg font-semibold tracking-widest uppercase mb-3"
              style={{ ...fontStyle, color: heroTitleColor }}
            >
              {heroTitle || 'SELAMAT DATANG DI LAMAN INFORMASI'}
            </h1>
          </FadeIn>

          <FadeIn delay={300}>
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
              style={{ ...fontStyle, color: heroSubtitleColor }}
            >
              {heroSubtitle || 'DESA REMAU BAKO TUO'}
            </h1>
            <p 
              className="text-sm sm:text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed"
              style={{ ...fontStyle, color: heroDescriptionColor }}
            >
              {heroDescription ||
                'Laman ini merupakan pengembangan Sistem Informasi Desa untuk menampilkan layanan publik dan meningkatkan peran masyarakat dalam mendukung program pembangunan desa yang lebih partisipatif dan berkelanjutan'}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Hero;
