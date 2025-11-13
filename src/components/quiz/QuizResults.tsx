'use client';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CheckCircle, XCircle, Clock, BarChart3, RotateCcw, Eye } from 'lucide-react';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  timeSpent: number; // in seconds
  correctAnswers: number;
  incorrectAnswers: number;
  onReview: () => void;
  onRetake: () => void;
  onExit: () => void;
}

export function QuizResults({
  score,
  totalQuestions,
  timeSpent,
  correctAnswers,
  incorrectAnswers,
  onReview,
  onRetake,
  onExit,
}: QuizResultsProps) {
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  // Calculate percentage
  const percentage = Math.round((score / totalQuestions) * 100);

  // Determine performance level
  const getPerformanceLevel = () => {
    if (percentage >= 90) return { text: 'Excellent!', color: 'text-success' };
    if (percentage >= 70) return { text: 'Good Job!', color: 'text-primary' };
    if (percentage >= 50) return { text: 'Not Bad!', color: 'text-warning' };
    return { text: 'Keep Practicing!', color: 'text-error' };
  };

  const performance = getPerformanceLevel();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
            <BarChart3 className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Quiz Complete!</h1>
          <p className={`text-xl font-semibold ${performance.color}`}>
            {performance.text}
          </p>
        </div>

        {/* Score Card */}
        <Card variant="elevated" padding="lg" className="mb-6">
          <div className="text-center mb-6">
            <div className="text-6xl font-bold text-primary mb-2">
              {percentage}%
            </div>
            <p className="text-text-secondary">
              {score} out of {totalQuestions} questions correct
            </p>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Correct Answers */}
            <div className="flex items-center gap-3 p-4 rounded-lg bg-success/10">
              <div className="flex-shrink-0">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold text-success">{correctAnswers}</div>
                <div className="text-sm text-text-secondary">Correct</div>
              </div>
            </div>

            {/* Incorrect Answers */}
            <div className="flex items-center gap-3 p-4 rounded-lg bg-error/10">
              <div className="flex-shrink-0">
                <XCircle className="w-8 h-8 text-error" />
              </div>
              <div>
                <div className="text-2xl font-bold text-error">{incorrectAnswers}</div>
                <div className="text-sm text-text-secondary">Incorrect</div>
              </div>
            </div>

            {/* Time Spent */}
            <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/10">
              <div className="flex-shrink-0">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{formatTime(timeSpent)}</div>
                <div className="text-sm text-text-secondary">Time Spent</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="primary"
            icon={Eye}
            iconPosition="left"
            onClick={onReview}
            fullWidth
          >
            Review Answers
          </Button>
          <Button
            variant="outline"
            icon={RotateCcw}
            iconPosition="left"
            onClick={onRetake}
            fullWidth
          >
            Retake Quiz
          </Button>
          <Button
            variant="ghost"
            onClick={onExit}
            fullWidth
          >
            Exit
          </Button>
        </div>

        {/* Performance Breakdown */}
        <Card variant="outlined" padding="md" className="mt-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Performance Breakdown
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-text-secondary">Accuracy</span>
                <span className="font-semibold text-text-primary">{percentage}%</span>
              </div>
              <div className="w-full h-2 bg-surface-hover rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-text-secondary">Completion</span>
                <span className="font-semibold text-text-primary">100%</span>
              </div>
              <div className="w-full h-2 bg-surface-hover rounded-full overflow-hidden">
                <div className="h-full bg-success transition-all duration-500" style={{ width: '100%' }} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
