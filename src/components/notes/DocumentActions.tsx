'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface DocumentActionsProps {
  title: string;
  content: string;
  onBack?: () => void;
}

export function DocumentActions({ title, content, onBack }: DocumentActionsProps) {
  const [showCopied, setShowCopied] = useState(false);

  const handleExportPDF = () => {
    // Trigger browser print dialog with print-friendly styles
    window.print();
  };

  const handleExportMarkdown = () => {
    // Create a blob with the markdown content
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    // Copy the current URL to clipboard
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="sticky top-0 z-10 bg-surface border-b border-border shadow-sm print:hidden">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {onBack && (
              <Button
                variant="ghost"
                size="md"
                icon="arrow_back"
                onClick={onBack}
                className="flex-shrink-0"
                aria-label="Go back"
              />
            )}
            <h1 className="text-2xl font-bold text-text-primary truncate">
              {title}
            </h1>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Export dropdown */}
            <div className="relative group">
              <Button
                variant="secondary"
                size="md"
                icon="download"
                iconPosition="left"
              >
                Export
              </Button>
              
              {/* Dropdown menu */}
              <div className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <button
                  onClick={handleExportPDF}
                  className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-surface-hover flex items-center gap-2 rounded-t-lg"
                >
                  <span className="material-symbols-outlined text-base">picture_as_pdf</span>
                  Export as PDF
                </button>
                <button
                  onClick={handleExportMarkdown}
                  className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-surface-hover flex items-center gap-2 rounded-b-lg"
                >
                  <span className="material-symbols-outlined text-base">description</span>
                  Export as Markdown
                </button>
              </div>
            </div>

            {/* Share button */}
            <div className="relative">
              <Button
                variant="secondary"
                size="md"
                icon="share"
                onClick={handleShare}
                aria-label="Share document"
              />
              
              {/* Copied tooltip */}
              {showCopied && (
                <div className="absolute top-full right-0 mt-2 px-3 py-1 bg-success text-white text-sm rounded shadow-lg whitespace-nowrap">
                  Link copied!
                </div>
              )}
            </div>

            {/* Print button */}
            <Button
              variant="secondary"
              size="md"
              icon="print"
              onClick={handlePrint}
              aria-label="Print document"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
