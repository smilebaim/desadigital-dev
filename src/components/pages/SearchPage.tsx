'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon, FileText, Users, Building2, Wallet } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const mockResults = [
  {
    title: 'Profil Desa Remau Bako Tuo',
    path: '/profil/profil-desa',
    category: 'Profil',
    icon: Users,
    excerpt: 'Selamat datang di Desa Remau Bako Tuo, sebuah desa pesisir yang dinamis di Kecamatan Sadu...',
  },
  {
    title: 'Visi dan Misi Desa',
    path: '/profil/visi-misi',
    category: 'Profil',
    icon: Users,
    excerpt: '“Terwujudnya Desa Remau Bako Tuo sebagai Desa Maritim yang Maju, Mandiri, dan Sejahtera..."',
  },
  {
    title: 'Struktur Pemerintahan Desa',
    path: '/profil/struktur-pemerintah',
    category: 'Profil',
    icon: Building2,
    excerpt: 'Penyelenggaraan urusan pemerintahan di tingkat desa dilaksanakan oleh Pemerintah Desa Remau Bako Tuo...',
  },
  {
    title: 'Layanan Administrasi Persuratan',
    path: '/layanan/persuratan',
    category: 'Layanan',
    icon: FileText,
    excerpt: 'Pemerintah Desa Remau Bako Tuo menyediakan berbagai layanan administrasi persuratan untuk memenuhi kebutuhan masyarakat.',
  },
   {
    title: 'Anggaran Pendapatan dan Belanja Desa (APBDes)',
    path: '/dana-desa',
    category: 'Dana Desa',
    icon: Wallet,
    excerpt: 'Transparansi anggaran pendapatan dan belanja desa untuk pembangunan yang akuntabel.',
  }
];

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<typeof mockResults>([]);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) {
            setResults([]);
            setHasSearched(false);
            return;
        }

        const filteredResults = mockResults.filter(
            (item) =>
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.excerpt.toLowerCase().includes(query.toLowerCase()) ||
                item.category.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredResults);
        setHasSearched(true);
    };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-center mb-2">Pencarian Informasi</h1>
        <p className="text-muted-foreground text-center mb-6">
            Temukan informasi apa pun yang Anda butuhkan tentang Desa Remau Bako Tuo.
        </p>

        <form onSubmit={handleSearch} className="flex gap-2 mb-8">
            <div className="relative flex-grow">
                 <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Ketik kata kunci pencarian..."
                    className="w-full pl-10 h-12 text-base"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
          <Button type="submit" size="lg" className="h-12">
            <SearchIcon className="h-5 w-5 md:mr-2" />
            <span className="hidden md:inline">Cari</span>
          </Button>
        </form>

        {hasSearched && (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    Hasil Pencarian untuk &quot;{query}&quot;
                </h2>
                {results.length > 0 ? (
                    results.map((result, index) => {
                        const Icon = result.icon;
                        return (
                            <Link href={result.path} key={index} className="block">
                                <Card className="hover:bg-muted/50 transition-colors">
                                    <CardContent className="p-4 flex items-start gap-4">
                                        <div className="p-3 bg-primary/10 rounded-md">
                                            <Icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-primary">{result.category}</p>
                                            <h3 className="text-lg font-semibold hover:underline">{result.title}</h3>
                                            <p className="text-sm text-muted-foreground mt-1">{result.excerpt}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })
                ) : (
                    <div className="text-center py-10">
                        <p className="text-lg font-medium">Tidak ada hasil yang ditemukan.</p>
                        <p className="text-muted-foreground">Coba gunakan kata kunci yang berbeda.</p>
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
