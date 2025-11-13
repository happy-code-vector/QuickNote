'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui';

export interface FlashCardProps {
  question: string;
  answer: string;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export const FlashCard: React.FC<FlashCardProps> = ({
  question,
  answer,
  onSwipeLeft,
  onSwipeRight,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Reset flip state when card changes
  useEffect(() => {
    setIsFlipped(false);
  }, [question, answer]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft();
    }
    if (isRightSwipe && onSwipeRight) {
      onSwipeRight();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 md:py-12">
      {/* Card Container with 3D perspective */}
      <div
        className="relative w-full max-w-md mx-auto"
        style={{ perspective: '1000px' }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="relative w-full transition-transform duration-600 ease-in-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            height: '300px',
          }}
        >
          {/* Front of Card (Question) */}
          <div
            className="absolute inset-0 w-full h-full bg-surface rounded-xl shadow-lg border border-border p-8 flex flex-col items-center justify-center"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <div className="text-center">
              <p className="text-sm text-text-secondary mb-2 uppercase tracking-wide">
                Question
              </p>
              <p className="text-xl md:text-2xl font-medium text-text-primary">
                {question}
              </p>
            </div>
          </div>

          {/* Back of Card (Answer) */}
          <div
            className="absolute inset-0 w-full h-full bg-primary/5 rounded-xl shadow-lg border border-primary/20 p-8 flex flex-col items-center justify-center"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="text-center">
              <p className="text-sm text-primary mb-2 uppercase tracking-wide font-medium">
                Answer
              </p>
              <p className="text-xl md:text-2xl font-medium text-text-primary">
                {answer}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Flip Button */}
      <div className="mt-6">
        <Button
          variant="outline"
          size="lg"
          onClick={handleFlip}
          icon={isFlipped ? 'flip_to_front' : 'flip_to_back'}
        >
          {isFlipped ? 'Show Question' : 'Show Answer'}
        </Button>
      </div>

      {/* Swipe Hint for Mobile */}
      <p className="mt-4 text-sm text-text-tertiary md:hidden">
        Swipe left or right to navigate
      </p>
    </div>
  );
};
