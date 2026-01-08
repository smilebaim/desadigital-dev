"use client";
import { MapComponent } from "@/components/MapComponent";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Layers, MapPin, Settings } from "lucide-react";

export default function Page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
      <div className="lg:col-span-1 h-full overflow-y-auto">
        <Card className="h-full flex flex-col">
          <CardHeader>
            <CardTitle>Manajemen Peta</CardTitle>
            <CardDescription>
              Kelola lapisan data, titik penting, dan pengaturan peta Anda.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <Tabs defaultValue="layers" className="flex flex-col h-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="layers">
                  <Layers className="h-4 w-4 mr-2" />
                  Lapisan
                </TabsTrigger>
                <TabsTrigger value="pois">
                  <MapPin className="h-4 w-4 mr-2" />
                  Titik
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Atur
                </TabsTrigger>
              </TabsList>
              <TabsContent value="layers" className="flex-grow mt-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Lapisan Data</h3>
                    <Button size="sm">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Tambah
                    </Button>
                  </div>
                  <div className="p-4 bg-muted rounded-md text-center text-sm text-muted-foreground">
                    Belum ada lapisan data.
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="pois" className="flex-grow mt-4">
                <div className="space-y-4">
                   <div className="flex justify-between items-center">
                    <h3 className="font-medium">Titik Penting</h3>
                    <Button size="sm">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Tambah
                    </Button>
                  </div>
                  <div className="p-4 bg-muted rounded-md text-center text-sm text-muted-foreground">
                    Belum ada titik penting.
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="settings" className="flex-grow mt-4">
                 <div className="space-y-4">
                  <h3 className="font-medium">Pengaturan Peta</h3>
                   <div className="space-y-2">
                    <Label htmlFor="lat">Latitude Awal</Label>
                    <Input id="lat" placeholder="-1.222418" />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="lng">Longitude Awal</Label>
                    <Input id="lng" placeholder="104.383073" />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="zoom">Tingkat Zoom Awal</Label>
                    <Input id="zoom" type="number" placeholder="16" />
                  </div>
                  <Button>Simpan Pengaturan</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2 h-full rounded-lg overflow-hidden">
        <MapComponent />
      </div>
    </div>
  );
}
