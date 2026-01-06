import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const KetahananSosial = () => {
  const ketahananSosialData = {
    tahun: "2024",
    skor_total: 0.78,
    status: "Berkembang",
    indikator: [
      {
        name: "Kesehatan",
        skor: 0.85,
        status: "Maju",
        subIndikator: [
          { name: "Pelayanan Kesehatan", value: 85 },
          { name: "Keberdayaan Masyarakat untuk Kesehatan", value: 80 },
          { name: "Jaminan Kesehatan", value: 90 }
        ]
      },
      {
        name: "Pendidikan",
        skor: 0.75,
        status: "Berkembang",
        subIndikator: [
          { name: "Akses Pendidikan Dasar & Menengah", value: 75 },
          { name: "Akses Pendidikan Non Formal", value: 70 },
          { name: "Akses ke Pengetahuan", value: 80 }
        ]
      },
      {
        name: "Modal Sosial",
        skor: 0.82,
        status: "Maju",
        subIndikator: [
          { name: "Solidaritas Sosial", value: 85 },
          { name: "Toleransi", value: 90 },
          { name: "Rasa Aman", value: 75 }
        ]
      },
      {
        name: "Permukiman",
        skor: 0.70,
        status: "Berkembang",
        subIndikator: [
          { name: "Akses ke Air Bersih", value: 75 },
          { name: "Akses ke Sanitasi", value: 65 },
          { name: "Akses ke Listrik", value: 95 }
        ]
      }
    ],
    trendSkor: [
      { tahun: "2021", skor: 0.65 },
      { tahun: "2022", skor: 0.70 },
      { tahun: "2023", skor: 0.75 },
      { tahun: "2024", skor: 0.78 }
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
          <h2 className="text-3xl font-bold tracking-tight">Indeks Ketahanan Sosial</h2>
          <p className="text-muted-foreground">
            Status Ketahanan Sosial Desa Tahun {ketahananSosialData.tahun}
          </p>
        </div>

        {/* Skor Total Card */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Skor Total Ketahanan Sosial</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  {formatPercentage(ketahananSosialData.skor_total)}
                </div>
                <Badge className={getStatusColor(ketahananSosialData.status)}>
                  {ketahananSosialData.status}
                </Badge>
              </div>
              <Progress 
                value={ketahananSosialData.skor_total * 100} 
                className="h-2 mt-2" 
              />
            </CardContent>
          </Card>
        </div>

        {/* Radar Chart Indikator */}
        <Card>
          <CardHeader>
            <CardTitle>Pemetaan Indikator Ketahanan Sosial</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={ketahananSosialData.indikator}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis angle={30} domain={[0, 1]} />
                  <Radar
                    name="Skor"
                    dataKey="skor"
                    stroke="#8884d8"
                    fill="#8884d8"
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
            <CardTitle>Trend Skor Ketahanan Sosial</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ketahananSosialData.trendSkor}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="tahun" />
                  <YAxis domain={[0, 1]} tickFormatter={(value) => formatPercentage(value)} />
                  <Tooltip formatter={(value) => formatPercentage(Number(value))} />
                  <Legend />
                  <Bar dataKey="skor" fill="#8884d8" name="Skor Ketahanan Sosial" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Detail Indikator */}
        <div className="grid gap-4 md:grid-cols-2">
          {ketahananSosialData.indikator.map((indikator, index) => (
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

export default KetahananSosial; 