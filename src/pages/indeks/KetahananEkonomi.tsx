import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const KetahananEkonomi = () => {
  const ketahananEkonomiData = {
    tahun: "2024",
    skor_total: 0.72,
    status: "Berkembang",
    indikator: [
      {
        name: "Keragaman Produksi",
        skor: 0.75,
        status: "Berkembang",
        subIndikator: [
          { name: "Pertanian", value: 85 },
          { name: "Peternakan", value: 70 },
          { name: "Perikanan", value: 65 }
        ]
      },
      {
        name: "Tersedia Pusat Perdagangan",
        skor: 0.68,
        status: "Berkembang",
        subIndikator: [
          { name: "Pasar Desa", value: 70 },
          { name: "Toko/Warung", value: 85 },
          { name: "Akses ke Pasar", value: 60 }
        ]
      },
      {
        name: "Akses Distribusi Logistik",
        skor: 0.80,
        status: "Maju",
        subIndikator: [
          { name: "Transportasi Umum", value: 75 },
          { name: "Jalan Desa", value: 85 },
          { name: "Distribusi Barang", value: 80 }
        ]
      },
      {
        name: "Akses ke Lembaga Keuangan",
        skor: 0.65,
        status: "Berkembang",
        subIndikator: [
          { name: "Bank", value: 60 },
          { name: "Koperasi", value: 75 },
          { name: "BUMDes", value: 70 }
        ]
      }
    ],
    trendSkor: [
      { tahun: "2021", skor: 0.60 },
      { tahun: "2022", skor: 0.65 },
      { tahun: "2023", skor: 0.68 },
      { tahun: "2024", skor: 0.72 }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "maju":
        return "bg-green-500";
      case "berkembang":
        return "bg-yellow-500";
      case "tertinggal":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  return (
    <div className="container mx-auto px-4 pt-20 pb-24">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Indeks Ketahanan Ekonomi</h2>
          <p className="text-muted-foreground">
            Status Ketahanan Ekonomi Desa Tahun {ketahananEkonomiData.tahun}
          </p>
        </div>

        {/* Skor Total Card */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Skor Total Ketahanan Ekonomi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  {formatPercentage(ketahananEkonomiData.skor_total)}
                </div>
                <Badge className={getStatusColor(ketahananEkonomiData.status)}>
                  {ketahananEkonomiData.status}
                </Badge>
              </div>
              <Progress 
                value={ketahananEkonomiData.skor_total * 100} 
                className="h-2 mt-2" 
              />
            </CardContent>
          </Card>
        </div>

        {/* Radar Chart Indikator */}
        <Card>
          <CardHeader>
            <CardTitle>Pemetaan Indikator Ketahanan Ekonomi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={ketahananEkonomiData.indikator}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis angle={30} domain={[0, 1]} />
                  <Radar
                    name="Skor"
                    dataKey="skor"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.6}
                  />
                  <Tooltip formatter={(value) => formatPercentage(Number(value))} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Trend Skor */}
        <Card>
          <CardHeader>
            <CardTitle>Trend Skor Ketahanan Ekonomi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ketahananEkonomiData.trendSkor}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="tahun" />
                  <YAxis domain={[0, 1]} tickFormatter={(value) => formatPercentage(value)} />
                  <Tooltip formatter={(value) => formatPercentage(Number(value))} />
                  <Legend />
                  <Bar dataKey="skor" fill="#82ca9d" name="Skor Ketahanan Ekonomi" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Detail Indikator */}
        <div className="grid gap-4 md:grid-cols-2">
          {ketahananEkonomiData.indikator.map((indikator, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{indikator.name}</CardTitle>
                  <Badge className={getStatusColor(indikator.status)}>
                    {indikator.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {indikator.subIndikator.map((sub, subIndex) => (
                    <div key={subIndex} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{sub.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {sub.value}%
                        </span>
                      </div>
                      <Progress value={sub.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KetahananEkonomi; 