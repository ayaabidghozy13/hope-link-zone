
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AccelerometerChartProps {
  dataX: number[];
  dataY: number[];
  dataZ: number[];
  timestamps: string[];
}

export const AccelerometerChart: React.FC<AccelerometerChartProps> = ({ dataX, dataY, dataZ, timestamps }) => {
  const chartData = dataX.map((x, index) => ({
    time: new Date(timestamps[index]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    x,
    y: dataY[index],
    z: dataZ[index]
  }));

  return (
    <div className="w-full h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line 
            type="monotone" 
            dataKey="x" 
            stroke="#007D6E" 
            strokeWidth={2} 
            dot={false} 
            activeDot={{ r: 6, stroke: '#007D6E', strokeWidth: 2, fill: '#fff' }} 
          />
          <Line 
            type="monotone" 
            dataKey="y" 
            stroke="#5EB47C" 
            strokeWidth={2} 
            dot={false} 
            activeDot={{ r: 6, stroke: '#5EB47C', strokeWidth: 2, fill: '#fff' }} 
          />
          <Line 
            type="monotone" 
            dataKey="z" 
            stroke="#EC744A" 
            strokeWidth={2} 
            dot={false} 
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
            domain={[-1.2, 1.2]}
            tick={{ fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            width={30}
          />
          <Tooltip 
            contentStyle={{ background: 'rgba(255,255,255,0.9)', borderRadius: '8px', border: '1px solid #eee' }}
            labelStyle={{ color: '#666', fontWeight: 500 }}
          />
          <Legend iconType="circle" iconSize={8} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
