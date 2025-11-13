'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DashboardLayout } from '@/components/layout';
import { searchDocuments, SearchResult } from '@/lib/search';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { storage } from '@/lib/storage';

function SearchResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState<SearchResult[]>([]);
  const [currentProfile, setCurrentProfile] = useState<any>(null);

  useEffect(() => {
    const profile = storage.getCurrentProfile();
    setCurrentProfile(profile);
  }, []);

  useEffect(() => {
    if (query) {
      const searchResults = searchDocuments(query);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);

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

  const handleResultClick = (result: SearchResult) => {
    router.push(`/document/${result.id}`);
  };

  return (
    <DashboardLayout currentProfile={currentProfile}>
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Search Results
          </h1>
          {query && (
            <p className="text-text-secondary">
              Found {results.length} result{results.length !== 1 ? 's' : ''} for &quot;{query}&quot;
            </p>
          )}
        </div>

        {/* Results */}
        {query ? (
          results.length > 0 ? (
            <div className="space-y-4">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="w-full p-6 bg-surface border border-border rounded-lg hover:bg-surface-hover hover:border-primary/30 transition-all duration-150 text-left"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="material-symbols-outlined text-text-secondary mt-1 flex-shrink-0"
                      style={{ fontSize: '24px' }}
                    >
                      {result.contentType === 'youtube' ? 'play_circle' : 
                       result.contentType === 'image' ? 'image' :
                       result.contentType === 'website' ? 'language' : 'description'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-text-primary">
                          {result.title}
                        </h3>
                        <Badge
                          variant={getDocumentTypeColor(result.contentType)}
                          size="sm"
                        >
                          {getDocumentTypeLabel(result.contentType)}
                        </Badge>
                      </div>
                      {result.snippet && (
                        <p className="text-text-secondary mb-2 line-clamp-3">
                          {result.snippet}
                        </p>
                      )}
                      <p className="text-sm text-text-tertiary">
                        {formatDate(result.createdAt)}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <span
                className="material-symbols-outlined text-text-tertiary mb-4"
                style={{ fontSize: '64px' }}
              >
                search_off
              </span>
              <h2 className="text-xl font-semibold text-text-primary mb-2">
                No results found
              </h2>
              <p className="text-text-secondary mb-6">
                Try different keywords or check your spelling
              </p>
              <Button
                variant="primary"
                onClick={() => router.push('/dashboard')}
              >
                Back to Dashboard
              </Button>
            </div>
          )
        ) : (
          <div className="text-center py-16">
            <span
              className="material-symbols-outlined text-text-tertiary mb-4"
              style={{ fontSize: '64px' }}
            >
              search
            </span>
            <h2 className="text-xl font-semibold text-text-primary mb-2">
              Start searching
            </h2>
            <p className="text-text-secondary">
              Use the search bar above to find your documents
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <DashboardLayout currentProfile={null}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    }>
      <SearchResultsContent />
    </Suspense>
  );
}
