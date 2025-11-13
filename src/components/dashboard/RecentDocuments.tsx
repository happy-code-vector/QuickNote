import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, Badge } from '@/components/ui';
import { Document } from '@/types';
import { FileText, CreditCard, ClipboardList, Clock } from 'lucide-react';

export interface RecentDocumentsProps {
  documents: Document[];
}

const getDocumentTypeInfo = (contentType: string) => {
  switch (contentType) {
    case 'text':
      return {
        label: 'Notes',
        variant: 'primary' as const,
        icon: <FileText className="w-5 h-5" />,
      };
    case 'youtube':
    case 'website':
    case 'image':
      return {
        label: 'Notes',
        variant: 'info' as const,
        icon: <FileText className="w-5 h-5" />,
      };
    default:
      return {
        label: 'Document',
        variant: 'primary' as const,
        icon: <FileText className="w-5 h-5" />,
      };
  }
};

const getDocumentIcon = (doc: Document) => {
  if (doc.flashcards && doc.flashcards.length > 0) {
    return <CreditCard className="w-5 h-5 text-purple-500" />;
  }
  if (doc.quizzes && doc.quizzes.length > 0) {
    return <ClipboardList className="w-5 h-5 text-green-500" />;
  }
  return <FileText className="w-5 h-5 text-blue-500" />;
};

const getDocumentType = (doc: Document) => {
  if (doc.flashcards && doc.flashcards.length > 0) {
    return { label: 'Flashcards', variant: 'info' as const };
  }
  if (doc.quizzes && doc.quizzes.length > 0) {
    return { label: 'Quiz', variant: 'success' as const };
  }
  return { label: 'Notes', variant: 'primary' as const };
};

const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) {
    return `${diffMins}m ago`;
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else {
    return date.toLocaleDateString();
  }
};

export const RecentDocuments: React.FC<RecentDocumentsProps> = ({ documents }) => {
  const router = useRouter();

  if (documents.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-surface-hover mb-4">
          <FileText className="w-10 h-10 text-text-tertiary" />
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          No documents yet
        </h3>
        <p className="text-text-secondary mb-6">
          Get started by creating your first note, flashcards, or quiz
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map((doc) => {
        const typeInfo = getDocumentType(doc);
        return (
          <Card
            key={doc.id}
            variant="outlined"
            padding="none"
            hoverable
            clickable
            onClick={() => router.push(`/document/${doc.id}`)}
            className="overflow-hidden"
          >
            {/* Thumbnail */}
            <div className="h-32 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
              {getDocumentIcon(doc)}
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-text-primary line-clamp-2 flex-1">
                  {doc.title}
                </h3>
                <Badge variant={typeInfo.variant} size="sm">
                  {typeInfo.label}
                </Badge>
              </div>

              <div className="flex items-center gap-1 text-sm text-text-tertiary">
                <Clock className="w-4 h-4" />
                <span>{formatRelativeTime(doc.createdAt)}</span>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
