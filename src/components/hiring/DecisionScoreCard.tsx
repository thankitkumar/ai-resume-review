import React from 'react';
import { cn } from '@/lib/utils';
import { InterviewScore } from '@/types/hiring';
import { Textarea } from '@/components/ui/textarea';

interface DecisionScoreCardProps {
  scores: InterviewScore[];
  onScoreChange: (index: number, score: InterviewScore) => void;
}

const SCORE_LABELS = ['Poor', 'Below Avg', 'Average', 'Good', 'Excellent'];

export const DecisionScoreCard: React.FC<DecisionScoreCardProps> = ({
  scores,
  onScoreChange,
}) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-card">
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Interview Scores
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        Rate the candidate on each category based on interview performance
      </p>

      <div className="space-y-6">
        {scores.map((score, index) => (
          <div key={score.category} className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                {score.category}
              </span>
              <span className="text-xs text-muted-foreground">
                {SCORE_LABELS[score.score - 1]}
              </span>
            </div>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() =>
                    onScoreChange(index, { ...score, score: value as 1 | 2 | 3 | 4 | 5 })
                  }
                  className={cn(
                    'flex-1 h-10 rounded-lg font-medium text-sm transition-all',
                    score.score === value
                      ? value >= 4
                        ? 'bg-success text-success-foreground'
                        : value === 3
                        ? 'bg-warning text-warning-foreground'
                        : 'bg-destructive text-destructive-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  )}
                >
                  {value}
                </button>
              ))}
            </div>

            <Textarea
              placeholder={`Notes for ${score.category.toLowerCase()}...`}
              value={score.notes}
              onChange={(e) =>
                onScoreChange(index, { ...score, notes: e.target.value })
              }
              className="min-h-[60px] resize-none text-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DecisionScoreCard;