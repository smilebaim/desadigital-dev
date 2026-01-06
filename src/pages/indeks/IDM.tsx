import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import GaugeChart from "@/components/GaugeChart";

const IDM = () => {
  const idmData = {
    tahun: "2024",
    skor_total: 0.75,
    status: "Berkembang",
    indikator: [
      {
        name: "Ketahanan Sosial",
        skor: 0.82,
        status: "Maju",
        subIndikator: [
          { name: "Kesehatan", value: 85 },
          { name: "Pendidikan", value: 80 },
          { name: "Modal Sosial", value: 82 }
        ]
      },
      {
        name: "Ketahanan Ekonomi",
        skor: 0.68,
        status: "Berkembang",
        subIndikator: [
          { name: "Ekonomi Produktif", value: 70 },
          { name: "Kewirausahaan", value: 65 },
          { name: "Perdagangan", value: 70 }
        ]
      },
      {
        name: "Ketahanan Lingkungan",
        skor: 0.74,
        status: "Berkembang",
        subIndikator: [
          { name: "Kualitas Lingkungan", value: 75 },
          { name: "Pencegahan Bencana", value: 72 },
          { name: "Permukiman", value: 75 }
        ]
      }
    ],
    trendSkor: [
      { tahun: "2021", skor: 0.65 },
      { tahun: "2022", skor: 0.69 },
      { tahun: "2023", skor: 0.72 },
      { tahun: "2024", skor: 0.75 }
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
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Indeks Desa Membangun</h2>
          <p className="text-muted-foreground">
            Status IDM Tahun {idmData.tahun}
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left Column - Summary */}
          <div className="space-y-6">
            {/* Skor Total Card */}
            <Card>
              <CardHeader>
                <CardTitle>Skor Total IDM</CardTitle>
              </CardHeader>
              <CardContent>
                <GaugeChart value={idmData.skor_total} status={idmData.status} size="lg" />
              </CardContent>
            </Card>

            {/* Trend Skor */}
            <Card>
              <CardHeader>
                <CardTitle>Trend IDM</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={idmData.trendSkor}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="tahun" />
                      <YAxis domain={[0, 1]} tickFormatter={(value) => formatPercentage(value)} />
                      <Tooltip formatter={(value) => formatPercentage(Number(value))} />
                      <Legend />
                      <Bar dataKey="skor" fill="#2563eb" name="Skor IDM" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Radar & Details */}
          <div className="space-y-6">
            {/* Radar Chart Indikator */}
            <Card>
              <CardHeader>
                <CardTitle>Pemetaan Indikator IDM</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={idmData.indikator}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" />
                      <PolarRadiusAxis angle={30} domain={[0, 1]} />
                      <Radar
                        name="Skor"
                        dataKey="skor"
                        stroke="#2563eb"
                        fill="#2563eb"
                        fillOpacity={0.6}
                      />
                      <Tooltip formatter={(value) => formatPercentage(Number(value))} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detail Indikator */}
        <div className="grid gap-4 md:grid-cols-3">
          {idmData.indikator.map((indikator, index) => (
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
                  <GaugeChart 
                    value={indikator.skor} 
                    status={indikator.status} 
                    size="sm"
                  />
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

export default IDM; 