import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

interface GaugeChartProps {
  value: number;
  status: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

interface ViewBox {
  cx: number;
  cy: number;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ value, status, size = 'md', showLabel = true }) => {
  const data = [
    { name: 'score', value: value },
    { name: 'remainder', value: 1 - value }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "maju":
        return "#22c55e"; // green-500
      case "berkembang":
        return "#eab308"; // yellow-500
      case "tertinggal":
        return "#ef4444"; // red-500
      default:
        return "#6b7280"; // gray-500
    }
  };

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  const getChartHeight = () => {
    switch (size) {
      case 'sm':
        return 150;
      case 'lg':
        return 250;
      default:
        return 200;
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'sm':
        return 'text-2xl';
      case 'lg':
        return 'text-4xl';
      default:
        return 'text-3xl';
    }
  };

  return (
    <div className={`relative`} style={{height: `${getChartHeight()}px`}}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius="60%"
            outerRadius="100%"
            paddingAngle={0}
            dataKey="value"
            cornerRadius={5}
          >
            <Cell fill={getStatusColor(status)} />
            <Cell fill="#e5e7eb" />
            {showLabel && (
              <Label
                content={({ viewBox }: { viewBox?: ViewBox }) => {
                  if (!viewBox) return null;
                  const { cx, cy } = viewBox;
                  return (
                    <>
                      <text
                        x={cx}
                        y={cy - 10}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className={`${getFontSize()} font-bold fill-current`}
                      >
                        {formatPercentage(value)}
                      </text>
                      <text
                        x={cx}
                        y={cy + 20}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-sm fill-muted-foreground capitalize"
                      >
                        {status}
                      </text>
                    </>
                  );
                }}
              />
            )}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GaugeChart;
