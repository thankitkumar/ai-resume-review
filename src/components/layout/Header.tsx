import React from 'react';
import { Bell, MessageSquare, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  userName?: string;
}

export const Header: React.FC<HeaderProps> = ({ userName = 'Talukdar' }) => {
  return (
    <header className="h-16 bg-card/50 backdrop-blur-sm border-b border-border px-6 flex items-center justify-between">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Hello, {userName}
        </h1>
        <p className="text-sm text-muted-foreground">
          Here's the Current status to Today.
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Notification
        </Button>
        <Button variant="ghost" size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Message
        </Button>
        <Button variant="gradient" size="sm">
          Add Company
        </Button>
      </div>
    </header>
  );
};

export default Header;
