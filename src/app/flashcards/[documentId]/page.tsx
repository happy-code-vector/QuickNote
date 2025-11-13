'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { DashboardLayout } from '@/components/layout';
import {
  StudyHeader,
  FlashCard,
  CardNavigation,
  StudyModeModal,
  CompletionSummary,
  DifficultyLevel,
  StudyMode,
  DifficultyBreakdown,
} from '@/components/flashcards';
import { storage } from '@/lib/storage';
import { Document } from '@/types';

interface FlashcardWithRating {
  question: string;
  answer: string;
  difficulty?: DifficultyLevel;
}

export default function FlashcardsPage() {
  const router = useRouter();
  const params = useParams();
  const documentId = params.documentId as string;

  const [document, setDocument] = useState<Document | null>(null);
  const [flashcards, setFlashcards] = useState<FlashcardWithRating[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [studyMode, setStudyMode] = useState<StudyMode>('sequential');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [difficultyBreakdown, setDifficultyBreakdown] = useState<DifficultyBreakdown>({
    easy: 0,
    medium: 0,
    hard: 0,
  });

  // Load document and flashcards
  useEffect(() => {
    const profile = storage.getCurrentProfile();
    if (!profile) {
      router.push('/');
      return;
    }

    const doc = storage.getDocument(documentId);
    if (!doc || !doc.flashcards || doc.flashcards.length === 0) {
      router.push('/dashboard');
      return;
    }

    setDocument(doc);
    initializeFlashcards(doc.flashcards, studyMode);
  }, [documentId, router]);

  // Initialize flashcards based on study mode
  const initializeFlashcards = useCallback(
    (cards: Array<{ question: string; answer: string }>, mode: StudyMode) => {
      let processedCards: FlashcardWithRating[] = cards.map((card) => ({
        ...card,
        difficulty: undefined,
      }));

      if (mode === 'random') {
        // Shuffle cards
        processedCards = [...processedCards].sort(() => Math.random() - 0.5);
      } else if (mode === 'difficult') {
        // Filter cards marked as medium or hard
        const difficultCards = processedCards.filter(
          (card) => card.difficulty === 'medium' || card.difficulty === 'hard'
        );
        processedCards = difficultCards.length > 0 ? difficultCards : processedCards;
      }

      setFlashcards(processedCards);
      setCurrentIndex(0);
      setIsCompleted(false);
    },
    []
  );

  // Timer
  useEffect(() => {
    if (isCompleted) return;

    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isCompleted]);

  // Navigation handlers
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Difficulty rating handler
  const handleDifficultyRate = (difficulty: DifficultyLevel) => {
    const updatedCards = [...flashcards];
    updatedCards[currentIndex].difficulty = difficulty;
    setFlashcards(updatedCards);

    // Update breakdown
    setDifficultyBreakdown((prev) => ({
      ...prev,
      [difficulty]: prev[difficulty] + 1,
    }));

    // Auto-advance to next card
    if (currentIndex < flashcards.length - 1) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 300);
    } else {
      // All cards completed
      setTimeout(() => {
        setIsCompleted(true);
      }, 300);
    }
  };

  // Study mode change handler
  const handleModeChange = (mode: StudyMode) => {
    setStudyMode(mode);
    if (document) {
      initializeFlashcards(document.flashcards, mode);
      setElapsedTime(0);
      setDifficultyBreakdown({ easy: 0, medium: 0, hard: 0 });
    }
  };

  // Restart handler
  const handleRestart = () => {
    if (document) {
      initializeFlashcards(document.flashcards, studyMode);
      setElapsedTime(0);
      setDifficultyBreakdown({ easy: 0, medium: 0, hard: 0 });
    }
  };

  // Exit handler
  const handleExit = () => {
    router.push('/dashboard');
  };

  if (!document || flashcards.length === 0) {
    return null;
  }

  if (isCompleted) {
    return (
      <CompletionSummary
        totalCards={flashcards.length}
        timeSpent={elapsedTime}
        difficultyBreakdown={difficultyBreakdown}
        onRestart={handleRestart}
        onExit={handleExit}
      />
    );
  }

  const currentCard = flashcards[currentIndex];

  return (
    <DashboardLayout title={document.title}>
      <div className="min-h-screen bg-background">
        {/* Study Header */}
        <StudyHeader
          currentCard={currentIndex + 1}
          totalCards={flashcards.length}
          elapsedTime={elapsedTime}
          onSettingsClick={() => setIsSettingsOpen(true)}
        />

        {/* Flashcard */}
        <div className="py-8">
          <FlashCard
            question={currentCard.question}
            answer={currentCard.answer}
            onSwipeLeft={handleNext}
            onSwipeRight={handlePrevious}
          />
        </div>

        {/* Navigation and Difficulty Rating */}
        <CardNavigation
          onPrevious={handlePrevious}
          onNext={handleNext}
          onDifficultyRate={handleDifficultyRate}
          canGoPrevious={currentIndex > 0}
          canGoNext={currentIndex < flashcards.length - 1}
        />

        {/* Study Mode Modal */}
        <StudyModeModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          currentMode={studyMode}
          onModeChange={handleModeChange}
        />
      </div>
    </DashboardLayout>
  );
}
