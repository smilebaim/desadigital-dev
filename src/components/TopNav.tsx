'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Bell, 
  Search, 
  Menu, 
  FileText,
  ScrollText,
  HeartHandshake,
  MessageSquareWarning,
  BookOpen,
  Scale,
  Building2,
  HandshakeIcon,
  Store,
  Users,
  Activity,
  Apple,
  Calendar,
  ListTodo,
  Library,
  FileSpreadsheet,
  LayoutDashboard
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from '@/contexts/AuthContext';
import type { Menu as MenuType, MenuItem } from '@/lib/menu-data';
import { getMenuDetails } from '@/lib/menu-actions';
import * as LucideIcons from "lucide-react";

type IconName = keyof typeof LucideIcons;

interface TopNavProps {
  className?: string;
  hasNewNews?: boolean;
}

const menuItems = [
  {
    title: "Layanan",
    items: [
      { title: "Persuratan", path: "/layanan/persuratan", icon: "ScrollText" },
      { title: "Perlindungan Sosial", path: "/layanan/perlindungan-sosial", icon: "HeartHandshake" },
      { title: "Penanganan Keluhan", path: "/layanan/penanganan-keluhan", icon: "MessageSquareWarning" },
      { title: "Monografi Desa", path: "/layanan/monografi-desa", icon: "BookOpen" },
      { title: "Peraturan Desa", path: "/layanan/peraturan-desa", icon: "Scale" }
    ]
  }
];

const IconComponent = ({ name }: { name: IconName }) => {
  const Icon = LucideIcons[name];
  return Icon ? <Icon className="h-4 w-4 text-black" /> : null;
};

const TopNav: React.FC<TopNavProps> = ({ className, hasNewNews = false }) => {
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const [layananItems, setLayananItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNavItems = async () => {
      setLoading(true);
      const topNavMenu = await getMenuDetails(1); // TopNav has ID 1
      if (topNavMenu) {
        const layananParent = topNavMenu.items.find(item => item.title === "Layanan");
        if (layananParent) {
          const items = topNavMenu.items.filter(item => item.parentId === layananParent.id);
          setLayananItems(items);
        }
      }
      setLoading(false);
    };
    fetchNavItems();
  }, []);

  const SidebarLayanan = () => {
    const isLayananRoute = pathname.startsWith('/layanan');
    if (!isLayananRoute) return null;

    const SideIcon = ({ name }: { name: string | null }) => {
      if (!name || !(name in LucideIcons)) return null;
      const Icon = LucideIcons[name as IconName];
      return <Icon className="h-4 w-4 md:h-5 md:w-5 md:mr-3 text-white" />;
    }

    return (
      <div className="fixed left-0 md:top-16 top-1/2 -translate-y-1/2 md:translate-y-0 h-auto md:h-[calc(100vh-9rem)] md:w-72 w-12 bg-emerald-800/90 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 border-r border-emerald-900 z-40 transition-all duration-300 rounded-r-[2rem] md:rounded-none md:rounded-br-[4rem]">
        <ScrollArea className="h-full max-h-[70vh] md:max-h-none md:px-4 px-1 py-8">
          <div className="space-y-2 md:pb-16">
            <h3 className="font-semibold text-lg mb-6 text-emerald-50 border-b border-emerald-100/20 pb-3 hidden md:block">
              Menu Layanan
            </h3>
            <div className="space-y-4">
              <TooltipProvider delayDuration={100}>
                {layananItems.map((item, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`w-full justify-center md:justify-start text-emerald-50 hover:text-emerald-50 hover:bg-emerald-700/50 transition-all py-3 md:py-2.5 px-1 md:px-3 text-sm ${
                          pathname === item.path ? 'bg-emerald-700/70' : ''
                        }`}
                        asChild
                      >
                        <Link href={item.path}>
                          <SideIcon name={item.icon} />
                          <span className="hidden md:inline">{item.title}</span>
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={16} className="md:hidden bg-emerald-800/90 text-emerald-50 border-emerald-700">
                      <p>{item.title}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
          </div>
        </ScrollArea>
      </div>
    );
  };

  return (
    <>
      <nav className={cn('fixed top-0 left-0 right-0 z-50 bg-white/40 border-b border-black/10 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 transition-all', className)}>
        <div className="container mx-auto px-4 flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
          <div className="flex items-center gap-1 -ml-1 sm:-ml-2">
            <Image src="/logo-desa.png" alt="Logo Desa" className="h-8 w-8 sm:h-10 sm:w-10 object-contain transition-all duration-300" width={40} height={40} />
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
                <Search className="h-8 w-8 sm:h-10 sm:w-10" />
              </Link>
            </Button>
            <Sheet open={isMainMenuOpen} onOpenChange={setIsMainMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-black hover:text-black hover:bg-black/10 hover:backdrop-blur-sm hover:backdrop-saturate-150 transition-all h-10 w-10 sm:h-12 sm:w-12"
                >
                  <Menu className="h-8 w-8 sm:h-10 sm:w-10" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[70vw] sm:w-[336px] bg-white/40 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 border-r border-black/10 rounded-r-[2rem] top-14 sm:top-20 h-[calc(100vh-7rem)] sm:h-[calc(100vh-10rem)] transition-all duration-300">
                <SheetTitle className="sr-only">Main Menu</SheetTitle>
                <SheetDescription className="sr-only">Menu utama untuk mengakses berbagai layanan dan informasi desa</SheetDescription>
                <ScrollArea className="h-full">
                  <div className="space-y-3 sm:space-y-4 py-6 sm:py-8">
                    <Accordion type="single" collapsible defaultValue="Layanan" className="w-full">
                      <AccordionItem value="Layanan" className="border-black/10">
                        <AccordionTrigger className="px-2 sm:px-3 text-black hover:text-black hover:no-underline border-b border-black/10 pb-2 transition-all hover:bg-black/10">
                          <span className="font-poppins font-semibold text-sm sm:text-base">Layanan</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-1">
                            {layananItems.map((item, itemIndex) => (
                              <Button
                                key={itemIndex}
                                variant="ghost"
                                className="w-full justify-start text-black hover:text-black hover:bg-black/10 transition-all py-1 sm:py-1.5 px-4 sm:px-6 text-xs sm:text-sm"
                                asChild
                              >
                                <Link href={item.path} className="flex items-center gap-2" onClick={() => setIsMainMenuOpen(false)}>
                                  {item.icon && <IconComponent name={item.icon as IconName} />}
                                  {item.title}
                                </Link>
                              </Button>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  <div className="flex gap-2 px-2 sm:px-3 mb-4">
                    <Button 
                      asChild
                      variant="ghost" 
                      className="flex-1 justify-start text-black hover:text-black hover:bg-black/10 transition-all text-xs sm:text-sm"
                    >
                      <Link href="/info" className="flex items-center" onClick={() => setIsMainMenuOpen(false)}>
                        <Bell className="h-7 w-7 sm:h-9 sm:w-9 mr-2" />
                        <span>Notifikasi</span>
                        {hasNewNews && (
                          <span className="ml-2 h-1.5 w-1.5 sm:h-2 sm:w-2 bg-red-500 rounded-full" />
                        )}
                      </Link>
                    </Button>
                    <Button 
                      asChild
                      variant="ghost" 
                      className="flex-1 justify-start text-black hover:text-black hover:bg-black/10 transition-all text-xs sm:text-sm"
                    >
                      {isAuthenticated ? (
                        <Link href="/dashboard" className="flex items-center" onClick={() => setIsMainMenuOpen(false)}>
                          <LayoutDashboard className="h-7 w-7 sm:h-9 sm:w-9 mr-2" />
                          <span>Dashboard</span>
                        </Link>
                      ) : (
                        <Link href="/login" className="flex items-center" onClick={() => setIsMainMenuOpen(false)}>
                          <User className="h-7 w-7 sm:h-9 sm:w-9 mr-2" />
                          <span>Masuk</span>
                        </Link>
                      )}
                    </Button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 border-t border-black/10">
                    <p className="text-[10px] sm:text-xs text-black/40 italic font-bold">
                      Penafian : Data dan informasi yang di sajikan dalam Laman ini bersifat indikatif dan tidak di maksudkan untuk penyebarluasan informasi. Lebih lanjut hubungi pemerintah desa dan walidata terkait untuk validasi
                    </p>
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
      <SidebarLayanan />
    </>
  );
};

export default TopNav;
