import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { CandidatesList } from '@/components/ats/CandidatesList';
import { mockCandidates, mockJobs } from '@/data/mockData';
import { Candidate, ApplicationStatus } from '@/types/ats';

const Candidates: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);

  const handleUpdateStage = (id: string, stage: ApplicationStatus) => {
    setCandidates(candidates.map(c => c.id === id ? { ...c, stage, status: stage } : c));
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <Header />
        <div className="p-6 overflow-y-auto h-[calc(100vh-64px)]">
          <CandidatesList
            candidates={candidates}
            jobs={mockJobs.map(j => ({ id: j.id, title: j.title }))}
            onViewCandidate={(id) => console.log('View candidate', id)}
            onUpdateStage={handleUpdateStage}
          />
        </div>
      </main>
    </div>
  );
};

export default Candidates;
