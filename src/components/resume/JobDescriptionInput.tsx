import React from 'react';
import { Briefcase } from 'lucide-react';

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  jobTitle: string;
  onJobTitleChange: (value: string) => void;
  disabled?: boolean;
}

export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  value,
  onChange,
  jobTitle,
  onJobTitleChange,
  disabled = false,
}) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-card">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Briefcase className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Job Requirements</h3>
          <p className="text-sm text-muted-foreground">Optional: Add job details for better matching</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Job Title
          </label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => onJobTitleChange(e.target.value)}
            placeholder="e.g., Senior Frontend Developer"
            className="w-full px-4 py-3 bg-muted rounded-xl border-0 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none"
            disabled={disabled}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Job Description
          </label>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste the job description or key requirements here..."
            className="w-full h-32 p-4 bg-muted rounded-xl border-0 resize-none text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none"
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionInput;
