import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { SubscriptionView } from '@/components/ats/SubscriptionView';
import { subscriptionPlans } from '@/data/mockData';

const Subscription: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <Header />
        <div className="p-6 overflow-y-auto h-[calc(100vh-64px)]">
          <SubscriptionView plans={subscriptionPlans} currentPlan="free" onUpgrade={(planId) => console.log('Upgrade to', planId)} />
        </div>
      </main>
    </div>
  );
};

export default Subscription;
