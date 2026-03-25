import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';

interface HeroProps {
  className?: string;
  heroUrl?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
}

const Hero: React.FC<HeroProps> = ({ className, heroUrl, heroTitle, heroSubtitle, heroDescription }) => {
  return (
    <section className={cn('relative h-screen min-h-[600px] flex items-center overflow-hidden', className)}>
      <div className="absolute inset-0 -z-10">
        <img 
          src={heroUrl || "/Background utama.png"}
          alt="Desa Remau Bako Tuo" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-10 py-16 relative z-10 max-w-4xl">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn delay={200}>
            <h1 className="text-sm sm:text-base lg:text-lg font-poppins font-semibold tracking-widest text-emerald-400 uppercase mb-3">
              {heroTitle || 'SELAMAT DATANG DI LAMAN INFORMASI'}
            </h1>
          </FadeIn>
          
          <FadeIn delay={300}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-poppins font-bold tracking-tight text-white leading-[1.1] mb-6">
              {heroSubtitle || 'DESA REMAU BAKO TUO'}
            </h1>
            <p className="text-sm sm:text-base md:text-lg font-poppins text-white/80 mb-2 max-w-2xl mx-auto leading-relaxed">
              {heroDescription || 'Laman ini merupakan pengembangan Sistem Informasi Desa untuk menampilkan layanan publik dan meningkatkan peran masyarakat dalam mendukung program pembangunan desa yang lebih partisipatif dan berkelanjutan'}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Hero;
