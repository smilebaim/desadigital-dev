import LandingPage from "@/pages/landing/LandingPage";
import PublicLayout from "@/layouts/PublicLayout";
import { getSiteSettings } from "@/lib/site-settings-actions";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function TenantHomePage() {
  // Baca tenant aktif dari cookie yang di-set oleh middleware
  const cookieStore = await cookies();
  const tenantId = cookieStore.get("x-tenant-id")?.value || undefined;

  // Ambil settings sesuai tenant — fallback ke 'main' otomatis di dalam fungsi
  const settings = await getSiteSettings(tenantId);

  return (
    <PublicLayout>
      <LandingPage settings={settings} />
    </PublicLayout>
  );
}
