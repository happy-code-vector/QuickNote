'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { DashboardLayout } from '@/components/layout';
import {
  QuizHeader,
  QuestionNavigation,
  QuestionDisplay,
  QuizNavigation,
  QuizResults,
  QuizReview,
} from '@/components/quiz';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { storage } from '@/lib/storage';
import { Document, QuizItem } from '@/types';

type QuizMode = 'taking' | 'results' | 'review';

interface QuizAnswer {
  questionIndex: number;
  selectedOption: string;
}

export default function QuizPage() {
  const router = useRouter();
  const params = useParams();
  const documentId = params.documentId as string;

  const [document, setDocument] = useState<Document | null>(null);
  const [quizMode, setQuizMode] = useState<QuizMode>('taking');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<number, string>>(new Map());
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes in seconds
  const [timeSpent, setTimeSpent] = useState(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Load document and quiz
  useEffect(() => {
    const profile = storage.getCurrentProfile();
    if (!profile) {
      router.push('/');
      return;
    }

    const doc = storage.getDocument(documentId);
    if (!doc || !doc.quizzes || doc.quizzes.length === 0) {
      router.push('/dashboard');
      return;
    }

    setDocument(doc);
  }, [documentId, router]);

  // Timer countdown
  useEffect(() => {
    if (quizMode !== 'taking' || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Time's up - auto submit
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
      setTimeSpent((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [quizMode, timeRemaining]);

  // Handle option selection
  const handleOptionSelect = (option: string) => {
    const newAnswers = new Map(answers);
    newAnswers.set(currentQuestionIndex, option);
    setAnswers(newAnswers);
  };

  // Handle question navigation
  const handleQuestionClick = (questionNumber: number) => {
    setCurrentQuestionIndex(questionNumber - 1);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < (document?.quizzes.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Handle quiz submission
  const handleSubmitClick = () => {
    setShowSubmitModal(true);
  };

  const handleSubmitQuiz = useCallback(() => {
    setShowSubmitModal(false);
    setQuizMode('results');
  }, []);

  const handleCancelSubmit = () => {
    setShowSubmitModal(false);
  };

  // Handle results actions
  const handleReview = () => {
    setQuizMode('review');
  };

  const handleRetake = () => {
    setAnswers(new Map());
    setCurrentQuestionIndex(0);
    setTimeRemaining(1800);
    setTimeSpent(0);
    setQuizMode('taking');
  };

  const handleExit = () => {
    router.push('/dashboard');
  };

  if (!document || !document.quizzes || document.quizzes.length === 0) {
    return null;
  }

  const quizzes = document.quizzes;
  const currentQuestion = quizzes[currentQuestionIndex];
  const answeredQuestions = new Set(answers.keys());
  const selectedOption = answers.get(currentQuestionIndex) || null;

  // Calculate results
  const correctAnswers = Array.from(answers.entries()).filter(
    ([index, answer]) => answer === quizzes[index].correctAnswer
  ).length;
  const incorrectAnswers = answers.size - correctAnswers;
  const score = correctAnswers;

  // Prepare questions for review
  const reviewQuestions = quizzes.map((q, index) => ({
    question: q.question,
    options: q.options,
    correctAnswer: q.correctAnswer,
    userAnswer: answers.get(index),
  }));

  // Results mode
  if (quizMode === 'results') {
    return (
      <QuizResults
        score={score}
        totalQuestions={quizzes.length}
        timeSpent={timeSpent}
        correctAnswers={correctAnswers}
        incorrectAnswers={incorrectAnswers}
        onReview={handleReview}
        onRetake={handleRetake}
        onExit={handleExit}
      />
    );
  }

  // Review mode
  if (quizMode === 'review') {
    return <QuizReview questions={reviewQuestions} onExit={handleExit} />;
  }

  // Taking quiz mode
  return (
    <DashboardLayout title={document.title}>
      <div className="min-h-screen bg-background">
        {/* Quiz Header */}
        <QuizHeader
          timeRemaining={timeRemaining}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={quizzes.length}
          onSubmit={handleSubmitClick}
        />

        {/* Main Content */}
        <div className="flex">
          {/* Question Navigation Sidebar */}
          <QuestionNavigation
            totalQuestions={quizzes.length}
            currentQuestion={currentQuestionIndex + 1}
            answeredQuestions={answeredQuestions}
            onQuestionClick={handleQuestionClick}
          />

          {/* Question Display Area */}
          <div className="flex-1 p-6 md:p-8">
            <QuestionDisplay
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={quizzes.length}
              question={currentQuestion.question}
              options={currentQuestion.options}
              selectedOption={selectedOption}
              onOptionSelect={handleOptionSelect}
            />

            {/* Navigation Buttons */}
            <QuizNavigation
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={quizzes.length}
              hasAnswer={selectedOption !== null}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          </div>
        </div>

        {/* Submit Confirmation Modal */}
        <Modal
          isOpen={showSubmitModal}
          onClose={handleCancelSubmit}
          title="Submit Quiz?"
          size="md"
        >
          <div className="space-y-4">
            <p className="text-text-secondary">
              Are you sure you want to submit your quiz? You have answered{' '}
              <strong>{answers.size}</strong> out of <strong>{quizzes.length}</strong>{' '}
              questions.
            </p>
            {answers.size < quizzes.length && (
              <p className="text-warning text-sm">
                Warning: You have {quizzes.length - answers.size} unanswered question(s).
              </p>
            )}
            <div className="flex gap-3 justify-end pt-4">
              <Button variant="ghost" onClick={handleCancelSubmit}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSubmitQuiz}>
                Submit Quiz
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
