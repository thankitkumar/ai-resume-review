import React from 'react';
import { JobPost } from '@/types/ats';
import { cn } from '@/lib/utils';
import { Users, ChevronRight, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RecentJobsProps {
  jobs: JobPost[];
}

const statusStyles = {
  draft: 'bg-muted text-muted-foreground',
  published: 'bg-success/10 text-success',
  paused: 'bg-warning/10 text-warning',
  closed: 'bg-destructive/10 text-destructive',
};

const locationStyles = {
  remote: 'bg-info/10 text-info',
  hybrid: 'bg-warning/10 text-warning',
  onsite: 'bg-primary/10 text-primary',
};

export const RecentJobs: React.FC<RecentJobsProps> = ({ jobs }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Active Jobs</h3>
        <button
          onClick={() => navigate('/jobs')}
          className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
        >
          View all
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {jobs.slice(0, 4).map((job) => (
          <div
            key={job.id}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => navigate(`/jobs/${job.id}`)}
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="text-lg font-semibold text-primary">
                {job.title.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium text-foreground truncate">{job.title}</p>
                <span className={cn(
                  "inline-flex px-2 py-0.5 rounded text-xs font-medium capitalize",
                  statusStyles[job.status]
                )}>
                  {job.status}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>{job.department}</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span className={cn(
                    "capitalize",
                    locationStyles[job.locationType]
                  )}>
                    {job.locationType}
                  </span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{job.applicationsCount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentJobs;
