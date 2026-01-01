'use client';
import { useEffect, useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { useFirestore, useDoc } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Save } from 'lucide-react';
import DashboardLayout from '@/app/dashboard/layout';

interface PageData {
  title: string;
  content: string;
  category: string;
}

export default function ContentEditorPage({ params }: { params: { slug: string[] } }) {
  const { slug } = params;
  const db = useFirestore();
  const { toast } = useToast();

  const category = slug[0];
  const pageSlug = slug.slice(1).join('/');
  const docPath = `pages/${category}_${pageSlug}`;

  const { data: pageData, loading, error } = useDoc<PageData>(docPath);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (pageData) {
      setTitle(pageData.title || '');
      setContent(pageData.content || '');
    }
  }, [pageData]);

  const handleSave = async () => {
    if (!db) {
      toast({
        title: 'Error',
        description: 'Koneksi database tidak tersedia.',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    try {
      const docRef = doc(db, docPath);
      await setDoc(docRef, {
        title,
        content,
        category,
        slug: pageSlug
      }, { merge: true });
      toast({
        title: 'Berhasil!',
        description: 'Konten halaman telah disimpan.',
      });
    } catch (e) {
      console.error('Error saving document: ', e);
      toast({
        title: 'Gagal Menyimpan',
        description: 'Terjadi kesalahan saat menyimpan konten.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const pageTitle = pageData?.title || pageSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Edit Konten: {pageTitle}</CardTitle>
            <CardDescription>
              Ubah judul dan isi konten untuk halaman <span className="font-mono bg-muted px-1 py-0.5 rounded">/{category}/{pageSlug}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Memuat konten...</p>
            ) : (
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Judul Halaman
                  </label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Masukkan judul halaman"
                  />
                </div>
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                    Isi Konten (HTML didukung)
                  </label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Masukkan konten halaman di sini. Anda bisa menggunakan tag HTML."
                    rows={15}
                    className="font-mono"
                  />
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSaving}>
                    <Save className="mr-2 h-4 w-4" />
                    {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                  </Button>
                </div>
              </div>
            )}
            {error && <p className="text-red-500 mt-4">Error memuat data: {error.message}</p>}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
