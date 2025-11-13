'use client';

import React from 'react';
import FilePreview, { UploadFile } from './FilePreview';

interface FileListProps {
  files: UploadFile[];
  onRemove: (id: string) => void;
  showProgress?: boolean;
}

export default function FileList({ files, onRemove, showProgress = true }: FileListProps) {
  if (files.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-text-primary">
        Selected Files ({files.length})
      </h3>
      <div className="space-y-2">
        {files.map((uploadFile) => (
          <FilePreview
            key={uploadFile.id}
            uploadFile={uploadFile}
            onRemove={onRemove}
            showProgress={showProgress}
          />
        ))}
      </div>
    </div>
  );
}
