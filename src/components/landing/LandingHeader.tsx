'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

export const LandingHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="material-symbols-outlined text-3xl text-primary">
                note_stack
              </span>
              <span className="text-xl font-bold text-text-primary">QuickNote</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/onboarding"
              className="text-text-secondary hover:text-text-primary transition-colors font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
