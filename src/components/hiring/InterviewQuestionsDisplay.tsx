import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { GeneratedInterview } from '@/types/hiring';
import { Copy, Check, Clock, ThumbsUp, AlertTriangle, RefreshCw, FileEdit } from 'lucide-react';
import { toast } from 'sonner';

interface InterviewQuestionsDisplayProps {
  interview: GeneratedInterview;
  onRegenerate: () => void;
  isRegenerating: boolean;
  notes: string;
  onNotesChange: (notes: string) => void;
}

export const InterviewQuestionsDisplay: React.FC<InterviewQuestionsDisplayProps> = ({
  interview,
  onRegenerate,
  isRegenerating,
  notes,
  onNotesChange,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyQuestion = async (question: string, index: number) => {
    try {
      await navigator.clipboard.writeText(question);
      setCopiedIndex(index);
      toast.success('Question copied!');
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  const handleCopyAll = async () => {
    const allQuestions = interview.questions
      .map((q, i) => `${i + 1}. ${q.question}`)
      .join('\n\n');
    try {
      await navigator.clipboard.writeText(allQuestions);
      toast.success('All questions copied!');
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <div className="bg-card rounded-2xl shadow-card overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {interview.type.charAt(0).toUpperCase() + interview.type.slice(1)} Interview Plan
            </h3>
            <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
              <Clock className="w-4 h-4" />
              Suggested duration: {interview.duration}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopyAll}>
              <Copy className="w-4 h-4 mr-2" />
              Copy All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onRegenerate}
              disabled={isRegenerating}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRegenerating ? 'animate-spin' : ''}`} />
              Regenerate
            </Button>
          </div>
        </div>
      </div>

      <div className="divide-y divide-border">
        {interview.questions.map((q, index) => (
          <div key={index} className="p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {q.timeAllocation}
                  </span>
                </div>
                <p className="text-foreground font-medium">{q.question}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCopyQuestion(q.question, index)}
              >
                {copiedIndex === index ? (
                  <Check className="w-4 h-4 text-success" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-success/5 rounded-lg border border-success/20">
                <p className="text-xs font-medium text-success flex items-center gap-1 mb-2">
                  <ThumbsUp className="w-3 h-3" />
                  Good Answer Indicators
                </p>
                <ul className="space-y-1">
                  {q.goodAnswerIndicators.map((indicator, i) => (
                    <li key={i} className="text-xs text-foreground flex items-start gap-2">
                      <span className="text-success mt-0.5">•</span>
                      {indicator}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                <p className="text-xs font-medium text-destructive flex items-center gap-1 mb-2">
                  <AlertTriangle className="w-3 h-3" />
                  Red Flags
                </p>
                <ul className="space-y-1">
                  {q.redFlags.map((flag, i) => (
                    <li key={i} className="text-xs text-foreground flex items-start gap-2">
                      <span className="text-destructive mt-0.5">•</span>
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interviewer Notes */}
      <div className="p-6 border-t border-border bg-muted/30">
        <div className="flex items-center gap-2 mb-3">
          <FileEdit className="w-4 h-4 text-muted-foreground" />
          <h4 className="text-sm font-medium text-foreground">Interviewer Notes</h4>
        </div>
        <Textarea
          placeholder="Add notes during or after the interview..."
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          className="min-h-[100px] resize-none"
        />
      </div>
    </div>
  );
};

export default InterviewQuestionsDisplay;