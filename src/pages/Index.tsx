import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { HiringProcessCard } from '@/components/dashboard/HiringProcessCard';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { EmployeeStatusChart } from '@/components/dashboard/EmployeeStatusChart';
import { CandidatesTable } from '@/components/dashboard/CandidatesTable';
import { VacanciesCard } from '@/components/dashboard/VacanciesCard';
import { ResumeUpload } from '@/components/resume/ResumeUpload';
import { JobDescriptionInput } from '@/components/resume/JobDescriptionInput';
import { ScreeningResults } from '@/components/resume/ScreeningResults';
import { useResumeScreening } from '@/hooks/useResumeScreening';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, ArrowLeft } from 'lucide-react';

type ViewMode = 'dashboard' | 'screening';

const Index: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  
  const { status, result, isLoading, screenResume, reset } = useResumeScreening();

  const handleAnalyze = async () => {
    if (!resumeText.trim()) return;
    
    await screenResume({
      resumeText,
      jobDescription: jobDescription || undefined,
      jobTitle: jobTitle || undefined,
    });
  };

  const handleNewScreening = () => {
    reset();
    setResumeText('');
    setJobDescription('');
    setJobTitle('');
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-hidden">
        <Header />
        
        <div className="p-6 overflow-y-auto h-[calc(100vh-64px)]">
          {/* View Toggle */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {viewMode === 'screening' && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setViewMode('dashboard')}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Dashboard
                </Button>
              )}
              <div className="flex bg-muted rounded-xl p-1">
                <button
                  onClick={() => setViewMode('dashboard')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    viewMode === 'dashboard'
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setViewMode('screening')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
                    viewMode === 'screening'
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  AI Resume Screening
                </button>
              </div>
            </div>
          </div>

          {viewMode === 'dashboard' ? (
            /* Dashboard View */
            <div className="space-y-6 animate-fade-in">
              {/* Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                  title="Total Employee"
                  value="20.8k"
                  change={2.5}
                />
                <StatsCard
                  title="Hired Candidates"
                  value="26.4k"
                  change={2.5}
                />
                <HiringProcessCard days={3} change={2.5} />
                <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-5 text-primary-foreground shadow-lg">
                  <h3 className="text-sm font-medium opacity-90 mb-2">Quick Action</h3>
                  <p className="text-lg font-semibold mb-3">Screen a Resume</p>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => setViewMode('screening')}
                    className="bg-white/20 hover:bg-white/30 text-white border-0"
                  >
                    Start Now
                  </Button>
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <RevenueChart />
                </div>
                <EmployeeStatusChart />
              </div>

              {/* Bottom Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <CandidatesTable />
                </div>
                <VacanciesCard />
              </div>
            </div>
          ) : (
            /* Resume Screening View */
            <div className="max-w-6xl mx-auto animate-fade-in">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  AI Resume Screening
                </h2>
                <p className="text-muted-foreground">
                  Upload a resume and get instant AI-powered analysis and recommendations
                </p>
              </div>

              {!result ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <ResumeUpload
                      onTextExtracted={setResumeText}
                      isLoading={isLoading}
                    />
                    
                    {resumeText && (
                      <div className="bg-card rounded-2xl p-4 shadow-card">
                        <p className="text-sm text-muted-foreground mb-2">Resume Preview</p>
                        <p className="text-sm text-foreground line-clamp-4">
                          {resumeText.slice(0, 300)}...
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    <JobDescriptionInput
                      value={jobDescription}
                      onChange={setJobDescription}
                      jobTitle={jobTitle}
                      onJobTitleChange={setJobTitle}
                      disabled={isLoading}
                    />

                    <Button
                      variant="hero"
                      size="xl"
                      className="w-full"
                      onClick={handleAnalyze}
                      disabled={!resumeText.trim() || isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Analyzing Resume...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          Analyze with AI
                        </>
                      )}
                    </Button>

                    {status === 'error' && (
                      <div className="bg-destructive/10 text-destructive rounded-xl p-4 text-sm">
                        Failed to analyze resume. Please try again.
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">
                      Analysis Complete
                    </h3>
                    <Button variant="outline" onClick={handleNewScreening}>
                      Screen Another Resume
                    </Button>
                  </div>
                  <ScreeningResults result={result} />
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
