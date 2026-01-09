import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  JobPostFormData, 
  DEPARTMENTS, 
  EXPERIENCE_LEVELS, 
  LOCATION_TYPES,
  CURRENCIES 
} from '@/types/ats';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sparkles, Loader2, Save, Eye } from 'lucide-react';

interface JobPostFormProps {
  initialData?: Partial<JobPostFormData>;
  onSubmit: (data: JobPostFormData, status: 'draft' | 'published') => void;
  isLoading?: boolean;
}

export const JobPostForm: React.FC<JobPostFormProps> = ({
  initialData,
  onSubmit,
  isLoading,
}) => {
  const [formData, setFormData] = useState<JobPostFormData>({
    title: initialData?.title || '',
    department: initialData?.department || '',
    experienceLevel: initialData?.experienceLevel || 'mid',
    description: initialData?.description || '',
    skills: initialData?.skills || '',
    locationType: initialData?.locationType || 'remote',
    location: initialData?.location || '',
    salaryMin: initialData?.salaryMin || '',
    salaryMax: initialData?.salaryMax || '',
    currency: initialData?.currency || 'USD',
    applicationDeadline: initialData?.applicationDeadline || '',
  });

  const [isGeneratingJD, setIsGeneratingJD] = useState(false);
  const [generationType, setGenerationType] = useState<string>('');

  const updateField = (field: keyof JobPostFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateJD = async (type: string) => {
    setIsGeneratingJD(true);
    setGenerationType(type);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const generatedDescriptions: Record<string, string> = {
      standard: `About the Role\n\nWe are seeking a talented ${formData.title || 'professional'} to join our ${formData.department || 'team'}. This is an exciting opportunity to make a significant impact in a fast-paced environment.\n\nResponsibilities\n• Lead and execute key initiatives within your domain\n• Collaborate with cross-functional teams to deliver exceptional results\n• Drive innovation and continuous improvement\n• Mentor and guide team members\n\nRequirements\n• ${formData.experienceLevel === 'senior' ? '5+ years' : '2-4 years'} of relevant experience\n• Strong problem-solving and communication skills\n• Proven track record of delivering results\n• Self-motivated with excellent time management`,
      
      outcome: `${formData.title || 'This Role'} - Impact-Driven\n\nWhat You'll Achieve in Year 1\n• First 30 days: Understand our systems, meet the team, complete onboarding\n• First 90 days: Own and deliver your first major project\n• First year: Drive measurable improvements in your area of ownership\n\nSuccess Metrics\n• Delivery velocity and quality\n• Team collaboration effectiveness\n• Innovation and process improvements\n• Stakeholder satisfaction scores\n\nWho You Are\nYou thrive on solving complex problems and measuring your impact. You're not just looking for a job—you want to build something meaningful.`,
      
      founder: `Hey! We're looking for a ${formData.title || 'rockstar'} 🚀\n\nThe Real Deal\nWe're a growing team that moves fast and ships even faster. No bureaucracy, no endless meetings—just great people building great products.\n\nWhat You'll Actually Do\n• Ship features that real users love\n• Have a direct line to decision-making\n• Work with a small, talented team\n• See your impact within weeks, not years\n\nWhat We Need\n• Someone who gets stuff done\n• Clear communicator (async-first culture)\n• Comfortable with ambiguity\n• Passion for our mission`,
      
      highSignal: `${formData.title || 'Role'} - For High Performers Only\n\n⚠️ This role is NOT for everyone.\n\nDo NOT apply if:\n• You need constant direction or hand-holding\n• You're uncomfortable with fast feedback cycles\n• You prefer process over outcomes\n• You're not ready to be held to high standards\n\nPerfect fit if:\n• You have a track record of exceptional delivery\n• You seek ownership and accountability\n• You thrive in high-performance environments\n• You want to work with the best\n\nExpectations\n• Immediate contribution expected within first month\n• Clear, measurable goals from day one\n• Regular performance conversations\n• High autonomy with high accountability`,
    };
    
    setFormData(prev => ({
      ...prev,
      description: generatedDescriptions[type] || generatedDescriptions.standard,
    }));
    
    setIsGeneratingJD(false);
    setGenerationType('');
  };

  const handleSubmit = (status: 'draft' | 'published') => {
    onSubmit(formData, status);
  };

  const isValid = formData.title && formData.department && formData.description;

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="bg-card rounded-2xl p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Job Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Senior Frontend Engineer"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="department">Department *</Label>
            <Select
              value={formData.department}
              onValueChange={(value) => updateField('department', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {DEPARTMENTS.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="experienceLevel">Experience Level</Label>
            <Select
              value={formData.experienceLevel}
              onValueChange={(value) => updateField('experienceLevel', value as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                {EXPERIENCE_LEVELS.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="locationType">Location Type</Label>
            <Select
              value={formData.locationType}
              onValueChange={(value) => updateField('locationType', value as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {LOCATION_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {formData.locationType !== 'remote' && (
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="location">Office Location</Label>
              <Input
                id="location"
                placeholder="e.g., San Francisco, CA"
                value={formData.location}
                onChange={(e) => updateField('location', e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Job Description with AI */}
      <div className="bg-card rounded-2xl p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Job Description *</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">AI Generate:</span>
            {[
              { key: 'standard', label: 'Standard' },
              { key: 'outcome', label: 'Outcome-Focused' },
              { key: 'founder', label: 'Founder-Style' },
              { key: 'highSignal', label: 'High-Signal' },
            ].map((option) => (
              <Button
                key={option.key}
                variant="outline"
                size="sm"
                onClick={() => handleGenerateJD(option.key)}
                disabled={isGeneratingJD}
                className="gap-1.5"
              >
                {isGeneratingJD && generationType === option.key ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <Sparkles className="w-3 h-3" />
                )}
                {option.label}
              </Button>
            ))}
          </div>
        </div>
        
        <Textarea
          placeholder="Describe the role, responsibilities, and requirements..."
          value={formData.description}
          onChange={(e) => updateField('description', e.target.value)}
          className="min-h-[300px] font-mono text-sm"
        />
      </div>

      {/* Skills */}
      <div className="bg-card rounded-2xl p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Skills & Requirements</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="skills">Required Skills</Label>
            <Textarea
              id="skills"
              placeholder="e.g., React, TypeScript, Node.js, PostgreSQL (comma-separated)"
              value={formData.skills}
              onChange={(e) => updateField('skills', e.target.value)}
              className="min-h-[80px]"
            />
          </div>
        </div>
      </div>

      {/* Compensation */}
      <div className="bg-card rounded-2xl p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Compensation</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select
              value={formData.currency}
              onValueChange={(value) => updateField('currency', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((currency) => (
                  <SelectItem key={currency.value} value={currency.value}>
                    {currency.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="salaryMin">Minimum Salary</Label>
            <Input
              id="salaryMin"
              type="number"
              placeholder="e.g., 100000"
              value={formData.salaryMin}
              onChange={(e) => updateField('salaryMin', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="salaryMax">Maximum Salary</Label>
            <Input
              id="salaryMax"
              type="number"
              placeholder="e.g., 150000"
              value={formData.salaryMax}
              onChange={(e) => updateField('salaryMax', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="deadline">Application Deadline</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.applicationDeadline}
              onChange={(e) => updateField('applicationDeadline', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        <Button
          variant="outline"
          onClick={() => handleSubmit('draft')}
          disabled={!isValid || isLoading}
          className="gap-2"
        >
          <Save className="w-4 h-4" />
          Save as Draft
        </Button>
        <Button
          variant="default"
          onClick={() => handleSubmit('published')}
          disabled={!isValid || isLoading}
          className="gap-2"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
          Publish Job
        </Button>
      </div>
    </div>
  );
};

export default JobPostForm;
