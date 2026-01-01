
'use client';
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Map, Building2, Wallet, User, FileText, ChevronDown, ChevronUp, Users, History, Target, Compass, ScrollText, HeartHandshake, MessageSquareWarning, BookOpen, Scale, HandshakeIcon, Store, Activity, Apple, Calendar, ListTodo, Library, FileSpreadsheet } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface BottomNavProps {
  className?: string;
}

const BottomNav: React.FC<BottomNavProps> = ({ className }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPembangunanOpen, setIsPembangunanOpen] = useState(false);
  const [isDanaDesaOpen, setIsDanaDesaOpen] = useState(false);
  const [isIndeksOpen, setIsIndeksOpen] = useState(false);
  const pathname = usePathname();

  const profileMenuItems = {
    "Profil": [
      { title: "Profil Desa", path: "/profil/profil-desa", icon: Home },
      { title: "Sejarah Desa", path: "/profil/sejarah-desa", icon: History },
      { title: "Perkembangan", path: "/profil/perkembangan", icon: ChevronUp },
      { title: "Visi dan Misi", path: "/profil/visi-misi", icon: Target },
      { title: "Arah Kebijakan", path: "/profil/arah-kebijakan", icon: Compass },
    ],
    "Pemerintahan": [
      { title: "Pemerintahan Desa", path: "/profil/struktur-pemerintah", icon: Building2 },
    ],
    "Literasi": [
      { title: "Pustaka Desa", path: "/pustaka/pustaka-desa", icon: Library },
      { title: "Publikasi", path: "/pustaka/publikasi", icon: FileSpreadsheet }
    ]
  };

  const pembangunanMenuItems = {
      "Pembangunan": [
        { title: "RPJMDes", path: "/pembangunan/rpjmdes", icon: FileText },
        { title: "RKPDes", path: "/pembangunan/rkpdes", icon: FileText },
        { title: "Daftar Rencana Program", path: "/pembangunan/daftar-program", icon: ListTodo }
      ],
      "Kelembagaan": [
        { title: "LKMD", path: "/kelembagaan/lkmd", icon: Users },
        { title: "PKK", path: "/kelembagaan/pkk", icon: Users },
        { title: "Posyandu", path: "/kelembagaan/posyandu", icon: Activity },
        { title: "MPG", path: "/kelembagaan/mpg", icon: Activity }
      ]
  };

  const danaDesaMenuItems = {
    "Dana Desa": [
        { title: "Pendapatan", path: "/dana-desa/pendapatan", icon: FileText },
        { title: "Belanja", path: "/dana-desa/belanja", icon: FileText },
        { title: "Pembiayaan", path: "/dana-desa/pembiayaan", icon: FileText }
    ],
    "Ekonomi": [
        { title: "BUMDes", path: "/ekonomi/bumdes", icon: Building2 },
        { title: "Koperasi Merah Putih", path: "/ekonomi/koperasi", icon: HandshakeIcon },
        { title: "UMKM", path: "/ekonomi/umkm", icon: Store }
    ]
  };

  const indeksMenuItems = {
    "Indeks Desa": [
        { title: "Indeks Ketahanan Sosial", path: "/indeks/ketahanan-sosial", icon: HeartHandshake },
        { title: "Indeks Ketahanan Ekonomi", path: "/indeks/ketahanan-ekonomi", icon: Building2 },
        { title: "Indeks Ketahanan Lingkungan", path: "/indeks/ketahanan-lingkungan", icon: Compass }
    ],
    "Aktivitas": [
      { title: "Kalender Pangan", path: "/aktivitas/kalender-pangan", icon: Apple },
      { title: "Kalender Kegiatan", path: "/aktivitas/kalender-kegiatan", icon: Calendar },
      { title: "Agenda", path: "/aktivitas/agenda", icon: ListTodo }
    ]
  };

  const isProfilRoute = pathname.startsWith('/profil') || pathname.startsWith('/pustaka');
  const isPembangunanRoute = pathname.startsWith('/pembangunan') || pathname.startsWith('/kelembagaan');
  const isDanaDesaRoute = pathname.startsWith('/dana-desa') || pathname.startsWith('/ekonomi');
  const isIndeksRoute = pathname.startsWith('/indeks') || pathname.startsWith('/aktivitas');


  const SidebarProfil = () => {
    if (!isProfilRoute) return null;
    const activeCategory = Object.keys(profileMenuItems).find(category =>
      profileMenuItems[category as keyof typeof profileMenuItems].some(item => pathname === item.path)
    );

    return (
      <div className="fixed left-0 md:top-16 top-1/2 -translate-y-1/2 md:translate-y-0 h-auto md:h-[calc(100vh-9rem)] md:w-72 w-12 bg-emerald-800/90 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 border-r border-emerald-900 z-40 transition-all duration-300 rounded-r-[2rem] md:rounded-none md:rounded-br-[4rem]">
        <ScrollArea className="h-full max-h-[70vh] md:max-h-none md:px-4 px-1 py-8">
          <div className="space-y-2 md:pb-16">
            <h3 className="font-semibold text-lg mb-6 text-emerald-50 border-b border-emerald-100/20 pb-3 hidden md:block">
              Menu Profil
            </h3>
            <div className="md:hidden">
              <TooltipProvider delayDuration={100}>
                {Object.values(profileMenuItems).flat().map((item, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`w-full justify-center text-emerald-50 hover:text-emerald-50 hover:bg-emerald-700/50 transition-all py-3 px-1 text-sm ${
                          pathname === item.path ? 'bg-emerald-700/70' : ''
                        }`}
                        asChild
                      >
                        <Link href={item.path} onClick={() => setIsProfileOpen(false)}>
                          <item.icon className="h-4 w-4 text-white" />
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
            <div className="hidden md:block">
              <Accordion type="single" collapsible defaultValue={activeCategory} className="w-full">
                {Object.entries(profileMenuItems).map(([category, items], index) => (
                  <AccordionItem key={index} value={category} className="border-none">
                    <AccordionTrigger className="px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white hover:no-underline">
                      <span className="font-semibold">{category}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pl-4">
                      <ul className="space-y-1">
                        {items.map((item, itemIndex) => (
                           <li key={itemIndex}>
                            <Button
                              variant="ghost"
                              className={`w-full justify-start text-emerald-50 hover:text-emerald-50 hover:bg-emerald-700/50 transition-all py-2.5 px-3 text-sm ${
                                pathname === item.path ? 'bg-emerald-700/70' : ''
                              }`}
                              asChild
                            >
                              <Link href={item.path} onClick={() => setIsProfileOpen(false)}>
                                <item.icon className="h-5 w-5 mr-3 text-white" />
                                <span>{item.title}</span>
                              </Link>
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </ScrollArea>
      </div>
    );
  };

  const SidebarPembangunan = () => {
    if (!isPembangunanRoute) return null;
    const activeCategory = Object.keys(pembangunanMenuItems).find(category =>
      pembangunanMenuItems[category as keyof typeof pembangunanMenuItems].some(item => pathname === item.path)
    );

    return (
      <div className="fixed left-0 md:top-16 top-1/2 -translate-y-1/2 md:translate-y-0 h-auto md:h-[calc(100vh-9rem)] md:w-72 w-12 bg-emerald-800/90 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 border-r border-emerald-900 z-40 transition-all duration-300 rounded-r-[2rem] md:rounded-none md:rounded-br-[4rem]">
        <ScrollArea className="h-full max-h-[70vh] md:max-h-none md:px-4 px-1 py-8">
          <div className="space-y-2 md:pb-16">
            <h3 className="font-semibold text-lg mb-6 text-emerald-50 border-b border-emerald-100/20 pb-3 hidden md:block">
              Menu Pembangunan
            </h3>
            <div className="md:hidden">
              <TooltipProvider delayDuration={100}>
                {Object.values(pembangunanMenuItems).flat().map((item, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`w-full justify-center text-emerald-50 hover:text-emerald-50 hover:bg-emerald-700/50 transition-all py-3 px-1 text-sm ${
                          pathname === item.path ? 'bg-emerald-700/70' : ''
                        }`}
                        asChild
                      >
                        <Link href={item.path} onClick={() => setIsPembangunanOpen(false)}>
                          <item.icon className="h-4 w-4 text-white" />
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
            <div className="hidden md:block">
               <Accordion type="single" collapsible defaultValue={activeCategory} className="w-full">
                {Object.entries(pembangunanMenuItems).map(([category, items], index) => (
                  <AccordionItem key={index} value={category} className="border-none">
                    <AccordionTrigger className="px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white hover:no-underline">
                      <span className="font-semibold">{category}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pl-4">
                      <ul className="space-y-1">
                        {items.map((item, itemIndex) => (
                           <li key={itemIndex}>
                            <Button
                              variant="ghost"
                              className={`w-full justify-start text-emerald-50 hover:text-emerald-50 hover:bg-emerald-700/50 transition-all py-2.5 px-3 text-sm ${
                                pathname === item.path ? 'bg-emerald-700/70' : ''
                              }`}
                              asChild
                            >
                              <Link href={item.path} onClick={() => setIsPembangunanOpen(false)}>
                                <item.icon className="h-5 w-5 mr-3 text-white" />
                                <span>{item.title}</span>
                              </Link>
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </ScrollArea>
      </div>
    );
  };

  const SidebarDanaDesa = () => {
    if (!isDanaDesaRoute) return null;
    const activeCategory = Object.keys(danaDesaMenuItems).find(category =>
      danaDesaMenuItems[category as keyof typeof danaDesaMenuItems].some(item => pathname === item.path)
    );

    return (
      <div className="fixed left-0 md:top-16 top-1/2 -translate-y-1/2 md:translate-y-0 h-auto md:h-[calc(100vh-9rem)] md:w-72 w-12 bg-emerald-800/90 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 border-r border-emerald-900 z-40 transition-all duration-300 rounded-r-[2rem] md:rounded-none md:rounded-br-[4rem]">
        <ScrollArea className="h-full max-h-[70vh] md:max-h-none md:px-4 px-1 py-8">
          <div className="space-y-2 md:pb-16">
            <h3 className="font-semibold text-lg mb-6 text-emerald-50 border-b border-emerald-100/20 pb-3 hidden md:block">
              Menu Dana Desa
            </h3>
            <div className="md:hidden">
              <TooltipProvider delayDuration={100}>
                {Object.values(danaDesaMenuItems).flat().map((item, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`w-full justify-center text-emerald-50 hover:text-emerald-50 hover:bg-emerald-700/50 transition-all py-3 px-1 text-sm ${
                          pathname === item.path ? 'bg-emerald-700/70' : ''
                        }`}
                        asChild
                      >
                         <Link href={item.path} onClick={() => setIsDanaDesaOpen(false)}>
                          <item.icon className="h-4 w-4 text-white" />
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
             <div className="hidden md:block">
               <Accordion type="single" collapsible defaultValue={activeCategory} className="w-full">
                {Object.entries(danaDesaMenuItems).map(([category, items], index) => (
                  <AccordionItem key={index} value={category} className="border-none">
                    <AccordionTrigger className="px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white hover:no-underline">
                      <span className="font-semibold">{category}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pl-4">
                      <ul className="space-y-1">
                        {items.map((item, itemIndex) => (
                           <li key={itemIndex}>
                            <Button
                              variant="ghost"
                              className={`w-full justify-start text-emerald-50 hover:text-emerald-50 hover:bg-emerald-700/50 transition-all py-2.5 px-3 text-sm ${
                                pathname === item.path ? 'bg-emerald-700/70' : ''
                              }`}
                              asChild
                            >
                              <Link href={item.path} onClick={() => setIsDanaDesaOpen(false)}>
                                <item.icon className="h-5 w-5 mr-3 text-white" />
                                <span>{item.title}</span>
                              </Link>
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </ScrollArea>
      </div>
    );
  };

  const SidebarIndeks = () => {
    if (!isIndeksRoute) return null;
    const activeCategory = Object.keys(indeksMenuItems).find(category =>
      indeksMenuItems[category as keyof typeof indeksMenuItems].some(item => pathname === item.path)
    );

    return (
      <div className="fixed left-0 md:top-16 top-1/2 -translate-y-1/2 md:translate-y-0 h-auto md:h-[calc(100vh-9rem)] md:w-72 w-12 bg-emerald-800/90 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 border-r border-emerald-900 z-40 transition-all duration-300 rounded-r-[2rem] md:rounded-none md:rounded-br-[4rem]">
        <ScrollArea className="h-full max-h-[70vh] md:max-h-none md:px-4 px-1 py-8">
          <div className="space-y-2 md:pb-16">
            <h3 className="font-semibold text-lg mb-6 text-emerald-50 border-b border-emerald-100/20 pb-3 hidden md:block">
              Menu Indeks Desa
            </h3>
            <div className="md:hidden">
              <TooltipProvider delayDuration={100}>
                {Object.values(indeksMenuItems).flat().map((item, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`w-full justify-center text-emerald-50 hover:text-emerald-50 hover:bg-emerald-700/50 transition-all py-3 px-1 text-sm ${
                          pathname === item.path ? 'bg-emerald-700/70' : ''
                        }`}
                        asChild
                      >
                         <Link href={item.path} onClick={() => setIsIndeksOpen(false)}>
                          <item.icon className="h-4 w-4 text-white" />
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
            <div className="hidden md:block">
               <Accordion type="single" collapsible defaultValue={activeCategory} className="w-full">
                {Object.entries(indeksMenuItems).map(([category, items], index) => (
                  <AccordionItem key={index} value={category} className="border-none">
                    <AccordionTrigger className="px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white hover:no-underline">
                      <span className="font-semibold">{category}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pl-4">
                      <ul className="space-y-1">
                        {items.map((item, itemIndex) => (
                           <li key={itemIndex}>
                            <Button
                              variant="ghost"
                              className={`w-full justify-start text-emerald-50 hover:text-emerald-50 hover:bg-emerald-700/50 transition-all py-2.5 px-3 text-sm ${
                                pathname === item.path ? 'bg-emerald-700/70' : ''
                              }`}
                              asChild
                            >
                              <Link href={item.path} onClick={() => setIsIndeksOpen(false)}>
                                <item.icon className="h-5 w-5 mr-3 text-white" />
                                <span>{item.title}</span>
                              </Link>
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
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
        <div className="flex justify-around items-center h-14 sm:h-16">
          <Sheet open={isProfileOpen} onOpenChange={setIsProfileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="flex flex-col items-center justify-center text-black hover:text-black hover:bg-black/10 hover:backdrop-blur-sm hover:backdrop-saturate-150 transition-all w-full h-full rounded-l-full"
              >
                <User className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
                <span className="text-[10px] sm:text-xs">Profil</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[70vw] sm:w-[336px] bg-white/40 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 border-r border-black/10 rounded-r-[2rem] top-14 sm:top-20 h-[calc(100vh-7rem)] sm:h-[calc(100vh-10rem)] transition-all duration-300">
              <SheetTitle className="sr-only">Profil Menu</SheetTitle>
              <SheetDescription className="sr-only">Menu untuk mengakses informasi profil desa</SheetDescription>
              <ScrollArea className="h-full">
                <div className="space-y-3 sm:space-y-4 py-6 sm:py-8">
                  <Accordion type="single" collapsible defaultValue="Profil" className="w-full">
                    {Object.entries(profileMenuItems).map(([category, items], index) => (
                      <AccordionItem key={index} value={category} className="border-black/10">
                        <AccordionTrigger className="px-2 sm:px-3 text-black hover:text-black hover:no-underline border-b border-black/10 pb-2 transition-all hover:bg-black/10">
                          <span className="font-poppins font-semibold text-sm sm:text-base">{category}</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-1">
                            {items.map((item, itemIndex) => (
                              <Button
                                key={itemIndex}
                                variant="ghost"
                                className="w-full justify-start text-black hover:text-black hover:bg-black/10 transition-all py-1 sm:py-1.5 px-4 sm:px-6 text-xs sm:text-sm"
                                asChild
                              >
                                <Link href={item.path} className="flex items-center gap-2" onClick={() => setIsProfileOpen(false)}>
                                  <item.icon className="h-4 w-4 text-black" />
                                  {item.title}
                                </Link>
                              </Button>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
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
            className="flex flex-col items-center justify-center text-black hover:text-black hover:bg-black/10 hover:backdrop-blur-sm hover:backdrop-saturate-150 transition-all w-full h-full"
             asChild
          >
            <Link href="/tata-ruang">
              <Map className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
              <span className="text-[10px] sm:text-xs">Tata Ruang</span>
            </Link>
          </Button>

          <Sheet open={isPembangunanOpen} onOpenChange={setIsPembangunanOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="flex flex-col items-center justify-center text-black hover:text-black hover:bg-black/10 hover:backdrop-blur-sm hover:backdrop-saturate-150 transition-all w-full h-full"
              >
                <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
                <span className="text-[10px] sm:text-xs">Pembangunan</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[70vw] sm:w-[336px] bg-white/40 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 border-r border-black/10 rounded-r-[2rem] top-14 sm:top-20 h-[calc(100vh-7rem)] sm:h-[calc(100vh-10rem)] transition-all duration-300">
              <SheetTitle className="sr-only">Pembangunan Menu</SheetTitle>
              <SheetDescription className="sr-only">Menu untuk mengakses informasi pembangunan desa</SheetDescription>
              <ScrollArea className="h-full">
                <div className="space-y-3 sm:space-y-4 py-6 sm:py-8">
                <Accordion type="single" collapsible defaultValue="Pembangunan" className="w-full">
                    {Object.entries(pembangunanMenuItems).map(([category, items], index) => (
                      <AccordionItem key={index} value={category} className="border-black/10">
                        <AccordionTrigger className="px-2 sm:px-3 text-black hover:text-black hover:no-underline border-b border-black/10 pb-2 transition-all hover:bg-black/10">
                          <span className="font-poppins font-semibold text-sm sm:text-base">{category}</span>
                        </AccordionTrigger>
                        <AccordionContent>
                           <div className="space-y-1">
                            {items.map((item, itemIndex) => (
                              <Button
                                key={itemIndex}
                                variant="ghost"
                                className="w-full justify-start text-black hover:text-black hover:bg-black/10 transition-all py-1 sm:py-1.5 px-4 sm:px-6 text-xs sm:text-sm"
                                asChild
                              >
                                <Link href={item.path} className="flex items-center gap-2" onClick={() => setIsPembangunanOpen(false)}>
                                  <item.icon className="h-4 w-4 text-black" />
                                  {item.title}
                                </Link>
                              </Button>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
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
                className="flex flex-col items-center justify-center text-black hover:text-black hover:bg-black/10 hover:backdrop-blur-sm hover:backdrop-saturate-150 transition-all w-full h-full"
              >
                <Wallet className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
                <span className="text-[10px] sm:text-xs">Dana Desa</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[70vw] sm:w-[336px] bg-white/40 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 border-r border-black/10 rounded-r-[2rem] top-14 sm:top-20 h-[calc(100vh-7rem)] sm:h-[calc(100vh-10rem)] transition-all duration-300">
              <SheetTitle className="sr-only">Dana Desa & Ekonomi Menu</SheetTitle>
              <SheetDescription className="sr-only">Menu untuk mengakses informasi dana desa dan ekonomi</SheetDescription>
              <ScrollArea className="h-full">
                <div className="space-y-3 sm:space-y-4 py-6 sm:py-8">
                   <Accordion type="single" collapsible defaultValue="Dana Desa" className="w-full">
                    {Object.entries(danaDesaMenuItems).map(([category, items], index) => (
                      <AccordionItem key={index} value={category} className="border-black/10">
                        <AccordionTrigger className="px-2 sm:px-3 text-black hover:text-black hover:no-underline border-b border-black/10 pb-2 transition-all hover:bg-black/10">
                          <span className="font-poppins font-semibold text-sm sm:text-base">{category}</span>
                        </AccordionTrigger>
                        <AccordionContent>
                           <div className="space-y-1">
                            {items.map((item, itemIndex) => (
                              <Button
                                key={itemIndex}
                                variant="ghost"
                                className="w-full justify-start text-black hover:text-black hover:bg-black/10 transition-all py-1 sm:py-1.5 px-4 sm:px-6 text-xs sm:text-sm"
                                asChild
                              >
                                <Link href={item.path} className="flex items-center gap-2" onClick={() => setIsDanaDesaOpen(false)}>
                                  <item.icon className="h-4 w-4 text-black" />
                                  {item.title}
                                </Link>
                              </Button>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
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
                className="flex flex-col items-center justify-center text-black hover:text-black hover:bg-black/10 hover:backdrop-blur-sm hover:backdrop-saturate-150 transition-all w-full h-full rounded-r-full"
              >
                <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
                <span className="text-[10px] sm:text-xs">Indeks</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[70vw] sm:w-[336px] bg-white/40 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 border-r border-black/10 rounded-r-[2rem] top-14 sm:top-20 h-[calc(100vh-7rem)] sm:h-[calc(100vh-10rem)] transition-all duration-300">
              <SheetTitle className="sr-only">Indeks & Aktivitas</SheetTitle>
              <SheetDescription className="sr-only">Menu untuk mengakses informasi indeks dan aktivitas desa</SheetDescription>
              <ScrollArea className="h-full">
                <div className="space-y-3 sm:space-y-4 py-6 sm:py-8">
                  <Accordion type="single" collapsible defaultValue="Indeks Desa" className="w-full">
                    {Object.entries(indeksMenuItems).map(([category, items], index) => (
                      <AccordionItem key={index} value={category} className="border-black/10">
                        <AccordionTrigger className="px-2 sm:px-3 text-black hover:text-black hover:no-underline border-b border-black/10 pb-2 transition-all hover:bg-black/10">
                          <span className="font-poppins font-semibold text-sm sm:text-base">{category}</span>
                        </AccordionTrigger>
                        <AccordionContent>
                           <div className="space-y-1">
                            {items.map((item, itemIndex) => (
                              <Button
                                key={itemIndex}
                                variant="ghost"
                                className="w-full justify-start text-black hover:text-black hover:bg-black/10 transition-all py-1 sm:py-1.5 px-4 sm:px-6 text-xs sm:text-sm"
                                asChild
                              >
                                <Link href={item.path} className="flex items-center gap-2" onClick={() => setIsIndeksOpen(false)}>
                                  <item.icon className="h-4 w-4 text-black" />
                                  {item.title}
                                </Link>
                              </Button>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
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



    
    
    
    



