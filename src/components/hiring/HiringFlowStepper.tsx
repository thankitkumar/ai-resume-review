import React from 'react';
import { Check, FileText, UserSearch, MessageSquare, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Job Description',
    description: 'Define role requirements',
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: 2,
    title: 'Resume Screening',
    description: 'Evaluate candidates',
    icon: <UserSearch className="w-4 h-4" />,
  },
  {
    id: 3,
    title: 'Interview Planning',
    description: 'Structure interviews',
    icon: <MessageSquare className="w-4 h-4" />,
  },
  {
    id: 4,
    title: 'Offer & Decide',
    description: 'Make the hire',
    icon: <Send className="w-4 h-4" />,
  },
];

interface HiringFlowStepperProps {
  currentStep: number;
  completedSteps: number[];
  onStepClick?: (step: number) => void;
}

export const HiringFlowStepper: React.FC<HiringFlowStepperProps> = ({
  currentStep,
  completedSteps,
  onStepClick,
}) => {
  return (
    <div className="w-full bg-card rounded-2xl p-6 shadow-card">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = currentStep === step.id;
          const isClickable = isCompleted || step.id <= Math.max(...completedSteps, 0) + 1;

          return (
            <React.Fragment key={step.id}>
              <button
                onClick={() => isClickable && onStepClick?.(step.id)}
                disabled={!isClickable}
                className={cn(
                  'flex flex-col items-center gap-2 transition-all',
                  isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                )}
              >
                <div
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center transition-all',
                    isCompleted
                      ? 'bg-success text-success-foreground'
                      : isCurrent
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : step.icon}
                </div>
                <div className="text-center">
                  <p
                    className={cn(
                      'text-sm font-medium',
                      isCurrent ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground hidden sm:block">
                    {step.description}
                  </p>
                </div>
              </button>

              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-4 rounded-full transition-colors',
                    completedSteps.includes(step.id) ? 'bg-success' : 'bg-muted'
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default HiringFlowStepper;
