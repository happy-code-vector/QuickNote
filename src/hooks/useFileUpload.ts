'use client';

import { useState, useCallback } from 'react';
import { validateFiles } from '@/lib/fileValidation';
import { UploadFile } from '@/components/upload/FilePreview';

export interface UseFileUploadOptions {
  onUploadComplete?: (files: UploadFile[]) => void;
  onUploadError?: (errors: string[]) => void;
  autoProcess?: boolean;
}

export function useFileUpload(options: UseFileUploadOptions = {}) {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const addFiles = useCallback((files: File[]) => {
    const { validFiles, errors: validationErrors } = validateFiles(files);

    if (validationErrors.length > 0) {
      setErrors((prev) => [...prev, ...validationErrors]);
      options.onUploadError?.(validationErrors);
    }

    if (validFiles.length > 0) {
      const newUploadFiles: UploadFile[] = validFiles.map((file) => ({
        file,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        status: 'pending' as const,
        progress: 0,
      }));

      setUploadFiles((prev) => [...prev, ...newUploadFiles]);

      if (options.autoProcess) {
        // Auto-process files if enabled
        newUploadFiles.forEach((uploadFile) => {
          processFile(uploadFile.id);
        });
      }
    }
  }, [options]);

  const removeFile = useCallback((id: string) => {
    setUploadFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const clearFiles = useCallback(() => {
    setUploadFiles([]);
    setErrors([]);
  }, []);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const updateFileStatus = useCallback((
    id: string,
    updates: Partial<Pick<UploadFile, 'status' | 'progress' | 'error'>>
  ) => {
    setUploadFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
  }, []);

  const processFile = useCallback(async (id: string) => {
    const uploadFile = uploadFiles.find((f) => f.id === id);
    if (!uploadFile) return;

    try {
      // Simulate upload progress
      updateFileStatus(id, { status: 'uploading', progress: 0 });

      // Simulate upload with progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        updateFileStatus(id, { progress });
      }

      // Simulate processing
      updateFileStatus(id, { status: 'processing', progress: 100 });
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mark as complete
      updateFileStatus(id, { status: 'complete', progress: 100 });
    } catch (error) {
      updateFileStatus(id, {
        status: 'error',
        error: error instanceof Error ? error.message : 'Upload failed',
      });
    }
  }, [uploadFiles, updateFileStatus]);

  const processAllFiles = useCallback(async () => {
    const pendingFiles = uploadFiles.filter((f) => f.status === 'pending');
    
    for (const uploadFile of pendingFiles) {
      await processFile(uploadFile.id);
    }

    const completedFiles = uploadFiles.filter((f) => f.status === 'complete');
    if (completedFiles.length > 0) {
      options.onUploadComplete?.(completedFiles);
    }
  }, [uploadFiles, processFile, options]);

  const retryFile = useCallback((id: string) => {
    updateFileStatus(id, { status: 'pending', progress: 0, error: undefined });
    processFile(id);
  }, [updateFileStatus, processFile]);

  return {
    uploadFiles,
    errors,
    addFiles,
    removeFile,
    clearFiles,
    clearErrors,
    processFile,
    processAllFiles,
    retryFile,
    updateFileStatus,
  };
}
