import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <section className={cn('relative min-h-screen flex items-center overflow-hidden', className)}>
      <div className="absolute inset-0 -z-10">
        <img 
          src="/lovable-uploads/a0278ce1-b82d-4ed6-a186-14a9503ef65c.png" 
          alt="Desa Remau Bako Tuo" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-10 py-16 sm:py-20 md:py-32 relative z-10 max-w-4xl">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn delay={200}>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-poppins font-medium tracking-tight text-white leading-tight mb-2">
              SELAMAT DATANG DI LAMAN INFORMASI
            </h1>
          </FadeIn>
          
          <FadeIn delay={200}>
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-poppins font-medium tracking-tight text-white leading-tight mb-4 sm:mb-6">
              DESA REMAU BAKO TUO
            </h1>
            <p className="text-xs sm:text-sm md:text-base font-poppins text-white/90 mb-2 max-w-2xl mx-auto">
              Laman ini merupakan pengembangan Sistem Informasi Desa untuk menampilkan layanan publik dan meningkatkan peran masyarakat dalam mendukung program pembangunan desa yang lebih partisipatif dan berkelanjutan
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Hero;
