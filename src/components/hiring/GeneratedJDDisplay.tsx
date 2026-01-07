import React, { useState } from 'react';
import { FileText, Target, XCircle, Copy, Check, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GeneratedJobDescription, JD_PROMPT_TEMPLATES } from '@/types/hiring';
import { cn } from '@/lib/utils';

interface GeneratedJDDisplayProps {
  data: GeneratedJobDescription;
  onRegenerate: () => void;
  isRegenerating?: boolean;
}

export const GeneratedJDDisplay: React.FC<GeneratedJDDisplayProps> = ({
  data,
  onRegenerate,
  isRegenerating = false,
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = async (text: string, section: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const copyAll = () => {
    const fullText = `
JOB DESCRIPTION
${data.description}

SUCCESS CRITERIA (First 90 Days)
${data.successCriteria.map((c, i) => `${i + 1}. ${c}`).join('\n')}

WHO THIS ROLE IS NOT FOR
${data.notForThisRole.map((c) => `• ${c}`).join('\n')}
    `.trim();
    copyToClipboard(fullText, 'all');
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Generated Job Description
            </h3>
            <p className="text-sm text-muted-foreground">
              Style: {JD_PROMPT_TEMPLATES[data.generationType].name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRegenerate}
            disabled={isRegenerating}
            className="gap-2"
          >
            <RefreshCw className={cn('w-4 h-4', isRegenerating && 'animate-spin')} />
            Regenerate
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={copyAll}
            className="gap-2"
          >
            {copiedSection === 'all' ? (
              <Check className="w-4 h-4 text-success" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            Copy All
          </Button>
        </div>
      </div>

      {/* Job Description */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-foreground flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            Description
          </h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(data.description, 'description')}
            className="h-7 px-2"
          >
            {copiedSection === 'description' ? (
              <Check className="w-3 h-3 text-success" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </Button>
        </div>
        <div className="bg-muted rounded-xl p-4">
          <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
            {data.description}
          </p>
        </div>
      </div>

      {/* Success Criteria */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-foreground flex items-center gap-2">
            <Target className="w-4 h-4 text-success" />
            Success Criteria (First 90 Days)
          </h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              copyToClipboard(data.successCriteria.join('\n'), 'success')
            }
            className="h-7 px-2"
          >
            {copiedSection === 'success' ? (
              <Check className="w-3 h-3 text-success" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </Button>
        </div>
        <div className="bg-success/5 rounded-xl p-4 space-y-2">
          {data.successCriteria.map((criteria, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-success/20 text-success text-xs font-medium flex items-center justify-center flex-shrink-0">
                {index + 1}
              </span>
              <p className="text-sm text-foreground">{criteria}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Not For This Role */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-foreground flex items-center gap-2">
            <XCircle className="w-4 h-4 text-destructive" />
            Who This Role is NOT For
          </h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              copyToClipboard(data.notForThisRole.join('\n'), 'notFor')
            }
            className="h-7 px-2"
          >
            {copiedSection === 'notFor' ? (
              <Check className="w-3 h-3 text-success" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </Button>
        </div>
        <div className="bg-destructive/5 rounded-xl p-4 space-y-2">
          {data.notForThisRole.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <XCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeneratedJDDisplay;
