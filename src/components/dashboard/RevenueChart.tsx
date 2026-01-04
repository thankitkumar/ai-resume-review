import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const data = [
  { month: 'Jan', revenue: 2800, interviews: 400 },
  { month: 'Feb', revenue: 3200, interviews: 500 },
  { month: 'Mar', revenue: 2600, interviews: 350 },
  { month: 'Apr', revenue: 3100, interviews: 480 },
  { month: 'May', revenue: 2900, interviews: 420 },
  { month: 'Jun', revenue: 3800, interviews: 620 },
  { month: 'Jul', revenue: 3250, interviews: 720 },
  { month: 'Aug', revenue: 2700, interviews: 380 },
  { month: 'Sep', revenue: 2400, interviews: 320 },
  { month: 'Oct', revenue: 2600, interviews: 400 },
  { month: 'Nov', revenue: 2200, interviews: 280 },
  { month: 'Dec', revenue: 2100, interviews: 250 },
];

export const RevenueChart: React.FC = () => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Revenue</h3>
          <p className="text-3xl font-bold text-foreground">$3,250</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Interview</span>
            <span className="text-sm font-semibold text-foreground">720.00</span>
          </div>
          
          <select className="text-sm bg-muted rounded-lg px-3 py-1.5 border-0 text-foreground">
            <option>Last Week</option>
            <option>Last Month</option>
            <option>Last Year</option>
          </select>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.75rem',
                boxShadow: 'var(--shadow-lg)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="hsl(262, 83%, 58%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Line
              type="monotone"
              dataKey="interviews"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
