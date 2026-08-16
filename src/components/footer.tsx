'use client';

import * as React from 'react';
import { Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Attribution & Copyright */}
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Kishore Biradar. All rights reserved.
          </p>
          <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground/60">
            <span className="h-1 w-1 rounded-full bg-violet-400" />
            <span>
              AI &amp; Machine Learning Engineering student
            </span>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Kishorebiradar07"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/kishore-biradar-366126252"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin className="h-4 w-4" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a
            href="mailto:biradarkishore07@gmail.com?subject=Portfolio%20Inquiry%20%E2%80%94%20Kishore%20Biradar"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="h-4 w-4" />
            <span className="sr-only">Email</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
