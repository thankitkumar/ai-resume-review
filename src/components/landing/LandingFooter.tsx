import React from 'react';
import { Link } from 'react-router-dom';

export const LandingFooter: React.FC = () => {
  const links = [
    { label: 'About', href: '#', isExternal: true },
    { label: 'Privacy Policy', href: '/privacy', isExternal: false },
    { label: 'Terms', href: '/terms', isExternal: false },
    { label: 'Contact', href: '#', isExternal: true },
  ];

  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Company */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">H</span>
            </div>
            <div>
              <span className="text-foreground font-semibold">HireFlow AI</span>
              <span className="text-muted-foreground text-sm ml-2">by Oxygenix Labs</span>
            </div>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6">
            {links.map((link, index) => (
              link.isExternal ? (
                <a
                  key={index}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={index}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-8 border-t border-border/50 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Oxygenix Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
