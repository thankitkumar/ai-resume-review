import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Copy, 
  Check,
  Star,
  TrendingUp,
  Award,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResumeScreeningResult } from '@/types/resume';
import { cn } from '@/lib/utils';

interface ScreeningResultsProps {
  result: ResumeScreeningResult;
}

const recommendationConfig = {
  strong_yes: { 
    label: 'Strong Yes', 
    color: 'text-success', 
    bg: 'bg-success/10',
    icon: CheckCircle2 
  },
  yes: { 
    label: 'Yes', 
    color: 'text-success', 
    bg: 'bg-success/10',
    icon: CheckCircle2 
  },
  maybe: { 
    label: 'Maybe', 
    color: 'text-warning', 
    bg: 'bg-warning/10',
    icon: AlertCircle 
  },
  no: { 
    label: 'No', 
    color: 'text-destructive', 
    bg: 'bg-destructive/10',
    icon: XCircle 
  },
};

const skillLevelColors = {
  expert: 'bg-success text-success-foreground',
  proficient: 'bg-info text-info-foreground',
  beginner: 'bg-warning text-warning-foreground',
  missing: 'bg-destructive/10 text-destructive',
};

export const ScreeningResults: React.FC<ScreeningResultsProps> = ({ result }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const recommendation = recommendationConfig[result.recommendation];
  const RecommendationIcon = recommendation.icon;

  const copyToClipboard = async (text: string, section: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const formatResultForCopy = () => {
    return `
Resume Screening Results
========================
Overall Score: ${result.overallScore}/100
Recommendation: ${recommendation.label}

Summary:
${result.summary}

Strengths:
${result.strengths.map(s => `• ${s}`).join('\n')}

Concerns:
${result.concerns.map(c => `• ${c}`).join('\n')}

Suggested Interview Questions:
${result.suggestedQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}
    `.trim();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Score Header */}
      <div className="bg-card rounded-2xl p-6 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Screening Results</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(formatResultForCopy(), 'all')}
          >
            {copiedSection === 'all' ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy All
              </>
            )}
          </Button>
        </div>

        <div className="flex items-center gap-8">
          {/* Score Circle */}
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="12"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${(result.overallScore / 100) * 351.86} 351.86`}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-foreground">{result.overallScore}</span>
              <span className="text-xs text-muted-foreground">out of 100</span>
            </div>
          </div>

          {/* Recommendation */}
          <div className="flex-1">
            <div className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-xl mb-3",
              recommendation.bg
            )}>
              <RecommendationIcon className={cn("w-5 h-5", recommendation.color)} />
              <span className={cn("font-semibold", recommendation.color)}>
                {recommendation.label}
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">{result.summary}</p>
          </div>
        </div>
      </div>

      {/* Skills Analysis */}
      <div className="bg-card rounded-2xl p-6 shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Star className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Skills Analysis</h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {result.skills.map((skill, index) => (
            <div
              key={index}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2",
                skillLevelColors[skill.level]
              )}
            >
              {skill.skill}
              <span className="text-xs opacity-80 capitalize">({skill.level})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Concerns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Strengths</h3>
          </div>
          <ul className="space-y-3">
            {result.strengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-warning" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Concerns</h3>
          </div>
          <ul className="space-y-3">
            {result.concerns.map((concern, index) => (
              <li key={index} className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{concern}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Suggested Questions */}
      <div className="bg-card rounded-2xl p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-info" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Suggested Interview Questions</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(
              result.suggestedQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n'),
              'questions'
            )}
          >
            {copiedSection === 'questions' ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </Button>
        </div>

        <ol className="space-y-3">
          {result.suggestedQuestions.map((question, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-info/10 text-info text-sm font-medium flex items-center justify-center flex-shrink-0">
                {index + 1}
              </span>
              <span className="text-muted-foreground">{question}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Experience */}
      <div className="bg-card rounded-2xl p-6 shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Award className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Experience Analysis</h3>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-muted rounded-xl p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Experience</p>
            <p className="text-2xl font-bold text-foreground">{result.experience.totalYears} years</p>
          </div>
          <div className="bg-muted rounded-xl p-4">
            <p className="text-sm text-muted-foreground mb-1">Relevant Experience</p>
            <p className="text-2xl font-bold text-primary">{result.experience.relevantYears} years</p>
          </div>
        </div>

        {result.experience.highlights.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-foreground mb-2">Key Highlights</p>
            <ul className="space-y-2">
              {result.experience.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary">•</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        )}

        {result.experience.gaps.length > 0 && (
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Gaps Identified</p>
            <ul className="space-y-2">
              {result.experience.gaps.map((gap, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-warning">•</span>
                  {gap}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScreeningResults;
