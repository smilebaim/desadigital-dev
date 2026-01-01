import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Activity, Map, Globe, AppWindow, Settings2, Home, Building2, HeartHandshake, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const DashboardHome = () => {
  const statsItems = [
    {
      title: "Total Surat",
      value: "156",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      title: "Pengguna Aktif",
      value: "12",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Aktivitas Hari Ini",
      value: "24",
      icon: Activity,
      color: "text-purple-600"
    }
  ];

  // Data untuk chart penduduk berdasarkan usia
  const pendudukData = [
    { name: '0-14', value: 450 },
    { name: '15-24', value: 380 },
    { name: '25-54', value: 620 },
    { name: '55-64', value: 180 },
    { name: '65+', value: 120 },
  ];

  // Data untuk chart ekonomi
  const ekonomiData = [
    { name: 'Pertanian', value: 45 },
    { name: 'Perdagangan', value: 25 },
    { name: 'Jasa', value: 20 },
    { name: 'Industri', value: 10 },
  ];

  // Data untuk chart fasilitas
  const fasilitasData = [
    { name: 'Jan', value: 4 },
    { name: 'Feb', value: 3 },
    { name: 'Mar', value: 5 },
    { name: 'Apr', value: 2 },
    { name: 'Mei', value: 6 },
    { name: 'Jun', value: 4 },
  ];

  // Data untuk chart layanan
  const layananData = [
    { name: 'Surat Keterangan', value: 65 },
    { name: 'Surat Nikah', value: 25 },
    { name: 'Surat Domisili', value: 45 },
    { name: 'Surat Usaha', value: 30 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-black/60">
            Selamat datang di panel admin Desa Remau Bakotuo. 
            Kelola informasi dan layanan desa dari sini.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statsItems.map((item, index) => (
          <Card key={index} className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-black">
                {item.title}
              </CardTitle>
              <item.icon className={`h-4 w-4 ${item.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-black text-sm">Demografi Penduduk</CardTitle>
            <CardDescription className="text-black/60 text-xs">
              Distribusi penduduk berdasarkan usia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pendudukData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-black text-sm">Sektor Ekonomi</CardTitle>
            <CardDescription className="text-black/60 text-xs">
              Distribusi sektor ekonomi desa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ekonomiData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {ekonomiData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-black text-sm">Fasilitas Desa</CardTitle>
            <CardDescription className="text-black/60 text-xs">
              Jumlah fasilitas yang dibangun per bulan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fasilitasData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-black text-sm">Layanan Desa</CardTitle>
            <CardDescription className="text-black/60 text-xs">
              Jumlah layanan yang diberikan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={layananData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#FF8042" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-black">Aktivitas Terbaru</CardTitle>
          <CardDescription className="text-black/60">
            Daftar aktivitas terakhir di sistem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-black" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-black">
                    Surat keterangan baru telah dibuat
                  </p>
                  <p className="text-sm text-black/60">
                    2 menit yang lalu
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;
