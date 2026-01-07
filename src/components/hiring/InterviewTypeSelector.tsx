import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { InterviewType, INTERVIEW_TYPES } from '@/types/hiring';
import { Code, Lightbulb, Target, Users, Loader2 } from 'lucide-react';

const iconMap = {
  Code: Code,
  Lightbulb: Lightbulb,
  Target: Target,
  Users: Users,
};

interface InterviewTypeSelectorProps {
  selectedType: InterviewType | null;
  onTypeSelect: (type: InterviewType) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  disabled?: boolean;
}

export const InterviewTypeSelector: React.FC<InterviewTypeSelectorProps> = ({
  selectedType,
  onTypeSelect,
  onGenerate,
  isGenerating,
  disabled,
}) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-card">
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Interview Type
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Select the interview focus area to generate structured questions
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {INTERVIEW_TYPES.map((type) => {
          const IconComponent = iconMap[type.icon as keyof typeof iconMap];
          const isSelected = selectedType === type.id;

          return (
            <button
              key={type.id}
              onClick={() => onTypeSelect(type.id)}
              disabled={isGenerating}
              className={cn(
                'p-4 rounded-xl border-2 text-left transition-all',
                isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-background hover:border-primary/50',
                isGenerating && 'opacity-50 cursor-not-allowed'
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                    isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  )}
                >
                  {IconComponent && <IconComponent className="w-5 h-5" />}
                </div>
                <div>
                  <p className="font-medium text-foreground">{type.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {type.description}
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
        onClick={onGenerate}
        disabled={!selectedType || isGenerating || disabled}
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Generating Interview Plan...
          </>
        ) : (
          'Generate Interview Questions'
        )}
      </Button>
    </div>
  );
};

export default InterviewTypeSelector;