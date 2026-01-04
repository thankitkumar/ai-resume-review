import { useState, useCallback } from 'react';
import { ResumeInput, ResumeScreeningResult, ScreeningState } from '@/types/resume';

// Mock AI response for demonstration
// In production, this would call an actual AI API
const mockScreenResume = async (input: ResumeInput): Promise<ResumeScreeningResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Mock result based on resume content
  const hasReactExperience = input.resumeText.toLowerCase().includes('react');
  const hasTypeScript = input.resumeText.toLowerCase().includes('typescript');
  const hasNodeJS = input.resumeText.toLowerCase().includes('node');

  return {
    overallScore: hasReactExperience && hasTypeScript ? 85 : hasReactExperience ? 72 : 58,
    recommendation: hasReactExperience && hasTypeScript ? 'strong_yes' : hasReactExperience ? 'yes' : 'maybe',
    summary: `This candidate shows ${hasReactExperience ? 'strong' : 'moderate'} technical skills with ${hasTypeScript ? 'excellent' : 'basic'} experience in modern frontend development. Their background aligns ${hasReactExperience && hasTypeScript ? 'very well' : 'reasonably'} with the role requirements.`,
    skills: [
      { skill: 'React', level: hasReactExperience ? 'expert' : 'missing', relevance: 'critical' },
      { skill: 'TypeScript', level: hasTypeScript ? 'proficient' : 'beginner', relevance: 'critical' },
      { skill: 'Node.js', level: hasNodeJS ? 'proficient' : 'missing', relevance: 'important' },
      { skill: 'CSS/Tailwind', level: 'proficient', relevance: 'important' },
      { skill: 'Git', level: 'proficient', relevance: 'nice-to-have' },
      { skill: 'AWS', level: 'beginner', relevance: 'nice-to-have' },
    ],
    experience: {
      totalYears: 5,
      relevantYears: hasReactExperience ? 3 : 1,
      highlights: [
        'Led frontend development for a SaaS product serving 10k+ users',
        'Implemented complex state management solutions',
        'Contributed to open-source React libraries',
      ],
      gaps: hasTypeScript ? [] : [
        'Limited TypeScript experience in production environments',
        'No experience with large-scale team collaboration tools',
      ],
    },
    education: [
      {
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        institution: 'State University',
        relevance: 'high',
      },
    ],
    strengths: [
      'Strong problem-solving abilities demonstrated through previous projects',
      'Excellent communication skills evident from collaborative work',
      'Self-motivated learner with continuous skill improvement',
      'Experience with agile development methodologies',
    ],
    concerns: [
      'Limited experience with backend technologies',
      'No prior experience in a senior/lead role',
      'Could benefit from more system design knowledge',
    ],
    suggestedQuestions: [
      'Can you walk me through a complex React component you built and the challenges you faced?',
      'How do you approach performance optimization in frontend applications?',
      'Describe a situation where you had to learn a new technology quickly for a project.',
      'How do you handle code reviews and feedback from team members?',
      'What strategies do you use to ensure your code is maintainable and scalable?',
    ],
  };
};

export const useResumeScreening = () => {
  const [state, setState] = useState<ScreeningState>({
    status: 'idle',
    result: null,
    error: null,
  });

  const screenResume = useCallback(async (input: ResumeInput) => {
    setState({ status: 'analyzing', result: null, error: null });

    try {
      const result = await mockScreenResume(input);
      setState({ status: 'success', result, error: null });
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to analyze resume';
      setState({ status: 'error', result: null, error: errorMessage });
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ status: 'idle', result: null, error: null });
  }, []);

  return {
    ...state,
    isLoading: state.status === 'analyzing',
    screenResume,
    reset,
  };
};

export default useResumeScreening;
