import { useState, useCallback } from 'react';
import { CandidateEvaluation, InterviewScore } from '@/types/hiring';

type DecisionAction = 'evaluate' | 'compare' | 'risk';

interface UseDecisionSupportReturn {
  isAnalyzing: boolean;
  evaluation: CandidateEvaluation | null;
  analyze: (action: DecisionAction, scores: InterviewScore[], notes: string) => Promise<void>;
  reset: () => void;
}

// Mock evaluation (replace with real AI call when backend is ready)
const mockAnalyze = async (
  action: DecisionAction,
  scores: InterviewScore[],
  notes: string
): Promise<CandidateEvaluation> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const avgScore = scores.reduce((acc, s) => acc + s.score, 0) / scores.length;
  const decision = avgScore >= 4 ? 'hire' : avgScore >= 3 ? 'maybe' : 'reject';

  return {
    decision,
    confidence: Math.round(60 + avgScore * 8),
    reasoning: [
      'Demonstrated strong technical skills in system design discussion',
      'Communication was clear and structured throughout the interview',
      'Showed genuine interest in the role and company mission',
      'Past experience aligns well with the requirements',
      avgScore < 4 ? 'Some gaps in domain-specific knowledge that may need ramp-up time' : 'Ready to contribute from day one',
    ].slice(0, decision === 'hire' ? 4 : 5),
    strengths: [
      'Strong problem-solving approach',
      'Good cultural fit with team',
      'Relevant technical background',
      'Clear communication style',
    ],
    risks: [
      'Limited experience with our specific tech stack',
      'May need mentorship in early months',
      'Previous roles were at smaller companies',
    ],
    riskMitigation: decision === 'hire' ? [
      'Pair with senior team member for first project',
      'Provide dedicated onboarding for internal tools',
      'Set clear 30/60/90 day milestones',
    ] : [],
    ninetyDayRisk: action === 'risk' 
      ? 'Moderate risk of slower initial velocity due to tech stack unfamiliarity. Expected to reach full productivity by day 60 with proper support. Low retention risk based on expressed long-term interest.'
      : '',
  };
};

export const useDecisionSupport = (): UseDecisionSupportReturn => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [evaluation, setEvaluation] = useState<CandidateEvaluation | null>(null);

  const analyze = useCallback(
    async (action: DecisionAction, scores: InterviewScore[], notes: string) => {
      setIsAnalyzing(true);
      try {
        const result = await mockAnalyze(action, scores, notes);
        setEvaluation(result);
      } finally {
        setIsAnalyzing(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setEvaluation(null);
  }, []);

  return {
    isAnalyzing,
    evaluation,
    analyze,
    reset,
  };
};

export default useDecisionSupport;