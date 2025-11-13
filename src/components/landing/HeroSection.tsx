'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary mb-6 leading-tight">
            Transform Your Content Into
            <br />
            <span className="text-primary">Instant Study Materials</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto mb-10 leading-relaxed">
            Upload any document, video, or webpage and let AI create comprehensive notes, 
            flashcards, and quizzes in seconds. Study smarter, not harder.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/onboarding">
              <Button size="lg" icon="arrow_forward" iconPosition="right">
                Get Started Free
              </Button>
            </Link>
            <Button size="lg" variant="outline" icon="play_arrow">
              Watch Demo
            </Button>
          </div>

          {/* Visual Element */}
          <div className="mt-16 relative">
            <div className="bg-surface rounded-2xl shadow-2xl border border-border p-8 max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-error"></div>
                <div className="w-3 h-3 rounded-full bg-warning"></div>
                <div className="w-3 h-3 rounded-full bg-success"></div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-text-tertiary/20 rounded w-3/4"></div>
                <div className="h-4 bg-text-tertiary/20 rounded w-full"></div>
                <div className="h-4 bg-text-tertiary/20 rounded w-5/6"></div>
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="h-24 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-primary">
                      description
                    </span>
                  </div>
                  <div className="h-24 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-primary">
                      style
                    </span>
                  </div>
                  <div className="h-24 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-primary">
                      quiz
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
