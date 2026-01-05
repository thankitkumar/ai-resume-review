import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CreditCard, Clock, Sparkles } from 'lucide-react';

export const TrialSection: React.FC = () => {
  const benefits = [
    { icon: CreditCard, text: 'No credit card required' },
    { icon: Clock, text: 'Start in under 2 minutes' },
    { icon: Sparkles, text: 'Full feature access' },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border border-primary/20 rounded-3xl p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Try HireFlow AI free.
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Limited usage. Full experience. See how structured hiring transforms your process.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-muted-foreground">
                <benefit.icon className="w-4 h-4 text-primary" />
                <span className="text-sm">{benefit.text}</span>
              </div>
            ))}
          </div>

          <Button size="lg" className="gap-2 px-8">
            Start Free Trial
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
