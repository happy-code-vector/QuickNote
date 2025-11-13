import { Document } from '@/types';
import { storage } from './storage';

export interface SearchResult {
  id: string;
  title: string;
  contentType: string;
  snippet: string;
  createdAt: string;
  relevanceScore: number;
}

/**
 * Calculate relevance score for a document based on search query
 * Higher score = more relevant
 */
function calculateRelevance(document: Document, query: string): number {
  const lowerQuery = query.toLowerCase();
  const queryTerms = lowerQuery.split(/\s+/).filter(term => term.length > 0);
  
  let score = 0;
  
  // Title matches (highest weight)
  const titleLower = document.title.toLowerCase();
  queryTerms.forEach(term => {
    if (titleLower === term) {
      score += 100; // Exact title match
    } else if (titleLower.includes(term)) {
      score += 50; // Partial title match
    }
  });
  
  // Content matches (medium weight)
  const contentLower = document.note.toLowerCase();
  queryTerms.forEach(term => {
    const regex = new RegExp(term, 'gi');
    const matches = contentLower.match(regex);
    if (matches) {
      score += matches.length * 5; // Each occurrence adds to score
    }
  });
  
  // Flashcard matches (medium weight)
  document.flashcards.forEach(card => {
    const questionLower = card.question.toLowerCase();
    const answerLower = card.answer.toLowerCase();
    queryTerms.forEach(term => {
      if (questionLower.includes(term)) score += 3;
      if (answerLower.includes(term)) score += 3;
    });
  });
  
  // Quiz matches (low weight)
  document.quizzes.forEach(quiz => {
    const questionLower = quiz.question.toLowerCase();
    queryTerms.forEach(term => {
      if (questionLower.includes(term)) score += 2;
    });
  });
  
  return score;
}

/**
 * Extract a relevant snippet from the document content
 */
function extractSnippet(content: string, query: string, maxLength: number = 150): string {
  const lowerContent = content.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const queryTerms = lowerQuery.split(/\s+/).filter(term => term.length > 0);
  
  // Find the first occurrence of any query term
  let bestIndex = -1;
  let bestTerm = '';
  
  for (const term of queryTerms) {
    const index = lowerContent.indexOf(term);
    if (index !== -1 && (bestIndex === -1 || index < bestIndex)) {
      bestIndex = index;
      bestTerm = term;
    }
  }
  
  if (bestIndex === -1) {
    // No match found, return beginning of content
    return content.substring(0, maxLength).trim() + (content.length > maxLength ? '...' : '');
  }
  
  // Extract snippet around the match
  const start = Math.max(0, bestIndex - 50);
  const end = Math.min(content.length, bestIndex + bestTerm.length + 100);
  
  let snippet = content.substring(start, end).trim();
  
  // Add ellipsis if needed
  if (start > 0) snippet = '...' + snippet;
  if (end < content.length) snippet = snippet + '...';
  
  // Limit to maxLength
  if (snippet.length > maxLength) {
    snippet = snippet.substring(0, maxLength) + '...';
  }
  
  return snippet;
}

/**
 * Search across all documents
 * Returns results sorted by relevance, with date as tiebreaker
 */
export function searchDocuments(query: string): SearchResult[] {
  if (!query || query.trim().length === 0) {
    return [];
  }
  
  const documents = storage.getDocuments();
  const results: SearchResult[] = [];
  
  documents.forEach(doc => {
    const relevanceScore = calculateRelevance(doc, query);
    
    // Only include documents with a relevance score > 0
    if (relevanceScore > 0) {
      results.push({
        id: doc.id,
        title: doc.title,
        contentType: doc.contentType,
        snippet: extractSnippet(doc.note, query),
        createdAt: doc.createdAt,
        relevanceScore,
      });
    }
  });
  
  // Sort by relevance score (descending), then by date (most recent first)
  results.sort((a, b) => {
    if (a.relevanceScore !== b.relevanceScore) {
      return b.relevanceScore - a.relevanceScore;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  
  return results;
}

/**
 * Get recent searches from localStorage
 */
export function getRecentSearches(): string[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('quicknote_recent_searches');
  return data ? JSON.parse(data) : [];
}

/**
 * Save a search query to recent searches
 */
export function saveRecentSearch(query: string) {
  if (!query || query.trim().length === 0) return;
  
  const recent = getRecentSearches();
  const filtered = recent.filter(q => q !== query);
  filtered.unshift(query);
  
  // Keep only the last 10 searches
  const limited = filtered.slice(0, 10);
  
  localStorage.setItem('quicknote_recent_searches', JSON.stringify(limited));
}

/**
 * Clear recent searches
 */
export function clearRecentSearches() {
  localStorage.removeItem('quicknote_recent_searches');
}
