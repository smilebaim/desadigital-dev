
'use client';
import { usePathname } from 'next/navigation';
import TopNav from '@/components/TopNav';
import BottomNav from '@/components/BottomNav';
import { useEffect, useState } from 'react';
import type { Menu } from '@/lib/menu-data';
import { getMenusWithItems } from '@/lib/menu-actions';
import { getSiteSettings } from '@/lib/site-settings-actions';
import type { SiteSettings } from '@/lib/site-settings-actions';
import AiAssistant from '@/components/AiAssistant';
import Footer from '@/components/Footer';

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
  
  // Generate virtual sidebar menus from navigation items that have children
  const virtualSidebarMenus = menus.flatMap(menu => {
    if (!menu.items || menu.location === 'sidebar') return [];
    
    const parentItems = menu.items.filter(item => !item.parentId);
    return parentItems.map(parentItem => {
      const children = menu.items!.filter(child => child.parentId === parentItem.id);
      if (children.length === 0) return null;
      
      return {
        id: `virtual-sidebar-${parentItem.id}`,
        name: parentItem.title,
        description: `Auto-generated sidebar for ${parentItem.title}`,
        location: 'sidebar',
        icon: parentItem.icon,
        items: children
      } as Menu;
    }).filter(Boolean) as Menu[];
  });

  const allActiveMenus = [...menus, ...virtualSidebarMenus];

  const sidebarMenuIsActive = allActiveMenus.some(m => {
    if (m.location !== 'sidebar' || !m.items || m.items.length === 0) {
      return false;
    }
    return m.items.some(item => {
        const normalizedItemPath = (item.path || '').startsWith('/') ? (item.path || '').substring(1) : (item.path || '');
        const normalizedPathname = (pathname || '').startsWith('/') ? (pathname || '').substring(1) : (pathname || '');

        const itemRoot = normalizedItemPath.split('/')[0];
        const pathnameRoot = normalizedPathname.split('/')[0];

        if (itemRoot && pathnameRoot) {
            return itemRoot === pathnameRoot;
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
      <BottomNav menu={bottomNavMenu} allMenus={allActiveMenus} loading={loading} />
      <Footer 
        siteName={siteSettings?.siteName} 
        contactAddress={siteSettings?.contactAddress}
        contactEmail={siteSettings?.contactEmail}
        contactPhone={siteSettings?.contactPhone}
      />
      <AiAssistant />
    </div>
  );
};

export default PublicLayout;
