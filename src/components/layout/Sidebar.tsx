import React from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  FileText, 
  MessageSquare, 
  CreditCard, 
  Building2,
  Zap,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
  badge?: string;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/', isActive: true },
  { icon: Briefcase, label: 'Job Post', href: '/jobs' },
  { icon: Users, label: 'Candidates', href: '/candidates' },
];

const manageItems: NavItem[] = [
  { icon: FileText, label: 'Application', href: '/applications' },
  { icon: MessageSquare, label: 'Message', href: '/messages', badge: 'New' },
  { icon: CreditCard, label: 'Subscription', href: '/subscription' },
  { icon: Building2, label: 'Company Profile', href: '/company' },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 h-screen bg-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">H</span>
          </div>
          <span className="font-bold text-xl text-foreground">
            Hiring<span className="text-primary">bit.</span>
          </span>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
            ST
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Saiful Talukdar</p>
            <p className="text-xs text-muted-foreground truncate">saiful@hiringbit.net</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink key={item.label} item={item} />
          ))}
        </div>

        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-3">
            Manage Jobs
          </p>
          <div className="space-y-1">
            {manageItems.map((item) => (
              <NavLink key={item.label} item={item} />
            ))}
          </div>
        </div>
      </nav>

      {/* Upgrade Card */}
      <div className="p-4">
        <div className="bg-accent rounded-xl p-4 relative overflow-hidden">
          <div className="absolute top-2 right-2 w-8 h-8 bg-warning/20 rounded-full flex items-center justify-center">
            <Zap className="w-4 h-4 text-warning" />
          </div>
          <h4 className="font-semibold text-accent-foreground mb-1">Upgrade to Pro</h4>
          <p className="text-xs text-muted-foreground mb-3">
            Track your Finance to more Specific
          </p>
          <Button variant="gradient" size="sm" className="w-full">
            Try it Free 7 Days
          </Button>
        </div>
      </div>
    </aside>
  );
};

const NavLink: React.FC<{ item: NavItem }> = ({ item }) => {
  const Icon = item.icon;
  
  return (
    <a
      href={item.href}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
        item.isActive
          ? "bg-primary text-primary-foreground shadow-md"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      )}
    >
      <Icon className="w-5 h-5" />
      <span className="flex-1">{item.label}</span>
      {item.badge && (
        <span className="px-2 py-0.5 text-xs font-medium bg-success text-success-foreground rounded-full">
          {item.badge}
        </span>
      )}
      {item.isActive && <ChevronRight className="w-4 h-4" />}
    </a>
  );
};

export default Sidebar;
