'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const steps = [
  { id: 1, label: 'Analyzing content...' },
  { id: 2, label: 'Generating notes...' },
  { id: 3, label: 'Creating quizzes...' },
  { id: 4, label: 'Building flashcards...' },
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepStates, setStepStates] = useState<('pending' | 'loading' | 'complete')[]>(
    new Array(steps.length).fill('pending')
  );
  const [showWaiting, setShowWaiting] = useState(false);
  const [dots, setDots] = useState('');

  useEffect(() => {
    const stepDuration = 4000; // 4 seconds per step
    
    steps.forEach((_, index) => {
      const delay = index * stepDuration;
      
      // Start loading
      setTimeout(() => {
        setCurrentStep(index);
        setStepStates(prev => {
          const newStates = [...prev];
          newStates[index] = 'loading';
          return newStates;
        });
      }, delay);
      
      // Complete step
      setTimeout(() => {
        setStepStates(prev => {
          const newStates = [...prev];
          newStates[index] = 'complete';
          return newStates;
        });
        
        // Show waiting message after last step
        if (index === steps.length - 1) {
          setTimeout(() => {
            setShowWaiting(true);
          }, 500);
        }
      }, delay + 3000);
    });
  }, []);

  // Animated dots for waiting message
  useEffect(() => {
    if (!showWaiting) return;
    
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    
    return () => clearInterval(interval);
  }, [showWaiting]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-8 z-50">
      <div className="max-w-2xl w-full">
        {/* Animated Icon */}
        <div className="text-center mb-12">
          <div className="inline-block animate-bounce">
            <div className="text-7xl">🔍</div>
          </div>
          <h2 className="text-3xl font-bold text-white mt-6 mb-2">AI is working its magic</h2>
          <p className="text-purple-200">Creating your personalized study materials</p>
        </div>

        {/* Steps */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 space-y-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
                stepStates[index] !== 'pending' ? 'bg-white/10' : ''
              }`}
              style={{
                opacity: stepStates[index] !== 'pending' ? 1 : 0.3,
                transform: stepStates[index] !== 'pending' ? 'scale(1)' : 'scale(0.95)',
              }}
            >
              <div className="flex-shrink-0">
                {stepStates[index] === 'complete' ? (
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                ) : stepStates[index] === 'loading' ? (
                  <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <span className="text-white font-medium">{step.label}</span>
            </div>
          ))}
        </div>

        {/* Waiting Message */}
        {showWaiting && (
          <div className="mt-8 text-center animate-fade-in">
            <p className="text-purple-200 text-lg">
              ⏳ Please wait a few seconds while we prepare your content{dots}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
