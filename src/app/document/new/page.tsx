'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { storage } from '@/lib/storage';
import { generateNotes, generateFlashcards, generateQuiz } from '@/lib/gemini';
import { Document } from '@/types';
import { ArrowLeft, FileText, Youtube, Image as ImageIcon, Globe } from 'lucide-react';
import LoadingScreen from '@/components/LoadingScreen';

function NewDocumentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const folderId = searchParams.get('folderId');
  
  const [contentType, setContentType] = useState<'text' | 'youtube' | 'image' | 'website'>('text');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [newDocId, setNewDocId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderId || !title.trim() || !content.trim()) return;

    setLoading(true);
    try {
      const noteResponse = await generateNotes(content);
      const flashcards = await generateFlashcards(content);
      const quizzes = await generateQuiz(content);

      const newDoc: Document = {
        id: Date.now().toString(),
        folderId,
        title: title.trim(),
        contentType,
        contentPath: content,
        note: noteResponse.summary,
        flashcards,
        quizzes,
        chat: '',
        createdAt: new Date().toISOString(),
      };

      storage.saveDocument(newDoc);
      setNewDocId(newDoc.id);
    } catch (error) {
      setLoading(false);
      alert('Failed to generate notes. Please check your API key and try again.');
      console.error(error);
    }
  };

  const handleLoadingComplete = () => {
    if (newDocId) {
      router.push(`/document/${newDocId}`);
    }
  };

  if (!folderId) {
    router.push('/folders');
    return null;
  }

  if (loading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.push(`/documents/${folderId}`)}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">New Document</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={() => setContentType('text')}
                  className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-all ${
                    contentType === 'text' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <FileText className="w-6 h-6" />
                  <span className="text-sm font-medium">Text</span>
                </button>
                <button
                  type="button"
                  onClick={() => setContentType('youtube')}
                  className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-all ${
                    contentType === 'youtube' ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Youtube className="w-6 h-6" />
                  <span className="text-sm font-medium">YouTube</span>
                </button>
                <button
                  type="button"
                  onClick={() => setContentType('image')}
                  className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-all ${
                    contentType === 'image' ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <ImageIcon className="w-6 h-6" />
                  <span className="text-sm font-medium">Image</span>
                </button>
                <button
                  type="button"
                  onClick={() => setContentType('website')}
                  className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-all ${
                    contentType === 'website' ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Globe className="w-6 h-6" />
                  <span className="text-sm font-medium">Website</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Document title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {contentType === 'text' ? 'Content' : 
                 contentType === 'youtube' ? 'YouTube URL' : 
                 contentType === 'website' ? 'Website URL' : 'Image URL'}
              </label>
              <textarea
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={contentType === 'text' ? 10 : 3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={
                  contentType === 'text' 
                    ? 'Enter your text content...' 
                    : contentType === 'youtube'
                    ? 'https://youtube.com/watch?v=...'
                    : contentType === 'website'
                    ? 'https://example.com'
                    : 'https://example.com/image.jpg'
                }
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
            >
              Create Document
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function NewDocument() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <NewDocumentContent />
    </Suspense>
  );
}
