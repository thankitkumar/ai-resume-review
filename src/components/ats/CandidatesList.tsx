import React, { useState } from 'react';
import { Candidate, APPLICATION_STAGES, ApplicationStatus } from '@/types/ats';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Mail,
  Phone,
  FileText,
  Eye,
  UserCheck,
  UserX,
  ChevronRight
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CandidatesListProps {
  candidates: Candidate[];
  jobs: { id: string; title: string }[];
  onViewCandidate: (id: string) => void;
  onUpdateStage: (id: string, stage: ApplicationStatus) => void;
}

export const CandidatesList: React.FC<CandidatesListProps> = ({
  candidates,
  jobs,
  onViewCandidate,
  onUpdateStage,
}) => {
  const [search, setSearch] = useState('');
  const [jobFilter, setJobFilter] = useState<string>('all');
  const [stageFilter, setStageFilter] = useState<string>('all');

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(search.toLowerCase()) ||
      candidate.email.toLowerCase().includes(search.toLowerCase());
    const matchesJob = jobFilter === 'all' || candidate.appliedJobId === jobFilter;
    const matchesStage = stageFilter === 'all' || candidate.stage === stageFilter;
    return matchesSearch && matchesJob && matchesStage;
  });

  const getStageInfo = (stage: string) => {
    return APPLICATION_STAGES.find(s => s.value === stage) || APPLICATION_STAGES[0];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Candidates</h2>
        <p className="text-muted-foreground">Manage all your job applicants</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search candidates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={jobFilter} onValueChange={setJobFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by job" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Jobs</SelectItem>
            {jobs.map((job) => (
              <SelectItem key={job.id} value={job.id}>
                {job.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={stageFilter} onValueChange={setStageFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stages</SelectItem>
            {APPLICATION_STAGES.map((stage) => (
              <SelectItem key={stage.value} value={stage.value}>
                {stage.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Candidates Table */}
      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Candidate
              </th>
              <th className="text-left py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Applied For
              </th>
              <th className="text-left py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Stage
              </th>
              <th className="text-left py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Screening Score
              </th>
              <th className="text-left py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Applied Date
              </th>
              <th className="text-right py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredCandidates.map((candidate) => {
              const stageInfo = getStageInfo(candidate.stage);
              return (
                <tr 
                  key={candidate.id} 
                  className="hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => onViewCandidate(candidate.id)}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                        {candidate.avatar || candidate.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{candidate.name}</p>
                        <p className="text-sm text-muted-foreground">{candidate.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-foreground">
                    {candidate.appliedJobTitle}
                  </td>
                  <td className="py-4 px-6">
                    <span className={cn(
                      "inline-flex px-2.5 py-1 rounded-md text-xs font-medium",
                      stageInfo.color
                    )}>
                      {stageInfo.label}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {candidate.screeningScore !== undefined ? (
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full rounded-full",
                              candidate.screeningScore >= 80 ? "bg-success" :
                              candidate.screeningScore >= 60 ? "bg-warning" : "bg-destructive"
                            )}
                            style={{ width: `${candidate.screeningScore}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{candidate.screeningScore}%</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Not screened</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-sm text-muted-foreground">
                    {new Date(candidate.appliedAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewCandidate(candidate.id)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onUpdateStage(candidate.id, 'interview')}>
                          <UserCheck className="w-4 h-4 mr-2" />
                          Move to Interview
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onUpdateStage(candidate.id, 'rejected')} className="text-destructive">
                          <UserX className="w-4 h-4 mr-2" />
                          Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredCandidates.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No candidates found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidatesList;
