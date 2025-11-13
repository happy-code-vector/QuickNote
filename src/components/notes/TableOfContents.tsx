'use client';

import { useEffect, useState } from 'react';

export interface TOCHeading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  activeId?: string;
  onHeadingClick?: (id: string) => void;
  className?: string;
}

export function TableOfContents({ content, activeId, onHeadingClick, className = '' }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCHeading[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Extract headings from markdown content
    const extractedHeadings = extractHeadings(content);
    setHeadings(extractedHeadings);
  }, [content]);

  const handleHeadingClick = (id: string) => {
    if (onHeadingClick) {
      onHeadingClick(id);
    } else {
      // Default smooth scroll behavior
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="md:hidden fixed top-20 left-4 z-40 bg-surface text-text-primary p-2 rounded-lg shadow-lg border border-border"
        aria-label="Toggle table of contents"
      >
        <span className="material-symbols-outlined">
          {isCollapsed ? 'menu' : 'close'}
        </span>
      </button>

      {/* TOC Container */}
      <aside
        className={`
          ${className}
          fixed md:sticky top-20 left-0 h-[calc(100vh-5rem)] 
          w-60 bg-surface border-r border-border overflow-y-auto
          transition-transform duration-300 ease-in-out z-30
          ${isCollapsed ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}
        `}
      >
        <div className="p-4">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-4">
            Table of Contents
          </h2>
          <nav>
            <ul className="space-y-1">
              {headings.map((heading) => (
                <li key={heading.id} style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}>
                  <button
                    onClick={() => handleHeadingClick(heading.id)}
                    className={`
                      w-full text-left text-sm py-1.5 px-2 rounded transition-colors
                      ${
                        activeId === heading.id
                          ? 'text-primary bg-primary/10 font-medium'
                          : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                      }
                    `}
                  >
                    {heading.text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Mobile overlay */}
      {!isCollapsed && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-20"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  );
}

// Helper function to extract headings from markdown content
function extractHeadings(content: string): TOCHeading[] {
  const headings: TOCHeading[] = [];
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = `heading-${index}-${slugify(text)}`;
      
      headings.push({ id, text, level });
    }
  });
  
  return headings;
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
