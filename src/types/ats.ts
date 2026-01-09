// ATS Core Types

export type JobStatus = 'draft' | 'published' | 'paused' | 'closed';
export type JobLocationType = 'remote' | 'hybrid' | 'onsite';
export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'lead' | 'executive';
export type ApplicationStatus = 'applied' | 'screening' | 'interview' | 'decision' | 'offer' | 'hired' | 'rejected';
export type PublishPlatform = 'career_page' | 'linkedin' | 'indeed' | 'naukri' | 'custom';

export interface JobPost {
  id: string;
  title: string;
  department: string;
  experienceLevel: ExperienceLevel;
  description: string;
  skills: string[];
  locationType: JobLocationType;
  location?: string;
  salaryMin?: number;
  salaryMax?: number;
  currency: string;
  applicationDeadline?: string;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
  publishedPlatforms: PublishPlatformStatus[];
  applicationsCount: number;
}

export interface PublishPlatformStatus {
  platform: PublishPlatform;
  status: 'pending' | 'published' | 'failed';
  url?: string;
  publishedAt?: string;
  error?: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
  resumeText?: string;
  appliedJobId: string;
  appliedJobTitle: string;
  status: ApplicationStatus;
  stage: ApplicationStatus;
  appliedAt: string;
  screeningScore?: number;
  interviewNotes?: InterviewNote[];
  internalNotes?: string;
  decisionStatus?: 'hire' | 'maybe' | 'reject';
  avatar?: string;
}

export interface InterviewNote {
  id: string;
  interviewerId: string;
  interviewerName: string;
  type: string;
  score: number;
  strengths: string[];
  concerns: string[];
  notes: string;
  createdAt: string;
}

export interface Message {
  id: string;
  candidateId: string;
  candidateName: string;
  subject: string;
  body: string;
  type: 'email' | 'internal_note';
  direction: 'inbound' | 'outbound';
  createdAt: string;
  read: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: 'free' | 'pro' | 'team';
  price: number;
  features: string[];
  limits: {
    jobs: number;
    candidates: number;
    aiCredits: number;
    teamMembers: number;
  };
}

// Form Types
export interface JobPostFormData {
  title: string;
  department: string;
  experienceLevel: ExperienceLevel;
  description: string;
  skills: string;
  locationType: JobLocationType;
  location: string;
  salaryMin: string;
  salaryMax: string;
  currency: string;
  applicationDeadline: string;
}

// Dashboard Metrics
export interface DashboardMetrics {
  openJobs: number;
  totalCandidates: number;
  interviewsScheduled: number;
  offersSent: number;
  hiringPipelineOverview: PipelineStage[];
}

export interface PipelineStage {
  stage: ApplicationStatus;
  count: number;
  percentage: number;
}

// Constants
export const DEPARTMENTS = [
  'Engineering',
  'Product',
  'Design',
  'Marketing',
  'Sales',
  'Operations',
  'HR',
  'Finance',
  'Legal',
  'Customer Success',
] as const;

export const EXPERIENCE_LEVELS: { value: ExperienceLevel; label: string }[] = [
  { value: 'entry', label: 'Entry Level (0-2 years)' },
  { value: 'mid', label: 'Mid Level (2-5 years)' },
  { value: 'senior', label: 'Senior (5-8 years)' },
  { value: 'lead', label: 'Lead (8-12 years)' },
  { value: 'executive', label: 'Executive (12+ years)' },
];

export const LOCATION_TYPES: { value: JobLocationType; label: string }[] = [
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'onsite', label: 'On-site' },
];

export const APPLICATION_STAGES: { value: ApplicationStatus; label: string; color: string }[] = [
  { value: 'applied', label: 'Applied', color: 'bg-muted text-muted-foreground' },
  { value: 'screening', label: 'Screening', color: 'bg-info/10 text-info' },
  { value: 'interview', label: 'Interview', color: 'bg-warning/10 text-warning' },
  { value: 'decision', label: 'Decision', color: 'bg-primary/10 text-primary' },
  { value: 'offer', label: 'Offer', color: 'bg-success/10 text-success' },
  { value: 'hired', label: 'Hired', color: 'bg-success text-success-foreground' },
  { value: 'rejected', label: 'Rejected', color: 'bg-destructive/10 text-destructive' },
];

export const PUBLISH_PLATFORMS: { value: PublishPlatform; label: string; icon: string }[] = [
  { value: 'career_page', label: 'Company Career Page', icon: 'Building2' },
  { value: 'linkedin', label: 'LinkedIn', icon: 'Linkedin' },
  { value: 'indeed', label: 'Indeed', icon: 'Globe' },
  { value: 'naukri', label: 'Naukri (India)', icon: 'Globe' },
  { value: 'custom', label: 'Custom Job Link', icon: 'Link' },
];

export const CURRENCIES = [
  { value: 'USD', label: 'USD ($)' },
  { value: 'EUR', label: 'EUR (€)' },
  { value: 'GBP', label: 'GBP (£)' },
  { value: 'INR', label: 'INR (₹)' },
] as const;
