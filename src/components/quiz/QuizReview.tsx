'use client';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { QuestionDisplay } from './QuestionDisplay';
import { X, CheckCircle, XCircle } from 'lucide-react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  userAnswer?: string;
}

interface QuizReviewProps {
  questions: QuizQuestion[];
  onExit: () => void;
}

export function QuizReview({ questions, onExit }: QuizReviewProps) {
  const correctCount = questions.filter(
    (q) => q.userAnswer === q.correctAnswer
  ).length;
  const incorrectCount = questions.length - correctCount;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-surface border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Review Mode</h1>
              <p className="text-sm text-text-secondary mt-1">
                Review all questions and see the correct answers
              </p>
            </div>
            <Button variant="ghost" icon={X} iconPosition="left" onClick={onExit}>
              Exit Review
            </Button>
          </div>

          {/* Summary Stats */}
          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="text-sm font-medium text-text-secondary">
                {correctCount} Correct
              </span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-error" />
              <span className="text-sm font-medium text-text-secondary">
                {incorrectCount} Incorrect
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {questions.map((q, index) => {
            const isCorrect = q.userAnswer === q.correctAnswer;

            return (
              <Card
                key={index}
                variant="outlined"
                padding="lg"
                className={`
                  ${isCorrect ? 'border-success/30' : 'border-error/30'}
                `}
              >
                {/* Question Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${
                          isCorrect
                            ? 'bg-success/10 text-success'
                            : 'bg-error/10 text-error'
                        }
                      `}
                    >
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <XCircle className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary">
                        Question {index + 1}
                      </h3>
                      <p
                        className={`text-sm font-medium ${
                          isCorrect ? 'text-success' : 'text-error'
                        }`}
                      >
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Question Display */}
                <QuestionDisplay
                  questionNumber={index + 1}
                  totalQuestions={questions.length}
                  question={q.question}
                  options={q.options}
                  selectedOption={null}
                  onOptionSelect={() => {}}
                  reviewMode={true}
                  correctAnswer={q.correctAnswer}
                  userAnswer={q.userAnswer}
                />

                {/* Explanation (if incorrect) */}
                {!isCorrect && (
                  <div className="mt-6 p-4 rounded-lg bg-info/10 border border-info/30">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-6 h-6 rounded-full bg-info text-white flex items-center justify-center text-xs font-bold">
                          i
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-primary mb-1">
                          Explanation
                        </h4>
                        <p className="text-sm text-text-secondary">
                          The correct answer is: <strong>{q.correctAnswer}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 flex justify-center">
          <Button variant="primary" onClick={onExit}>
            Exit Review
          </Button>
        </div>
      </div>
    </div>
  );
}
