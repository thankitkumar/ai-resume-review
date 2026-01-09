import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { JobsList } from '@/components/ats/JobsList';
import { JobPostForm } from '@/components/ats/JobPostForm';
import { JobPublishingPanel } from '@/components/ats/JobPublishingPanel';
import { mockJobs } from '@/data/mockData';
import { JobPost, JobPostFormData, PublishPlatform } from '@/types/ats';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

type ViewMode = 'list' | 'create' | 'edit' | 'publish';

const Jobs: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [jobs, setJobs] = useState<JobPost[]>(mockJobs);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const selectedJob = jobs.find(j => j.id === selectedJobId);

  const handleCreateNew = () => setViewMode('create');
  const handleEdit = (id: string) => { setSelectedJobId(id); setViewMode('edit'); };
  const handleView = (id: string) => { setSelectedJobId(id); setViewMode('publish'); };
  const handleDelete = (id: string) => setJobs(jobs.filter(j => j.id !== id));

  const handleSubmit = (data: JobPostFormData, status: 'draft' | 'published') => {
    const newJob: JobPost = {
      id: Date.now().toString(),
      ...data,
      skills: data.skills.split(',').map(s => s.trim()),
      salaryMin: data.salaryMin ? parseInt(data.salaryMin) : undefined,
      salaryMax: data.salaryMax ? parseInt(data.salaryMax) : undefined,
      status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedPlatforms: [],
      applicationsCount: 0,
    };
    setJobs([newJob, ...jobs]);
    setViewMode('list');
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <Header />
        <div className="p-6 overflow-y-auto h-[calc(100vh-64px)]">
          {viewMode !== 'list' && (
            <Button variant="ghost" size="sm" onClick={() => setViewMode('list')} className="mb-4 gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Jobs
            </Button>
          )}
          
          {viewMode === 'list' && (
            <JobsList jobs={jobs} onCreateNew={handleCreateNew} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />
          )}
          {viewMode === 'create' && (
            <div><h2 className="text-2xl font-bold mb-6">Create Job Post</h2><JobPostForm onSubmit={handleSubmit} /></div>
          )}
          {viewMode === 'publish' && selectedJob && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-card rounded-2xl p-6 shadow-card">
                <h3 className="text-lg font-semibold mb-4">{selectedJob.title}</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{selectedJob.description}</p>
              </div>
              <JobPublishingPanel jobTitle={selectedJob.title} currentPlatforms={selectedJob.publishedPlatforms} onPublish={() => {}} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Jobs;
