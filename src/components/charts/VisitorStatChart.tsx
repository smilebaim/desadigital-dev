'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const data = [
  { name: "Jan", visitors: 400, pageViews: 2400 },
  { name: "Feb", visitors: 300, pageViews: 1398 },
  { name: "Mar", visitors: 200, pageViews: 9800 },
  { name: "Apr", visitors: 278, pageViews: 3908 },
  { name: "Mei", visitors: 189, pageViews: 4800 },
  { name: "Jun", visitors: 239, pageViews: 3800 },
  { name: "Jul", visitors: 349, pageViews: 4300 },
];

export default function VisitorStatChart() {
    return (
        <Card className="my-8">
            <CardHeader>
                <CardTitle>Analitik Pengunjung</CardTitle>
                <CardDescription>
                    Data pengunjung website dalam 7 bulan terakhir.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                        type="monotone"
                        dataKey="visitors"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        />
                        <Line type="monotone" dataKey="pageViews" stroke="#82ca9d" />
                    </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
