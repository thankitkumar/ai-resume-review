import { useState, useCallback } from 'react';
import { CommunicationType, GeneratedEmail, OfferDetails } from '@/types/hiring';

interface UseCommunicationReturn {
  isGenerating: boolean;
  generatedEmail: GeneratedEmail | null;
  generateEmail: (type: CommunicationType, details: OfferDetails, candidateName?: string) => Promise<void>;
  reset: () => void;
}

// Mock email generation (replace with real AI call when backend is ready)
const mockGenerateEmail = async (
  type: CommunicationType,
  details: OfferDetails,
  candidateName: string = 'Candidate'
): Promise<GeneratedEmail> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const templates: Record<CommunicationType, { subject: string; body: string }> = {
    offer: {
      subject: `Offer Letter - ${details.roleName} at Our Company`,
      body: `Dear ${candidateName},

We are pleased to extend an offer for the position of ${details.roleName} at Our Company.

After careful consideration and our recent conversations, we believe you would be a valuable addition to our team. We were impressed by your experience and believe you can make a significant impact in this role.

OFFER DETAILS:

Position: ${details.roleName}
Location: ${details.location}
Start Date: ${details.startDate || 'Flexible'}
Compensation: $${details.salaryMin} - $${details.salaryMax} per year
${details.additionalBenefits ? `Additional Benefits: ${details.additionalBenefits}` : ''}

This offer is contingent upon successful completion of a background check and providing proof of eligibility to work.

We kindly request your response within 5 business days. Please feel free to reach out if you have any questions or would like to discuss any aspect of this offer.

We're excited about the possibility of having you join our team!

Best regards,
[Your Name]
[Your Title]
Our Company`,
    },
    negotiation: {
      subject: `Your Offer for ${details.roleName} Position`,
      body: `Dear ${candidateName},

Thank you for your continued interest in the ${details.roleName} position at Our Company.

We're pleased to present you with an offer that we believe reflects both your qualifications and our commitment to competitive compensation.

OFFER SUMMARY:

Position: ${details.roleName}
Base Compensation: $${details.salaryMin} - $${details.salaryMax} annually
Location: ${details.location}
Target Start Date: ${details.startDate || 'To be discussed'}
${details.additionalBenefits ? `Package includes: ${details.additionalBenefits}` : ''}

We've structured this offer to be competitive within the market. While we've put forward our best initial offer, we understand that compensation discussions are important and are open to a conversation if you'd like to discuss further.

Please review the attached formal offer letter for complete details. We'd appreciate your response within one week.

Looking forward to your thoughts.

Best regards,
[Your Name]
[Your Title]`,
    },
    rejection: {
      subject: `Update on Your Application - ${details.roleName}`,
      body: `Dear ${candidateName},

Thank you for taking the time to interview for the ${details.roleName} position at Our Company. We enjoyed learning about your background and experience.

After careful consideration, we have decided to move forward with another candidate whose experience more closely aligns with our current needs.

This was a difficult decision, as we had many qualified candidates. We were genuinely impressed by your qualifications and encourage you to apply for future openings that match your skills and experience.

We wish you the best in your job search and future career endeavors.

Thank you again for your interest in Our Company.

Best regards,
[Your Name]
[Your Title]
Our Company`,
    },
    keepWarm: {
      subject: `Staying Connected - ${details.roleName} at Our Company`,
      body: `Dear ${candidateName},

I wanted to personally reach out following our recent conversations about the ${details.roleName} position.

While we've decided to move in a different direction for this particular role, I wanted you to know that we were genuinely impressed by your background and what you could bring to our team.

The timing wasn't quite right for this specific opening, but we'd love to stay connected. We have several initiatives coming up in the next few quarters, and your skill set could be a great fit for future opportunities.

Would you be open to keeping in touch? I'd be happy to:
- Connect on LinkedIn
- Reach out when relevant positions open up
- Grab a virtual coffee in a few months to reconnect

No pressure at all—just wanted to express that we valued our conversations and hope this isn't the end of our interaction.

Wishing you continued success!

Best regards,
[Your Name]
[Your Title]
Our Company`,
    },
  };

  return {
    type,
    subject: templates[type].subject,
    body: templates[type].body,
  };
};

export const useCommunication = (): UseCommunicationReturn => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState<GeneratedEmail | null>(null);

  const generateEmail = useCallback(
    async (type: CommunicationType, details: OfferDetails, candidateName?: string) => {
      setIsGenerating(true);
      try {
        const result = await mockGenerateEmail(type, details, candidateName);
        setGeneratedEmail(result);
      } finally {
        setIsGenerating(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setGeneratedEmail(null);
  }, []);

  return {
    isGenerating,
    generatedEmail,
    generateEmail,
    reset,
  };
};

export default useCommunication;