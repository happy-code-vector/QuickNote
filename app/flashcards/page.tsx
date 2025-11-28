"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ContentViewModal } from "../components/ContentViewModal";
import { ConfirmModal } from "../components/ConfirmModal";
import { Tooltip } from "../components/Tooltip";

interface ContentItem {
  id: number;
  title: string;
  description: string;
  type: string;
  createdAt: string;
  data?: any;
}

export default function FlashcardsPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [flashcards, setFlashcards] = useState<ContentItem[]>([]);
  const [selectedFlashcard, setSelectedFlashcard] = useState<ContentItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = (itemId: number) => {
    setDeleteItemId(itemId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteItemId === null) return;

    const updatedFlashcards = flashcards.filter((flashcard) => flashcard.id !== deleteItemId);
    setFlashcards(updatedFlashcards);

    if (profile && typeof window !== "undefined") {
      const storedContent = localStorage.getItem(`content_${profile.id}`);
      if (storedContent) {
        const allContent = JSON.parse(storedContent);
        const updatedContent = allContent.filter((item: ContentItem) => item.id !== deleteItemId);
        localStorage.setItem(`content_${profile.id}`, JSON.stringify(updatedContent));
      }
    }
    setDeleteItemId(null);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentProfile = localStorage.getItem("currentProfile");
      if (!currentProfile) {
        router.push("/profile-selection");
        return;
      }
      const profileData = JSON.parse(currentProfile);
      setProfile(profileData);

      // Load content and filter for flashcards
      const storedContent = localStorage.getItem(`content_${profileData.id}`);
      if (storedContent) {
        const allContent = JSON.parse(storedContent);
        const flashcardsOnly = allContent.filter((item: ContentItem) => item.type === "flashcards");
        setFlashcards(flashcardsOnly);
      }
    }
  }, [router]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">All Flashcards</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{flashcards.length} flashcard set{flashcards.length !== 1 ? 's' : ''} available</p>
          </div>
          <Link href="/dashboard" className="btn-secondary">
            <span className="material-symbols-outlined mr-2">arrow_back</span>
            Back to Dashboard
          </Link>
        </div>

        {flashcards.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-xl p-12 text-center border border-gray-200 dark:border-gray-800">
            <span className="material-symbols-outlined text-6xl text-gray-400 dark:text-gray-600 mb-4">style</span>
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">No Flashcards Yet</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Start creating flashcards from your study materials</p>
            <Link href="/dashboard" className="btn-primary">Create Your First Flashcard Set</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashcards.map((flashcard) => (
              <div key={flashcard.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-green-100 dark:bg-green-900/30 text-green-600 rounded-md p-1.5">
                      <span className="material-symbols-outlined">style</span>
                    </div>
                    <Tooltip content={flashcard.title} className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold truncate text-gray-900 dark:text-white">{flashcard.title}</h3>
                    </Tooltip>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{flashcard.description}</p>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-800 px-5 py-3 flex justify-between items-center">
                  <span className="text-xs text-gray-600 dark:text-gray-400">{formatDate(flashcard.createdAt)}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedFlashcard(flashcard);
                        setIsModalOpen(true);
                      }}
                      className="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 p-1 rounded"
                    >
                      <span className="material-symbols-outlined text-lg">visibility</span>
                    </button>
                    <button
                      onClick={() => handleDeleteClick(flashcard.id)}
                      className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 rounded"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ContentViewModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedFlashcard(null);
        }}
        content={selectedFlashcard}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeleteItemId(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Flashcard Set"
        message="Are you sure you want to delete this flashcard set? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}
