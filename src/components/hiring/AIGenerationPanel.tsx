import React from 'react';
import { Zap, Target, Rocket, Filter, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JD_PROMPT_TEMPLATES } from '@/types/hiring';
import { cn } from '@/lib/utils';

type GenerationType = keyof typeof JD_PROMPT_TEMPLATES;

interface AIGenerationPanelProps {
  onGenerate: (type: GenerationType) => void;
  isGenerating: boolean;
  currentType: GenerationType | null;
  disabled?: boolean;
}

const generationButtons: { type: GenerationType; icon: React.ReactNode; color: string }[] = [
  { type: 'fast', icon: <Zap className="w-4 h-4" />, color: 'text-warning' },
  { type: 'outcome', icon: <Target className="w-4 h-4" />, color: 'text-info' },
  { type: 'founder', icon: <Rocket className="w-4 h-4" />, color: 'text-success' },
  { type: 'highSignal', icon: <Filter className="w-4 h-4" />, color: 'text-primary' },
];

export const AIGenerationPanel: React.FC<AIGenerationPanelProps> = ({
  onGenerate,
  isGenerating,
  currentType,
  disabled = false,
}) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-card">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">AI Generation</h3>
          <p className="text-sm text-muted-foreground">
            Choose how to generate your job description
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {generationButtons.map(({ type, icon, color }) => {
          const template = JD_PROMPT_TEMPLATES[type];
          const isLoading = isGenerating && currentType === type;

          return (
            <Button
              key={type}
              variant="outline"
              className={cn(
                'h-auto py-4 px-4 flex flex-col items-start gap-2 text-left',
                'hover:bg-accent hover:border-primary/30 transition-all',
                isLoading && 'border-primary bg-accent'
              )}
              onClick={() => onGenerate(type)}
              disabled={disabled || isGenerating}
            >
              <div className="flex items-center gap-2 w-full">
                <span className={color}>{icon}</span>
                <span className="font-medium text-foreground text-sm">
                  {template.name}
                </span>
                {isLoading && (
                  <Loader2 className="w-4 h-4 animate-spin ml-auto text-primary" />
                )}
              </div>
              <p className="text-xs text-muted-foreground font-normal">
                {template.description}
              </p>
            </Button>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        Fill in the form first, then click a generation style
      </p>
    </div>
  );
};

export default AIGenerationPanel;
