'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { storage } from '@/lib/storage';
import { generateNotes, generateFlashcards, generateQuiz } from '@/lib/gemini';
import { Document } from '@/types';
import { FileText, Youtube, Image as ImageIcon, Globe, CheckCircle } from 'lucide-react';
import LoadingScreen from '@/components/LoadingScreen';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button, Input } from '@/components/ui';
import DropZone from '@/components/upload/DropZone';
import FileList from '@/components/upload/FileList';
import ErrorMessage from '@/components/upload/ErrorMessage';
import { useFileUpload } from '@/hooks/useFileUpload';

type ContentType = 'file' | 'text' | 'youtube' | 'website';

function NewDocumentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const folderId = searchParams.get('folderId');
  
  const [contentType, setContentType] = useState<ContentType>('file');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [newDocId, setNewDocId] = useState<string | null>(null);
  const [uploadComplete, setUploadComplete] = useState(false);

  const {
    uploadFiles,
    errors,
    addFiles,
    removeFile,
    clearErrors,
    processAllFiles,
  } = useFileUpload({
    onUploadComplete: (files) => {
      setUploadComplete(true);
    },
    onUploadError: (errors) => {
      console.error('Upload errors:', errors);
    },
  });

  const handleFilesSelected = (files: File[]) => {
    addFiles(files);
  };

  const handleProcessFiles = async () => {
    if (uploadFiles.length === 0) return;
    
    await processAllFiles();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderId) return;

    // For file uploads, process files first
    if (contentType === 'file') {
      if (uploadFiles.length === 0) {
        alert('Please select at least one file to upload');
        return;
      }
      
      if (!uploadComplete) {
        await handleProcessFiles();
        return;
      }

      // Use first file's name as title if not provided
      const docTitle = title.trim() || uploadFiles[0].file.name;
      
      setLoading(true);
      try {
        // For demo, use file name as content
        const fileContent = `Uploaded file: ${uploadFiles[0].file.name}`;
        
        const noteResponse = await generateNotes(fileContent);
        const flashcards = await generateFlashcards(fileContent);
        const quizzes = await generateQuiz(fileContent);

        const newDoc: Document = {
          id: Date.now().toString(),
          folderId,
          title: docTitle,
          contentType: 'text',
          contentPath: fileContent,
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
        console.error('Error generating notes:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        alert(`Failed to generate notes: ${errorMessage}`);
      }
    } else {
      // Handle text/URL content types
      if (!title.trim() || !content.trim()) return;

      setLoading(true);
      try {
        const noteResponse = await generateNotes(content);
        const flashcards = await generateFlashcards(content);
        const quizzes = await generateQuiz(content);

        const newDoc: Document = {
          id: Date.now().toString(),
          folderId,
          title: title.trim(),
          contentType: contentType === 'text' ? 'text' : contentType,
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
        console.error('Error generating notes:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        alert(`Failed to generate notes: ${errorMessage}`);
      }
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

  const contentTypes = [
    { id: 'file' as ContentType, label: 'Upload Files', icon: FileText },
    { id: 'text' as ContentType, label: 'Text', icon: FileText },
    { id: 'youtube' as ContentType, label: 'YouTube', icon: Youtube },
    { id: 'website' as ContentType, label: 'Website', icon: Globe },
  ];

  return (
    <DashboardLayout
      title="Upload Content"
      showSearch={false}
      showNotifications={false}
    >
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Content Type Selection */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-3">
              Content Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {contentTypes.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setContentType(id);
                    setUploadComplete(false);
                  }}
                  className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-all ${
                    contentType === id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50 bg-surface'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* File Upload Section */}
          {contentType === 'file' && (
            <div className="space-y-4">
              <DropZone
                onFilesSelected={handleFilesSelected}
                multiple={true}
                disabled={uploadComplete}
              />

              {errors.length > 0 && (
                <ErrorMessage
                  errors={errors}
                  onClear={clearErrors}
                />
              )}

              {uploadFiles.length > 0 && (
                <FileList
                  files={uploadFiles}
                  onRemove={removeFile}
                  showProgress={true}
                />
              )}

              {uploadComplete && (
                <div className="bg-success/10 border-2 border-success rounded-lg p-4 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-success">Upload Complete!</p>
                    <p className="text-xs text-text-secondary mt-1">
                      Ready to generate study materials
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Text/URL Input Section */}
          {contentType !== 'file' && (
            <>
              <Input
                label="Title"
                type="text"
                required
                value={title}
                onChange={(value) => setTitle(value)}
                placeholder="Document title"
              />

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  {contentType === 'text' ? 'Content' : 
                   contentType === 'youtube' ? 'YouTube URL' : 
                   'Website URL'}
                </label>
                <textarea
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={contentType === 'text' ? 10 : 3}
                  className="w-full px-4 py-3 border-2 border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-surface text-text-primary transition-all"
                  placeholder={
                    contentType === 'text' 
                      ? 'Enter your text content...' 
                      : contentType === 'youtube'
                      ? 'https://youtube.com/watch?v=...'
                      : 'https://example.com'
                  }
                />
              </div>
            </>
          )}

          {/* Optional Title for File Uploads */}
          {contentType === 'file' && uploadFiles.length > 0 && (
            <Input
              label="Title (Optional)"
              type="text"
              value={title}
              onChange={(value) => setTitle(value)}
              placeholder="Leave blank to use file name"
              helperText="If not provided, the file name will be used"
            />
          )}

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/documents/${folderId}`)}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={
                contentType === 'file' 
                  ? uploadFiles.length === 0 
                  : !title.trim() || !content.trim()
              }
            >
              {contentType === 'file' && !uploadComplete
                ? 'Process Files'
                : 'Generate Study Materials'}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default function NewDocument() {
  return (
    <Suspense fallback={
      <DashboardLayout loading={true}>
        <div />
      </DashboardLayout>
    }>
      <NewDocumentContent />
    </Suspense>
  );
}
