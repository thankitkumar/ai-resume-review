// Resume Screening Types

export interface ResumeInput {
  resumeText: string;
  jobDescription?: string;
  jobTitle?: string;
}

export interface SkillMatch {
  skill: string;
  level: 'expert' | 'proficient' | 'beginner' | 'missing';
  relevance: 'critical' | 'important' | 'nice-to-have';
}

export interface ExperienceAnalysis {
  totalYears: number;
  relevantYears: number;
  highlights: string[];
  gaps: string[];
}

export interface EducationAnalysis {
  degree: string;
  field: string;
  institution: string;
  relevance: 'high' | 'medium' | 'low';
}

export interface ResumeScreeningResult {
  overallScore: number; // 0-100
  recommendation: 'strong_yes' | 'yes' | 'maybe' | 'no';
  summary: string;
  skills: SkillMatch[];
  experience: ExperienceAnalysis;
  education: EducationAnalysis[];
  strengths: string[];
  concerns: string[];
  suggestedQuestions: string[];
}

export interface ScreeningState {
  status: 'idle' | 'uploading' | 'analyzing' | 'success' | 'error';
  result: ResumeScreeningResult | null;
  error: string | null;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  location: string;
  preferredJob: string;
  level: string;
  avatar?: string;
  score?: number;
}

export interface JobVacancy {
  id: string;
  title: string;
  company: string;
  type: 'remote' | 'hybrid' | 'on-site';
}

export interface DashboardStats {
  totalEmployees: number;
  employeesChange: number;
  hiredCandidates: number;
  candidatesChange: number;
  hiringDays: number;
  daysChange: number;
}
