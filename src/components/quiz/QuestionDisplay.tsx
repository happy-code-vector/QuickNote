'use client';

interface QuestionDisplayProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  options: string[];
  selectedOption: string | null;
  onOptionSelect: (option: string) => void;
  reviewMode?: boolean;
  correctAnswer?: string;
  userAnswer?: string;
}

export function QuestionDisplay({
  questionNumber,
  totalQuestions,
  question,
  options,
  selectedOption,
  onOptionSelect,
  reviewMode = false,
  correctAnswer,
  userAnswer,
}: QuestionDisplayProps) {
  const getOptionStyles = (option: string) => {
    // Review mode styling
    if (reviewMode) {
      if (option === correctAnswer) {
        return 'border-success bg-success/10 text-success hover:border-success hover:bg-success/10';
      }
      if (option === userAnswer && option !== correctAnswer) {
        return 'border-error bg-error/10 text-error hover:border-error hover:bg-error/10';
      }
      return 'border-border bg-surface-hover text-text-secondary cursor-not-allowed';
    }

    // Normal mode styling
    if (selectedOption === option) {
      return 'border-primary bg-primary/10 text-primary';
    }
    return 'border-border bg-surface hover:border-primary/50 hover:bg-primary/5 text-text-primary';
  };

  const getOptionLabel = (option: string) => {
    if (reviewMode) {
      if (option === correctAnswer) {
        return '✓ Correct Answer';
      }
      if (option === userAnswer && option !== correctAnswer) {
        return '✗ Your Answer';
      }
    }
    return '';
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Question Number */}
      <div className="mb-6">
        <span className="text-sm font-medium text-text-secondary">
          Question {questionNumber} of {totalQuestions}
        </span>
      </div>

      {/* Question Text */}
      <h2 className="text-2xl font-semibold text-text-primary mb-8 leading-relaxed">
        {question}
      </h2>

      {/* Options */}
      <div className="space-y-4">
        {options.map((option, index) => {
          const optionLabel = String.fromCharCode(65 + index); // A, B, C, D
          const label = getOptionLabel(option);

          return (
            <button
              key={index}
              onClick={() => !reviewMode && onOptionSelect(option)}
              disabled={reviewMode}
              className={`
                w-full text-left p-4 rounded-lg border-2
                transition-all duration-200
                ${getOptionStyles(option)}
                ${!reviewMode && 'hover:scale-[1.01]'}
              `}
              aria-label={`Option ${optionLabel}: ${option}`}
            >
              <div className="flex items-start gap-4">
                {/* Radio Button / Indicator */}
                <div className="flex-shrink-0 mt-0.5">
                  {reviewMode ? (
                    <div
                      className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center
                        ${
                          option === correctAnswer
                            ? 'border-success bg-success text-white'
                            : option === userAnswer
                            ? 'border-error bg-error text-white'
                            : 'border-border bg-surface-hover'
                        }
                      `}
                    >
                      {option === correctAnswer && '✓'}
                      {option === userAnswer && option !== correctAnswer && '✗'}
                    </div>
                  ) : (
                    <div
                      className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center
                        ${
                          selectedOption === option
                            ? 'border-primary'
                            : 'border-border'
                        }
                      `}
                    >
                      {selectedOption === option && (
                        <div className="w-3 h-3 rounded-full bg-primary" />
                      )}
                    </div>
                  )}
                </div>

                {/* Option Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{optionLabel}.</span>
                    {label && (
                      <span className="text-xs font-medium px-2 py-0.5 rounded">
                        {label}
                      </span>
                    )}
                  </div>
                  <p className="text-base leading-relaxed">{option}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
