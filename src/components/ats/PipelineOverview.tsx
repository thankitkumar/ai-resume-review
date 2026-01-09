import React from 'react';
import { APPLICATION_STAGES, PipelineStage } from '@/types/ats';
import { cn } from '@/lib/utils';

interface PipelineOverviewProps {
  stages: PipelineStage[];
}

export const PipelineOverview: React.FC<PipelineOverviewProps> = ({ stages }) => {
  const getStageInfo = (stage: string) => {
    return APPLICATION_STAGES.find(s => s.value === stage) || APPLICATION_STAGES[0];
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Hiring Pipeline</h3>
        <span className="text-sm text-muted-foreground">
          {stages.reduce((acc, s) => acc + s.count, 0)} total candidates
        </span>
      </div>

      <div className="space-y-4">
        {stages.map((stage) => {
          const stageInfo = getStageInfo(stage.stage);
          return (
            <div key={stage.stage} className="group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "inline-flex px-2.5 py-1 rounded-md text-xs font-medium",
                    stageInfo.color
                  )}>
                    {stageInfo.label}
                  </span>
                </div>
                <span className="text-sm font-medium text-foreground">{stage.count}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500 ease-out group-hover:opacity-80"
                  style={{ width: `${stage.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PipelineOverview;
