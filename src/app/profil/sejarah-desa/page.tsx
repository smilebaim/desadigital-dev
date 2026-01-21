import PublicLayout from "@/layouts/PublicLayout";
import SejarahDesa from "@/pages/profile/SejarahDesa";
import { getSejarahDesa } from "@/lib/sejarah-desa-actions";

export default async function Page() {
  const sejarahData = await getSejarahDesa();
  return (
    <PublicLayout>
      <SejarahDesa data={sejarahData} />
    </PublicLayout>
  );
}
