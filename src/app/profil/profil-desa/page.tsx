import ProfilDesa from "@/pages/profile/ProfilDesa";
import PublicLayout from "@/layouts/PublicLayout";
import { getProfilDesa } from "@/lib/profil-desa-actions";

export default async function Page() {
  const profilData = await getProfilDesa();
  return (
    <PublicLayout>
      <ProfilDesa data={profilData} />
    </PublicLayout>
  );
}
