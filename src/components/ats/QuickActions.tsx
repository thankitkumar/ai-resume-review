import React from 'react';
import { Plus, Users, FileText, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="secondary"
          className="bg-white/20 hover:bg-white/30 text-white border-0 justify-start gap-2"
          onClick={() => navigate('/jobs/new')}
        >
          <Plus className="w-4 h-4" />
          Create Job
        </Button>
        <Button
          variant="secondary"
          className="bg-white/20 hover:bg-white/30 text-white border-0 justify-start gap-2"
          onClick={() => navigate('/candidates')}
        >
          <Users className="w-4 h-4" />
          View Candidates
        </Button>
        <Button
          variant="secondary"
          className="bg-white/20 hover:bg-white/30 text-white border-0 justify-start gap-2"
          onClick={() => navigate('/applications')}
        >
          <FileText className="w-4 h-4" />
          Applications
        </Button>
        <Button
          variant="secondary"
          className="bg-white/20 hover:bg-white/30 text-white border-0 justify-start gap-2"
          onClick={() => navigate('/messages')}
        >
          <Mail className="w-4 h-4" />
          Messages
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;
