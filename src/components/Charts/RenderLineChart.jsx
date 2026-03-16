import React, { useMemo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = [
  '#38bdf8', '#fb923c', '#a78bfa', '#34d399', '#f472b6',
  '#facc15', '#60a5fa', '#f87171',
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <div className="chart-tooltip-name">{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ color: p.color }} className="chart-tooltip-val">
            {p.name}: {p.value}ms
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function RenderLineChart({ components }) {
  const { data, names } = useMemo(() => {
    const compList = Object.values(components);
    if (!compList.length) return { data: [], names: [] };

    const names = compList.map(c => c.name);
    const maxLen = Math.max(...compList.map(c => (c.renderHistory || []).length));

    const data = Array.from({ length: maxLen }, (_, i) => {
      const point = { index: i + 1 };
      compList.forEach(c => {
        const h = c.renderHistory || [];
        if (h[i]) point[c.name] = parseFloat(h[i].time.toFixed(2));
      });
      return point;
    });

    return { data, names };
  }, [components]);

  if (!data.length) return (
    <div className="chart-empty">No render history yet</div>
  );

  return (
    <div className="chart-wrapper">
      <div className="chart-title">Render Duration Over Time</div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis
            dataKey="index"
            tick={{ fill: '#8899aa', fontSize: 11, fontFamily: 'inherit' }}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            tickLine={false}
            label={{ value: 'Render #', position: 'insideBottomRight', fill: '#8899aa', fontSize: 10, offset: -10 }}
          />
          <YAxis
            unit="ms"
            tick={{ fill: '#8899aa', fontSize: 11, fontFamily: 'inherit' }}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '11px', color: '#8899aa', paddingTop: '8px' }}
          />
          {names.map((name, i) => (
            <Line
              key={name}
              type="monotone"
              dataKey={name}
              stroke={COLORS[i % COLORS.length]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
              connectNulls={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
