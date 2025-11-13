'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface CardNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  onDifficultyRate: (difficulty: DifficultyLevel) => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  showDifficultyRating?: boolean;
}

export const CardNavigation: React.FC<CardNavigationProps> = ({
  onPrevious,
  onNext,
  onDifficultyRate,
  canGoPrevious,
  canGoNext,
  showDifficultyRating = true,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && canGoPrevious) {
        onPrevious();
      } else if (e.key === 'ArrowRight' && canGoNext) {
        onNext();
      } else if (e.key === '1') {
        onDifficultyRate('easy');
      } else if (e.key === '2') {
        onDifficultyRate('medium');
      } else if (e.key === '3') {
        onDifficultyRate('hard');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onPrevious, onNext, onDifficultyRate, canGoPrevious, canGoNext]);

  const handleDifficultyClick = (difficulty: DifficultyLevel) => {
    onDifficultyRate(difficulty);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Navigation Buttons */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <Button
          variant="secondary"
          size="lg"
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className="min-w-[120px]"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={onNext}
          disabled={!canGoNext}
          className="min-w-[120px]"
        >
          Next
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>

      {/* Difficulty Rating */}
      {showDifficultyRating && (
        <div className="space-y-3">
          <p className="text-center text-sm text-text-secondary">
            How difficult was this card?
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="md"
              onClick={() => handleDifficultyClick('easy')}
              className="min-w-[100px] border-success text-success hover:bg-success hover:text-white"
            >
              Easy
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => handleDifficultyClick('medium')}
              className="min-w-[100px] border-warning text-warning hover:bg-warning hover:text-white"
            >
              Medium
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => handleDifficultyClick('hard')}
              className="min-w-[100px] border-error text-error hover:bg-error hover:text-white"
            >
              Hard
            </Button>
          </div>
          <p className="text-center text-xs text-text-tertiary">
            Keyboard shortcuts: 1 (Easy), 2 (Medium), 3 (Hard), ← → (Navigate)
          </p>
        </div>
      )}
    </div>
  );
};
