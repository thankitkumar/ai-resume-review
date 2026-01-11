import React from 'react';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

interface PasswordStrengthIndicatorProps {
  password: string;
}

interface Requirement {
  label: string;
  test: (password: string) => boolean;
}

const requirements: Requirement[] = [
  { label: 'At least 8 characters', test: (p) => p.length >= 8 },
  { label: 'One lowercase letter', test: (p) => /[a-z]/.test(p) },
  { label: 'One uppercase letter', test: (p) => /[A-Z]/.test(p) },
  { label: 'One number', test: (p) => /[0-9]/.test(p) },
];

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  const passedCount = requirements.filter(req => req.test(password)).length;
  
  const getStrengthLabel = () => {
    if (passedCount === 0) return { label: 'Too weak', color: 'text-destructive' };
    if (passedCount === 1) return { label: 'Weak', color: 'text-destructive' };
    if (passedCount === 2) return { label: 'Fair', color: 'text-warning' };
    if (passedCount === 3) return { label: 'Good', color: 'text-info' };
    return { label: 'Strong', color: 'text-success' };
  };

  const strength = getStrengthLabel();

  if (!password) return null;

  return (
    <div className="space-y-3 mt-2">
      {/* Strength bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 flex gap-1">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-1.5 flex-1 rounded-full transition-colors',
                i < passedCount
                  ? passedCount === 4
                    ? 'bg-success'
                    : passedCount === 3
                    ? 'bg-info'
                    : passedCount === 2
                    ? 'bg-warning'
                    : 'bg-destructive'
                  : 'bg-muted'
              )}
            />
          ))}
        </div>
        <span className={cn('text-xs font-medium', strength.color)}>
          {strength.label}
        </span>
      </div>

      {/* Requirements list */}
      <div className="grid grid-cols-2 gap-1.5">
        {requirements.map((req, index) => {
          const passed = req.test(password);
          return (
            <div
              key={index}
              className={cn(
                'flex items-center gap-1.5 text-xs transition-colors',
                passed ? 'text-success' : 'text-muted-foreground'
              )}
            >
              {passed ? (
                <Check className="w-3 h-3" />
              ) : (
                <X className="w-3 h-3" />
              )}
              <span>{req.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
