'use client';

import React from 'react';
import { Button, Card } from '@/components/ui';
import { Trophy, Clock, BarChart3 } from 'lucide-react';

export interface DifficultyBreakdown {
  easy: number;
  medium: number;
  hard: number;
}

export interface CompletionSummaryProps {
  totalCards: number;
  timeSpent: number;
  difficultyBreakdown: DifficultyBreakdown;
  onRestart: () => void;
  onExit: () => void;
}

export const CompletionSummary: React.FC<CompletionSummaryProps> = ({
  totalCards,
  timeSpent,
  difficultyBreakdown,
  onRestart,
  onExit,
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) {
      return `${secs} seconds`;
    }
    return `${mins} min ${secs} sec`;
  };

  const totalRated = difficultyBreakdown.easy + difficultyBreakdown.medium + difficultyBreakdown.hard;
  const easyPercentage = totalRated > 0 ? (difficultyBreakdown.easy / totalRated) * 100 : 0;
  const mediumPercentage = totalRated > 0 ? (difficultyBreakdown.medium / totalRated) * 100 : 0;
  const hardPercentage = totalRated > 0 ? (difficultyBreakdown.hard / totalRated) * 100 : 0;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card variant="elevated" padding="lg" className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mb-4">
            <Trophy className="w-8 h-8 text-success" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Study Session Complete!
          </h1>
          <p className="text-text-secondary">
            Great job! You've completed all flashcards.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Total Cards */}
          <Card variant="outlined" padding="md">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Cards Studied</p>
                <p className="text-2xl font-bold text-text-primary">{totalCards}</p>
              </div>
            </div>
          </Card>

          {/* Time Spent */}
          <Card variant="outlined" padding="md">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Clock className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Time Spent</p>
                <p className="text-2xl font-bold text-text-primary">{formatTime(timeSpent)}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Difficulty Breakdown */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Difficulty Breakdown
          </h2>
          
          {totalRated > 0 ? (
            <>
              {/* Visual Bar */}
              <div className="flex h-8 rounded-lg overflow-hidden mb-4">
                {easyPercentage > 0 && (
                  <div
                    className="bg-success flex items-center justify-center text-white text-sm font-medium"
                    style={{ width: `${easyPercentage}%` }}
                  >
                    {easyPercentage >= 15 && `${Math.round(easyPercentage)}%`}
                  </div>
                )}
                {mediumPercentage > 0 && (
                  <div
                    className="bg-warning flex items-center justify-center text-white text-sm font-medium"
                    style={{ width: `${mediumPercentage}%` }}
                  >
                    {mediumPercentage >= 15 && `${Math.round(mediumPercentage)}%`}
                  </div>
                )}
                {hardPercentage > 0 && (
                  <div
                    className="bg-error flex items-center justify-center text-white text-sm font-medium"
                    style={{ width: `${hardPercentage}%` }}
                  >
                    {hardPercentage >= 15 && `${Math.round(hardPercentage)}%`}
                  </div>
                )}
              </div>

              {/* Legend */}
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-success rounded"></div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">Easy</p>
                    <p className="text-xs text-text-secondary">{difficultyBreakdown.easy} cards</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-warning rounded"></div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">Medium</p>
                    <p className="text-xs text-text-secondary">{difficultyBreakdown.medium} cards</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-error rounded"></div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">Hard</p>
                    <p className="text-xs text-text-secondary">{difficultyBreakdown.hard} cards</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p className="text-text-secondary text-center py-4">
              No difficulty ratings recorded
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="primary"
            size="lg"
            onClick={onRestart}
            icon="refresh"
            fullWidth
          >
            Study Again
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={onExit}
            icon="home"
            fullWidth
          >
            Back to Dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
};
