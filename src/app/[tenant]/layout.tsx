import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/site-settings-actions";

interface TenantLayoutProps {
  children: React.ReactNode;
  params: { tenant: string };
}

export async function generateMetadata({ params }: { params: Promise<{ tenant: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const settings = await getSiteSettings(resolvedParams.tenant);

  const siteName = settings?.siteName || `Desa ${resolvedParams.tenant.charAt(0).toUpperCase() + resolvedParams.tenant.slice(1)}`;
  const description = settings?.siteDescription || `Sistem Informasi Resmi Desa ${siteName}`;
  const keywords = settings?.siteKeywords || "desa, sistem informasi desa, layanan publik";
  const ogImage = settings?.ogImageUrl || "/Background utama.png";

  return {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description,
    keywords,
    openGraph: {
      type: "website",
      siteName,
      title: siteName,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description,
      images: [ogImage],
    },
  };
}

export default function TenantLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
