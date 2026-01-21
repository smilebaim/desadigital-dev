import PublicLayout from "@/layouts/PublicLayout";
import StrukturPemerintah from "@/pages/profile/StrukturPemerintah";
import { getPemerintahan } from "@/lib/pemerintahan-actions";

export default async function Page() {
  const pemerintahanData = await getPemerintahan();
  return (
    <PublicLayout>
      <StrukturPemerintah data={pemerintahanData} />
    </PublicLayout>
  );
}
