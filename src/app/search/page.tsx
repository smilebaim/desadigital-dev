import PublicLayout from "@/layouts/PublicLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function SearchPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8 mt-16 mb-20">
        <h1 className="text-3xl font-bold mb-6">Pencarian</h1>
        <div className="flex gap-2">
          <Input placeholder="Masukkan kata kunci pencarian..." />
          <Button>
            <Search className="h-4 w-4 mr-2" />
            Cari
          </Button>
        </div>
      </div>
    </PublicLayout>
  );
}
