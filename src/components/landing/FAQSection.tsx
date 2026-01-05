import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: 'Is this an ATS (Applicant Tracking System)?',
      answer: 'No. HireFlow AI is a decision-making system, not a tracking system. We help you make better hiring decisions through AI-powered screening, structured interviews, and objective evaluation. You can use it alongside your existing ATS or as a standalone tool.',
    },
    {
      question: 'Do I need to install anything?',
      answer: 'No. HireFlow AI is completely web-based. Just open your browser, sign up, and start screening resumes. There is nothing to download or configure.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes. We use enterprise-grade encryption for all data in transit and at rest. Your candidate data is never used to train AI models. We are SOC 2 compliant and follow GDPR requirements.',
    },
    {
      question: 'Can my team use this together?',
      answer: 'Absolutely. Pro plans include organization workspaces where multiple team members can collaborate on hiring. Share candidate evaluations, interview notes, and hiring decisions seamlessly.',
    },
    {
      question: 'What happens after the free trial?',
      answer: 'Your trial includes limited AI usage to experience the full product. When you are ready to scale, upgrade to Pro for unlimited usage. Your data and progress are preserved when you upgrade.',
    },
  ];

  return (
    <section id="faq" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about HireFlow AI.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="text-left text-foreground font-medium hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
