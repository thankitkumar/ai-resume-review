import React from 'react';
import { Briefcase, Users, Award, ListChecks, Sparkles, Lightbulb } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  JobDescriptionData,
  TEAM_SIZE_OPTIONS,
  EXPERIENCE_LEVEL_OPTIONS,
} from '@/types/hiring';

interface JobDescriptionFormProps {
  data: JobDescriptionData;
  onChange: (data: JobDescriptionData) => void;
  disabled?: boolean;
}

export const JobDescriptionForm: React.FC<JobDescriptionFormProps> = ({
  data,
  onChange,
  disabled = false,
}) => {
  const updateField = <K extends keyof JobDescriptionData>(
    field: K,
    value: JobDescriptionData[K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Briefcase className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Role Details</h3>
          <p className="text-sm text-muted-foreground">
            Define the position you're hiring for
          </p>
        </div>
      </div>

      {/* Role Name */}
      <div className="space-y-2">
        <Label htmlFor="roleName" className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-muted-foreground" />
          Role Name
        </Label>
        <Input
          id="roleName"
          placeholder="e.g., Senior Frontend Developer"
          value={data.roleName}
          onChange={(e) => updateField('roleName', e.target.value)}
          disabled={disabled}
          className="bg-muted border-0"
        />
      </div>

      {/* Team Size & Experience Level */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="teamSize" className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            Team Size
          </Label>
          <Select
            value={data.teamSize}
            onValueChange={(value) => updateField('teamSize', value as JobDescriptionData['teamSize'])}
            disabled={disabled}
          >
            <SelectTrigger className="bg-muted border-0">
              <SelectValue placeholder="Select team size" />
            </SelectTrigger>
            <SelectContent>
              {TEAM_SIZE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="experienceLevel" className="flex items-center gap-2">
            <Award className="w-4 h-4 text-muted-foreground" />
            Experience Level
          </Label>
          <Select
            value={data.experienceLevel}
            onValueChange={(value) => updateField('experienceLevel', value as JobDescriptionData['experienceLevel'])}
            disabled={disabled}
          >
            <SelectTrigger className="bg-muted border-0">
              <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent>
              {EXPERIENCE_LEVEL_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Responsibilities */}
      <div className="space-y-2">
        <Label htmlFor="responsibilities" className="flex items-center gap-2">
          <ListChecks className="w-4 h-4 text-muted-foreground" />
          Key Responsibilities
        </Label>
        <Textarea
          id="responsibilities"
          placeholder="What will this person do day-to-day? List main responsibilities..."
          value={data.responsibilities}
          onChange={(e) => updateField('responsibilities', e.target.value)}
          disabled={disabled}
          className="min-h-[100px] bg-muted border-0 resize-none"
        />
      </div>

      {/* Must-Have Skills */}
      <div className="space-y-2">
        <Label htmlFor="mustHaveSkills" className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-muted-foreground" />
          Must-Have Skills
        </Label>
        <Textarea
          id="mustHaveSkills"
          placeholder="Critical skills required for this role. Be specific..."
          value={data.mustHaveSkills}
          onChange={(e) => updateField('mustHaveSkills', e.target.value)}
          disabled={disabled}
          className="min-h-[80px] bg-muted border-0 resize-none"
        />
      </div>

      {/* Nice-to-Have Skills */}
      <div className="space-y-2">
        <Label htmlFor="niceToHaveSkills" className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-muted-foreground" />
          Nice-to-Have Skills
          <span className="text-xs text-muted-foreground">(optional)</span>
        </Label>
        <Textarea
          id="niceToHaveSkills"
          placeholder="Bonus skills that would be great but not required..."
          value={data.niceToHaveSkills}
          onChange={(e) => updateField('niceToHaveSkills', e.target.value)}
          disabled={disabled}
          className="min-h-[60px] bg-muted border-0 resize-none"
        />
      </div>
    </div>
  );
};

export default JobDescriptionForm;
