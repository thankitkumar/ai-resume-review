import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { DashboardStats } from '@/components/ats/DashboardStats';
import { PipelineOverview } from '@/components/ats/PipelineOverview';
import { QuickActions } from '@/components/ats/QuickActions';
import { RecentCandidates } from '@/components/ats/RecentCandidates';
import { RecentJobs } from '@/components/ats/RecentJobs';
import { mockDashboardMetrics, mockCandidates, mockJobs } from '@/data/mockData';

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <Header />
        <div className="p-6 overflow-y-auto h-[calc(100vh-64px)]">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your hiring overview.</p>
          </div>
          
          <div className="space-y-6 animate-fade-in">
            <DashboardStats
              openJobs={mockDashboardMetrics.openJobs}
              totalCandidates={mockDashboardMetrics.totalCandidates}
              interviewsScheduled={mockDashboardMetrics.interviewsScheduled}
              offersSent={mockDashboardMetrics.offersSent}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <PipelineOverview stages={mockDashboardMetrics.hiringPipelineOverview} />
              </div>
              <QuickActions />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentJobs jobs={mockJobs} />
              <RecentCandidates candidates={mockCandidates} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
