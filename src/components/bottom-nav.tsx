"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, Info, GalleryHorizontal, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '#', label: 'Home', icon: Home, id: 'home' },
  { href: '#info', label: 'Info', icon: Info, id: 'info' },
  { href: '#gallery', label: 'Gallery', icon: GalleryHorizontal, id: 'gallery' },
  { href: '#contact', label: 'Contact', icon: Mail, id: 'contact' },
];

export function BottomNav() {
  const [activeItem, setActiveItem] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id)).filter(Boolean);
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        if (section && section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
          const correspondingNavItem = navItems.find(item => item.id === section.id);
          if (correspondingNavItem) {
            setActiveItem(correspondingNavItem.label);
          }
          break;
        }
      }
    };
    
    // Set 'Home' as active on initial load if at top
    if (window.scrollY < 100) {
        setActiveItem('Home');
    } else {
        handleScroll();
    }


    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed bottom-0 left-0 right-0 h-16 bg-background/90 backdrop-blur-sm border-t z-50 md:hidden">
      <nav className="flex justify-around items-center h-full max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const isActive = activeItem === item.label;
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setActiveItem(item.label)}
              className={cn(
                'flex flex-col items-center justify-center gap-1 w-16 h-16 rounded-lg text-muted-foreground hover:text-accent focus:text-accent focus:bg-accent/10 transition-all duration-200 outline-none',
                isActive ? 'text-accent' : 'text-foreground/60'
              )}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <item.icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[11px] font-semibold tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
