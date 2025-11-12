'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { storage } from '@/lib/storage';
import { Document } from '@/types';
import { ArrowLeft, BookOpen, Brain, MessageSquare, GraduationCap } from 'lucide-react';

function DocumentViewContent() {
  const router = useRouter();
  const params = useParams();
  const docId = params.id as string;
  
  const [document, setDocument] = useState<Document | null>(null);
  const [activeTab, setActiveTab] = useState<'notes' | 'flashcards' | 'quiz' | 'chat'>('notes');

  useEffect(() => {
    const docs = storage.getDocuments();
    const doc = docs.find(d => d.id === docId);
    if (!doc) {
      router.push('/folders');
      return;
    }
    setDocument(doc);
  }, [docId, router]);

  if (!document) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-8 py-4">
          <button
            onClick={() => router.push(`/documents/${document.folderId}`)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-3"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-800">{document.title}</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 px-6 py-4 flex items-center justify-center gap-2 font-medium transition-colors ${
                activeTab === 'notes' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              Notes
            </button>
            <button
              onClick={() => setActiveTab('flashcards')}
              className={`flex-1 px-6 py-4 flex items-center justify-center gap-2 font-medium transition-colors ${
                activeTab === 'flashcards' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Brain className="w-5 h-5" />
              Flashcards
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex-1 px-6 py-4 flex items-center justify-center gap-2 font-medium transition-colors ${
                activeTab === 'quiz' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <GraduationCap className="w-5 h-5" />
              Quiz
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 px-6 py-4 flex items-center justify-center gap-2 font-medium transition-colors ${
                activeTab === 'chat' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              Chat
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'notes' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-3 text-gray-800">Summary</h2>
                  <p className="text-gray-700 leading-relaxed">{document.note}</p>
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-3 text-gray-800">Original Content</h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    {document.contentType === 'text' ? (
                      <p className="text-gray-700 whitespace-pre-wrap">{document.contentPath}</p>
                    ) : document.contentType === 'youtube' ? (
                      <a href={document.contentPath} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {document.contentPath}
                      </a>
                    ) : (
                      <img src={document.contentPath} alt="Content" className="max-w-full rounded" />
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'flashcards' && (
              <div className="space-y-4">
                {document.flashcards.length > 0 ? (
                  document.flashcards.map((card, index) => (
                    <FlashcardItem key={index} question={card.question} answer={card.answer} />
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">No flashcards generated</p>
                )}
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="space-y-6">
                {document.quizzes.length > 0 ? (
                  document.quizzes.map((quiz, index) => (
                    <QuizItem key={index} quiz={quiz} index={index} />
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">No quiz questions generated</p>
                )}
              </div>
            )}

            {activeTab === 'chat' && (
              <div className="text-center py-8 text-gray-500">
                Chat feature coming soon
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FlashcardItem({ question, answer }: { question: string; answer: string }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setFlipped(!flipped)}
        className="w-full bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-600 text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all min-h-[250px] flex items-center justify-center relative overflow-hidden group"
      >
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 text-4xl opacity-20">🎴</div>
        <div className="absolute bottom-4 left-4 text-4xl opacity-20">✨</div>
        
        <div className="text-center z-10">
          <div className="inline-block px-4 py-1 bg-white/20 rounded-full mb-4">
            <p className="text-sm font-semibold">{flipped ? 'Answer' : 'Question'}</p>
          </div>
          <p className="text-2xl font-medium leading-relaxed">{flipped ? answer : question}</p>
          <p className="text-sm mt-6 opacity-75 flex items-center justify-center gap-2">
            <span>Click to flip</span>
            <span className="inline-block group-hover:rotate-180 transition-transform">🔄</span>
          </p>
        </div>
      </button>
    </div>
  );
}

function QuizItem({ quiz, index }: { quiz: any; index: number }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      <h3 className="font-bold text-lg mb-4 text-gray-800">
        {index + 1}. {quiz.question}
      </h3>
      <div className="space-y-2">
        {quiz.options.map((option: string, i: number) => (
          <button
            key={i}
            onClick={() => {
              setSelected(option);
              setShowAnswer(true);
            }}
            className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-colors ${
              showAnswer
                ? option === quiz.correctAnswer
                  ? 'border-green-500 bg-green-50'
                  : option === selected
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300'
                : selected === option
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {showAnswer && (
        <p className={`mt-4 font-medium ${selected === quiz.correctAnswer ? 'text-green-600' : 'text-red-600'}`}>
          {selected === quiz.correctAnswer ? '✓ Correct!' : `✗ Incorrect. The answer is: ${quiz.correctAnswer}`}
        </p>
      )}
    </div>
  );
}

export default function DocumentView() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <DocumentViewContent />
    </Suspense>
  );
}
