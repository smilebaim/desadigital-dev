import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IDM from "./IDM";
import SDGs from "./SDGs";

const IndeksPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Indeks Desa</h1>
          <p className="text-muted-foreground">
            Penilaian dan Status Perkembangan Desa
          </p>
        </div>

        <Tabs defaultValue="idm" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="idm">Indeks Desa Membangun (IDM)</TabsTrigger>
            <TabsTrigger value="sdgs">SDGs Desa</TabsTrigger>
          </TabsList>
          <TabsContent value="idm">
            <IDM />
          </TabsContent>
          <TabsContent value="sdgs">
            <SDGs />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default IndeksPage; 