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
  currentStep: 1 | 2 | 3 | 4 | 5;
  jobDescription: JobDescriptionData | null;
  generatedJD: GeneratedJobDescription | null;
  isStepComplete: {
    step1: boolean;
    step2: boolean;
    step3: boolean;
    step4: boolean;
    step5: boolean;
  };
}

export type ScreeningMode = 'quick' | 'deep' | 'risk' | 'interview';

export interface ScreeningModeConfig {
  id: ScreeningMode;
  title: string;
  description: string;
  icon: string;
}

// Step 3: Interview Planning Types
export type InterviewType = 'technical' | 'problemSolving' | 'ownership' | 'culture';
export type InterviewRound = 'phone' | 'technical' | 'onsite' | 'final';

export interface InterviewTypeConfig {
  id: InterviewType;
  title: string;
  description: string;
  icon: string;
}

export interface GeneratedInterview {
  type: InterviewType;
  questions: InterviewQuestion[];
  duration: string;
}

export interface InterviewQuestion {
  question: string;
  goodAnswerIndicators: string[];
  redFlags: string[];
  timeAllocation: string;
}

export interface InterviewPlan {
  round: InterviewRound;
  candidateLevel: string;
  interviews: GeneratedInterview[];
  notes: string;
}

// Step 4: Interview Decision Types
export interface InterviewScore {
  category: string;
  score: 1 | 2 | 3 | 4 | 5;
  notes: string;
}

export interface CandidateEvaluation {
  decision: 'hire' | 'maybe' | 'reject';
  confidence: number;
  reasoning: string[];
  strengths: string[];
  risks: string[];
  riskMitigation: string[];
  ninetyDayRisk: string;
}

// Step 5: Offer & Communication Types
export type CommunicationType = 'offer' | 'negotiation' | 'rejection' | 'keepWarm';

export interface OfferDetails {
  roleName: string;
  salaryMin: string;
  salaryMax: string;
  location: string;
  startDate: string;
  additionalBenefits: string;
}

export interface GeneratedEmail {
  type: CommunicationType;
  subject: string;
  body: string;
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

export const INTERVIEW_ROUND_OPTIONS = [
  { value: 'phone', label: 'Phone Screen' },
  { value: 'technical', label: 'Technical Round' },
  { value: 'onsite', label: 'Onsite / Virtual Onsite' },
  { value: 'final', label: 'Final Round' },
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

export const INTERVIEW_TYPES: InterviewTypeConfig[] = [
  {
    id: 'technical',
    title: 'Technical Skills Interview',
    description: 'Assess core technical competencies and problem-solving',
    icon: 'Code',
  },
  {
    id: 'problemSolving',
    title: 'Problem Solving Interview',
    description: 'Evaluate analytical thinking and approach to challenges',
    icon: 'Lightbulb',
  },
  {
    id: 'ownership',
    title: 'Ownership & Accountability',
    description: 'Gauge initiative, responsibility, and follow-through',
    icon: 'Target',
  },
  {
    id: 'culture',
    title: 'Culture & Communication',
    description: 'Assess team fit and communication style',
    icon: 'Users',
  },
];

export const COMMUNICATION_TYPES = [
  {
    id: 'offer' as CommunicationType,
    title: 'Generate Offer Email',
    description: 'Professional offer letter with compensation details',
    icon: 'Mail',
  },
  {
    id: 'negotiation' as CommunicationType,
    title: 'Negotiation-Safe Offer',
    description: 'Offer with room for negotiation built in',
    icon: 'Scale',
  },
  {
    id: 'rejection' as CommunicationType,
    title: 'Generate Rejection Email',
    description: 'Professional and respectful decline',
    icon: 'XCircle',
  },
  {
    id: 'keepWarm' as CommunicationType,
    title: 'Keep-Warm Email',
    description: 'Maintain relationship for future opportunities',
    icon: 'Heart',
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

export const INTERVIEW_PROMPT_TEMPLATES = {
  technical: {
    name: 'Technical Skills Interview',
    systemPrompt: `Generate a structured technical interview plan. For each question provide:
1. The specific question to ask
2. What a strong answer looks like (specific indicators)
3. Red flags to watch for
4. Suggested time allocation
Focus on practical, role-relevant technical skills.`,
  },
  problemSolving: {
    name: 'Problem Solving Interview',
    systemPrompt: `Generate a problem-solving interview plan. Include:
1. Scenario-based questions that reveal analytical thinking
2. Follow-up probes to understand their process
3. What structured thinking looks like
4. Warning signs of surface-level reasoning
Make problems relevant to the role context.`,
  },
  ownership: {
    name: 'Ownership & Accountability Interview',
    systemPrompt: `Generate questions that assess ownership and accountability. Focus on:
1. Past examples where they took initiative
2. How they handled failures or setbacks
3. Evidence of going beyond their job description
4. Red flags like blame-shifting or victim mentality
Use behavioral interview format (STAR method compatible).`,
  },
  culture: {
    name: 'Culture & Communication Interview',
    systemPrompt: `Generate questions for culture fit and communication assessment. Include:
1. Collaboration style questions
2. Conflict resolution scenarios
3. Communication preference questions
4. Values alignment questions
Tailor to a startup/growth-stage environment.`,
  },
} as const;

export const DECISION_PROMPT_TEMPLATES = {
  evaluate: {
    name: 'Evaluate Candidate',
    systemPrompt: `Based on the interview notes and scores provided, evaluate this candidate objectively. Provide:
1. Clear recommendation: Hire / Maybe / Reject with confidence level (0-100%)
2. Key reasoning points (max 5)
3. Top strengths demonstrated in interviews
4. Identified risks
5. If hiring, mitigation strategies for risks
Be data-driven and remove emotional bias.`,
  },
  compare: {
    name: 'Compare Candidates',
    systemPrompt: `Compare this candidate against the ideal profile and common pitfalls. Analyze:
1. How they stack up against must-have requirements
2. Differentiating strengths
3. Relative weaknesses
4. Overall ranking justification
Provide objective comparison criteria.`,
  },
  risk: {
    name: 'Predict 90-Day Risk',
    systemPrompt: `Based on all interview data, predict potential 90-day risks if this candidate is hired:
1. Performance risk factors
2. Cultural integration challenges
3. Skill gap concerns
4. Retention risk indicators
5. Recommended onboarding focus areas
Be realistic but not overly pessimistic.`,
  },
} as const;

export const COMMUNICATION_PROMPT_TEMPLATES = {
  offer: {
    name: 'Offer Email',
    systemPrompt: `Generate a professional offer email that includes:
1. Clear role title and reporting structure
2. Compensation details (salary range provided)
3. Start date and location
4. Key benefits mentioned
5. Next steps for acceptance
6. Warm but professional tone
Make it US/India friendly in language.`,
  },
  negotiation: {
    name: 'Negotiation-Safe Offer',
    systemPrompt: `Generate an offer email designed for potential negotiation:
1. Present the offer confidently
2. Leave room for discussion without appearing weak
3. Highlight non-monetary benefits
4. Include a clear deadline for response
5. Professional language that maintains leverage
Keep tone balanced between firmness and flexibility.`,
  },
  rejection: {
    name: 'Rejection Email',
    systemPrompt: `Generate a professional rejection email that:
1. Thanks the candidate genuinely
2. Delivers the news clearly but kindly
3. Does not provide specific feedback (legal safety)
4. Leaves door open for future roles if appropriate
5. Maintains company reputation
Keep it brief, respectful, and legally safe.`,
  },
  keepWarm: {
    name: 'Keep-Warm Email',
    systemPrompt: `Generate a "keep warm" email for candidates you want to maintain relationship with:
1. Acknowledge their value even though timing isn't right
2. Be specific about why you want to stay in touch
3. Invite them to stay connected
4. Mention potential future opportunities
5. Genuine and non-generic tone
Make them feel valued, not rejected.`,
  },
} as const;
