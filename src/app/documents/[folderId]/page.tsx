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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.push('/folders')}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Folders
        </button>

        <h1 className="text-3xl font-bold mb-8 text-gray-800">{folder.folderName}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div key={doc.id} className="relative group">
              <button
                onClick={() => router.push(`/document/${doc.id}`)}
                className="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-left"
              >
                <div className="flex items-start gap-3">
                  <FileText className="w-8 h-8 text-blue-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate">{doc.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </p>
                    <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                      {doc.contentType}
                    </span>
                  </div>
                </div>
              </button>
              <button
                onClick={() => deleteDocument(doc.id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          <button
            onClick={() => router.push(`/document/new?folderId=${folderId}`)}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-300 min-h-[150px]"
          >
            <FilePlus className="w-12 h-12 text-gray-400" />
            <span className="font-semibold text-gray-600">New Document</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Documents() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <DocumentsContent />
    </Suspense>
  );
}
