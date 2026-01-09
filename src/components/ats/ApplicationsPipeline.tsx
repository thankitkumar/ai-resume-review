import React, { useState } from 'react';
import { Candidate, APPLICATION_STAGES, ApplicationStatus } from '@/types/ats';
import { cn } from '@/lib/utils';
import { GripVertical, User } from 'lucide-react';

interface ApplicationsPipelineProps {
  candidates: Candidate[];
  onMoveCandidate: (candidateId: string, newStage: ApplicationStatus) => void;
  onViewCandidate: (candidateId: string) => void;
}

const PIPELINE_STAGES: ApplicationStatus[] = ['applied', 'screening', 'interview', 'decision', 'offer', 'hired', 'rejected'];

export const ApplicationsPipeline: React.FC<ApplicationsPipelineProps> = ({
  candidates,
  onMoveCandidate,
  onViewCandidate,
}) => {
  const [draggedCandidate, setDraggedCandidate] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<ApplicationStatus | null>(null);

  const getCandidatesByStage = (stage: ApplicationStatus) => {
    return candidates.filter(c => c.stage === stage);
  };

  const getStageInfo = (stage: ApplicationStatus) => {
    return APPLICATION_STAGES.find(s => s.value === stage)!;
  };

  const handleDragStart = (e: React.DragEvent, candidateId: string) => {
    setDraggedCandidate(candidateId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, stage: ApplicationStatus) => {
    e.preventDefault();
    setDragOverStage(stage);
  };

  const handleDragLeave = () => {
    setDragOverStage(null);
  };

  const handleDrop = (e: React.DragEvent, stage: ApplicationStatus) => {
    e.preventDefault();
    if (draggedCandidate) {
      onMoveCandidate(draggedCandidate, stage);
    }
    setDraggedCandidate(null);
    setDragOverStage(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Applications Pipeline</h2>
        <p className="text-muted-foreground">Drag and drop candidates to update their stage</p>
      </div>

      {/* Pipeline */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {PIPELINE_STAGES.map((stage) => {
          const stageInfo = getStageInfo(stage);
          const stageCandidates = getCandidatesByStage(stage);

          return (
            <div
              key={stage}
              className={cn(
                "flex-shrink-0 w-72 bg-muted/30 rounded-2xl p-4 transition-all",
                dragOverStage === stage && "ring-2 ring-primary bg-primary/5"
              )}
              onDragOver={(e) => handleDragOver(e, stage)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, stage)}
            >
              {/* Stage Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "inline-flex px-2.5 py-1 rounded-md text-xs font-medium",
                    stageInfo.color
                  )}>
                    {stageInfo.label}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({stageCandidates.length})
                  </span>
                </div>
              </div>

              {/* Candidates */}
              <div className="space-y-3 min-h-[200px]">
                {stageCandidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, candidate.id)}
                    onClick={() => onViewCandidate(candidate.id)}
                    className={cn(
                      "bg-card rounded-xl p-4 shadow-sm cursor-move hover:shadow-md transition-all",
                      draggedCandidate === candidate.id && "opacity-50"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <GripVertical className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                            {candidate.avatar || candidate.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-foreground text-sm truncate">
                              {candidate.name}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground truncate mb-2">
                          {candidate.appliedJobTitle}
                        </p>
                        {candidate.screeningScore !== undefined && (
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                              <div 
                                className={cn(
                                  "h-full rounded-full",
                                  candidate.screeningScore >= 80 ? "bg-success" :
                                  candidate.screeningScore >= 60 ? "bg-warning" : "bg-destructive"
                                )}
                                style={{ width: `${candidate.screeningScore}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium text-muted-foreground">
                              {candidate.screeningScore}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {stageCandidates.length === 0 && (
                  <div className="flex items-center justify-center h-[100px] border-2 border-dashed border-muted rounded-xl">
                    <p className="text-sm text-muted-foreground">No candidates</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApplicationsPipeline;
