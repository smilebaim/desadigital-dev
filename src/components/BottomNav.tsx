"use client";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import * as Icons from "lucide-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Menu, MenuItem } from "@/lib/menu-data";

interface BottomNavProps {
  className?: string;
  menu?: Menu;
  allMenus?: Menu[];
  loading: boolean;
}

const getIcon = (name?: string): React.FC<any> => {
    if (!name) return () => null;
    const IconComponent = (Icons as any)[name];
    return IconComponent || (() => null);
};

const BottomNav: React.FC<BottomNavProps> = ({ className, menu, allMenus, loading }) => {
  const [openSheet, setOpenSheet] = useState<string | null>(null);
  const pathname = usePathname();

  const Sidebar = ({ menuId }: { menuId: string }) => {
    const targetMenu = allMenus?.find(m => m.id === menuId);
    if (!targetMenu?.items) return null;
    
    const rootPath = targetMenu.items[0]?.path.split('/')[1];
    const isRouteActive = pathname.startsWith(`/${rootPath}`);
    if (!isRouteActive) return null;

    const MenuIcon = getIcon(targetMenu.icon);

    return (
      <div className="fixed left-0 md:top-16 top-1/2 -translate-y-1/2 md:translate-y-0 h-auto md:h-[calc(100vh-9rem)] md:w-72 w-12 bg-emerald-800/90 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 border-r border-emerald-900 z-40 transition-all duration-300 rounded-r-[2rem] md:rounded-none md:rounded-br-[4rem]">
        <ScrollArea className="h-full max-h-[70vh] md:max-h-none md:px-4 px-1 py-8">
          <div className="space-y-2 md:pb-16">
            <h3 className="font-semibold text-lg mb-6 text-emerald-50 border-b border-emerald-100/20 pb-3 hidden md:block flex items-center gap-2">
                <MenuIcon className="h-5 w-5" />
                {targetMenu.name}
            </h3>
            <div className="space-y-4">
              <TooltipProvider delayDuration={100}>
                {targetMenu.items.map((item, index) => {
                   const ItemIcon = getIcon(item.icon);
                   return (
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
                              <ItemIcon className="h-4 w-4 md:h-5 md:w-5 md:mr-3 text-white" />
                              <span className="hidden md:inline">{item.title}</span>
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={16} className="md:hidden bg-emerald-800/90 text-emerald-50 border-emerald-700">
                          <p>{item.title}</p>
                        </TooltipContent>
                      </Tooltip>
                   )
                })}
              </TooltipProvider>
            </div>
          </div>
        </ScrollArea>
      </div>
    );
  };

  return (
    <>
      {allMenus?.filter(m => m.id !== 'top-nav' && m.id !== 'bottom-nav').map(m => <Sidebar key={m.id} menuId={m.id} />)}

      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40">
        <p className="text-xs sm:text-sm font-medium text-orange-500">©2024 spasial.net</p>
      </div>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] sm:w-[600px] max-w-full rounded-full bg-white/40 border-t border-black/10 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 transition-all">
        <div className="flex justify-center items-center h-14 sm:h-16">
          {loading ? (
             <div className="flex items-center justify-center w-full h-full">
                <Icons.Loader className="animate-spin" />
             </div>
          ) : menu?.items?.map((item) => {
            const Icon = getIcon(item.icon);
            const targetMenu = allMenus?.find(m => m.id === item.path);

            // If path is a menu link, create a sheet trigger
            if (targetMenu) {
              const MenuIcon = getIcon(targetMenu.icon);
              return (
                <Sheet key={item.id} open={openSheet === item.id} onOpenChange={(isOpen) => setOpenSheet(isOpen ? item.id : null)}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex flex-col items-center text-black hover:text-black hover:bg-black/10 hover:backdrop-blur-sm hover:backdrop-saturate-150 transition-all w-full py-1.5 sm:py-2 px-2 sm:px-3 h-full rounded-none"
                    >
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 mb-0.5 text-black" />
                      <span className="text-[10px] sm:text-xs">{item.title}</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[70vw] sm:w-[336px] bg-white/40 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 border-r border-black/10 rounded-r-[2rem] top-14 sm:top-20 h-[calc(100vh-7rem)] sm:h-[calc(100vh-10rem)] transition-all duration-300">
                    <SheetTitle className="sr-only">{targetMenu.name}</SheetTitle>
                    <SheetDescription className="sr-only">{targetMenu.description}</SheetDescription>
                    <ScrollArea className="h-full">
                      <div className="space-y-3 sm:space-y-4 py-6 sm:py-8">
                        <h3 className="font-semibold text-base sm:text-lg mb-2 text-black px-2 sm:px-3 border-b border-black/10 pb-2 transition-all hover:bg-black/10 flex items-center gap-2">
                           <MenuIcon className="h-5 w-5" />
                           {targetMenu.name}
                        </h3>
                        {targetMenu.items?.map((subItem) => {
                          const SubItemIcon = getIcon(subItem.icon);
                          return (
                            <Button
                              key={subItem.id}
                              variant="ghost"
                              className="w-full justify-start text-black hover:text-black hover:bg-black/10 transition-all py-1.5 sm:py-2 px-2 sm:px-3 text-xs sm:text-sm"
                              onClick={() => setOpenSheet(null)}
                              asChild
                            >
                              <Link href={subItem.path}>
                                <SubItemIcon className="h-4 w-4 mr-2 text-black" />
                                {subItem.title}
                              </Link>
                            </Button>
                          );
                        })}
                      </div>
                       <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 border-t border-black/10">
                          <p className="text-[10px] sm:text-xs text-black/40 italic font-bold">
                            Penafian : Data dan informasi yang di sajikan dalam Laman ini bersifat indikatif dan tidak di maksudkan untuk penyebarluasan informasi. Lebih lanjut hubungi pemerintah desa dan walidata terkait untuk validasi
                          </p>
                        </div>
                    </ScrollArea>
                  </SheetContent>
                </Sheet>
              );
            }
            
            // Otherwise, it's a direct link
            return (
              <Button
                key={item.id}
                variant="ghost"
                className="flex flex-col items-center text-black hover:text-black hover:bg-black/10 hover:backdrop-blur-sm hover:backdrop-saturate-150 transition-all w-full py-1.5 sm:py-2 px-2 sm:px-3 h-full rounded-none"
                asChild
              >
                <Link href={item.path}>
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 mb-0.5 text-black" />
                  <span className="text-[10px] sm:text-xs">{item.title}</span>
                </Link>
              </Button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BottomNav;
