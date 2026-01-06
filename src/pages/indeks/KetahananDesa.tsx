import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const KetahananDesa = () => {
  const ketahananDesaData = {
    tahun: "2024",
    skor_total: 0.77,
    status: "Berkembang",
    indikator: [
      {
        name: "Ketahanan Pangan",
        skor: 0.82,
        status: "Maju",
        subIndikator: [
          { name: "Ketersediaan Pangan", value: 85 },
          { name: "Akses Pangan", value: 80 },
          { name: "Stabilitas Pangan", value: 80 }
        ]
      },
      {
        name: "Ketahanan Energi",
        skor: 0.75,
        status: "Berkembang",
        subIndikator: [
          { name: "Akses Listrik", value: 95 },
          { name: "Energi Terbarukan", value: 60 },
          { name: "Efisiensi Energi", value: 70 }
        ]
      },
      {
        name: "Ketahanan Informasi",
        skor: 0.70,
        status: "Berkembang",
        subIndikator: [
          { name: "Akses Internet", value: 75 },
          { name: "Literasi Digital", value: 65 },
          { name: "Sistem Informasi Desa", value: 70 }
        ]
      },
      {
        name: "Ketahanan Ekologi",
        skor: 0.78,
        status: "Berkembang",
        subIndikator: [
          { name: "Pengelolaan Lingkungan", value: 80 },
          { name: "Mitigasi Bencana", value: 75 },
          { name: "Konservasi", value: 80 }
        ]
      },
      {
        name: "Ketahanan Sosial",
        skor: 0.85,
        status: "Maju",
        subIndikator: [
          { name: "Gotong Royong", value: 90 },
          { name: "Toleransi", value: 85 },
          { name: "Partisipasi", value: 80 }
        ]
      },
      {
        name: "Ketahanan Ekonomi",
        skor: 0.73,
        status: "Berkembang",
        subIndikator: [
          { name: "BUMDes", value: 75 },
          { name: "UMKM", value: 70 },
          { name: "Keuangan Inklusif", value: 75 }
        ]
      },
      {
        name: "Ketahanan Infrastruktur",
        skor: 0.76,
        status: "Berkembang",
        subIndikator: [
          { name: "Jalan Desa", value: 80 },
          { name: "Fasilitas Publik", value: 75 },
          { name: "Sanitasi", value: 75 }
        ]
      },
      {
        name: "Ketahanan Kelembagaan",
        skor: 0.80,
        status: "Maju",
        subIndikator: [
          { name: "Tata Kelola", value: 85 },
          { name: "Pelayanan Publik", value: 80 },
          { name: "Kemitraan", value: 75 }
        ]
      }
    ],
    trendSkor: [
      { tahun: "2021", skor: 0.68 },
      { tahun: "2022", skor: 0.72 },
      { tahun: "2023", skor: 0.75 },
      { tahun: "2024", skor: 0.77 }
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
          <h2 className="text-3xl font-bold tracking-tight">8 Ketahanan Desa</h2>
          <p className="text-muted-foreground">
            Status Ketahanan Desa Tahun {ketahananDesaData.tahun}
          </p>
        </div>

        {/* Skor Total Card */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Skor Total Ketahanan Desa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  {formatPercentage(ketahananDesaData.skor_total)}
                </div>
                <Badge className={getStatusColor(ketahananDesaData.status)}>
                  {ketahananDesaData.status}
                </Badge>
              </div>
              <Progress 
                value={ketahananDesaData.skor_total * 100} 
                className="h-2 mt-2" 
              />
            </CardContent>
          </Card>
        </div>

        {/* Radar Chart Indikator */}
        <Card>
          <CardHeader>
            <CardTitle>Pemetaan 8 Ketahanan Desa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={ketahananDesaData.indikator}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis angle={30} domain={[0, 1]} />
                  <Radar
                    name="Skor"
                    dataKey="skor"
                    stroke="#FFBB28"
                    fill="#FFBB28"
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
            <CardTitle>Trend Ketahanan Desa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ketahananDesaData.trendSkor}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="tahun" />
                  <YAxis domain={[0, 1]} tickFormatter={(value) => formatPercentage(value)} />
                  <Tooltip formatter={(value) => formatPercentage(Number(value))} />
                  <Legend />
                  <Bar dataKey="skor" fill="#FFBB28" name="Skor Ketahanan Desa" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Detail Indikator */}
        <div className="grid gap-4 md:grid-cols-2">
          {ketahananDesaData.indikator.map((indikator, index) => (
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
                  <div className="flex justify-between items-center">
                    <span>Skor Total</span>
                    <span className="font-bold">{formatPercentage(indikator.skor)}</span>
                  </div>
                  <Progress value={indikator.skor * 100} className="h-2" />
                  <div className="space-y-3">
                    {indikator.subIndikator.map((sub, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{sub.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {sub.value}%
                          </span>
                        </div>
                        <Progress value={sub.value} className="h-1" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KetahananDesa; 