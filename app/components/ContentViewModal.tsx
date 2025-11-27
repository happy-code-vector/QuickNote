"use client";

import { useEffect } from "react";

interface ContentViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: {
    id: number;
    title: string;
    description: string;
    type: string;
    createdAt: string;
    data?: any;
  } | null;
}

export function ContentViewModal({ isOpen, onClose, content }: ContentViewModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !content) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getIcon = () => {
    switch (content.type) {
      case "notes":
        return "description";
      case "flashcards":
        return "style";
      case "quiz":
        return "quiz";
      default:
        return "article";
    }
  };

  const getColorClasses = () => {
    switch (content.type) {
      case "notes":
        return {
          header: "bg-blue-50 dark:bg-blue-950/30 border-b border-blue-100 dark:border-blue-900/30",
          icon: "bg-blue-100 dark:bg-blue-900/30 text-blue-600",
        };
      case "flashcards":
        return {
          header: "bg-green-50 dark:bg-green-950/30 border-b border-green-100 dark:border-green-900/30",
          icon: "bg-green-100 dark:bg-green-900/30 text-green-600",
        };
      case "quiz":
        return {
          header: "bg-purple-50 dark:bg-purple-950/30 border-b border-purple-100 dark:border-purple-900/30",
          icon: "bg-purple-100 dark:bg-purple-900/30 text-purple-600",
        };
      default:
        return {
          header: "bg-gray-50 dark:bg-gray-950/30 border-b border-gray-100 dark:border-gray-900/30",
          icon: "bg-gray-100 dark:bg-gray-900/30 text-gray-600",
        };
    }
  };

  const colorClasses = getColorClasses();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-200 dark:border-gray-800">
        {/* Header */}
        <div className={`${colorClasses.header} px-6 py-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`${colorClasses.icon} rounded-lg p-2`}>
                <span className="material-symbols-outlined">{getIcon()}</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{content.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{content.type}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)] p-6">
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
              Description
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{content.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
              Created
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{formatDate(content.createdAt)}</p>
          </div>

          {content.type === "notes" && content.data && (
            <div className="space-y-6">
              {/* Quick Summary */}
              {content.data.quick_summary && (
                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-6 border border-blue-200 dark:border-blue-900/30">
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">Summary</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{content.data.quick_summary}</p>
                </div>
              )}

              {/* Key Findings */}
              {content.data.key_findings && content.data.key_findings.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Findings</h3>
                  <ul className="space-y-2">
                    {content.data.key_findings.map((finding: string, index: number) => (
                      <li key={index} className="flex gap-3">
                        <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                        <span className="text-gray-700 dark:text-gray-300">{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Important Notes */}
              {content.data.important_notes && content.data.important_notes.length > 0 && (
                <div className="bg-yellow-50 dark:bg-yellow-950/30 rounded-lg p-6 border border-yellow-200 dark:border-yellow-900/30">
                  <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-4">Important Notes</h3>
                  <ul className="space-y-2">
                    {content.data.important_notes.map((note: string, index: number) => (
                      <li key={index} className="flex gap-3">
                        <span className="text-yellow-600 dark:text-yellow-400 mt-1">⚠</span>
                        <span className="text-gray-700 dark:text-gray-300">{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {content.type === "flashcards" && content.data?.flashcards && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Flashcards ({content.data.flashcards.length})
              </h3>
              {content.data.flashcards.map((flashcard: any, index: number) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase">
                      Question {index + 1}
                    </span>
                    <p className="text-gray-900 dark:text-white font-medium mt-1">
                      {flashcard.question}
                    </p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Answer</span>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">
                      {flashcard.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {content.type === "quiz" && content.data?.quizzes && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quiz Questions ({content.data.quizzes.length})
              </h3>
              {content.data.quizzes.map((quiz: any, index: number) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-900 dark:text-white font-medium mb-3">
                    {index + 1}. {quiz.question}
                  </p>
                  <div className="space-y-2 mb-3">
                    {quiz.options.map((option: string, optIndex: number) => (
                      <div
                        key={optIndex}
                        className={`flex items-center gap-2 p-2 rounded ${
                          option === quiz.correct_answer
                            ? "bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700"
                            : "bg-white dark:bg-gray-900"
                        }`}
                      >
                        <span className="text-gray-700 dark:text-gray-300">
                          {String.fromCharCode(65 + optIndex)}. {option}
                        </span>
                        {option === quiz.correct_answer && (
                          <span className="ml-auto text-green-600 dark:text-green-400 text-sm font-semibold">✓ Correct</span>
                        )}
                      </div>
                    ))}
                  </div>
                  {quiz.explanation && (
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase">Explanation</span>
                      <p className="text-gray-700 dark:text-gray-300 mt-1 text-sm">
                        {quiz.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-800 px-6 py-4 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="btn-secondary">
              Close
            </button>
            <button className="btn-primary">
              <span className="material-symbols-outlined mr-2 text-sm">edit</span>
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
