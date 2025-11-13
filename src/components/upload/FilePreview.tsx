'use client';

import React, { useEffect, useState } from 'react';
import { X, FileText, Image as ImageIcon, FileType } from 'lucide-react';
import { formatFileSize, getFilePreviewUrl } from '@/lib/fileValidation';

export interface UploadFile {
  file: File;
  id: string;
  preview?: string;
  progress?: number;
  status: 'pending' | 'uploading' | 'processing' | 'complete' | 'error';
  error?: string;
}

interface FilePreviewProps {
  uploadFile: UploadFile;
  onRemove: (id: string) => void;
  showProgress?: boolean;
}

export default function FilePreview({ uploadFile, onRemove, showProgress = true }: FilePreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(uploadFile.preview || null);
  const { file, id, progress = 0, status, error } = uploadFile;

  useEffect(() => {
    if (file.type.startsWith('image/') && !previewUrl) {
      getFilePreviewUrl(file).then(setPreviewUrl);
    }
  }, [file, previewUrl]);

  const getStatusColor = () => {
    switch (status) {
      case 'complete':
        return 'border-success bg-success/5';
      case 'error':
        return 'border-error bg-error/5';
      case 'uploading':
      case 'processing':
        return 'border-primary bg-primary/5';
      default:
        return 'border-border bg-surface';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'uploading':
        return 'Uploading...';
      case 'processing':
        return 'Processing...';
      case 'complete':
        return 'Complete';
      case 'error':
        return error || 'Error';
      default:
        return 'Pending';
    }
  };

  const getFileIcon = () => {
    if (file.type === 'application/pdf') return <FileType className="w-8 h-8 text-error" />;
    if (file.type.startsWith('image/')) return <ImageIcon className="w-8 h-8 text-success" />;
    return <FileText className="w-8 h-8 text-primary" />;
  };

  return (
    <div className={`relative border-2 rounded-lg p-4 transition-all ${getStatusColor()}`}>
      {/* Remove button */}
      <button
        onClick={() => onRemove(id)}
        className="absolute top-2 right-2 p-1 rounded-full bg-surface hover:bg-error hover:text-white transition-colors"
        aria-label="Remove file"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-start gap-4">
        {/* Preview or icon */}
        <div className="flex-shrink-0">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt={file.name}
              className="w-16 h-16 object-cover rounded-md"
            />
          ) : (
            <div className="w-16 h-16 flex items-center justify-center bg-surface-hover rounded-md">
              {getFileIcon()}
            </div>
          )}
        </div>

        {/* File info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-text-primary truncate" title={file.name}>
            {file.name}
          </p>
          <p className="text-xs text-text-tertiary mt-1">
            {formatFileSize(file.size)}
          </p>

          {/* Status */}
          <p className={`text-xs mt-2 ${
            status === 'error' ? 'text-error' : 
            status === 'complete' ? 'text-success' : 
            'text-text-secondary'
          }`}>
            {getStatusText()}
          </p>

          {/* Progress bar */}
          {showProgress && (status === 'uploading' || status === 'processing') && (
            <div className="mt-2 w-full bg-border rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
