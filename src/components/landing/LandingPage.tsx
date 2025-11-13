'use client';

import { LandingHeader } from './LandingHeader';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { LandingFooter } from './LandingFooter';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <main>
        <HeroSection />
        <FeaturesSection />
      </main>
      <LandingFooter />
    </div>
  );
};
