'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { searchDocuments, SearchResult } from '@/lib/search';
import { Badge } from '@/components/ui/Badge';

interface SearchBarProps {
  onResultClick?: (result: SearchResult) => void;
}

export function SearchBar({ onResultClick }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Real-time search
  useEffect(() => {
    if (query.trim().length > 0) {
      const searchResults = searchDocuments(query);
      setResults(searchResults);
      setIsOpen(true);
      setSelectedIndex(-1);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handleResultClick(results[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        searchInputRef.current?.blur();
        break;
    }
  };

  const handleResultClick = (result: SearchResult) => {
    setQuery('');
    setIsOpen(false);
    searchInputRef.current?.blur();
    
    if (onResultClick) {
      onResultClick(result);
    } else {
      // Navigate to the document
      router.push(`/document/${result.id}`);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return date.toLocaleDateString();
  };

  const getDocumentTypeLabel = (contentType: string) => {
    switch (contentType) {
      case 'text':
        return 'Notes';
      case 'youtube':
        return 'Video';
      case 'image':
        return 'Image';
      case 'website':
        return 'Web';
      default:
        return 'Document';
    }
  };

  const getDocumentTypeColor = (contentType: string): 'primary' | 'success' | 'warning' | 'error' | 'info' => {
    switch (contentType) {
      case 'text':
        return 'primary';
      case 'youtube':
        return 'error';
      case 'image':
        return 'success';
      case 'website':
        return 'info';
      default:
        return 'primary';
    }
  };

  return (
    <div className="relative flex-1 max-w-2xl">
      <div className="relative">
        <span
          className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-tertiary"
          style={{ fontSize: '20px' }}
        >
          search
        </span>
        <input
          ref={searchInputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setIsOpen(true)}
          placeholder="Search documents... (⌘K)"
          className={`
            w-full h-10 pl-10 pr-4 rounded-lg
            bg-background border border-border
            text-text-primary placeholder:text-text-tertiary
            focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
            transition-all duration-150 ease-in-out
          `}
        />
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-lg shadow-lg overflow-hidden z-50"
        >
          {results.length > 0 ? (
            <div className="max-h-96 overflow-y-auto">
              {results.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className={`
                    w-full px-4 py-3 text-left hover:bg-surface-hover transition-colors
                    border-b border-border last:border-b-0
                    ${selectedIndex === index ? 'bg-surface-hover' : ''}
                  `}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="material-symbols-outlined text-text-secondary mt-0.5 flex-shrink-0"
                      style={{ fontSize: '20px' }}
                    >
                      {result.contentType === 'youtube' ? 'play_circle' : 
                       result.contentType === 'image' ? 'image' :
                       result.contentType === 'website' ? 'language' : 'description'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-text-primary truncate">
                          {result.title}
                        </h4>
                        <Badge
                          variant={getDocumentTypeColor(result.contentType)}
                          size="sm"
                        >
                          {getDocumentTypeLabel(result.contentType)}
                        </Badge>
                      </div>
                      {result.snippet && (
                        <p className="text-sm text-text-secondary line-clamp-2 mb-1">
                          {result.snippet}
                        </p>
                      )}
                      <p className="text-xs text-text-tertiary">
                        {formatDate(result.createdAt)}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-8 text-center">
              <span
                className="material-symbols-outlined text-text-tertiary mb-2"
                style={{ fontSize: '48px' }}
              >
                search_off
              </span>
              <p className="text-sm text-text-secondary">No results found</p>
              <p className="text-xs text-text-tertiary mt-1">
                Try different keywords or check your spelling
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
