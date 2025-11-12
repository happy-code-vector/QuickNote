'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

const onboardingSteps = [
  {
    id: 'welcome',
    title: 'Welcome to QuickNote',
    subtitle: 'Turn your content into instant notes',
    features: [
      { icon: '📝', title: 'Instant Notes', desc: 'AI-powered summaries' },
      { icon: '🎴', title: 'Flashcards', desc: 'Auto-generated study cards' },
      { icon: '📊', title: 'Quizzes', desc: 'Test your knowledge' },
      { icon: '🤝', title: 'Study Collaborate', desc: 'Learn together' },
    ],
    footer: 'Say goodbye to endless note-taking',
  },
  {
    id: 'stats',
    title: 'Did you know?',
    subtitle: 'Learning challenges students face',
    stats: [
      { emoji: '📄', text: 'The average student spends 4+ hrs/day studying but remembers less than 20%. Is that you?' },
      { emoji: '🎥', text: 'Most students rewatch videos or reread PDFs multiple times and still forget. Do you relate to it?' },
      { emoji: '😴', text: 'Passive learning kills focus and wastes study time. Is that you?' },
      { emoji: '👀', text: '7 out of 10 students feel overwhelmed by too much content. Do you relate to it?' },
    ],
    footer: 'QuickNote helps you learn smarter, not harder',
  },
  {
    id: 'profile',
    title: 'Tell me about yourself',
    subtitle: 'We use it to create a more relevant and useful experience.',
    options: [
      '🏫 K-8',
      '🙇🏻‍♂️ High School Student',
      '👨🏻‍🎓 Undergraduate Student',
      '🎓 Graduate Student',
      '👫 Parent',
      '🧑‍🏫 Teacher',
    ],
  },
  {
    id: 'notifications',
    title: 'Enable Notifications',
    subtitle: 'Stay connected with your learning',
    description: 'Get notified when your notes are ready and receive study reminders',
    animation: '🔔',
  },
  {
    id: 'rating',
    title: "We'd love your feedback!",
    subtitle: 'Built with care for learners like you',
    description: 'Rate us on your app store',
    animation: '⭐',
  },
];

export default function Onboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [selectedStat, setSelectedStat] = useState<number | null>(null);

  const step = onboardingSteps[currentStep];
  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;

  const handleNext = () => {
    if (step.id === 'profile' && selectedOption === null) {
      alert('Please select one option that best describes you.');
      return;
    }

    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
      setSelectedStat(null);
    } else {
      localStorage.setItem('quicknote_onboarding_complete', 'true');
      router.push('/');
    }
  };

  const getButtonText = () => {
    if (currentStep === 0) return 'Get Started';
    if (currentStep === onboardingSteps.length - 1) return 'Leave a Rating';
    return 'Continue';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white p-8 flex flex-col">
      {/* Progress Bar */}
      <div className="w-full bg-white/20 rounded-full h-2 mb-8">
        <div
          className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
        {step.id === 'welcome' && (
          <div className="text-center space-y-8 animate-fade-in">
            <div className="text-6xl mb-4">✨</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{step.title}</h1>
            <p className="text-xl text-purple-200 mb-12">{step.subtitle}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {step.features?.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all"
                >
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-purple-200">{feature.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-purple-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
              <p className="text-lg">{step.footer}</p>
            </div>
          </div>
        )}

        {step.id === 'stats' && (
          <div className="w-full space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🤔</div>
              <h1 className="text-4xl font-bold mb-2">{step.title}</h1>
              <p className="text-purple-200">{step.subtitle}</p>
            </div>
            
            <div className="space-y-4">
              {step.stats?.map((stat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedStat(idx)}
                  className={`w-full bg-purple-800/30 backdrop-blur-sm rounded-2xl p-6 border-2 transition-all text-left ${
                    selectedStat === idx
                      ? 'border-purple-400 bg-purple-700/50'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0 bg-purple-600 w-14 h-14 rounded-full flex items-center justify-center">
                      {stat.emoji}
                    </div>
                    <p className="text-base leading-relaxed">{stat.text}</p>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="bg-purple-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 text-center mt-8">
              <p className="text-lg">{step.footer}</p>
            </div>
          </div>
        )}

        {step.id === 'profile' && (
          <div className="w-full space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2">{step.title}</h1>
              <p className="text-purple-200">{step.subtitle}</p>
            </div>
            
            <div className="space-y-3">
              {step.options?.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedOption(idx)}
                  className={`w-full rounded-2xl p-5 border-2 transition-all text-left text-lg font-medium ${
                    selectedOption === idx
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-transparent'
                      : 'bg-purple-800/30 backdrop-blur-sm border-white/20 hover:border-white/40'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {step.id === 'notifications' && (
          <div className="text-center space-y-8 animate-fade-in">
            <div className="text-7xl mb-4 animate-bounce">{step.animation}</div>
            <h1 className="text-4xl font-bold mb-2">{step.title}</h1>
            <p className="text-xl text-purple-200 mb-4">{step.subtitle}</p>
            <p className="text-lg text-purple-300 max-w-md mx-auto">{step.description}</p>
          </div>
        )}

        {step.id === 'rating' && (
          <div className="text-center space-y-8 animate-fade-in">
            <div className="text-7xl mb-4">⭐⭐⭐⭐⭐</div>
            <h1 className="text-4xl font-bold mb-2">{step.title}</h1>
            <p className="text-xl text-purple-200 mb-4">{step.subtitle}</p>
            <p className="text-lg text-purple-300 max-w-md mx-auto">{step.description}</p>
            <div className="flex justify-center gap-2 mt-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <div key={star} className="text-5xl animate-pulse" style={{ animationDelay: `${star * 100}ms` }}>
                  ⭐
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="w-full max-w-md mx-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-full font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
      >
        {getButtonText()}
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
