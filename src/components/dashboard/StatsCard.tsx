import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  change: number;
  suffix?: string;
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  suffix = 'vs last month',
  className,
}) => {
  const isPositive = change >= 0;

  return (
    <div className={cn(
      "bg-card rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 group",
      className
    )}>
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <button className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
          <ArrowUpRight className="w-4 h-4 text-primary group-hover:text-primary-foreground" />
        </button>
      </div>
      
      <div className="space-y-2">
        <p className="text-3xl font-bold text-foreground">{value}</p>
        <div className="flex items-center gap-1.5 text-sm">
          <span className={cn(
            "flex items-center gap-0.5 font-medium",
            isPositive ? "text-success" : "text-destructive"
          )}>
            {isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5" />
            )}
            {Math.abs(change)}
          </span>
          <span className="text-muted-foreground">{suffix}</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
