'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const PustakaDesa = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Pustaka Desa</h1>
      <Card>
        <CardHeader>
          <CardTitle>Pencarian Dokumen</CardTitle>
          <CardDescription>Cari dokumen, peraturan, atau laporan yang tersedia di pustaka digital desa.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full max-w-lg items-center space-x-2">
            <Input type="text" placeholder="Masukkan kata kunci..." />
            <Button type="submit">
              <Search className="h-4 w-4 mr-2"/>
              Cari
            </Button>
          </div>
          <div className="mt-6">
            <p className="text-muted-foreground">Hasil pencarian akan ditampilkan di sini.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PustakaDesa;
