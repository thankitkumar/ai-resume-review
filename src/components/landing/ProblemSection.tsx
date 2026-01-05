import React from 'react';
import { FileWarning, MessageSquareX, Brain, DollarSign } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      icon: FileWarning,
      title: 'Resumes exaggerate impact',
      description: 'Candidates inflate their achievements, making it hard to separate real performers from good writers.',
    },
    {
      icon: MessageSquareX,
      title: 'Interviews lack structure',
      description: 'Without a consistent process, each interviewer asks different questions and evaluates differently.',
    },
    {
      icon: Brain,
      title: 'Decisions are subjective',
      description: 'Hiring choices often come down to gut feeling rather than objective, comparable criteria.',
    },
    {
      icon: DollarSign,
      title: 'One bad hire costs months',
      description: 'A wrong hire drains time, money, and team morale. The real cost is always higher than expected.',
    },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Hiring today is broken.
          </h2>
          <p className="text-muted-foreground text-lg">
            Most teams rely on outdated methods that lead to costly mistakes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors"
            >
              <div className="w-10 h-10 bg-destructive/10 rounded-xl flex items-center justify-center mb-4">
                <problem.icon className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="text-foreground font-semibold mb-2">{problem.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-lg font-medium text-foreground mt-12">
          Hiring should be a process, not a gamble.
        </p>
      </div>
    </section>
  );
};
