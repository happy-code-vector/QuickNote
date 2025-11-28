"use client";

import { useState } from "react";

interface Flashcard {
  question: string;
  answer: string;
}

interface FlashcardStudyModeProps {
  flashcards: Flashcard[];
  onClose: () => void;
}

export function FlashcardStudyMode({ flashcards, onClose }: FlashcardStudyModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = flashcards[currentIndex];
  const progress = ((currentIndex + 1) / flashcards.length) * 100;

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(currentIndex + 1), 150);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(currentIndex - 1), 150);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleFlip();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-gradient-to-br from-green-900 via-teal-900 to-emerald-900"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 text-white">
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
          <span className="text-sm font-medium">Exit Study</span>
        </button>
        <div className="text-center">
          <p className="text-sm opacity-75">Flashcard</p>
          <p className="text-lg font-bold">{currentIndex + 1} of {flashcards.length}</p>
        </div>
        <div className="w-24" /> {/* Spacer for centering */}
      </div>

      {/* Progress Bar */}
      <div className="px-4">
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-emerald-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Card Area */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div
          className="relative w-full max-w-2xl aspect-[4/3] cursor-pointer perspective-1000"
          onClick={handleFlip}
        >
          <div
            className={`absolute inset-0 transition-transform duration-500 transform-style-3d ${
              isFlipped ? "rotate-y-180" : ""
            }`}
          >
            {/* Front - Question */}
            <div className="absolute inset-0 backface-hidden bg-white rounded-3xl shadow-2xl p-8 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                  Question
                </span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <p className="text-2xl md:text-3xl font-medium text-gray-900 text-center leading-relaxed">
                  {currentCard.question}
                </p>
              </div>
              <div className="text-center text-gray-400 text-sm">
                <span className="material-symbols-outlined text-lg align-middle">touch_app</span>
                {" "}Tap to reveal answer
              </div>
            </div>

            {/* Back - Answer */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl shadow-2xl p-8 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Answer
                </span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <p className="text-2xl md:text-3xl font-medium text-white text-center leading-relaxed">
                  {currentCard.answer}
                </p>
              </div>
              <div className="text-center text-white/60 text-sm">
                <span className="material-symbols-outlined text-lg align-middle">touch_app</span>
                {" "}Tap to see question
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 p-6">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Previous
        </button>

        {/* Page Indicators */}
        <div className="flex gap-2 px-4">
          {flashcards.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsFlipped(false);
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-white scale-125"
                  : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex === flashcards.length - 1}
          className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
        >
          Next
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>

      {/* Keyboard Hints */}
      <div className="text-center pb-4 text-white/50 text-sm">
        Use ← → arrow keys to navigate, Space to flip
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
