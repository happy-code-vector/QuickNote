'use client';

import { Check, Circle, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface QuestionNavigationProps {
  totalQuestions: number;
  currentQuestion: number;
  answeredQuestions: Set<number>;
  onQuestionClick: (questionNumber: number) => void;
}

export function QuestionNavigation({
  totalQuestions,
  currentQuestion,
  answeredQuestions,
  onQuestionClick,
}: QuestionNavigationProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getQuestionStatus = (questionNumber: number) => {
    if (questionNumber === currentQuestion) return 'current';
    if (answeredQuestions.has(questionNumber)) return 'answered';
    return 'unanswered';
  };

  const getStatusIcon = (questionNumber: number) => {
    const status = getQuestionStatus(questionNumber);
    if (status === 'answered') {
      return <Check className="w-4 h-4" />;
    }
    if (status === 'current') {
      return <Circle className="w-4 h-4 fill-current" />;
    }
    return <Circle className="w-4 h-4" />;
  };

  const getStatusStyles = (questionNumber: number) => {
    const status = getQuestionStatus(questionNumber);
    if (status === 'current') {
      return 'bg-primary text-white border-primary';
    }
    if (status === 'answered') {
      return 'bg-success/10 text-success border-success';
    }
    return 'bg-surface-hover text-text-secondary border-border hover:border-primary/50';
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="md:hidden fixed bottom-6 right-6 z-30 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-hover transition-colors"
        aria-label="Toggle question navigation"
      >
        {isCollapsed ? <Menu className="w-6 h-6" /> : <X className="w-6 h-6" />}
      </button>

      {/* Navigation Sidebar */}
      <div
        className={`
          fixed md:sticky top-[180px] left-0 h-[calc(100vh-180px)] md:h-auto
          w-64 bg-surface border-r border-border
          transition-transform duration-300 ease-in-out z-20
          ${isCollapsed ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}
          overflow-y-auto
        `}
      >
        <div className="p-6">
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-4">
            Questions
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((questionNumber) => (
              <button
                key={questionNumber}
                onClick={() => onQuestionClick(questionNumber)}
                className={`
                  w-full aspect-square rounded-lg border-2
                  flex items-center justify-center
                  font-semibold text-sm
                  transition-all duration-200
                  hover:scale-105
                  ${getStatusStyles(questionNumber)}
                `}
                aria-label={`Go to question ${questionNumber}`}
                aria-current={questionNumber === currentQuestion ? 'step' : undefined}
              >
                <span className="sr-only">Question {questionNumber}</span>
                {getStatusIcon(questionNumber)}
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-6 border-t border-border space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Circle className="w-4 h-4 fill-current text-white" />
              </div>
              <span className="text-text-secondary">Current</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-lg bg-success/10 border-2 border-success flex items-center justify-center">
                <Check className="w-4 h-4 text-success" />
              </div>
              <span className="text-text-secondary">Answered</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-lg bg-surface-hover border-2 border-border flex items-center justify-center">
                <Circle className="w-4 h-4 text-text-secondary" />
              </div>
              <span className="text-text-secondary">Unanswered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Backdrop */}
      {!isCollapsed && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-10"
          onClick={() => setIsCollapsed(true)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
