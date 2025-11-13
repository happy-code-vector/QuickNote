'use client';

import { Button } from '@/components/ui/Button';
import { Clock, CheckCircle } from 'lucide-react';

interface QuizHeaderProps {
  timeRemaining: number; // in seconds
  currentQuestion: number;
  totalQuestions: number;
  onSubmit: () => void;
}

export function QuizHeader({
  timeRemaining,
  currentQuestion,
  totalQuestions,
  onSubmit,
}: QuizHeaderProps) {
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  // Check if time is low (< 5 minutes)
  const isTimeLow = timeRemaining < 300;

  return (
    <div className="sticky top-16 z-20 bg-surface border-b border-border">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between gap-4 mb-4">
          {/* Timer */}
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isTimeLow
                ? 'bg-error/10 text-error'
                : 'bg-surface-hover text-text-secondary'
            }`}
          >
            <Clock className="w-5 h-5" />
            <span className="font-semibold text-lg">{formatTime(timeRemaining)}</span>
          </div>

          {/* Submit Button */}
          <Button
            variant="primary"
            icon={CheckCircle}
            iconPosition="left"
            onClick={onSubmit}
          >
            Submit Quiz
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">
              Question {currentQuestion} of {totalQuestions}
            </span>
            <span className="text-text-secondary font-medium">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <div className="w-full h-2 bg-surface-hover rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
