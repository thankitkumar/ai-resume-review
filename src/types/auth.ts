import { z } from 'zod';

// Validation schemas
export const emailSchema = z
  .string()
  .trim()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .max(255, 'Email must be less than 255 characters');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be less than 128 characters')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export const signupSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters'),
  email: emailSchema,
  password: passwordSchema,
  companyName: z
    .string()
    .trim()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must be less than 100 characters'),
  role: z.enum(['hr_admin', 'founder', 'hiring_manager'], {
    required_error: 'Please select your role',
  }),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;

export interface User {
  id: string;
  email: string;
  fullName: string;
  companyName: string;
  role: 'hr_admin' | 'founder' | 'hiring_manager';
  createdAt: Date;
  trialStartDate: Date;
  trialEndDate: Date;
  isTrialExpired: boolean;
  isEmailVerified: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  signup: (data: Omit<SignupFormData, 'acceptTerms'>) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

export const ROLE_OPTIONS = [
  { value: 'hr_admin', label: 'HR Admin' },
  { value: 'founder', label: 'Founder / CEO' },
  { value: 'hiring_manager', label: 'Hiring Manager' },
] as const;

export const TRIAL_DURATION_DAYS = 7;
