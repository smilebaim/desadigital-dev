'use client';
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Map, Building2, Wallet, User, FileText, ChevronDown, ChevronUp, Users, History, Target, Compass, ScrollText, HeartHandshake, MessageSquareWarning, BookOpen, Scale, HandshakeIcon, Store, Activity, Apple, Calendar, ListTodo, Library, FileSpreadsheet } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getMenuDetails } from "@/lib/menu-actions";
import type { MenuItem } from "@/lib/menu-data";
import * as LucideIcons from "lucide-react";

type IconName = keyof typeof LucideIcons;

interface BottomNavProps {
  className?: string;
}

type GroupedMenuItems = {
  [category: string]: MenuItem[];
};

const getIcon = (name: string | null): React.FC<any> => {
  if (name && name in LucideIcons) {
    return LucideIcons[name as IconName];
  }
  return FileText; // Default icon
};

const BottomNav: React.FC<BottomNavProps> = ({ className }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<GroupedMenuItems>({});
  const [activeMenuTitle, setActiveMenuTitle] = useState('');
  const pathname = usePathname();

  const [bottomNavItems, setBottomNavItems] = useState<MenuItem[]>([]);
  
  useEffect(() => {
    const fetchItems = async () => {
        const menu = await getMenuDetails(2); // BottomNav ID is 2
        if (menu) {
            setBottomNavItems(menu.items);
        }
    };
    fetchItems();
  }, []);

  const openSheetWithMenu = (title: string, parentId: number | null) => {
    if (parentId === null) return;
    const parentItems = bottomNavItems.filter(item => item.parentId === parentId);
    
    const grouped: GroupedMenuItems = {};
    parentItems.forEach(parent => {
        grouped[parent.title] = bottomNavItems.filter(child => child.parentId === parent.id);
    });
    
    setActiveMenu(grouped);
    setActiveMenuTitle(title);
    setIsSheetOpen(true);
  };
  
  const mainNavItems = bottomNavItems.filter(item => item.parentId === null);


  const Sidebar = () => {
    const parentIdMap: { [key: string]: number[] } = {
        '/profil': [11],
        '/pustaka': [11],
        '/pembangunan': [16],
        '/kelembagaan': [16],
        '/dana-desa': [20],
        '/ekonomi': [20],
        '/indeks': [mainNavItems.find(i => i.title === 'Indeks')?.id || -1],
        '/aktivitas': [mainNavItems.find(i => i.title === 'Indeks')?.id || -1],
    };

    const parentRoute = Object.keys(parentIdMap).find(key => pathname.startsWith(key));
    if (!parentRoute) return null;

    const parentIds = parentIdMap[parentRoute];
    const relevantItems = bottomNavItems.filter(item => parentIds.includes(item.parentId || 0) || parentIds.includes(item.id));
    
    const groupedItems = relevantItems
        .filter(item => item.parentId && parentIds.includes(item.parentId))
        .reduce((acc, item) => {
            const parent = bottomNavItems.find(p => p.id === item.parentId);
            if (parent) {
                if (!acc[parent.title]) {
                    acc[parent.title] = [];
                }
                acc[parent.title].push(item);
            }
            return acc;
    }, {} as GroupedMenuItems);

    const title = mainNavItems.find(i => i.id === parentIds[0])?.title || '';
    
    return (
      <div className="fixed left-0 md:top-16 top-1/2 -translate-y-1/2 md:translate-y-0 h-auto md:h-[calc(100vh-9rem)] md:w-72 w-12 bg-emerald-800/90 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 border-r border-emerald-900 z-40 transition-all duration-300 rounded-r-[2rem] md:rounded-none md:rounded-br-[4rem]">
        <ScrollArea className="h-full max-h-[70vh] md:max-h-none md:px-4 px-1 py-8">
          <div className="space-y-2 md:pb-16">
            <h3 className="font-semibold text-lg mb-6 text-emerald-50 border-b border-emerald-100/20 pb-3 hidden md:block">
              Menu {title}
            </h3>
            <div className="md:hidden">
              <TooltipProvider delayDuration={100}>
                {Object.values(groupedItems).flat().map((item, index) => {
                  const Icon = getIcon(item.icon);
                  return (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`w-full justify-center text-emerald-50 hover:text-emerald-50 hover:bg-emerald-700/50 transition-all py-3 px-1 text-sm ${ pathname === item.path ? 'bg-emerald-700/70' : '' }`}
                        asChild
                      >
                        <Link href={item.path}>
                          <Icon className="h-4 w-4 text-white" />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={16} className="md:hidden bg-emerald-800/90 text-emerald-50 border-emerald-700">
                      <p>{item.title}</p>
                    </TooltipContent>
                  </Tooltip>
                )})}
              </TooltipProvider>
            </div>
            <div className="hidden md:block">
              <Accordion type="single" collapsible defaultValue={Object.keys(groupedItems)[0]} className="w-full">
                {Object.entries(groupedItems).map(([category, items], index) => (
                  <AccordionItem key={index} value={category} className="border-none">
                    <AccordionTrigger className="px-3 py-2 text-sm rounded-md hover:bg-emerald-100/10 transition-colors text-white hover:no-underline">
                      <span className="font-semibold">{category}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pl-4">
                      <ul className="space-y-1">
                        {items.map((item, itemIndex) => {
                          const Icon = getIcon(item.icon);
                          return (
                           <li key={itemIndex}>
                            <Button
                              variant="ghost"
                              className={`w-full justify-start text-emerald-50 hover:text-emerald-50 hover:bg-emerald-700/50 transition-all py-2.5 px-3 text-sm ${ pathname === item.path ? 'bg-emerald-700/70' : '' }`}
                              asChild
                            >
                              <Link href={item.path}>
                                <Icon className="h-5 w-5 mr-3 text-white" />
                                <span>{item.title}</span>
                              </Link>
                            </Button>
                          </li>
                        )})}
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
      <Sidebar />
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40">
        <p className="text-xs sm:text-sm font-medium text-orange-500">©2024 spasial.net</p>
      </div>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] sm:w-[600px] max-w-full rounded-full bg-white/40 border-t border-black/10 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 transition-all">
        <div className="flex justify-around items-center h-14 sm:h-16">
          
          {mainNavItems.map(item => {
            const Icon = getIcon(item.icon);
            if (item.path === '/tata-ruang') {
                return (
                    <Button key={item.id} variant="ghost" className="flex flex-col items-center justify-center text-black hover:text-black hover:bg-black/10 hover:backdrop-blur-sm hover:backdrop-saturate-150 transition-all w-full h-full" asChild>
                        <Link href={item.path}>
                            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
                            <span className="text-[10px] sm:text-xs">{item.title}</span>
                        </Link>
                    </Button>
                )
            }
            return (
                <Button
                    key={item.id}
                    variant="ghost"
                    className="flex flex-col items-center justify-center text-black hover:text-black hover:bg-black/10 hover:backdrop-blur-sm hover:backdrop-saturate-150 transition-all w-full h-full rounded-l-full"
                    onClick={() => openSheetWithMenu(item.title, item.id)}
                >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
                    <span className="text-[10px] sm:text-xs">{item.title}</span>
                </Button>
            );
          })}

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetContent side="left" className="w-[70vw] sm:w-[336px] bg-white/40 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 border-r border-black/10 rounded-r-[2rem] top-14 sm:top-20 h-[calc(100vh-7rem)] sm:h-[calc(100vh-10rem)] transition-all duration-300">
              <SheetTitle className="sr-only">{activeMenuTitle} Menu</SheetTitle>
              <SheetDescription className="sr-only">Menu untuk {activeMenuTitle}</SheetDescription>
              <ScrollArea className="h-full">
                <div className="space-y-3 sm:space-y-4 py-6 sm:py-8">
                  <Accordion type="single" collapsible defaultValue={Object.keys(activeMenu)[0]} className="w-full">
                    {Object.entries(activeMenu).map(([category, items], index) => (
                      <AccordionItem key={index} value={category} className="border-black/10">
                        <AccordionTrigger className="px-2 sm:px-3 text-black hover:text-black hover:no-underline border-b border-black/10 pb-2 transition-all hover:bg-black/10">
                          <span className="font-poppins font-semibold text-sm sm:text-base">{category}</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-1">
                            {items.map((item, itemIndex) => {
                              const Icon = getIcon(item.icon);
                              return (
                              <Button
                                key={itemIndex}
                                variant="ghost"
                                className="w-full justify-start text-black hover:text-black hover:bg-black/10 transition-all py-1 sm:py-1.5 px-4 sm:px-6 text-xs sm:text-sm"
                                asChild
                              >
                                <Link href={item.path} className="flex items-center gap-2" onClick={() => setIsSheetOpen(false)}>
                                  <Icon className="h-4 w-4 text-black" />
                                  {item.title}
                                </Link>
                              </Button>
                            )})}
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
