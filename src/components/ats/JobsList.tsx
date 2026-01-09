import React, { useState } from 'react';
import { JobPost } from '@/types/ats';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Users, 
  MapPin,
  Calendar,
  Pencil,
  Eye,
  Trash2,
  ExternalLink
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

interface JobsListProps {
  jobs: JobPost[];
  onCreateNew: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
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

export const JobsList: React.FC<JobsListProps> = ({
  jobs,
  onCreateNew,
  onEdit,
  onDelete,
  onView,
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.department.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatSalary = (job: JobPost) => {
    if (!job.salaryMin && !job.salaryMax) return 'Not specified';
    const currency = job.currency === 'USD' ? '$' : job.currency === 'EUR' ? '€' : job.currency === 'GBP' ? '£' : '₹';
    const formatNum = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(0)}K` : n;
    if (job.salaryMin && job.salaryMax) {
      return `${currency}${formatNum(job.salaryMin)} - ${currency}${formatNum(job.salaryMax)}`;
    }
    return `${currency}${formatNum(job.salaryMin || job.salaryMax || 0)}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Job Posts</h2>
          <p className="text-muted-foreground">Manage your job listings</p>
        </div>
        <Button onClick={onCreateNew} className="gap-2">
          <Plus className="w-4 h-4" />
          Create Job
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
          {['all', 'published', 'draft', 'paused', 'closed'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-md transition-all capitalize",
                statusFilter === status
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Job Title
              </th>
              <th className="text-left py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Department
              </th>
              <th className="text-left py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Location
              </th>
              <th className="text-left py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Salary
              </th>
              <th className="text-left py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Applicants
              </th>
              <th className="text-left py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="text-right py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredJobs.map((job) => (
              <tr key={job.id} className="hover:bg-muted/50 transition-colors">
                <td className="py-4 px-6">
                  <div>
                    <p className="font-medium text-foreground">{job.title}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Posted {new Date(job.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-foreground">
                  {job.department}
                </td>
                <td className="py-4 px-6">
                  <span className={cn(
                    "inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium capitalize",
                    locationStyles[job.locationType]
                  )}>
                    <MapPin className="w-3 h-3" />
                    {job.locationType}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-foreground">
                  {formatSalary(job)}
                </td>
                <td className="py-4 px-6">
                  <span className="flex items-center gap-1 text-sm text-foreground">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    {job.applicationsCount}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className={cn(
                    "inline-flex px-2.5 py-1 rounded-md text-xs font-medium capitalize",
                    statusStyles[job.status]
                  )}>
                    {job.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView(job.id)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(job.id)}>
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(job.id)} className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredJobs.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No jobs found</p>
            <Button variant="link" onClick={onCreateNew}>
              Create your first job post
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsList;
