import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings,
  User,
  Bell,
  Lock,
  Globe,
  Palette,
  Database,
  Shield,
  Mail,
  BellRing,
  BellOff,
  Save
} from "lucide-react";
import { useState } from "react";

const Pengaturan = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    updates: false,
    reports: true
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Pengaturan</h2>
        <p className="text-muted-foreground">
          Kelola pengaturan sistem dan profil Anda
        </p>
      </div>

      <Tabs defaultValue="profil" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profil" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profil
          </TabsTrigger>
          <TabsTrigger value="notifikasi" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifikasi
          </TabsTrigger>
          <TabsTrigger value="keamanan" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Keamanan
          </TabsTrigger>
          <TabsTrigger value="tampilan" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Tampilan
          </TabsTrigger>
          <TabsTrigger value="sistem" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Sistem
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profil" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Profil</CardTitle>
              <CardDescription>
                Update informasi profil Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Lengkap</Label>
                  <Input id="nama" placeholder="Masukkan nama lengkap" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Masukkan email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telepon">Nomor Telepon</Label>
                  <Input id="telepon" placeholder="Masukkan nomor telepon" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jabatan">Jabatan</Label>
                  <Input id="jabatan" placeholder="Masukkan jabatan" />
                </div>
              </div>
              <Button className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Simpan Perubahan
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifikasi" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Notifikasi</CardTitle>
              <CardDescription>
                Kelola preferensi notifikasi Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notifikasi Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Terima notifikasi melalui email
                  </p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, email: checked})
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notifikasi Push</Label>
                  <p className="text-sm text-muted-foreground">
                    Terima notifikasi langsung di browser
                  </p>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, push: checked})
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Pembaruan Sistem</Label>
                  <p className="text-sm text-muted-foreground">
                    Dapatkan informasi tentang pembaruan sistem
                  </p>
                </div>
                <Switch
                  checked={notifications.updates}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, updates: checked})
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Laporan Otomatis</Label>
                  <p className="text-sm text-muted-foreground">
                    Terima laporan berkala secara otomatis
                  </p>
                </div>
                <Switch
                  checked={notifications.reports}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, reports: checked})
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keamanan" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Keamanan Akun</CardTitle>
              <CardDescription>
                Kelola keamanan akun Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password-lama">Password Lama</Label>
                <Input id="password-lama" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-baru">Password Baru</Label>
                <Input id="password-baru" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="konfirmasi-password">Konfirmasi Password Baru</Label>
                <Input id="konfirmasi-password" type="password" />
              </div>
              <Button className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Update Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tampilan" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Tampilan</CardTitle>
              <CardDescription>
                Sesuaikan tampilan aplikasi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mode Gelap</Label>
                  <p className="text-sm text-muted-foreground">
                    Aktifkan tampilan mode gelap
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Kompak</Label>
                  <p className="text-sm text-muted-foreground">
                    Tampilkan lebih banyak konten dalam satu layar
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sistem" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Sistem</CardTitle>
              <CardDescription>
                Konfigurasi sistem dan database
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Backup Otomatis</Label>
                  <p className="text-sm text-muted-foreground">
                    Lakukan backup data secara otomatis
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Log Aktivitas</Label>
                  <p className="text-sm text-muted-foreground">
                    Catat semua aktivitas pengguna
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mode Pemeliharaan</Label>
                  <p className="text-sm text-muted-foreground">
                    Aktifkan mode pemeliharaan sistem
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Pengaturan; 