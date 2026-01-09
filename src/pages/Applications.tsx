import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { ApplicationsPipeline } from '@/components/ats/ApplicationsPipeline';
import { mockCandidates } from '@/data/mockData';
import { Candidate, ApplicationStatus } from '@/types/ats';

const Applications: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);

  const handleMoveCandidate = (candidateId: string, newStage: ApplicationStatus) => {
    setCandidates(candidates.map(c => c.id === candidateId ? { ...c, stage: newStage, status: newStage } : c));
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <Header />
        <div className="p-6 overflow-y-auto h-[calc(100vh-64px)]">
          <ApplicationsPipeline candidates={candidates} onMoveCandidate={handleMoveCandidate} onViewCandidate={(id) => console.log('View', id)} />
        </div>
      </main>
    </div>
  );
};

export default Applications;
