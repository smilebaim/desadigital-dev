
'use client';
import PublicLayout from "@/layouts/PublicLayout";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/info');
  }, [router]);

  return (
    <PublicLayout>
       <div className="flex justify-center items-center min-h-screen">
            <p>Mengalihkan ke halaman berita...</p>
        </div>
    </PublicLayout>
  );
}
