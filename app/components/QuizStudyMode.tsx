"use client";

import { useState, useEffect } from "react";

interface Quiz {
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
}

interface QuizStudyModeProps {
  quizzes: Quiz[];
  onClose: () => void;
}

interface Answer {
  questionIndex: number;
  selected: string;
  correct: string;
  isCorrect: boolean;
}

export function QuizStudyMode({ quizzes, onClose }: QuizStudyModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [startTime] = useState(Date.now());
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuiz = quizzes[currentIndex];
  const progress = ((currentIndex + 1) / quizzes.length) * 100;

  const handleSelectAnswer = (option: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(option);
    setShowResult(true);

    const isCorrect = option === currentQuiz.correct_answer;
    setAnswers([...answers, {
      questionIndex: currentIndex,
      selected: option,
      correct: currentQuiz.correct_answer,
      isCorrect,
    }]);
  };

  const handleNext = () => {
    if (currentIndex < quizzes.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowExplanation(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleTryAgain = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setShowExplanation(false);
    setAnswers([]);
    setIsCompleted(false);
  };

  const getTimeTaken = () => {
    const seconds = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const correctCount = answers.filter((a) => a.isCorrect).length;
  const scorePercentage = Math.round((correctCount / quizzes.length) * 100);

  // Results Screen
  if (isCompleted) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
            <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
              scorePercentage >= 70 ? "bg-green-100" : scorePercentage >= 50 ? "bg-yellow-100" : "bg-red-100"
            }`}>
              <span className={`material-symbols-outlined text-5xl ${
                scorePercentage >= 70 ? "text-green-600" : scorePercentage >= 50 ? "text-yellow-600" : "text-red-600"
              }`}>
                {scorePercentage >= 70 ? "emoji_events" : scorePercentage >= 50 ? "thumb_up" : "refresh"}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {scorePercentage >= 70 ? "Great Job!" : scorePercentage >= 50 ? "Good Effort!" : "Keep Practicing!"}
            </h2>

            <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              {scorePercentage}%
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <p className="text-2xl font-bold text-green-600">{correctCount}</p>
                <p className="text-xs text-gray-500">Correct</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <p className="text-2xl font-bold text-red-600">{quizzes.length - correctCount}</p>
                <p className="text-xs text-gray-500">Wrong</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <p className="text-2xl font-bold text-purple-600">{getTimeTaken()}</p>
                <p className="text-xs text-gray-500">Time</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleTryAgain}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                Try Again
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                Exit Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 text-white">
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
          <span className="text-sm font-medium">Exit Quiz</span>
        </button>
        <div className="text-center">
          <p className="text-sm opacity-75">Question</p>
          <p className="text-lg font-bold">{currentIndex + 1} of {quizzes.length}</p>
        </div>
        <div className="text-right">
          <p className="text-sm opacity-75">Score</p>
          <p className="text-lg font-bold">{correctCount}/{answers.length}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4">
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-2xl">
          {/* Question Card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 mb-6">
            <p className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white leading-relaxed">
              {currentQuiz.question}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuiz.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQuiz.correct_answer;
              const showCorrect = showResult && isCorrect;
              const showWrong = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(option)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl text-left transition-all flex items-center gap-4 ${
                    showCorrect
                      ? "bg-green-500 text-white"
                      : showWrong
                      ? "bg-red-500 text-white"
                      : isSelected
                      ? "bg-purple-500 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                  } ${showResult && !isSelected && !isCorrect ? "opacity-50" : ""}`}
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    showCorrect || showWrong || isSelected
                      ? "bg-white/20"
                      : "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1 font-medium">{option}</span>
                  {showCorrect && (
                    <span className="material-symbols-outlined">check_circle</span>
                  )}
                  {showWrong && (
                    <span className="material-symbols-outlined">cancel</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showResult && currentQuiz.explanation && (
            <div className="mt-4">
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-sm">
                  {showExplanation ? "expand_less" : "expand_more"}
                </span>
                <span className="text-sm font-medium">
                  {showExplanation ? "Hide" : "Show"} Explanation
                </span>
              </button>
              {showExplanation && (
                <div className="mt-3 bg-white/10 backdrop-blur rounded-xl p-4 text-white">
                  <p className="text-sm leading-relaxed">{currentQuiz.explanation}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Next Button */}
      {showResult && (
        <div className="p-6 flex justify-center">
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-white text-purple-600 rounded-xl font-bold hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            {currentIndex < quizzes.length - 1 ? (
              <>
                Next Question
                <span className="material-symbols-outlined">arrow_forward</span>
              </>
            ) : (
              <>
                See Results
                <span className="material-symbols-outlined">emoji_events</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
