// Hiring Flow Types

export interface JobDescriptionData {
  roleName: string;
  teamSize: 'solo' | '2-5' | '6-15' | '16-50' | '50+';
  experienceLevel: 'entry' | 'mid' | 'senior' | 'lead' | 'executive';
  responsibilities: string;
  mustHaveSkills: string;
  niceToHaveSkills: string;
}

export interface GeneratedJobDescription {
  description: string;
  successCriteria: string[];
  notForThisRole: string[];
  generationType: 'fast' | 'outcome' | 'founder' | 'highSignal';
}

export interface HiringFlowState {
  currentStep: 1 | 2 | 3 | 4;
  jobDescription: JobDescriptionData | null;
  generatedJD: GeneratedJobDescription | null;
  isStepComplete: {
    step1: boolean;
    step2: boolean;
    step3: boolean;
    step4: boolean;
  };
}

export type ScreeningMode = 'quick' | 'deep' | 'risk' | 'interview';

export interface ScreeningModeConfig {
  id: ScreeningMode;
  title: string;
  description: string;
  icon: string;
}

export const TEAM_SIZE_OPTIONS = [
  { value: 'solo', label: 'Solo / Just me' },
  { value: '2-5', label: '2-5 people' },
  { value: '6-15', label: '6-15 people' },
  { value: '16-50', label: '16-50 people' },
  { value: '50+', label: '50+ people' },
] as const;

export const EXPERIENCE_LEVEL_OPTIONS = [
  { value: 'entry', label: 'Entry Level (0-2 years)' },
  { value: 'mid', label: 'Mid Level (2-5 years)' },
  { value: 'senior', label: 'Senior (5-8 years)' },
  { value: 'lead', label: 'Lead / Principal (8+ years)' },
  { value: 'executive', label: 'Executive / Director' },
] as const;

export const SCREENING_MODES: ScreeningModeConfig[] = [
  {
    id: 'quick',
    title: 'Quick Resume Scan',
    description: 'Fast overview of skills and experience match',
    icon: 'Zap',
  },
  {
    id: 'deep',
    title: 'Deep Skill Evaluation',
    description: 'Thorough analysis of technical competencies',
    icon: 'Search',
  },
  {
    id: 'risk',
    title: 'Risk & Red Flag Detection',
    description: 'Identify potential concerns and gaps',
    icon: 'AlertTriangle',
  },
  {
    id: 'interview',
    title: 'Generate Interview Questions',
    description: 'Create targeted questions for this candidate',
    icon: 'MessageSquare',
  },
];

// AI Prompt Templates
export const JD_PROMPT_TEMPLATES = {
  fast: {
    name: 'Fast & Simple JD',
    description: 'Quick, straightforward job description',
    systemPrompt: `You are a hiring assistant. Generate a clear, concise job description based on the provided inputs. Keep it professional and direct. No fluff.`,
  },
  outcome: {
    name: 'Outcome-Focused JD',
    description: 'Focus on measurable outcomes and impact',
    systemPrompt: `You are a hiring strategist. Generate a job description that emphasizes expected outcomes, measurable goals, and the impact this role will have. Focus on what success looks like, not just tasks.`,
  },
  founder: {
    name: 'Founder-Friendly JD',
    description: 'Startup-style, mission-driven description',
    systemPrompt: `You are a startup advisor. Generate a job description that appeals to candidates who want ownership, impact, and growth. Emphasize the mission, autonomy, and opportunity to shape the role.`,
  },
  highSignal: {
    name: 'High-Signal JD',
    description: 'Filters weak candidates effectively',
    systemPrompt: `You are a hiring expert focused on reducing noise. Generate a job description that clearly states expectations, includes specific requirements that filter out unqualified candidates, and sets a high bar. Include what this role is NOT for.`,
  },
} as const;

export const SCREENING_PROMPT_TEMPLATES = {
  quick: {
    name: 'Quick Resume Scan',
    systemPrompt: `Analyze this resume quickly. Provide:
1. Overall fit score (0-100)
2. Top 3 strengths that match the job
3. Top 2 concerns or gaps
4. Quick recommendation: Hire / Maybe / Reject
Keep it brief and actionable.`,
  },
  deep: {
    name: 'Deep Skill Evaluation',
    systemPrompt: `Conduct a thorough technical evaluation of this resume against the job requirements. Analyze:
1. Each required skill with proficiency level assessment
2. Evidence of hands-on experience for each skill
3. Depth vs breadth of technical knowledge
4. Progression and growth trajectory
5. Detailed strengths and gaps analysis
Provide specific examples from the resume to support your assessment.`,
  },
  risk: {
    name: 'Risk & Red Flag Detection',
    systemPrompt: `Analyze this resume for potential risks and red flags:
1. Employment gaps and their potential explanations
2. Job hopping patterns
3. Vague or inflated claims
4. Missing expected skills for the experience level
5. Inconsistencies in the narrative
6. Cultural fit concerns based on work history
Be objective but thorough in identifying concerns.`,
  },
  interview: {
    name: 'Interview Question Generator',
    systemPrompt: `Based on this resume and job description, generate:
1. 3 technical questions to validate claimed skills
2. 2 behavioral questions based on their experience
3. 2 probing questions for areas of concern
4. 1 culture fit question
5. 1 question to assess growth mindset
Each question should be specific to this candidate's background.`,
  },
} as const;
