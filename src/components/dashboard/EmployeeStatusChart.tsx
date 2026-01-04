import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Remote', value: 45, color: 'hsl(262, 83%, 58%)' },
  { name: 'Hybrid', value: 35, color: 'hsl(38, 92%, 50%)' },
  { name: 'On-site', value: 20, color: 'hsl(217, 91%, 60%)' },
];

export const EmployeeStatusChart: React.FC = () => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-card">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Employees Status</h3>
      
      <div className="flex items-center gap-6">
        <div className="relative w-32 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={55}
                paddingAngle={4}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs text-muted-foreground">Total History</span>
            <span className="text-xl font-bold text-foreground">250k</span>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-muted-foreground">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeStatusChart;
