
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface HeartRateChartProps {
  data: number[];
  timestamps: string[];
}

export const HeartRateChart: React.FC<HeartRateChartProps> = ({ data, timestamps }) => {
  const chartData = data.map((value, index) => ({
    time: new Date(timestamps[index]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    value
  }));

  return (
    <div className="w-full h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#EC744A" 
            strokeWidth={2} 
            dot={{ stroke: '#EC744A', strokeWidth: 2, r: 4 }} 
            activeDot={{ r: 6, stroke: '#EC744A', strokeWidth: 2, fill: '#fff' }} 
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" opacity={0.3} vertical={false} />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 10 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            domain={['dataMin - 5', 'dataMax + 5']}
            tick={{ fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            width={30}
          />
          <Tooltip 
            contentStyle={{ background: 'rgba(255,255,255,0.9)', borderRadius: '8px', border: '1px solid #eee' }}
            labelStyle={{ color: '#666', fontWeight: 500 }}
            itemStyle={{ color: '#EC744A' }}
            formatter={(value: number) => [`${value} BPM`, 'Heart Rate']}
            labelFormatter={(label) => `Time: ${label}`}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
