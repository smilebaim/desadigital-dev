'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  BarChart, Bar, 
  LineChart, Line, 
  PieChart, Pie, Cell, 
  AreaChart, Area,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { getStatistikByKey, type StatistikData } from '@/lib/statistik-actions';
import { Loader } from 'lucide-react';

interface DynamicStatChartProps {
    statKey?: string;
    previewData?: {
         title: string;
         group: string;
         data: string;
    };
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

export default function DynamicStatChart({ statKey, previewData }: DynamicStatChartProps) {
    const [stat, setStat] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (previewData) {
             setStat({
                 title: previewData.title,
                 group: previewData.group,
                 data: previewData.data
             });
             setLoading(false);
             return;
        }

        const fetchStat = async () => {
            if (!statKey) return;
            setLoading(true);
            try {
                const data = await getStatistikByKey(statKey);
                if (data) {
                    setStat(data);
                } else {
                    setError('Data statistik tidak ditemukan.');
                }
            } catch (err) {
                setError('Gagal memuat data statistik.');
            }
            setLoading(false);
        };
        fetchStat();
    }, [statKey, previewData]);

    if (loading) {
        return (
            <Card className="my-8">
               <CardContent className="h-[300px] flex flex-col items-center justify-center p-6 text-muted-foreground">
                   <Loader className="animate-spin h-8 w-8 mb-4 text-primary" />
                   <p>Memuat visualisasi data...</p>
               </CardContent>
            </Card>
        );
    }

    if (error || !stat) {
        return (
             <Card className="my-8 border-destructive/50 bg-destructive/5">
               <CardContent className="p-6 text-center text-destructive">
                   <p>{error || 'Data statistik tidak tersedia.'}</p>
                   <p className="text-sm mt-2 opacity-80">Kunci: {statKey}</p>
               </CardContent>
            </Card>
        );
    }

    let parsedData: any = {};
    try {
        parsedData = JSON.parse(stat.data);
    } catch {
        return (
             <Card className="my-8">
               <CardContent className="p-6 text-center text-destructive">
                   <p>Format data statistik tidak valid (Bukan JSON).</p>
               </CardContent>
            </Card>
        );
    }

    // Default to bar if not specified or not custom
    const chartType = parsedData.chartType || 'bar';
    const labels: string[] = parsedData.labels || [];
    const datasets: { label: string, data: number[], color?: string }[] = parsedData.datasets || [];

    if (labels.length === 0 || datasets.length === 0) {
        return (
             <Card className="my-8">
               <CardContent className="p-6 text-center text-muted-foreground">
                   <p>Data belum diisi lengkap.</p>
               </CardContent>
            </Card>
        );
    }

    // Transform for Recharts
    const chartData = labels.map((label, index) => {
        const row: any = { name: label };
        datasets.forEach(ds => {
            row[ds.label] = ds.data[index] || 0;
        });
        return row;
    });

    const renderChart = () => {
        switch (chartType) {
            case 'area':
                return (
                    <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {datasets.map((ds, idx) => {
                            const color = ds.color || COLORS[idx % COLORS.length];
                            return (
                                <Area key={idx} type="monotone" dataKey={ds.label} stroke={color} fill={color} fillOpacity={0.3} />
                            );
                        })}
                    </AreaChart>
                );
            case 'radar':
                return (
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="name" />
                        <PolarRadiusAxis />
                        <Tooltip />
                        <Legend />
                        {datasets.map((ds, idx) => {
                             const color = ds.color || COLORS[idx % COLORS.length];
                             return (
                                <Radar key={idx} name={ds.label} dataKey={ds.label} stroke={color} fill={color} fillOpacity={0.5} />
                             );
                        })}
                    </RadarChart>
                );
            case 'line':
                return (
                    <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {datasets.map((ds, idx) => {
                             const color = ds.color || COLORS[idx % COLORS.length];
                             return <Line key={idx} type="monotone" dataKey={ds.label} stroke={color} strokeWidth={2} activeDot={{ r: 8 }} />;
                        })}
                    </LineChart>
                );
            case 'pie':
            case 'doughnut': {
                const pieData = labels.map((label, index) => ({
                    name: label,
                    value: datasets[0]?.data[index] || 0
                }));
                // In pie/doughnut we typically vary color per label slice, but we can respect ds.color generically for the first slice or leave the palette.
                // We'll leave the palette logic here since pie chart represents one dataset broken down.
                return (
                   <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                       <Tooltip />
                       <Legend verticalAlign="bottom" height={36}/>
                       <Pie 
                          data={pieData} 
                          cx="50%" 
                          cy="50%" 
                          innerRadius={chartType === 'doughnut' ? 60 : 0}
                          outerRadius={100} 
                          fill="#8884d8" 
                          dataKey="value"
                          label
                       >
                           {pieData.map((_, index) => (
                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                           ))}
                       </Pie>
                   </PieChart>
                );
            }
            case 'bar':
            default:
                return (
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {datasets.map((ds, idx) => {
                             const color = ds.color || COLORS[idx % COLORS.length];
                             return <Bar key={idx} dataKey={ds.label} fill={color} radius={[4, 4, 0, 0]} />;
                        })}
                    </BarChart>
                );
        }
    };

    return (
        <Card className="my-8">
            <CardHeader>
                <CardTitle>{stat.title}</CardTitle>
                <CardDescription>{stat.group}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                         {renderChart()}
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
