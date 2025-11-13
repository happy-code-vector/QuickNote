'use client';

import { Card } from '@/components/ui/Card';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: 'description',
    title: 'AI-Powered Notes',
    description: 'Upload any content and get comprehensive, well-structured notes instantly. Our AI extracts key concepts and organizes them for easy understanding.',
  },
  {
    icon: 'style',
    title: 'Smart Flashcards',
    description: 'Automatically generate flashcards from your content with spaced repetition algorithms to optimize your learning and retention.',
  },
  {
    icon: 'quiz',
    title: 'Interactive Quizzes',
    description: 'Test your knowledge with AI-generated quizzes that adapt to your learning progress and identify areas that need more focus.',
  },
  {
    icon: 'upload_file',
    title: 'Multi-Format Support',
    description: 'Upload PDFs, documents, images, videos, or paste URLs. QuickNote handles all your learning materials in one place.',
  },
  {
    icon: 'dark_mode',
    title: 'Dark Mode',
    description: 'Study comfortably at any time with our beautiful dark mode that reduces eye strain during late-night study sessions.',
  },
  {
    icon: 'devices',
    title: 'Cross-Platform',
    description: 'Access your study materials anywhere, anytime. Fully responsive design works seamlessly on desktop, tablet, and mobile.',
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Everything You Need to Study Smarter
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Powerful features designed to transform the way you learn and retain information
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              variant="outlined"
              padding="lg"
              hoverable
              className="group"
            >
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="material-symbols-outlined text-4xl text-primary">
                    {feature.icon}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
