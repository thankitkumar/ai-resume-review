import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { JobsList } from '@/components/ats/JobsList';
import { JobPostForm } from '@/components/ats/JobPostForm';
import { JobPublishingPanel } from '@/components/ats/JobPublishingPanel';
import { mockJobs } from '@/data/mockData';
import { JobPost, JobPostFormData, PublishPlatform, PublishPlatformStatus } from '@/types/ats';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

type ViewMode = 'list' | 'create' | 'edit' | 'publish';

const Jobs: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [jobs, setJobs] = useState<JobPost[]>(mockJobs);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);

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
    toast.success('Job post created successfully!');
  };

  const handlePublish = async (platforms: PublishPlatform[], customUrl?: string) => {
    if (!selectedJobId) return;
    
    setIsPublishing(true);
    
    // Simulate publishing to platforms with mock delays
    const results: PublishPlatformStatus[] = [];
    
    for (const platform of platforms) {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock success (90% success rate for demo)
      const isSuccess = Math.random() > 0.1;
      
      results.push({
        platform,
        status: isSuccess ? 'published' : 'failed',
        publishedAt: isSuccess ? new Date().toISOString() : undefined,
        url: isSuccess ? `https://${platform}.example.com/job/${selectedJobId}` : undefined,
        error: isSuccess ? undefined : 'Connection timeout. Please try again.',
      });
    }
    
    // Update job with published platforms
    setJobs(prevJobs => 
      prevJobs.map(job => {
        if (job.id === selectedJobId) {
          const existingPlatforms = job.publishedPlatforms.filter(
            p => !results.some(r => r.platform === p.platform)
          );
          return {
            ...job,
            publishedPlatforms: [...existingPlatforms, ...results],
            status: 'published' as const,
            updatedAt: new Date().toISOString(),
          };
        }
        return job;
      })
    );
    
    setIsPublishing(false);
    
    const successCount = results.filter(r => r.status === 'published').length;
    const failCount = results.filter(r => r.status === 'failed').length;
    
    if (failCount === 0) {
      toast.success(`Successfully published to ${successCount} platform${successCount !== 1 ? 's' : ''}!`);
    } else if (successCount === 0) {
      toast.error('Failed to publish to all platforms. Please try again.');
    } else {
      toast.warning(`Published to ${successCount} platform${successCount !== 1 ? 's' : ''}, ${failCount} failed.`);
    }
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
              <JobPublishingPanel 
                jobTitle={selectedJob.title} 
                currentPlatforms={selectedJob.publishedPlatforms} 
                onPublish={handlePublish}
                isPublishing={isPublishing}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Jobs;
