import React from 'react';
import { FileText, Calendar, BarChart3, Mail } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: FileText,
      title: 'Resume Screening',
      benefit: 'Stop reading 100 resumes manually.',
      description: 'AI extracts key information, scores candidates against your requirements, and surfaces the best matches instantly.',
    },
    {
      icon: Calendar,
      title: 'Interview Planner',
      benefit: 'Run consistent, fair interviews.',
      description: 'Generate role-specific questions, create scorecards, and ensure every interviewer evaluates on the same criteria.',
    },
    {
      icon: BarChart3,
      title: 'Decision Assistant',
      benefit: 'Make data-driven hiring decisions.',
      description: 'Compare candidates objectively with clear hire/no-hire recommendations based on skills and cultural fit.',
    },
    {
      icon: Mail,
      title: 'Offer Generator',
      benefit: 'Send professional offers fast.',
      description: 'Generate personalized offer letters and rejection emails that maintain your employer brand.',
    },
  ];

  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything you need to hire well
          </h2>
          <p className="text-muted-foreground text-lg">
            Four integrated tools that cover the complete hiring workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl p-8 hover:border-primary/30 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-primary font-medium text-sm mb-3">{feature.benefit}</p>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
