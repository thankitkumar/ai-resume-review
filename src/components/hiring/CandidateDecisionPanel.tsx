import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type Decision = 'shortlist' | 'reject' | null;

interface CandidateDecisionPanelProps {
  onDecision: (decision: Decision, notes: string) => void;
  isSubmitting?: boolean;
}

export const CandidateDecisionPanel: React.FC<CandidateDecisionPanelProps> = ({
  onDecision,
  isSubmitting = false,
}) => {
  const [decision, setDecision] = useState<Decision>(null);
  const [notes, setNotes] = useState('');
  const [showNotes, setShowNotes] = useState(false);

  const handleSave = () => {
    onDecision(decision, notes);
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Decision</h3>
          <p className="text-sm text-muted-foreground">
            Make a call on this candidate
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          className={cn(
            'flex-1 gap-2 h-12',
            decision === 'shortlist' &&
              'bg-success/10 border-success text-success hover:bg-success/20'
          )}
          onClick={() => setDecision('shortlist')}
          disabled={isSubmitting}
        >
          <ThumbsUp className="w-5 h-5" />
          Shortlist
        </Button>
        <Button
          variant="outline"
          className={cn(
            'flex-1 gap-2 h-12',
            decision === 'reject' &&
              'bg-destructive/10 border-destructive text-destructive hover:bg-destructive/20'
          )}
          onClick={() => setDecision('reject')}
          disabled={isSubmitting}
        >
          <ThumbsDown className="w-5 h-5" />
          Reject
        </Button>
      </div>

      <button
        onClick={() => setShowNotes(!showNotes)}
        className="text-sm text-primary hover:underline flex items-center gap-1"
      >
        <MessageSquare className="w-4 h-4" />
        {showNotes ? 'Hide notes' : 'Add notes'}
      </button>

      {showNotes && (
        <Textarea
          placeholder="Add any notes about this candidate..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="min-h-[80px] bg-muted border-0 resize-none"
          disabled={isSubmitting}
        />
      )}

      <Button
        variant="default"
        className="w-full gap-2"
        onClick={handleSave}
        disabled={!decision || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            Save Decision
          </>
        )}
      </Button>
    </div>
  );
};

export default CandidateDecisionPanel;
