import React from 'react';
import { CandidateEvaluation } from '@/types/hiring';
import { cn } from '@/lib/utils';
import { CheckCircle2, AlertCircle, XCircle, TrendingUp, Shield, AlertTriangle } from 'lucide-react';

interface EvaluationResultDisplayProps {
  evaluation: CandidateEvaluation;
}

export const EvaluationResultDisplay: React.FC<EvaluationResultDisplayProps> = ({
  evaluation,
}) => {
  const decisionConfig = {
    hire: {
      label: 'Hire',
      icon: CheckCircle2,
      bg: 'bg-success/10',
      border: 'border-success/20',
      text: 'text-success',
    },
    maybe: {
      label: 'Maybe',
      icon: AlertCircle,
      bg: 'bg-warning/10',
      border: 'border-warning/20',
      text: 'text-warning',
    },
    reject: {
      label: 'Reject',
      icon: XCircle,
      bg: 'bg-destructive/10',
      border: 'border-destructive/20',
      text: 'text-destructive',
    },
  };

  const config = decisionConfig[evaluation.decision];
  const IconComponent = config.icon;

  return (
    <div className="bg-card rounded-2xl shadow-card overflow-hidden">
      {/* Decision Header */}
      <div className={cn('p-6', config.bg)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={cn('w-16 h-16 rounded-2xl flex items-center justify-center', config.bg, 'border-2', config.border)}>
              <IconComponent className={cn('w-8 h-8', config.text)} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Recommendation</p>
              <p className={cn('text-3xl font-bold', config.text)}>
                {config.label}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Confidence</p>
            <p className="text-2xl font-bold text-foreground">
              {evaluation.confidence}%
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Reasoning */}
        <div>
          <h4 className="text-sm font-medium text-foreground flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-primary" />
            Key Reasoning
          </h4>
          <ul className="space-y-2">
            {evaluation.reasoning.map((reason, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                {reason}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths */}
          <div className="p-4 bg-success/5 rounded-xl border border-success/20">
            <h4 className="text-sm font-medium text-success flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4" />
              Demonstrated Strengths
            </h4>
            <ul className="space-y-2">
              {evaluation.strengths.map((strength, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="text-success mt-1">✓</span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>

          {/* Risks */}
          <div className="p-4 bg-destructive/5 rounded-xl border border-destructive/20">
            <h4 className="text-sm font-medium text-destructive flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4" />
              Identified Risks
            </h4>
            <ul className="space-y-2">
              {evaluation.risks.map((risk, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="text-destructive mt-1">!</span>
                  {risk}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Risk Mitigation */}
        {evaluation.riskMitigation.length > 0 && (
          <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
            <h4 className="text-sm font-medium text-primary flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4" />
              Risk Mitigation Strategies
            </h4>
            <ul className="space-y-2">
              {evaluation.riskMitigation.map((strategy, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="text-primary mt-1">→</span>
                  {strategy}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 90-Day Risk */}
        {evaluation.ninetyDayRisk && (
          <div className="p-4 bg-muted rounded-xl">
            <h4 className="text-sm font-medium text-foreground mb-2">
              90-Day Risk Assessment
            </h4>
            <p className="text-sm text-muted-foreground">
              {evaluation.ninetyDayRisk}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvaluationResultDisplay;