'use client';

import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface QuizNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  hasAnswer: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export function QuizNavigation({
  currentQuestion,
  totalQuestions,
  hasAnswer,
  onPrevious,
  onNext,
}: QuizNavigationProps) {
  const isFirstQuestion = currentQuestion === 1;
  const isLastQuestion = currentQuestion === totalQuestions;

  return (
    <div className="flex items-center justify-between gap-4 pt-8 border-t border-border">
      {/* Previous Button */}
      <Button
        variant="outline"
        icon={ChevronLeft}
        iconPosition="left"
        onClick={onPrevious}
        disabled={isFirstQuestion}
      >
        Previous
      </Button>

      {/* Question Counter */}
      <div className="text-sm text-text-secondary font-medium">
        {currentQuestion} / {totalQuestions}
      </div>

      {/* Next Button */}
      <Button
        variant="primary"
        icon={ChevronRight}
        iconPosition="right"
        onClick={onNext}
        disabled={!hasAnswer || isLastQuestion}
      >
        Next
      </Button>
    </div>
  );
}
