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
import { InterviewTypeSelector } from '@/components/hiring/InterviewTypeSelector';
import { InterviewQuestionsDisplay } from '@/components/hiring/InterviewQuestionsDisplay';
import { DecisionScoreCard } from '@/components/hiring/DecisionScoreCard';
import { DecisionActionsPanel } from '@/components/hiring/DecisionActionsPanel';
import { EvaluationResultDisplay } from '@/components/hiring/EvaluationResultDisplay';
import { OfferDetailsForm } from '@/components/hiring/OfferDetailsForm';
import { CommunicationTypeSelector } from '@/components/hiring/CommunicationTypeSelector';
import { GeneratedEmailDisplay } from '@/components/hiring/GeneratedEmailDisplay';
import { ResumeUpload } from '@/components/resume/ResumeUpload';
import { ScreeningResults } from '@/components/resume/ScreeningResults';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useJobDescription } from '@/hooks/useJobDescription';
import { useResumeScreening } from '@/hooks/useResumeScreening';
import { useInterviewPlanning } from '@/hooks/useInterviewPlanning';
import { useDecisionSupport } from '@/hooks/useDecisionSupport';
import { useCommunication } from '@/hooks/useCommunication';
import {
  JobDescriptionData,
  GeneratedJobDescription,
  ScreeningMode,
  InterviewType,
  InterviewRound,
  InterviewScore,
  CommunicationType,
  OfferDetails,
  JD_PROMPT_TEMPLATES,
  INTERVIEW_ROUND_OPTIONS,
  EXPERIENCE_LEVEL_OPTIONS,
} from '@/types/hiring';
import { ArrowLeft, ArrowRight, FileText, AlertCircle, CheckCircle2, PartyPopper } from 'lucide-react';
import { toast } from 'sonner';

type GenerationType = keyof typeof JD_PROMPT_TEMPLATES;
type DecisionAction = 'evaluate' | 'compare' | 'risk';

const initialJobData: JobDescriptionData = {
  roleName: '',
  teamSize: '2-5',
  experienceLevel: 'mid',
  responsibilities: '',
  mustHaveSkills: '',
  niceToHaveSkills: '',
};

const initialScores: InterviewScore[] = [
  { category: 'Technical Skills', score: 3, notes: '' },
  { category: 'Problem Solving', score: 3, notes: '' },
  { category: 'Communication', score: 3, notes: '' },
  { category: 'Culture Fit', score: 3, notes: '' },
];

const initialOfferDetails: OfferDetails = {
  roleName: '',
  salaryMin: '',
  salaryMax: '',
  location: '',
  startDate: '',
  additionalBenefits: '',
};

const HiringFlow: React.FC = () => {
  const navigate = useNavigate();

  // Flow state
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Step 1: Job Description
  const [jobData, setJobData] = useState<JobDescriptionData>(initialJobData);
  const [savedJD, setSavedJD] = useState<GeneratedJobDescription | null>(null);
  const { isGenerating, generationType, generatedJD, generateJD, reset: resetJD } = useJobDescription();

  // Step 2: Resume Screening
  const [resumeText, setResumeText] = useState('');
  const [screeningMode, setScreeningMode] = useState<ScreeningMode | null>(null);
  const [shortlistedCount, setShortlistedCount] = useState(0);
  const { status, result, isLoading, screenResume, reset: resetScreening } = useResumeScreening();

  // Step 3: Interview Planning
  const [interviewRound, setInterviewRound] = useState<InterviewRound>('technical');
  const [candidateLevel, setCandidateLevel] = useState(jobData.experienceLevel);
  const [interviewType, setInterviewType] = useState<InterviewType | null>(null);
  const [interviewNotes, setInterviewNotes] = useState('');
  const { isGenerating: isGenInterview, generatedInterview, generateInterview, reset: resetInterview } = useInterviewPlanning();

  // Step 4: Interview Decision
  const [scores, setScores] = useState<InterviewScore[]>(initialScores);
  const [decisionAction, setDecisionAction] = useState<DecisionAction | null>(null);
  const [decisionConfirmed, setDecisionConfirmed] = useState(false);
  const { isAnalyzing, evaluation, analyze, reset: resetDecision } = useDecisionSupport();

  // Step 5: Offer & Communication
  const [offerDetails, setOfferDetails] = useState<OfferDetails>({ ...initialOfferDetails, roleName: jobData.roleName });
  const [commType, setCommType] = useState<CommunicationType | null>(null);
  const [flowCompleted, setFlowCompleted] = useState(false);
  const { isGenerating: isGenEmail, generatedEmail, generateEmail, reset: resetComm } = useCommunication();

  // Validation
  const isStep1Valid = Boolean(jobData.roleName.trim() && jobData.responsibilities.trim() && jobData.mustHaveSkills.trim());
  const isStep1Complete = Boolean(savedJD);
  const isStep2Complete = shortlistedCount > 0;
  const isStep3Complete = Boolean(generatedInterview);
  const isStep4Complete = decisionConfirmed && Boolean(evaluation);
  const isStep5Complete = flowCompleted;

  // Handlers
  const handleGenerateJD = async (type: GenerationType) => {
    if (!isStep1Valid) { toast.error('Please fill in required fields first'); return; }
    try { await generateJD(jobData, type); } catch { toast.error('Failed to generate'); }
  };

  const handleSaveAndContinue = () => {
    if (!generatedJD) { toast.error('Generate a JD first'); return; }
    setSavedJD(generatedJD);
    setCompletedSteps((prev) => [...prev.filter((s) => s !== 1), 1]);
    setCurrentStep(2);
    toast.success('Job description saved!');
  };

  const handleAnalyzeResume = async () => {
    if (!resumeText.trim() || !screeningMode) return;
    await screenResume({ resumeText, jobDescription: savedJD?.description, jobTitle: jobData.roleName });
  };

  const handleDecision = (decision: 'shortlist' | 'reject' | null) => {
    if (decision === 'shortlist') { setShortlistedCount((prev) => prev + 1); toast.success('Candidate shortlisted!'); }
    else if (decision === 'reject') { toast.info('Candidate rejected'); }
    resetScreening(); setResumeText(''); setScreeningMode(null);
  };

  const handleContinueToStep = (step: 2 | 3 | 4 | 5) => {
    setCompletedSteps((prev) => [...prev.filter((s) => s !== step - 1), step - 1]);
    setCurrentStep(step);
  };

  const handleStepClick = (step: number) => {
    if (step <= Math.max(...completedSteps, 0) + 1) setCurrentStep(step as 1 | 2 | 3 | 4 | 5);
  };

  const handleGenerateInterview = async () => {
    if (!interviewType) return;
    await generateInterview(interviewType, jobData.roleName, candidateLevel);
  };

  const handleRunAnalysis = async () => {
    if (!decisionAction) return;
    await analyze(decisionAction, scores, interviewNotes);
  };

  const handleConfirmDecision = () => {
    setDecisionConfirmed(true);
    toast.success('Decision confirmed!');
  };

  const handleGenerateEmail = async () => {
    if (!commType) return;
    await generateEmail(commType, { ...offerDetails, roleName: offerDetails.roleName || jobData.roleName });
  };

  const handleCompleteFlow = () => {
    setFlowCompleted(true);
    setCompletedSteps([1, 2, 3, 4, 5]);
    toast.success('Hiring flow completed!');
  };

  const handleStartNewHire = () => {
    setCurrentStep(1);
    setCompletedSteps([]);
    setJobData(initialJobData);
    setSavedJD(null);
    resetJD();
    setResumeText('');
    setScreeningMode(null);
    setShortlistedCount(0);
    resetScreening();
    setInterviewType(null);
    setInterviewNotes('');
    resetInterview();
    setScores(initialScores);
    setDecisionAction(null);
    setDecisionConfirmed(false);
    resetDecision();
    setOfferDetails(initialOfferDetails);
    setCommType(null);
    setFlowCompleted(false);
    resetComm();
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <Header />
        <div className="p-6 overflow-y-auto h-[calc(100vh-64px)]">
          <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="mb-4 gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Button>

          <div className="mb-6">
            <HiringFlowStepper currentStep={currentStep} completedSteps={completedSteps} onStepClick={handleStepClick} />
          </div>

          {/* Step 1: Job Description */}
          {currentStep === 1 && (
            <div className="max-w-6xl mx-auto animate-fade-in">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">Step 1: Job Description Creation</h2>
                <p className="text-muted-foreground">Define the role clearly so AI can help you screen candidates effectively</p>
              </div>
              {!isStep1Valid && (
                <div className="mb-6 p-4 bg-warning/10 border border-warning/20 rounded-xl flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-warning" />
                  <p className="text-sm text-foreground">Fill in Role Name, Responsibilities, and Must-Have Skills to continue</p>
                </div>
              )}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <JobDescriptionForm data={jobData} onChange={setJobData} disabled={isGenerating} />
                <div className="space-y-6">
                  <AIGenerationPanel onGenerate={handleGenerateJD} isGenerating={isGenerating} currentType={generationType} disabled={!isStep1Valid} />
                  {generatedJD && <GeneratedJDDisplay data={generatedJD} onRegenerate={() => generationType && handleGenerateJD(generationType)} isRegenerating={isGenerating} />}
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <Button variant="hero" size="lg" onClick={handleSaveAndContinue} disabled={!generatedJD} className="gap-2">
                  Save & Continue to Resume Screening <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Resume Screening */}
          {currentStep === 2 && (
            <div className="max-w-6xl mx-auto animate-fade-in">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">Step 2: Resume Screening</h2>
                <p className="text-muted-foreground">Upload resumes and get AI-powered analysis</p>
              </div>
              {savedJD && (
                <div className="mb-6 p-4 bg-card rounded-xl border border-border flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><FileText className="w-5 h-5 text-primary" /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">Screening for: {jobData.roleName}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{savedJD.description.slice(0, 200)}...</p>
                  </div>
                </div>
              )}
              <div className="mb-6 p-4 bg-muted rounded-xl">
                <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">{shortlistedCount}</span> candidate(s) shortlisted{shortlistedCount === 0 && ' — Shortlist at least one to continue'}</p>
              </div>
              {!result ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ResumeUpload onTextExtracted={setResumeText} isLoading={isLoading} />
                  <ScreeningModeSelector selectedMode={screeningMode} onModeSelect={setScreeningMode} onAnalyze={handleAnalyzeResume} isAnalyzing={isLoading} disabled={!resumeText.trim()} />
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2"><ScreeningResults result={result} /></div>
                  <div>
                    <CandidateDecisionPanel onDecision={handleDecision} />
                    <Button variant="outline" className="w-full mt-4" onClick={() => { resetScreening(); setResumeText(''); setScreeningMode(null); }}>Screen Another Resume</Button>
                  </div>
                </div>
              )}
              <div className="mt-8 flex justify-end">
                <Button variant="hero" size="lg" onClick={() => handleContinueToStep(3)} disabled={!isStep2Complete} className="gap-2">
                  Continue to Interview Planning <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Interview Planning */}
          {currentStep === 3 && (
            <div className="max-w-6xl mx-auto animate-fade-in">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">Step 3: Interview Planning</h2>
                <p className="text-muted-foreground">Create structured interviews that reveal true capabilities</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-card rounded-2xl p-6 shadow-card space-y-4">
                  <div className="space-y-2"><Label>Interview Round</Label><Select value={interviewRound} onValueChange={(v) => setInterviewRound(v as InterviewRound)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{INTERVIEW_ROUND_OPTIONS.map((opt) => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}</SelectContent></Select></div>
                  <div className="space-y-2"><Label>Candidate Level</Label><Select value={candidateLevel} onValueChange={(v) => setCandidateLevel(v as typeof candidateLevel)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{EXPERIENCE_LEVEL_OPTIONS.map((opt) => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}</SelectContent></Select></div>
                </div>
                <InterviewTypeSelector selectedType={interviewType} onTypeSelect={setInterviewType} onGenerate={handleGenerateInterview} isGenerating={isGenInterview} />
              </div>
              {generatedInterview && <InterviewQuestionsDisplay interview={generatedInterview} onRegenerate={handleGenerateInterview} isRegenerating={isGenInterview} notes={interviewNotes} onNotesChange={setInterviewNotes} />}
              <div className="mt-8 flex justify-end">
                <Button variant="hero" size="lg" onClick={() => handleContinueToStep(4)} disabled={!isStep3Complete} className="gap-2">
                  Continue to Interview Decision <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Interview Decision */}
          {currentStep === 4 && (
            <div className="max-w-6xl mx-auto animate-fade-in">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">Step 4: Interview Decision</h2>
                <p className="text-muted-foreground">Get objective analysis to make confident hiring decisions</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <DecisionScoreCard scores={scores} onScoreChange={(i, s) => setScores((prev) => prev.map((sc, idx) => idx === i ? s : sc))} />
                <DecisionActionsPanel selectedAction={decisionAction} onActionSelect={setDecisionAction} onAnalyze={handleRunAnalysis} isAnalyzing={isAnalyzing} />
              </div>
              {evaluation && (
                <>
                  <EvaluationResultDisplay evaluation={evaluation} />
                  {!decisionConfirmed && (
                    <div className="mt-6 flex justify-center">
                      <Button variant="hero" size="lg" onClick={handleConfirmDecision} className="gap-2">
                        <CheckCircle2 className="w-5 h-5" /> Confirm Decision
                      </Button>
                    </div>
                  )}
                </>
              )}
              <div className="mt-8 flex justify-end">
                <Button variant="hero" size="lg" onClick={() => handleContinueToStep(5)} disabled={!isStep4Complete} className="gap-2">
                  Continue to Offer & Communication <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 5: Offer & Communication */}
          {currentStep === 5 && (
            <div className="max-w-6xl mx-auto animate-fade-in">
              {!flowCompleted ? (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-foreground mb-2">Step 5: Offer & Communication</h2>
                    <p className="text-muted-foreground">Generate professional communications to close the hire</p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <OfferDetailsForm data={offerDetails} onChange={setOfferDetails} />
                    <CommunicationTypeSelector selectedType={commType} onTypeSelect={setCommType} onGenerate={handleGenerateEmail} isGenerating={isGenEmail} disabled={!offerDetails.roleName && !jobData.roleName} />
                  </div>
                  {generatedEmail && <GeneratedEmailDisplay email={generatedEmail} onRegenerate={handleGenerateEmail} isRegenerating={isGenEmail} />}
                  <div className="mt-8 flex justify-end">
                    <Button variant="hero" size="lg" onClick={handleCompleteFlow} disabled={!generatedEmail} className="gap-2">
                      <CheckCircle2 className="w-5 h-5" /> Complete Hiring Flow
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                    <PartyPopper className="w-10 h-10 text-success" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-4">Hiring Flow Completed!</h2>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">You have successfully completed all steps of the hiring process for {jobData.roleName}.</p>
                  <div className="flex gap-4 justify-center">
                    <Button variant="outline" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
                    <Button variant="hero" onClick={handleStartNewHire}>Start New Hire</Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HiringFlow;