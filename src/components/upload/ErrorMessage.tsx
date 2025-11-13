'use client';

import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui';

interface ErrorMessageProps {
  errors: string[];
  onClear?: () => void;
  onRetry?: () => void;
}

export default function ErrorMessage({ errors, onClear, onRetry }: ErrorMessageProps) {
  if (errors.length === 0) {
    return null;
  }

  return (
    <div className="bg-error/10 border-2 border-error rounded-lg p-4">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
        
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-error mb-2">
            {errors.length === 1 ? 'Upload Error' : `${errors.length} Upload Errors`}
          </h4>
          
          <ul className="space-y-1">
            {errors.map((error, index) => (
              <li key={index} className="text-sm text-text-primary">
                {error}
              </li>
            ))}
          </ul>

          {onRetry && (
            <div className="mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
              >
                Retry Upload
              </Button>
            </div>
          )}
        </div>

        {onClear && (
          <button
            onClick={onClear}
            className="p-1 rounded-full hover:bg-error/20 transition-colors flex-shrink-0"
            aria-label="Clear errors"
          >
            <X className="w-4 h-4 text-error" />
          </button>
        )}
      </div>
    </div>
  );
}
