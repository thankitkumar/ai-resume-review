import React from 'react';
import { SubscriptionPlan } from '@/types/ats';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, Zap, Crown, Users } from 'lucide-react';

interface SubscriptionViewProps {
  plans: SubscriptionPlan[];
  currentPlan: 'free' | 'pro' | 'team';
  onUpgrade: (planId: string) => void;
}

const planIcons = {
  free: Zap,
  pro: Crown,
  team: Users,
};

export const SubscriptionView: React.FC<SubscriptionViewProps> = ({
  plans,
  currentPlan,
  onUpgrade,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Subscription</h2>
        <p className="text-muted-foreground">Manage your plan and billing</p>
      </div>

      {/* Current Plan Summary */}
      <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90 mb-1">Current Plan</p>
            <h3 className="text-2xl font-bold capitalize">{currentPlan}</h3>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            {React.createElement(planIcons[currentPlan], { className: "w-8 h-8" })}
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const Icon = planIcons[plan.name];
          const isCurrent = plan.name === currentPlan;
          const isPopular = plan.name === 'pro';

          return (
            <div
              key={plan.id}
              className={cn(
                "bg-card rounded-2xl p-6 shadow-card relative",
                isPopular && "ring-2 ring-primary"
              )}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  plan.name === 'free' ? "bg-muted text-muted-foreground" :
                  plan.name === 'pro' ? "bg-primary/10 text-primary" :
                  "bg-warning/10 text-warning"
                )}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground capitalize">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {plan.price === 0 ? 'Free forever' : `$${plan.price}/month`}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price === 0 ? 'Free' : `$${plan.price}`}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-muted-foreground">/month</span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={isCurrent ? "outline" : isPopular ? "default" : "secondary"}
                className="w-full"
                disabled={isCurrent}
                onClick={() => !isCurrent && onUpgrade(plan.id)}
              >
                {isCurrent ? 'Current Plan' : plan.name === 'free' ? 'Downgrade' : 'Upgrade'}
              </Button>
            </div>
          );
        })}
      </div>

      {/* Usage Stats */}
      <div className="bg-card rounded-2xl p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Usage This Month</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Active Jobs', used: 2, limit: currentPlan === 'free' ? 3 : -1 },
            { label: 'Candidates', used: 45, limit: currentPlan === 'free' ? 50 : currentPlan === 'pro' ? 500 : -1 },
            { label: 'AI Credits', used: 78, limit: currentPlan === 'free' ? 100 : currentPlan === 'pro' ? 1000 : -1 },
            { label: 'Team Members', used: 1, limit: currentPlan === 'free' ? 1 : currentPlan === 'pro' ? 5 : -1 },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <span className="text-sm font-medium text-foreground">
                  {stat.used}{stat.limit !== -1 ? ` / ${stat.limit}` : ''}
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full",
                    stat.limit !== -1 && stat.used / stat.limit > 0.8 ? "bg-warning" : "bg-primary"
                  )}
                  style={{ 
                    width: stat.limit === -1 ? '100%' : `${Math.min((stat.used / stat.limit) * 100, 100)}%` 
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionView;
