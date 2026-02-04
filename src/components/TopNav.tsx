
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Bell, 
  Search, 
  Menu as MenuIcon,
  ChevronDown,
  Loader
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useUser } from '@/firebase';
import type { Menu, MenuItem } from '@/lib/menu-data';
import * as Icons from 'lucide-react';

interface TopNavProps {
  className?: string;
  hasNewNews?: boolean;
  menu?: Menu;
  loading: boolean;
  logoUrl?: string;
}

const getIcon = (name?: string): React.FC<any> => {
    if (!name) return () => null;
    const IconComponent = (Icons as any)[name];
    return IconComponent || (() => null);
};


const TopNav: React.FC<TopNavProps> = ({ className, hasNewNews = false, menu, loading, logoUrl }) => {
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();
  const isAuthenticated = !!user;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const getSubItems = (parentId: string) => {
    return menu?.items?.filter(item => item.parentId === parentId) || [];
  }

  const renderMenuItems = (items: MenuItem[]) => {
      const parentItems = items.filter(item => !item.parentId);
      
      return parentItems.map(parentItem => {
          const subItems = getSubItems(parentItem.id);
          const ParentIcon = getIcon(parentItem.icon);

          if (subItems.length === 0) {
              return (
                 <Button
                    key={parentItem.id}
                    variant="ghost"
                    className="w-full justify-start text-black hover:text-black hover:bg-black/10 transition-all text-sm"
                    asChild
                  >
                    <Link href={parentItem.path} className="flex items-center gap-2" onClick={() => setIsMainMenuOpen(false)}>
                        <ParentIcon className="h-4 w-4 text-black" />
                        {parentItem.title}
                    </Link>
                </Button>
              )
          }

          return (
              <AccordionItem key={parentItem.id} value={parentItem.id} className="border-black/10">
                  <AccordionTrigger className="px-2 sm:px-3 text-black hover:text-black hover:no-underline border-b border-black/10 pb-2 transition-all hover:bg-black/10">
                      <span className="font-poppins font-semibold text-sm sm:text-base flex items-center gap-2">
                        <ParentIcon className="h-4 w-4 text-black" />
                        {parentItem.title}
                      </span>
                  </AccordionTrigger>
                  <AccordionContent>
                      <div className="space-y-1">
                          {subItems.map((subItem) => {
                              const SubItemIcon = getIcon(subItem.icon);
                              return (
                                  <Button
                                      key={subItem.id}
                                      variant="ghost"
                                      className="w-full justify-start text-black hover:text-black hover:bg-black/10 transition-all py-1 sm:py-1.5 px-4 sm:px-6 text-xs sm:text-sm"
                                      asChild
                                  >
                                      <Link href={subItem.path} className="flex items-center gap-2" onClick={() => setIsMainMenuOpen(false)}>
                                          <SubItemIcon className="h-4 w-4 text-black" />
                                          {subItem.title}
                                      </Link>
                                  </Button>
                              )
                          })}
                      </div>
                  </AccordionContent>
              </AccordionItem>
          )
      });
  }

  return (
    <>
      <nav className={cn('fixed top-0 left-0 right-0 z-50 bg-white/40 border-b border-black/10 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 transition-all', className)}>
        <div className="container mx-auto px-4 flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
          <div className="flex items-center gap-1 -ml-1 sm:-ml-2">
            <img src={logoUrl || "/logo-desa.png"} alt="Logo Desa" className="h-8 w-8 sm:h-10 sm:w-10 object-contain transition-all duration-300" />
            <div className="ml-1">
              <Link href="/" className="text-base sm:text-xl font-poppins font-medium tracking-tight text-black hover:text-black transition-all">
                Desa Remau Bako Tuo
              </Link>
              <div className="text-xs sm:text-sm font-poppins text-black/80">
                Kabupaten Tanjung Jabung Timur
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <Button 
              asChild
              variant="ghost" 
              size="icon"
              className="text-black hover:text-black hover:bg-black/10 hover:backdrop-blur-sm hover:backdrop-saturate-150 transition-all h-10 w-10 sm:h-12 sm:w-12"
            >
              <Link href="/search">
                <Search className="h-5 w-5 sm:h-6 sm:w-6" />
              </Link>
            </Button>
            {isClient && (
              <Sheet open={isMainMenuOpen} onOpenChange={setIsMainMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-black hover:text-black hover:bg-black/10 hover:backdrop-blur-sm hover:backdrop-saturate-150 transition-all h-10 w-10 sm:h-12 sm:w-12"
                  >
                    <MenuIcon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[70vw] sm:w-[336px] bg-white/40 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 border-r border-black/10 rounded-r-[2rem] top-14 sm:top-20 h-[calc(100vh-7rem)] sm:h-[calc(100vh-10rem)] transition-all duration-300">
                  <SheetTitle className="sr-only">Main Menu</SheetTitle>
                  <SheetDescription className="sr-only">Menu utama untuk mengakses berbagai layanan dan informasi desa</SheetDescription>
                  <ScrollArea className="h-full">
                    <div className="space-y-3 sm:space-y-4 py-6 sm:py-8">
                      {loading ? (
                          <div className="flex justify-center items-center h-full">
                              <Loader className="animate-spin" />
                          </div>
                      ) : menu?.items ? (
                          <Accordion type="single" collapsible className="w-full">
                             {renderMenuItems(menu.items)}
                          </Accordion>
                      ) : (
                          <p className="text-center text-muted-foreground">Menu tidak tersedia.</p>
                      )}
                    </div>
                    <div className="flex gap-2 px-2 sm:px-3 mb-4">
                      <Button 
                        asChild
                        variant="ghost" 
                        className="flex-1 justify-start text-black hover:text-black hover:bg-black/10 transition-all text-xs sm:text-sm"
                      >
                        <Link href="/berita" className="flex items-center" onClick={() => setIsMainMenuOpen(false)}>
                          <Bell className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                          <span>Notifikasi</span>
                          {hasNewNews && (
                            <span className="ml-2 h-1.5 w-1.5 sm:h-2 sm:w-2 bg-red-500 rounded-full" />
                          )}
                        </Link>
                      </Button>
                      {isAuthenticated ? (
                        <Button
                          asChild
                          variant="ghost"
                          className="flex-1 justify-start text-black hover:text-black hover:bg-black/10 transition-all text-xs sm:text-sm"
                        >
                          <Link href="/dashboard" className="flex items-center" onClick={() => setIsMainMenuOpen(false)}>
                            <User className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                            <span>Dashboard</span>
                          </Link>
                        </Button>
                      ) : (
                        <Button
                          asChild
                          variant="ghost"
                          className="flex-1 justify-start text-black hover:text-black hover:bg-black/10 transition-all text-xs sm:text-sm"
                        >
                          <Link href="/login" className="flex items-center" onClick={() => setIsMainMenuOpen(false)}>
                            <User className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                            <span>Masuk</span>
                          </Link>
                        </Button>
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 border-t border-black/10">
                      <p className="text-[10px] sm:text-xs text-black/40 italic font-bold">
                        Penafian : Data dan informasi yang di sajikan dalam Laman ini bersifat indikatif dan tidak di maksudkan untuk penyebarluasan informasi. Lebih lanjut hubungi pemerintah desa dan walidata terkait untuk validasi
                      </p>
                    </div>
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default TopNav;
