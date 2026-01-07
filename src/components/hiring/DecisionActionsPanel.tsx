import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, UserCheck, Users, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

type DecisionAction = 'evaluate' | 'compare' | 'risk';

interface DecisionActionsPanelProps {
  selectedAction: DecisionAction | null;
  onActionSelect: (action: DecisionAction) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  disabled?: boolean;
}

const actions = [
  {
    id: 'evaluate' as DecisionAction,
    title: 'Evaluate Candidate',
    description: 'Get clear hire/maybe/reject recommendation with reasoning',
    icon: UserCheck,
  },
  {
    id: 'compare' as DecisionAction,
    title: 'Compare With Profile',
    description: 'See how candidate stacks up against ideal profile',
    icon: Users,
  },
  {
    id: 'risk' as DecisionAction,
    title: 'Predict 90-Day Risk',
    description: 'Identify potential risks if candidate is hired',
    icon: AlertTriangle,
  },
];

export const DecisionActionsPanel: React.FC<DecisionActionsPanelProps> = ({
  selectedAction,
  onActionSelect,
  onAnalyze,
  isAnalyzing,
  disabled,
}) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-card">
      <h3 className="text-lg font-semibold text-foreground mb-2">
        AI Decision Support
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Get objective analysis to support your hiring decision
      </p>

      <div className="space-y-3 mb-6">
        {actions.map((action) => {
          const IconComponent = action.icon;
          const isSelected = selectedAction === action.id;

          return (
            <button
              key={action.id}
              onClick={() => onActionSelect(action.id)}
              disabled={isAnalyzing}
              className={cn(
                'w-full p-4 rounded-xl border-2 text-left transition-all',
                isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-background hover:border-primary/50',
                isAnalyzing && 'opacity-50 cursor-not-allowed'
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                    isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  )}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{action.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {action.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <Button
        variant="hero"
        className="w-full"
        onClick={onAnalyze}
        disabled={!selectedAction || isAnalyzing || disabled}
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Analyzing...
          </>
        ) : (
          'Run Analysis'
        )}
      </Button>
    </div>
  );
};

export default DecisionActionsPanel;