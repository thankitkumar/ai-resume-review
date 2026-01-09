import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { MessagesView } from '@/components/ats/MessagesView';
import { mockMessages } from '@/data/mockData';

const Messages: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <Header />
        <div className="p-6 overflow-y-auto h-[calc(100vh-64px)]">
          <MessagesView messages={mockMessages} onSendMessage={(id, subject, body) => console.log('Send', id, subject)} />
        </div>
      </main>
    </div>
  );
};

export default Messages;
