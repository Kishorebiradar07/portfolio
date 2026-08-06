'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs';
import { Sparkles, Menu, X, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { RecruiterControl } from '@/components/recruiter-control';
import { CommandPalette } from '@/components/command-palette';
import { useRecruiterStore } from '@/store/useRecruiterStore';
import { defaultIsClerkEnabled } from '@/components/clerk-wrapper';

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const { isCustomized, activeRole, customPersonalization } = useRecruiterStore();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const getRoleLabel = () => {
    if (customPersonalization) {
      return `${customPersonalization.company} (AI)`;
    }
    switch (activeRole) {
      case 'mlops':
        return 'ML Ops';
      case 'fullstack-ai':
        return 'Full-Stack';
      case 'nlp':
        return 'NLP';
      case 'research':
        return 'Researcher';
      default:
        return '';
    }
  };

  const hidden = customPersonalization?.hiddenSections || [];
  const activeLinks = navLinks.filter(link => !hidden.some(h => link.href.includes(h)));

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-wider text-sm transition-opacity hover:opacity-85">
            <Code className="h-5 w-5 text-violet-500" />
            <span className="font-bold">Portfolio.ai</span>
            {mounted && isCustomized && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20 uppercase tracking-widest">
                <Sparkles className="h-2.5 w-2.5" />
                {getRoleLabel()}
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5">
            {activeLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-semibold tracking-wider uppercase transition-colors hover:text-foreground ${
                    isActive ? 'text-foreground font-semibold' : 'text-muted-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Action controls */}
        <div className="hidden md:flex items-center gap-3">
          <CommandPalette />
          <RecruiterControl />
          <ThemeToggle />
          
          <div className="flex items-center border-l border-border pl-3 h-6 gap-2">
            {defaultIsClerkEnabled ? (
              <>
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button variant="ghost" size="sm" className="text-xs font-medium text-muted-foreground hover:text-foreground rounded-lg cursor-pointer h-9 px-3">
                      Log in
                    </Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton appearance={{ elements: { avatarBox: 'h-8 w-8 rounded-lg' } }} />
                </SignedIn>
              </>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.href = '/admin'}
                className="text-xs font-semibold text-muted-foreground hover:text-foreground rounded-lg cursor-pointer h-9 px-3"
              >
                Access Admin
              </Button>
            )}
          </div>
        </div>

        {/* Mobile controls & toggle button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <RecruiterControl />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="h-9 w-9 rounded-lg border border-border cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-card p-4 space-y-4 animate-in fade-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2">
            {activeLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 text-sm font-medium rounded-md px-3 hover:bg-accent transition-colors ${
                    isActive ? 'text-foreground bg-accent/50' : 'text-muted-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="border-t border-border pt-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Search Commands</span>
              <CommandPalette />
            </div>
            <div className="flex items-center justify-between border-t border-border pt-3">
              <span className="text-xs text-muted-foreground">Developer access</span>
              {defaultIsClerkEnabled ? (
                <>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <Button variant="outline" size="sm" className="text-xs font-semibold rounded-lg cursor-pointer h-9 w-full">
                        Log in
                      </Button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <div className="flex items-center gap-2">
                      <UserButton appearance={{ elements: { avatarBox: 'h-8 w-8' } }} />
                      <span className="text-xs text-muted-foreground font-semibold">My Account</span>
                    </div>
                  </SignedIn>
                </>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.location.href = '/admin'}
                  className="text-xs font-semibold rounded-lg cursor-pointer h-9 w-full"
                >
                  Access Admin
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
