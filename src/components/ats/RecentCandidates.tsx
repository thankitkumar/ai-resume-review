import React from 'react';
import { Candidate, APPLICATION_STAGES } from '@/types/ats';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RecentCandidatesProps {
  candidates: Candidate[];
}

export const RecentCandidates: React.FC<RecentCandidatesProps> = ({ candidates }) => {
  const navigate = useNavigate();

  const getStageInfo = (stage: string) => {
    return APPLICATION_STAGES.find(s => s.value === stage) || APPLICATION_STAGES[0];
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Candidates</h3>
        <button
          onClick={() => navigate('/candidates')}
          className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
        >
          View all
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {candidates.slice(0, 5).map((candidate) => {
          const stageInfo = getStageInfo(candidate.stage);
          return (
            <div
              key={candidate.id}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => navigate(`/candidates/${candidate.id}`)}
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                {candidate.avatar || candidate.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{candidate.name}</p>
                <p className="text-sm text-muted-foreground truncate">{candidate.appliedJobTitle}</p>
              </div>
              <span className={cn(
                "inline-flex px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap",
                stageInfo.color
              )}>
                {stageInfo.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentCandidates;
