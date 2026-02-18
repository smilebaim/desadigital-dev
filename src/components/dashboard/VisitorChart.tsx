'use client';
import { useState, useEffect } from "react";
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

export default function VisitorChart() {
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul"];
        const data = months.map(month => ({
            name: month,
            visitors: Math.floor(Math.random() * (500 - 100 + 1) + 100),
            pageViews: Math.floor(Math.random() * (10000 - 1000 + 1) + 1000),
        }));
        setChartData(data);
    }, []);

    return (
        <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  name="Pengunjung Unik"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="pageViews" name="Total Kunjungan" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
