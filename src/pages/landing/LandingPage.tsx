'use client';
import Hero from "@/components/Hero";
import type { SiteSettings } from "@/lib/site-settings-actions";

const LandingPage = ({ settings }: { settings: SiteSettings | null }) => {
  return (
    <div className="flex-1">
      <Hero 
        heroUrl={settings?.heroUrl} 
        heroTitle={settings?.heroTitle}
        heroSubtitle={settings?.heroSubtitle}
        heroDescription={settings?.heroDescription}
      />
    </div>
  );
};

export default LandingPage;
