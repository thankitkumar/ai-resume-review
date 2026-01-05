import React from 'react';
import { Shield, Code2, Users, Zap } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const signals = [
    { icon: Code2, text: 'Designed by engineers' },
    { icon: Users, text: 'Used by founders' },
    { icon: Shield, text: 'Enterprise-grade security' },
    { icon: Zap, text: 'No setup required' },
  ];

  return (
    <section className="py-16 border-y border-border/50 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm text-muted-foreground mb-8">
          Built for growing teams who hire seriously.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {signals.map((signal, index) => (
            <div key={index} className="flex items-center gap-2 text-muted-foreground">
              <signal.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{signal.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
