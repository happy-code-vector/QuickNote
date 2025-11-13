'use client';

import React, { useState, useRef, DragEvent } from 'react';
import { Upload } from 'lucide-react';

interface DropZoneProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
}

export default function DropZone({
  onFilesSelected,
  accept = '.pdf,.txt,.docx,image/*',
  multiple = true,
  disabled = false,
}: DropZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragActive(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFilesSelected(files);
    }
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFilesSelected(files);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`
        relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
        transition-all duration-200 ease-in-out
        ${isDragActive 
          ? 'border-primary bg-primary/10 scale-[1.02]' 
          : 'border-border bg-surface hover:border-primary/50 hover:bg-surface-hover'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileInputChange}
        disabled={disabled}
        className="hidden"
        aria-label="File upload input"
      />

      <div className="flex flex-col items-center gap-4">
        <div className={`
          p-4 rounded-full transition-colors
          ${isDragActive ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}
        `}>
          <Upload className="w-8 h-8" />
        </div>

        <div>
          <p className="text-lg font-semibold text-text-primary mb-2">
            {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
          </p>
          <p className="text-sm text-text-secondary">
            or click to browse
          </p>
        </div>

        <p className="text-xs text-text-tertiary mt-2">
          Supported: PDF, TXT, DOCX, Images, URLs
        </p>
      </div>
    </div>
  );
}
