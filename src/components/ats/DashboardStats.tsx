import React from 'react';
import { Briefcase, Users, Calendar, FileCheck, ArrowUpRight, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  trend?: number;
  iconBg: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, iconBg }) => (
  <div className="bg-card rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 group">
    <div className="flex items-start justify-between mb-4">
      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", iconBg)}>
        <Icon className="w-6 h-6" />
      </div>
      {trend !== undefined && (
        <div className="flex items-center gap-1 text-sm text-success">
          <TrendingUp className="w-4 h-4" />
          <span className="font-medium">+{trend}%</span>
        </div>
      )}
    </div>
    <div>
      <p className="text-3xl font-bold text-foreground mb-1">{value}</p>
      <p className="text-sm text-muted-foreground">{title}</p>
    </div>
  </div>
);

interface DashboardStatsProps {
  openJobs: number;
  totalCandidates: number;
  interviewsScheduled: number;
  offersSent: number;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  openJobs,
  totalCandidates,
  interviewsScheduled,
  offersSent,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Open Jobs"
        value={openJobs}
        icon={Briefcase}
        iconBg="bg-primary/10 text-primary"
        trend={12}
      />
      <StatCard
        title="Total Candidates"
        value={totalCandidates}
        icon={Users}
        iconBg="bg-info/10 text-info"
        trend={8}
      />
      <StatCard
        title="Interviews Scheduled"
        value={interviewsScheduled}
        icon={Calendar}
        iconBg="bg-warning/10 text-warning"
      />
      <StatCard
        title="Offers Sent"
        value={offersSent}
        icon={FileCheck}
        iconBg="bg-success/10 text-success"
        trend={25}
      />
    </div>
  );
};

export default DashboardStats;
