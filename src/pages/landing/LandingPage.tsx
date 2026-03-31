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
        heroBadge={settings?.heroBadge}
        heroBadgeColor={settings?.heroBadgeColor}
        heroTitleColor={settings?.heroTitleColor}
        heroSubtitleColor={settings?.heroSubtitleColor}
        heroDescriptionColor={settings?.heroDescriptionColor}
        heroOverlayOpacity={settings?.heroOverlayOpacity}
        heroOverlayColor={settings?.heroOverlayColor}
        heroHeight={settings?.heroHeight}
      />
    </div>
  );
};

export default LandingPage;
