import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const val = payload[0].value;
    const isWarn = payload[0].payload.isWarning;
    return (
      <div className="chart-tooltip">
        <div className="chart-tooltip-name">{label}</div>
        <div className={`chart-tooltip-val ${isWarn ? 'tooltip-warn' : ''}`}>
          {val} renders {isWarn ? '⚠' : ''}
        </div>
      </div>
    );
  }
  return null;
};

export function RenderBarChart({ components, warningThreshold = 10 }) {
  const data = Object.values(components).map(c => ({
    name: c.name,
    renders: c.renderCount,
    isWarning: c.renderCount > warningThreshold,
  }));

  if (!data.length) return (
    <div className="chart-empty">No data yet</div>
  );

  return (
    <div className="chart-wrapper">
      <div className="chart-title">Render Count by Component</div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis
            dataKey="name"
            tick={{ fill: '#8899aa', fontSize: 11, fontFamily: 'inherit' }}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#8899aa', fontSize: 11, fontFamily: 'inherit' }}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          <Bar dataKey="renders" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.isWarning ? '#ff4d6d' : '#38bdf8'}
                opacity={0.9}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
