'use client';

import Link from 'next/link';

export const LandingFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-3xl text-primary">
                note_stack
              </span>
              <span className="text-xl font-bold text-text-primary">QuickNote</span>
            </div>
            <p className="text-text-secondary text-sm max-w-md">
              Transform your content into instant notes, flashcards, and quizzes with AI-powered learning tools.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/onboarding" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-center text-text-tertiary text-sm">
            © {currentYear} QuickNote. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
