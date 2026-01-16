import LandingPage from "@/pages/landing/LandingPage";
import PublicLayout from "@/layouts/PublicLayout";
import { getSiteSettings } from "@/lib/site-settings-actions";
import type { SiteSettings } from "@/lib/site-settings-actions";

export default async function Home() {
  const settings = await getSiteSettings();

  return (
    <PublicLayout>
      <LandingPage settings={settings} />
    </PublicLayout>
  );
}
