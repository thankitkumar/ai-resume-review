import React from 'react';
import { Briefcase, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Vacancy {
  id: string;
  title: string;
  company: string;
  type: 'remote' | 'hybrid' | 'on-site';
  icon: React.ElementType;
  iconBg: string;
}

const vacancies: Vacancy[] = [
  {
    id: '1',
    title: 'Project Manager',
    company: 'Webflow',
    type: 'remote',
    icon: Briefcase,
    iconBg: 'bg-warning/10 text-warning',
  },
  {
    id: '2',
    title: 'Marketing Specialist',
    company: 'Webflow',
    type: 'hybrid',
    icon: Users,
    iconBg: 'bg-primary/10 text-primary',
  },
];

const typeStyles = {
  remote: 'bg-success/10 text-success',
  hybrid: 'bg-warning/10 text-warning',
  'on-site': 'bg-info/10 text-info',
};

export const VacanciesCard: React.FC = () => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-card">
      <h3 className="text-lg font-semibold text-foreground mb-4">Latest Vacancies</h3>
      
      <div className="space-y-4">
        {vacancies.map((vacancy) => {
          const Icon = vacancy.icon;
          return (
            <div 
              key={vacancy.id}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center",
                vacancy.iconBg
              )}>
                <Icon className="w-6 h-6" />
              </div>
              
              <div className="flex-1">
                <p className="font-medium text-foreground">{vacancy.title}</p>
                <p className="text-sm text-muted-foreground">{vacancy.company}</p>
              </div>
              
              <span className={cn(
                "px-2.5 py-1 rounded-md text-xs font-medium capitalize",
                typeStyles[vacancy.type]
              )}>
                {vacancy.type}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VacanciesCard;
