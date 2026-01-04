import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HiringProcessCardProps {
  days: number;
  change: number;
}

export const HiringProcessCard: React.FC<HiringProcessCardProps> = ({ days, change }) => {
  // Progress segments representing hiring stages
  const segments = [
    { color: 'bg-primary', width: 70 },
    { color: 'bg-warning', width: 20 },
    { color: 'bg-info', width: 10 },
  ];

  return (
    <div className="bg-card rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">Hiring Process</h3>
        <button className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300 group">
          <ArrowRight className="w-4 h-4 text-primary group-hover:text-primary-foreground" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="flex gap-1 h-2 rounded-full overflow-hidden mb-4">
        {segments.map((segment, index) => (
          <div
            key={index}
            className={`${segment.color} transition-all duration-500`}
            style={{ width: `${segment.width}%` }}
          />
        ))}
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold text-foreground">{days}</span>
        <span className="text-lg font-medium text-foreground">days</span>
      </div>
      
      <div className="flex items-center gap-1.5 text-sm mt-1">
        <span className="text-success font-medium flex items-center gap-0.5">
          ↗ {change}
        </span>
        <span className="text-muted-foreground">vs last month</span>
      </div>
    </div>
  );
};

export default HiringProcessCard;
