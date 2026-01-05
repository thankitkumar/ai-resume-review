import React from 'react';
import { FileSearch, MessageSquare, CheckCircle2, Send } from 'lucide-react';

export const SolutionSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      icon: FileSearch,
      title: 'Screen resumes objectively',
      description: 'AI analyzes skills, experience, and fit against your requirements. No more guessing who to interview.',
    },
    {
      number: '02',
      icon: MessageSquare,
      title: 'Run structured interviews',
      description: 'Get role-specific questions and evaluation criteria so every interviewer is aligned.',
    },
    {
      number: '03',
      icon: CheckCircle2,
      title: 'Get hire / no-hire clarity',
      description: 'Clear recommendations based on data, not gut feeling. Reduce back-and-forth discussions.',
    },
    {
      number: '04',
      icon: Send,
      title: 'Send confident offers',
      description: 'Generate professional offer communications that match your company tone and values.',
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How HireFlow AI works
          </h2>
          <p className="text-muted-foreground text-lg">
            A clear, repeatable process that takes the guesswork out of hiring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-full h-px bg-border" />
              )}
              
              <div className="bg-card border border-border rounded-2xl p-6 relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono text-primary font-semibold">{step.number}</span>
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <h3 className="text-foreground font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
