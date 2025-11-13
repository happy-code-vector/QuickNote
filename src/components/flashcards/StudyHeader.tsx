'use client';

import React from 'react';
import { Button } from '@/components/ui';
import { Settings } from 'lucide-react';

export interface StudyHeaderProps {
  currentCard: number;
  totalCards: number;
  elapsedTime: number;
  onSettingsClick: () => void;
}

export const StudyHeader: React.FC<StudyHeaderProps> = ({
  currentCard,
  totalCards,
  elapsedTime,
  onSettingsClick,
}) => {
  const progressPercentage = (currentCard / totalCards) * 100;

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-surface border-b border-border p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          {/* Progress Indicator */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-semibold text-text-primary">
              {currentCard}/{totalCards}
            </span>
            <span className="text-sm text-text-secondary">cards</span>
          </div>

          {/* Timer and Settings */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-text-secondary">
              <span className="material-symbols-outlined text-xl">timer</span>
              <span className="text-lg font-medium">{formatTime(elapsedTime)}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onSettingsClick}
              icon="settings"
              aria-label="Study settings"
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-border rounded-full h-2 overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};
