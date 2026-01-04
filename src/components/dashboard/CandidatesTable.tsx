import React from 'react';
import { cn } from '@/lib/utils';

interface Candidate {
  id: string;
  name: string;
  role: string;
  location: string;
  locationColor: string;
  preferredJob: string;
  level: string;
  avatar: string;
}

const candidates: Candidate[] = [
  {
    id: '1',
    name: 'Deanna Turner',
    role: 'Captain',
    location: 'New York',
    locationColor: 'bg-primary/10 text-primary',
    preferredJob: 'Product A',
    level: '$10,000',
    avatar: 'DT',
  },
  {
    id: '2',
    name: 'Anthony Smith',
    role: 'Captain',
    location: 'Japan',
    locationColor: 'bg-success/10 text-success',
    preferredJob: 'Marketing campaign',
    level: '$30,000',
    avatar: 'AS',
  },
  {
    id: '3',
    name: 'Michele Carter',
    role: 'Captain',
    location: 'Australia',
    locationColor: 'bg-info/10 text-info',
    preferredJob: 'Service B',
    level: '$5,000',
    avatar: 'MC',
  },
];

export const CandidatesTable: React.FC = () => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-card">
      <h3 className="text-lg font-semibold text-foreground mb-4">Potential Candidates</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Candidate Name
              </th>
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Location
              </th>
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Preferred Job
              </th>
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Level
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {candidates.map((candidate) => (
              <tr key={candidate.id} className="hover:bg-muted/50 transition-colors">
                <td className="py-3 px-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-foreground">
                      {candidate.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{candidate.name}</p>
                      <p className="text-xs text-muted-foreground">{candidate.role}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-2">
                  <span className={cn(
                    "inline-flex px-2.5 py-1 rounded-md text-xs font-medium",
                    candidate.locationColor
                  )}>
                    {candidate.location}
                  </span>
                </td>
                <td className="py-3 px-2 text-sm text-foreground">
                  {candidate.preferredJob}
                </td>
                <td className="py-3 px-2 text-sm font-medium text-foreground">
                  {candidate.level}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidatesTable;
