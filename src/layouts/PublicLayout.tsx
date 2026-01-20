'use client';
import { usePathname } from 'next/navigation';
import TopNav from '@/components/TopNav';
import BottomNav from '@/components/BottomNav';
import { useEffect, useState } from 'react';
import type { Menu } from '@/lib/menu-data';
import { getMenusWithItems } from '@/lib/menu-actions';
import { getSiteSettings } from '@/lib/site-settings-actions';
import type { SiteSettings } from '@/lib/site-settings-actions';

const PublicLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const pathname = usePathname();
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    setIsClient(true);
    const fetchMenus = async () => {
      setLoading(true);
      const menusData = await getMenusWithItems();
      setMenus(menusData);
      setLoading(false);
    };
    const fetchSettings = async () => {
        const settingsData = await getSiteSettings();
        setSiteSettings(settingsData);
    };
    fetchMenus();
    fetchSettings();
  }, []);

  const topNavMenu = menus.find(m => m.location === 'topnav');
  const bottomNavMenu = menus.find(m => m.location === 'bottomnav');
  
  // Check if any sidebar menu is active for the current path
  const sidebarMenuIsActive = menus.some(m => {
    if (m.location !== 'sidebar' || !m.items || m.items.length === 0) {
      return false;
    }
    // A sidebar is considered active if the current path starts with the root of any of its items.
    return m.items.some(item => {
        const itemRootPath = item.path.split('/')[1];
        if (itemRootPath) {
            return pathname.startsWith(`/${itemRootPath}`);
        }
        return false;
    });
  });
  
  const needsSidebar = sidebarMenuIsActive;

  if (!isClient) {
    return (
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">{children}</main>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <TopNav menu={topNavMenu} loading={loading} logoUrl={siteSettings?.logoUrl} />
      <main className={`flex-grow transition-all duration-300 ${needsSidebar ? 'md:pl-72 pl-12' : ''}`}>
        {children}
      </main>
      <BottomNav menu={bottomNavMenu} allMenus={menus} loading={loading} />
    </div>
  );
};

export default PublicLayout;
