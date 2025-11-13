'use client';

import { useMemo } from 'react';
import { TableOfContents, TOCHeading } from './TableOfContents';
import { DocumentContent } from './DocumentContent';
import { DocumentActions } from './DocumentActions';
import { useActiveHeading } from '@/hooks/useActiveHeading';

interface NotesViewerProps {
  title: string;
  content: string;
  onBack?: () => void;
}

export function NotesViewer({ title, content, onBack }: NotesViewerProps) {
  // Extract heading IDs for active section tracking
  const headingIds = useMemo(() => {
    const headings: TOCHeading[] = [];
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      const match = line.match(/^(#{1,6})\s+(.+)$/);
      if (match) {
        const text = match[2].trim();
        const id = `heading-${slugify(text)}`;
        headings.push({ id, text, level: match[1].length });
      }
    });
    
    return headings.map(h => h.id);
  }, [content]);

  const activeId = useActiveHeading(headingIds);

  return (
    <div className="min-h-screen bg-background">
      <DocumentActions title={title} content={content} onBack={onBack} />
      
      <div className="flex max-w-7xl mx-auto">
        {/* Table of Contents */}
        <TableOfContents content={content} activeId={activeId} />
        
        {/* Main Content */}
        <main className="flex-1 px-6 py-8 md:pl-64">
          <div className="max-w-3xl mx-auto">
            <DocumentContent content={content} />
          </div>
        </main>
      </div>
    </div>
  );
}

// Helper function to create URL-friendly slugs
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
