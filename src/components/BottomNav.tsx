"use client";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Home, Map, Building2, Wallet, User, FileText, ChevronDown, ChevronUp, Users, History, Target, Compass, ScrollText, HeartHandshake, MessageSquareWarning, BookOpen, Scale, HandshakeIcon, Store, Activity, Apple, Calendar, ListTodo, Library, FileSpreadsheet } from "lucide-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BottomNavProps {
  className?: string;
}

const BottomNav: React.FC<BottomNavProps> = ({ className }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPembangunanOpen, setIsPembangunanOpen] = useState(false);
  const [isDanaDesaOpen, setIsDanaDesaOpen] = useState(false);
  const [isIndeksOpen, setIsIndeksOpen] = useState(false);
  const pathname = usePathname();

  const profileMenuItems = [
    { title: "Profil Desa", path: "/profil/profil-desa", icon: Home },
    { title: "Sejarah Desa", path: "/profil/sejarah-desa", icon: History },
    { title: "Perkembangan", path: "/profil/perkembangan", icon: ChevronUp },
    { title: "Visi dan Misi", path: "/profil/visi-misi", icon: Target },
    { title: "Arah Kebijakan", path: "/profil/arah-kebijakan", icon: Compass },
    { title: "Pemerintahan Desa", path: "/profil/struktur-pemerintah", icon: Building2 },
  ];

  const pembangunanMenuItems = [
    { title: "RPJMDes", path: "/pembangunan/rpjmdes", icon: FileText },
    { title: "RKPDes", path: "/pembangunan/rkpdes", icon: FileText },
    { title: "Daftar Rencana Program", path: "/pembangunan/daftar-program", icon: ListTodo }
  ];

  const danaDesaMenuItems = [
    { title: "Pendapatan", path: "/dana-desa/pendapatan", icon: Building2 },
    { title: "Belanja", path: "/dana-desa/belanja", icon: Wallet },
    { title: "Pembiayaan", path: "/dana-desa/pembiayaan", icon: Building2 }
  ];

  const indeksMenuItems = [
    { title: "Indeks Ketahanan Sosial", path: "/indeks/ketahanan-sosial", icon: HeartHandshake },
    { title: "Indeks Ketahanan Ekonomi", path: "/indeks/ketahanan-ekonomi", icon: Building2 },
    { title: "Indeks Ketahanan Lingkungan", path: "/indeks/ketahanan-lingkungan", icon: Compass }
  ];

  const SidebarProfil = () => {
    const isProfilRoute = pathname.startsWith('/profil');
    
    if (!isProfilRoute) return null;

    return (
      <div className="fixed left-0 md:top-16 top-1/2 -translate-y-1/2 md:translate-y-0 h-auto md:h-[calc(100vh-9rem)] md:w-72 w-12 bg-emerald-800/90 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 border-r border-emerald-900 z-40 transition-all duration-300 rounded-r-[2rem] md:rounded-none md:rounded-br-[4rem]">
        <ScrollArea className="h-full max-h-[70vh] md:max-h-none md:px-4 px-1 py-8">
          <div className="space-y-2 md:pb-16">
            <h3 className="font-semibold text-lg mb-6 text-emerald-50 border-b border-emerald-100/20 pb-3 hidden md:block">
              Menu Profil Desa
            </h3>
            <div className="space-y-4">
              <TooltipProvider delayDuration={100}>
                {profileMenuItems.map((item, index) => (
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
                          <item.icon className="h-4 w-4 md:h-5 md:w-5 md:mr-3 text-white" />
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

  const SidebarPembangunan = () => {
    const isPembangunanRoute = pathname.startsWith('/pembangunan');
    
    if (!isPembangunanRoute) return null;

    return (
      <div className="fixed left-0 md:top-16 top-1/2 -translate-y-1/2 md:translate-y-0 h-auto md:h-[calc(100vh-9rem)] md:w-72 w-12 bg-emerald-800/90 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 border-r border-emerald-900 z-40 transition-all duration-300 rounded-r-[2rem] md:rounded-none md:rounded-br-[4rem]">
        <ScrollArea className="h-full max-h-[70vh] md:max-h-none md:px-4 px-1 py-8">
          <div className="space-y-2 md:pb-16">
            <h3 className="font-semibold text-lg mb-6 text-emerald-50 border-b border-emerald-100/20 pb-3 hidden md:block">
              Menu Pembangunan Desa
            </h3>
            <div className="space-y-4">
              <TooltipProvider delayDuration={100}>
                {pembangunanMenuItems.map((item, index) => (
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
                          <item.icon className="h-4 w-4 md:h-5 md:w-5 md:mr-3 text-white" />
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

  const SidebarDanaDesa = () => {
    const isDanaDesaRoute = pathname.startsWith('/dana-desa');
    
    if (!isDanaDesaRoute) return null;

    return (
      <div className="fixed left-0 md:top-16 top-1/2 -translate-y-1/2 md:translate-y-0 h-auto md:h-[calc(100vh-9rem)] md:w-72 w-12 bg-emerald-800/90 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 border-r border-emerald-900 z-40 transition-all duration-300 rounded-r-[2rem] md:rounded-none md:rounded-br-[4rem]">
        <ScrollArea className="h-full max-h-[70vh] md:max-h-none md:px-4 px-1 py-8">
          <div className="space-y-2 md:pb-16">
            <h3 className="font-semibold text-lg mb-6 text-emerald-50 border-b border-emerald-100/20 pb-3 hidden md:block">
              Menu Dana Desa
            </h3>
            <div className="space-y-4">
              <TooltipProvider delayDuration={100}>
                {danaDesaMenuItems.map((item, index) => (
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
                          <item.icon className="h-4 w-4 md:h-5 md:w-5 md:mr-3 text-white" />
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

  const SidebarIndeks = () => {
    const isIndeksRoute = pathname.startsWith('/indeks');
    
    if (!isIndeksRoute) return null;

    return (
      <div className="fixed left-0 md:top-16 top-1/2 -translate-y-1/2 md:translate-y-0 h-auto md:h-[calc(100vh-9rem)] md:w-72 w-12 bg-emerald-800/90 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 border-r border-emerald-900 z-40 transition-all duration-300 rounded-r-[2rem] md:rounded-none md:rounded-br-[4rem]">
        <ScrollArea className="h-full max-h-[70vh] md:max-h-none md:px-4 px-1 py-8">
          <div className="space-y-2 md:pb-16">
            <h3 className="font-semibold text-lg mb-6 text-emerald-50 border-b border-emerald-100/20 pb-3 hidden md:block">
              Menu Indeks Desa
            </h3>
            <div className="space-y-4">
              <TooltipProvider delayDuration={100}>
                {indeksMenuItems.map((item, index) => (
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
                          <item.icon className="h-4 w-4 md:h-5 md:w-5 md:mr-3 text-white" />
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
      <SidebarProfil />
      <SidebarPembangunan />
      <SidebarDanaDesa />
      <SidebarIndeks />
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40">
        <p className="text-xs sm:text-sm font-medium text-orange-500">©2024 spasial.net</p>
      </div>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] sm:w-[600px] max-w-full rounded-full bg-white/40 border-t border-black/10 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 transition-all">
        <div className="flex justify-center items-center h-14 sm:h-16">
          <Sheet open={isProfileOpen} onOpenChange={setIsProfileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="flex flex-col items-center text-black hover:text-black hover:bg-black/10 hover:backdrop-blur-sm hover:backdrop-saturate-150 transition-all w-full py-1.5 sm:py-2 px-2 sm:px-3 h-full rounded-l-full"
              >
                <User className="h-5 w-5 sm:h-6 sm:w-6 mb-0.5 text-black" />
                <span className="text-[10px] sm:text-xs">Profil</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[70vw] sm:w-[336px] bg-white/40 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 border-r border-black/10 rounded-r-[2rem] top-14 sm:top-20 h-[calc(100vh-7rem)] sm:h-[calc(100vh-10rem)] transition-all duration-300">
              <SheetTitle className="sr-only">Profil Menu</SheetTitle>
              <SheetDescription className="sr-only">Menu untuk mengakses informasi profil desa</SheetDescription>
              <ScrollArea className="h-full">
                <div className="space-y-3 sm:space-y-4 py-6 sm:py-8">
                  <h3 className="font-semibold text-base sm:text-lg mb-2 text-black px-2 sm:px-3 border-b border-black/10 pb-2 transition-all hover:bg-black/10">Profil</h3>
                  {profileMenuItems.map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-black hover:text-black hover:bg-black/10 transition-all py-1.5 sm:py-2 px-2 sm:px-3 text-xs sm:text-sm"
                      onClick={() => setIsProfileOpen(false)}
                      asChild
                    >
                      <Link href={item.path}>
                        <item.icon className="h-4 w-4 mr-2 text-black" />
                        {item.title}
                      </Link>
                    </Button>
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 border-t border-black/10">
                  <p className="text-[10px] sm:text-xs text-black/40 italic font-bold">
                    Penafian : Data dan informasi yang di sajikan dalam Laman ini bersifat indikatif dan tidak di maksudkan untuk penyebarluasan informasi. Lebih lanjut hubungi pemerintah desa dan walidata terkait untuk validasi
                  </p>
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>

          <Button
            variant="ghost"
            className="flex flex-col items-center text-black hover:text-black hover:bg-black/10 hover:backdrop-blur-sm hover:backdrop-saturate-150 transition-all w-full py-1.5 sm:py-2 px-2 sm:px-3 h-full rounded-none"
            asChild
          >
            <Link href="/tata-ruang">
              <Map className="h-5 w-5 sm:h-6 sm:w-6 mb-0.5 text-black" />
              <span className="text-[10px] sm:text-xs">Tata Ruang</span>
            </Link>
          </Button>

          <Sheet open={isPembangunanOpen} onOpenChange={setIsPembangunanOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="flex flex-col items-center text-black hover:text-black hover:bg-black/10 hover:backdrop-blur-sm hover:backdrop-saturate-150 transition-all w-full py-1.5 sm:py-2 px-2 sm:px-3 h-full rounded-none"
              >
                <Building2 className="h-5 w-5 sm:h-6 sm:w-6 mb-0.5 text-black" />
                <span className="text-[10px] sm:text-xs">Pembangunan</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[70vw] sm:w-[336px] bg-white/40 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 border-r border-black/10 rounded-r-[2rem] top-14 sm:top-20 h-[calc(100vh-7rem)] sm:h-[calc(100vh-10rem)] transition-all duration-300">
              <SheetTitle className="sr-only">Pembangunan Menu</SheetTitle>
              <SheetDescription className="sr-only">Menu untuk mengakses informasi pembangunan desa</SheetDescription>
              <ScrollArea className="h-full">
                <div className="space-y-3 sm:space-y-4 py-6 sm:py-8">
                  <h3 className="font-semibold text-base sm:text-lg mb-2 text-black px-2 sm:px-3 border-b border-black/10 pb-2 transition-all hover:bg-black/10">Pembangunan</h3>
                  {pembangunanMenuItems.map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-black hover:text-black hover:bg-black/10 transition-all py-1.5 sm:py-2 px-2 sm:px-3 text-xs sm:text-sm"
                      onClick={() => setIsPembangunanOpen(false)}
                      asChild
                    >
                      <Link href={item.path}>
                        <item.icon className="h-4 w-4 mr-2 text-black" />
                        {item.title}
                      </Link>
                    </Button>
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 border-t border-black/10">
                  <p className="text-[10px] sm:text-xs text-black/40 italic font-bold">
                    Penafian : Data dan informasi yang di sajikan dalam Laman ini bersifat indikatif dan tidak di maksudkan untuk penyebarluasan informasi. Lebih lanjut hubungi pemerintah desa dan walidata terkait untuk validasi
                  </p>
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>

          <Sheet open={isDanaDesaOpen} onOpenChange={setIsDanaDesaOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="flex flex-col items-center text-black hover:text-black hover:bg-black/10 hover:backdrop-blur-sm hover:backdrop-saturate-150 transition-all w-full py-1.5 sm:py-2 px-2 sm:px-3 h-full rounded-none"
              >
                <Wallet className="h-5 w-5 sm:h-6 sm:w-6 mb-0.5 text-black" />
                <span className="text-[10px] sm:text-xs">Dana Desa</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[70vw] sm:w-[336px] bg-white/40 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 border-r border-black/10 rounded-r-[2rem] top-14 sm:top-20 h-[calc(100vh-7rem)] sm:h-[calc(100vh-10rem)] transition-all duration-300">
              <SheetTitle className="sr-only">Dana Desa Menu</SheetTitle>
              <SheetDescription className="sr-only">Menu untuk mengakses informasi dana desa</SheetDescription>
              <ScrollArea className="h-full">
                <div className="space-y-3 sm:space-y-4 py-6 sm:py-8">
                  <h3 className="font-semibold text-base sm:text-lg mb-2 text-black px-2 sm:px-3 border-b border-black/10 pb-2 transition-all hover:bg-black/10">Dana Desa</h3>
                  {danaDesaMenuItems.map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-black hover:text-black hover:bg-black/10 transition-all py-1.5 sm:py-2 px-2 sm:px-3 text-xs sm:text-sm"
                      onClick={() => setIsDanaDesaOpen(false)}
                      asChild
                    >
                      <Link href={item.path}>
                        <item.icon className="h-4 w-4 mr-2 text-black" />
                        {item.title}
                      </Link>
                    </Button>
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 border-t border-black/10">
                  <p className="text-[10px] sm:text-xs text-black/40 italic font-bold">
                    Penafian : Data dan informasi yang di sajikan dalam Laman ini bersifat indikatif dan tidak di maksudkan untuk penyebarluasan informasi. Lebih lanjut hubungi pemerintah desa dan walidata terkait untuk validasi
                  </p>
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>

          <Sheet open={isIndeksOpen} onOpenChange={setIsIndeksOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="flex flex-col items-center text-black hover:text-black hover:bg-black/10 hover:backdrop-blur-sm hover:backdrop-saturate-150 transition-all w-full py-1.5 sm:py-2 px-2 sm:px-3 h-full rounded-r-full"
              >
                <FileText className="h-5 w-5 sm:h-6 sm:w-6 mb-0.5 text-black" />
                <span className="text-[10px] sm:text-xs">Indeks</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[70vw] sm:w-[336px] bg-white/40 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 border-r border-black/10 rounded-r-[2rem] top-14 sm:top-20 h-[calc(100vh-7rem)] sm:h-[calc(100vh-10rem)] transition-all duration-300">
              <SheetTitle className="sr-only">Indeks Menu</SheetTitle>
              <SheetDescription className="sr-only">Menu untuk mengakses informasi indeks desa</SheetDescription>
              <ScrollArea className="h-full">
                <div className="space-y-3 sm:space-y-4 py-6 sm:py-8">
                  <h3 className="font-semibold text-base sm:text-lg mb-2 text-black px-2 sm:px-3 border-b border-black/10 pb-2 transition-all hover:bg-black/10">Indeks Desa</h3>
                  {indeksMenuItems.map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-black hover:text-black hover:bg-black/10 transition-all py-1.5 sm:py-2 px-2 sm:px-3 text-xs sm:text-sm"
                      onClick={() => setIsIndeksOpen(false)}
                      asChild
                    >
                      <Link href={item.path}>
                        <item.icon className="h-4 w-4 mr-2 text-black" />
                        {item.title}
                      </Link>
                    </Button>
                  ))}
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
    </>
  );
};

export default BottomNav;
