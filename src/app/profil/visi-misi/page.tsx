import PublicLayout from "@/layouts/PublicLayout";
import VisiMisi from "@/pages/profile/VisiMisi";
import { getVisiMisi } from "@/lib/visi-misi-actions";

export default async function Page() {
  const visiMisiData = await getVisiMisi();

  return (
    <PublicLayout>
      <VisiMisi data={visiMisiData} />
    </PublicLayout>
  );
}
