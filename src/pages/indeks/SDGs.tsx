import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import GaugeChart from "@/components/GaugeChart";

const SDGs = () => {
  const sdgsData = {
    tahun: "2024",
    skor_total: 0.73,
    status: "Berkembang",
    indikator: [
      {
        name: "Tanpa Kemiskinan",
        skor: 0.75,
        status: "Berkembang",
        subIndikator: [
          { name: "Pendapatan", value: 75 },
          { name: "Akses Layanan Dasar", value: 78 },
          { name: "Perlindungan Sosial", value: 72 }
        ]
      },
      {
        name: "Tanpa Kelaparan",
        skor: 0.82,
        status: "Maju",
        subIndikator: [
          { name: "Ketahanan Pangan", value: 85 },
          { name: "Gizi Seimbang", value: 80 },
          { name: "Pertanian Berkelanjutan", value: 82 }
        ]
      },
      {
        name: "Kesehatan & Kesejahteraan",
        skor: 0.78,
        status: "Berkembang",
        subIndikator: [
          { name: "Layanan Kesehatan", value: 80 },
          { name: "Sanitasi", value: 75 },
          { name: "Kesehatan Ibu & Anak", value: 78 }
        ]
      },
      {
        name: "Pendidikan Berkualitas",
        skor: 0.70,
        status: "Berkembang",
        subIndikator: [
          { name: "Akses Pendidikan", value: 75 },
          { name: "Kualitas Pengajar", value: 68 },
          { name: "Fasilitas Pendidikan", value: 70 }
        ]
      },
      {
        name: "Air Bersih & Sanitasi",
        skor: 0.68,
        status: "Berkembang",
        subIndikator: [
          { name: "Akses Air Bersih", value: 70 },
          { name: "Sanitasi Layak", value: 65 },
          { name: "Pengelolaan Limbah", value: 68 }
        ]
      }
    ],
    trendSkor: [
      { tahun: "2021", skor: 0.65 },
      { tahun: "2022", skor: 0.68 },
      { tahun: "2023", skor: 0.71 },
      { tahun: "2024", skor: 0.73 }
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
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">SDGs Desa</h2>
          <p className="text-muted-foreground">
            Status SDGs Tahun {sdgsData.tahun}
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left Column - Summary */}
          <div className="space-y-6">
            {/* Skor Total Card */}
            <Card>
              <CardHeader>
                <CardTitle>Skor Total SDGs</CardTitle>
              </CardHeader>
              <CardContent>
                <GaugeChart value={sdgsData.skor_total} status={sdgsData.status} size="lg" />
              </CardContent>
            </Card>

            {/* Trend Skor */}
            <Card>
              <CardHeader>
                <CardTitle>Trend SDGs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sdgsData.trendSkor}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="tahun" />
                      <YAxis domain={[0, 1]} tickFormatter={(value) => formatPercentage(value)} />
                      <Tooltip formatter={(value) => formatPercentage(Number(value))} />
                      <Legend />
                      <Bar dataKey="skor" fill="#10b981" name="Skor SDGs" />
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
                <CardTitle>Pemetaan Indikator SDGs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={sdgsData.indikator}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" />
                      <PolarRadiusAxis angle={30} domain={[0, 1]} />
                      <Radar
                        name="Skor"
                        dataKey="skor"
                        stroke="#10b981"
                        fill="#10b981"
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
          {sdgsData.indikator.map((indikator, index) => (
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

export default SDGs; 