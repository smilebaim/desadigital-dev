'use client';
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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const fetchMenus = async () => {
      setLoading(true);
      const menusData = await getMenusWithItems();
      setMenus(menusData);
      setLoading(false);
    };
    fetchMenus();
  }, []);

  const topNavMenu = menus.find(m => m.location === 'topnav');
  const bottomNavMenu = menus.find(m => m.location === 'bottomnav');
  
  // This is a placeholder for sidebar logic.
  // In a real app, you would likely have a more robust way to determine
  // which sidebar to show based on the current route.
  const needsSidebar = false;

  if (!isClient) {
    return (
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">{children}</main>
        </div>
    );
  }

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
