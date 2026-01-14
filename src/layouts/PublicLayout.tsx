"use client";
import { usePathname } from 'next/navigation';
import TopNav from '@/components/TopNav';
import BottomNav from '@/components/BottomNav';
import { useEffect, useState } from 'react';
import type { Menu } from '@/lib/menu-data';
import { getMenusWithItems } from '@/lib/menu-actions';

const PublicLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const pathname = usePathname();
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenus = async () => {
      setLoading(true);
      const menusData = await getMenusWithItems();
      setMenus(menusData);
      setLoading(false);
    };
    fetchMenus();
  }, []);

  const topNavMenu = menus.find(m => m.id === 'top-nav');
  const bottomNavMenu = menus.find(m => m.id === 'bottom-nav');
  
  // Find all parent items for sidebar generation
  const allParentPaths = menus
      .filter(menu => menu.id !== 'top-nav' && menu.id !== 'bottom-nav')
      .flatMap(menu => menu.items?.filter(item => !item.parentId) || [])
      .map(item => item.path.split('/')[1]);

  const uniqueParentPaths = [...new Set(allParentPaths)];
  
  const needsSidebar = uniqueParentPaths.some(p => pathname.startsWith(`/${p}`));

  return (
    <div className="flex flex-col min-h-screen">
      <TopNav menu={topNavMenu} loading={loading} />
      <main className={`flex-grow ${needsSidebar ? 'md:pl-72 pl-12' : ''}`}>
        {children}
      </main>
      <BottomNav menu={bottomNavMenu} allMenus={menus} loading={loading} />
    </div>
  );
};

export default PublicLayout;
