import { useState, useCallback } from 'react';
import { InterviewType, GeneratedInterview, InterviewQuestion } from '@/types/hiring';

interface UseInterviewPlanningReturn {
  isGenerating: boolean;
  generatedInterview: GeneratedInterview | null;
  generateInterview: (type: InterviewType, roleName: string, level: string) => Promise<void>;
  reset: () => void;
}

const mockGenerateInterview = async (
  type: InterviewType
): Promise<GeneratedInterview> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const questionsByType: Record<InterviewType, InterviewQuestion[]> = {
    technical: [
      {
        question: 'Describe a complex project you worked on. What was your specific contribution?',
        goodAnswerIndicators: ['Specific technical details', 'Clear ownership', 'Measurable impact'],
        redFlags: ['Vague about contribution', 'Cannot explain decisions', 'Takes credit without specifics'],
        timeAllocation: '10-15 min',
      },
      {
        question: 'Walk me through how you would debug a production issue affecting 50% of users.',
        goodAnswerIndicators: ['Systematic approach', 'Mentions monitoring', 'Considers user impact'],
        redFlags: ['Jumps to solutions', 'No mention of rollback', 'Ignores communication'],
        timeAllocation: '10 min',
      },
    ],
    problemSolving: [
      {
        question: 'Given limited resources, how would you prioritize features for a new deliverable?',
        goodAnswerIndicators: ['Clear framework', 'Considers business impact', 'Stakeholder alignment'],
        redFlags: ['Random prioritization', 'No constraints consideration', 'Cannot make trade-offs'],
        timeAllocation: '10 min',
      },
    ],
    ownership: [
      {
        question: 'Tell me about a time you took initiative on something outside your job description.',
        goodAnswerIndicators: ['Proactive behavior', 'Took ownership', 'Made measurable impact'],
        redFlags: ['Waited for permission', 'Only did assigned tasks', 'No examples'],
        timeAllocation: '8 min',
      },
    ],
    culture: [
      {
        question: 'How do you prefer to receive feedback? Give an example of feedback that helped you grow.',
        goodAnswerIndicators: ['Open to criticism', 'Specific example', 'Shows self-awareness'],
        redFlags: ['Defensive about feedback', 'Cannot recall useful feedback', 'Only wants praise'],
        timeAllocation: '5-8 min',
      },
    ],
  };

  return {
    type,
    questions: questionsByType[type],
    duration: type === 'technical' ? '45-60 min' : '30-45 min',
  };
};

export const useInterviewPlanning = (): UseInterviewPlanningReturn => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedInterview, setGeneratedInterview] = useState<GeneratedInterview | null>(null);

  const generateInterview = useCallback(
    async (type: InterviewType) => {
      setIsGenerating(true);
      try {
        const result = await mockGenerateInterview(type);
        setGeneratedInterview(result);
      } finally {
        setIsGenerating(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setGeneratedInterview(null);
  }, []);

  return { isGenerating, generatedInterview, generateInterview, reset };
};

export default useInterviewPlanning;