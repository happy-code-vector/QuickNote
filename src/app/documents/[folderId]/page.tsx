'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { storage } from '@/lib/storage';
import { Document, Folder } from '@/types';
import { ArrowLeft, FilePlus, FileText, Trash2 } from 'lucide-react';

function DocumentsContent() {
  const router = useRouter();
  const params = useParams();
  const folderId = params.folderId as string;
  
  const [folder, setFolder] = useState<Folder | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const folders = storage.getFolders();
    const currentFolder = folders.find(f => f.id === folderId);
    if (!currentFolder) {
      router.push('/folders');
      return;
    }
    setFolder(currentFolder);
    setDocuments(storage.getDocuments(folderId));
  }, [folderId, router]);

  const deleteDocument = (id: string) => {
    if (confirm('Delete this document?')) {
      storage.deleteDocument(id);
      setDocuments(storage.getDocuments(folderId));
    }
  };

  if (!folder) return null;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.push('/folders')}
          className="mb-6 flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Folders
        </button>

        <h1 className="text-3xl font-bold mb-8 text-text-primary">{folder.folderName}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div key={doc.id} className="relative group">
              <button
                onClick={() => router.push(`/document/${doc.id}`)}
                className="w-full bg-surface rounded-2xl p-6 border border-border hover:bg-surface-hover transition-all text-left"
              >
                <div className="flex items-start gap-3">
                  <FileText className="w-8 h-8 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-text-primary truncate">{doc.title}</h3>
                    <p className="text-sm text-text-secondary mt-1">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </p>
                    <span className="inline-block mt-2 px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                      {doc.contentType}
                    </span>
                  </div>
                </div>
              </button>
              <button
                onClick={() => deleteDocument(doc.id)}
                className="absolute top-2 right-2 bg-error text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          <button
            onClick={() => router.push(`/document/new?folderId=${folderId}`)}
            className="bg-surface rounded-2xl p-6 border-2 border-dashed border-border hover:bg-surface-hover transition-all flex flex-col items-center justify-center gap-3 min-h-[150px]"
          >
            <FilePlus className="w-12 h-12 text-text-tertiary" />
            <span className="font-semibold text-text-secondary">New Document</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Documents() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-text-secondary">Loading...</p>
        </div>
      </div>
    }>
      <DocumentsContent />
    </Suspense>
  );
}
