import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { HiringFlowStepper } from '@/components/hiring/HiringFlowStepper';
import { JobDescriptionForm } from '@/components/hiring/JobDescriptionForm';
import { AIGenerationPanel } from '@/components/hiring/AIGenerationPanel';
import { GeneratedJDDisplay } from '@/components/hiring/GeneratedJDDisplay';
import { ScreeningModeSelector } from '@/components/hiring/ScreeningModeSelector';
import { CandidateDecisionPanel } from '@/components/hiring/CandidateDecisionPanel';
import { ResumeUpload } from '@/components/resume/ResumeUpload';
import { ScreeningResults } from '@/components/resume/ScreeningResults';
import { Button } from '@/components/ui/button';
import { useJobDescription } from '@/hooks/useJobDescription';
import { useResumeScreening } from '@/hooks/useResumeScreening';
import {
  JobDescriptionData,
  GeneratedJobDescription,
  ScreeningMode,
  JD_PROMPT_TEMPLATES,
} from '@/types/hiring';
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';

type GenerationType = keyof typeof JD_PROMPT_TEMPLATES;

const initialJobData: JobDescriptionData = {
  roleName: '',
  teamSize: '2-5',
  experienceLevel: 'mid',
  responsibilities: '',
  mustHaveSkills: '',
  niceToHaveSkills: '',
};

const HiringFlow: React.FC = () => {
  const navigate = useNavigate();

  // Flow state
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Step 1: Job Description state
  const [jobData, setJobData] = useState<JobDescriptionData>(initialJobData);
  const [savedJD, setSavedJD] = useState<GeneratedJobDescription | null>(null);
  const { isGenerating, generationType, generatedJD, generateJD, reset: resetJD } = useJobDescription();

  // Step 2: Resume Screening state
  const [resumeText, setResumeText] = useState('');
  const [screeningMode, setScreeningMode] = useState<ScreeningMode | null>(null);
  const [shortlistedCount, setShortlistedCount] = useState(0);
  const { status, result, isLoading, screenResume, reset: resetScreening } = useResumeScreening();

  // Validation
  const isStep1Valid = Boolean(
    jobData.roleName.trim() &&
    jobData.responsibilities.trim() &&
    jobData.mustHaveSkills.trim()
  );

  const isStep1Complete = Boolean(savedJD);
  const isStep2Complete = shortlistedCount > 0;

  // Handlers
  const handleGenerateJD = async (type: GenerationType) => {
    if (!isStep1Valid) {
      toast.error('Please fill in required fields first');
      return;
    }
    try {
      await generateJD(jobData, type);
    } catch {
      toast.error('Failed to generate job description');
    }
  };

  const handleSaveAndContinue = () => {
    if (!generatedJD) {
      toast.error('Please generate a job description first');
      return;
    }
    setSavedJD(generatedJD);
    setCompletedSteps((prev) => [...prev.filter((s) => s !== 1), 1]);
    setCurrentStep(2);
    toast.success('Job description saved! Moving to resume screening.');
  };

  const handleAnalyzeResume = async () => {
    if (!resumeText.trim() || !screeningMode) return;

    await screenResume({
      resumeText,
      jobDescription: savedJD?.description,
      jobTitle: jobData.roleName,
    });
  };

  const handleDecision = (decision: 'shortlist' | 'reject' | null, notes: string) => {
    if (decision === 'shortlist') {
      setShortlistedCount((prev) => prev + 1);
      toast.success('Candidate shortlisted!');
    } else if (decision === 'reject') {
      toast.info('Candidate rejected');
    }
    // Reset for next candidate
    resetScreening();
    setResumeText('');
    setScreeningMode(null);
  };

  const handleContinueToInterview = () => {
    setCompletedSteps((prev) => [...prev.filter((s) => s !== 2), 2]);
    toast.info('Interview Planning coming soon!');
  };

  const handleStepClick = (step: number) => {
    if (step === 1) {
      setCurrentStep(1);
    } else if (step === 2 && completedSteps.includes(1)) {
      setCurrentStep(2);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 overflow-hidden">
        <Header />

        <div className="p-6 overflow-y-auto h-[calc(100vh-64px)]">
          {/* Back to Dashboard */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="mb-4 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>

          {/* Stepper */}
          <div className="mb-6">
            <HiringFlowStepper
              currentStep={currentStep}
              completedSteps={completedSteps}
              onStepClick={handleStepClick}
            />
          </div>

          {/* Step 1: Job Description Creation */}
          {currentStep === 1 && (
            <div className="max-w-6xl mx-auto animate-fade-in">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Step 1: Job Description Creation
                </h2>
                <p className="text-muted-foreground">
                  Define the role clearly so AI can help you screen candidates effectively
                </p>
              </div>

              {/* Status Banner */}
              {!isStep1Valid && (
                <div className="mb-6 p-4 bg-warning/10 border border-warning/20 rounded-xl flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-warning" />
                  <p className="text-sm text-foreground">
                    Fill in Role Name, Responsibilities, and Must-Have Skills to continue
                  </p>
                </div>
              )}

              {isStep1Complete && (
                <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-xl flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <p className="text-sm text-foreground">
                    Job description saved! You can edit or continue to resume screening.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Form */}
                <JobDescriptionForm
                  data={jobData}
                  onChange={setJobData}
                  disabled={isGenerating}
                />

                {/* Right: AI Panel + Generated JD */}
                <div className="space-y-6">
                  <AIGenerationPanel
                    onGenerate={handleGenerateJD}
                    isGenerating={isGenerating}
                    currentType={generationType}
                    disabled={!isStep1Valid}
                  />

                  {generatedJD && (
                    <GeneratedJDDisplay
                      data={generatedJD}
                      onRegenerate={() => generationType && handleGenerateJD(generationType)}
                      isRegenerating={isGenerating}
                    />
                  )}
                </div>
              </div>

              {/* Continue Button */}
              <div className="mt-8 flex justify-end">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleSaveAndContinue}
                  disabled={!generatedJD}
                  className="gap-2"
                >
                  Save & Continue to Resume Screening
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Resume Screening */}
          {currentStep === 2 && (
            <div className="max-w-6xl mx-auto animate-fade-in">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Step 2: Resume Screening
                </h2>
                <p className="text-muted-foreground">
                  Upload resumes and get AI-powered analysis based on your job requirements
                </p>
              </div>

              {/* JD Summary Card */}
              {savedJD && (
                <div className="mb-6 p-4 bg-card rounded-xl border border-border flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      Screening for: {jobData.roleName}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {savedJD.description.slice(0, 200)}...
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentStep(1)}
                  >
                    Edit JD
                  </Button>
                </div>
              )}

              {/* Progress */}
              <div className="mb-6 p-4 bg-muted rounded-xl">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{shortlistedCount}</span> candidate(s) shortlisted
                  {shortlistedCount === 0 && ' — Shortlist at least one to continue'}
                </p>
              </div>

              {!result ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left: Resume Upload */}
                  <div className="space-y-6">
                    <ResumeUpload
                      onTextExtracted={setResumeText}
                      isLoading={isLoading}
                    />

                    {resumeText && (
                      <div className="bg-card rounded-2xl p-4 shadow-card">
                        <p className="text-sm text-muted-foreground mb-2">
                          Resume Preview
                        </p>
                        <p className="text-sm text-foreground line-clamp-4">
                          {resumeText.slice(0, 300)}...
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right: Screening Mode */}
                  <ScreeningModeSelector
                    selectedMode={screeningMode}
                    onModeSelect={setScreeningMode}
                    onAnalyze={handleAnalyzeResume}
                    isAnalyzing={isLoading}
                    disabled={!resumeText.trim()}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <ScreeningResults result={result} />
                  </div>
                  <div>
                    <CandidateDecisionPanel onDecision={handleDecision} />

                    <Button
                      variant="outline"
                      className="w-full mt-4"
                      onClick={() => {
                        resetScreening();
                        setResumeText('');
                        setScreeningMode(null);
                      }}
                    >
                      Screen Another Resume
                    </Button>
                  </div>
                </div>
              )}

              {/* Continue Button */}
              <div className="mt-8 flex justify-end">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleContinueToInterview}
                  disabled={!isStep2Complete}
                  className="gap-2"
                >
                  Continue to Interview Planning
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HiringFlow;
