import { useState, useCallback } from 'react';
import {
  JobDescriptionData,
  GeneratedJobDescription,
  JD_PROMPT_TEMPLATES,
} from '@/types/hiring';

type GenerationType = keyof typeof JD_PROMPT_TEMPLATES;

interface UseJobDescriptionState {
  isGenerating: boolean;
  generationType: GenerationType | null;
  generatedJD: GeneratedJobDescription | null;
  error: string | null;
}

// Mock AI generation - will be replaced with real AI API
const mockGenerateJD = async (
  data: JobDescriptionData,
  type: GenerationType
): Promise<GeneratedJobDescription> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const baseDescription = `We are looking for a ${data.experienceLevel === 'entry' ? 'talented' : data.experienceLevel === 'senior' ? 'experienced' : 'skilled'} ${data.roleName} to join our team of ${data.teamSize === 'solo' ? 'one' : data.teamSize} people.

${data.responsibilities}

Required Skills:
${data.mustHaveSkills}

${data.niceToHaveSkills ? `Nice to have:\n${data.niceToHaveSkills}` : ''}`;

  const descriptions: Record<GenerationType, string> = {
    fast: baseDescription,
    outcome: `${baseDescription}\n\nThis role is outcome-focused. You'll be measured on your ability to deliver results, not just complete tasks. We care about impact, not hours worked.`,
    founder: `${baseDescription}\n\nThis is a high-ownership role. You'll have autonomy to shape your work and directly impact our trajectory. Ideal for someone who wants to build, not just maintain.`,
    highSignal: `${baseDescription}\n\nWe have a high bar for this role. You should be able to demonstrate expertise through concrete examples and measurable achievements. Generic applications will be filtered out.`,
  };

  const successCriteria: Record<GenerationType, string[]> = {
    fast: [
      'Complete onboarding and understand the codebase',
      'Ship first meaningful feature',
      'Establish working relationships with the team',
    ],
    outcome: [
      'Deliver 2-3 high-impact features that move key metrics',
      'Reduce technical debt by 20% in your area',
      'Establish yourself as a go-to person for your domain',
      'Document and share learnings with the team',
    ],
    founder: [
      'Own and ship a major initiative end-to-end',
      'Identify and propose improvements beyond your initial scope',
      'Build trust with leadership through consistent delivery',
      'Contribute to team culture and hiring decisions',
    ],
    highSignal: [
      'Demonstrate technical excellence through code quality',
      'Proactively identify and address architectural issues',
      'Mentor at least one team member',
      'Contribute to improving our engineering standards',
      'Deliver measurable business impact',
    ],
  };

  const notForThisRole: Record<GenerationType, string[]> = {
    fast: [
      'Looking for a passive, low-responsibility role',
      'Not interested in continuous learning',
    ],
    outcome: [
      'Prefer detailed task assignments over autonomy',
      'Uncomfortable with ambiguity',
      'Need constant direction and hand-holding',
    ],
    founder: [
      'Want a stable, predictable environment',
      'Prefer large company structures and processes',
      'Not excited about wearing multiple hats',
      'Looking for work-life separation',
    ],
    highSignal: [
      'Cannot provide concrete examples of past achievements',
      'Prefer following instructions over taking initiative',
      'Uncomfortable with direct, candid feedback',
      'Not willing to raise the bar for the team',
      'Looking for a stepping stone to another role',
    ],
  };

  return {
    description: descriptions[type],
    successCriteria: successCriteria[type],
    notForThisRole: notForThisRole[type],
    generationType: type,
  };
};

export const useJobDescription = () => {
  const [state, setState] = useState<UseJobDescriptionState>({
    isGenerating: false,
    generationType: null,
    generatedJD: null,
    error: null,
  });

  const generateJD = useCallback(
    async (data: JobDescriptionData, type: GenerationType) => {
      setState((prev) => ({
        ...prev,
        isGenerating: true,
        generationType: type,
        error: null,
      }));

      try {
        const result = await mockGenerateJD(data, type);
        setState({
          isGenerating: false,
          generationType: type,
          generatedJD: result,
          error: null,
        });
        return result;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to generate JD';
        setState((prev) => ({
          ...prev,
          isGenerating: false,
          error: errorMessage,
        }));
        throw error;
      }
    },
    []
  );

  const reset = useCallback(() => {
    setState({
      isGenerating: false,
      generationType: null,
      generatedJD: null,
      error: null,
    });
  }, []);

  return {
    ...state,
    generateJD,
    reset,
  };
};

export default useJobDescription;
