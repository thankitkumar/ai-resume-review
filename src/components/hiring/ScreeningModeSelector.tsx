import React from 'react';
import { Zap, Search, AlertTriangle, MessageSquare, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScreeningMode, SCREENING_MODES } from '@/types/hiring';
import { cn } from '@/lib/utils';

const iconMap = {
  Zap: Zap,
  Search: Search,
  AlertTriangle: AlertTriangle,
  MessageSquare: MessageSquare,
};

interface ScreeningModeSelectorProps {
  selectedMode: ScreeningMode | null;
  onModeSelect: (mode: ScreeningMode) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  disabled?: boolean;
}

export const ScreeningModeSelector: React.FC<ScreeningModeSelectorProps> = ({
  selectedMode,
  onModeSelect,
  onAnalyze,
  isAnalyzing,
  disabled = false,
}) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-card space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
          <Search className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Screening Mode</h3>
          <p className="text-sm text-muted-foreground">
            Choose how to analyze this resume
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SCREENING_MODES.map((mode) => {
          const Icon = iconMap[mode.icon as keyof typeof iconMap];
          const isSelected = selectedMode === mode.id;

          return (
            <button
              key={mode.id}
              onClick={() => onModeSelect(mode.id)}
              disabled={disabled || isAnalyzing}
              className={cn(
                'p-4 rounded-xl border-2 text-left transition-all',
                isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-transparent bg-muted hover:bg-accent',
                (disabled || isAnalyzing) && 'opacity-50 cursor-not-allowed'
              )}
            >
              <div className="flex items-center gap-3 mb-2">
                <Icon
                  className={cn(
                    'w-5 h-5',
                    isSelected ? 'text-primary' : 'text-muted-foreground'
                  )}
                />
                <span
                  className={cn(
                    'font-medium text-sm',
                    isSelected ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {mode.title}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{mode.description}</p>
            </button>
          );
        })}
      </div>

      <Button
        variant="hero"
        size="lg"
        className="w-full mt-4"
        onClick={onAnalyze}
        disabled={!selectedMode || disabled || isAnalyzing}
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Analyzing Resume...
          </>
        ) : (
          <>
            <Zap className="w-5 h-5" />
            Analyze with AI
          </>
        )}
      </Button>
    </div>
  );
};

export default ScreeningModeSelector;
