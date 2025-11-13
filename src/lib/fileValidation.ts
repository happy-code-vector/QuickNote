export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

export const SUPPORTED_FILE_TYPES = {
  'application/pdf': ['.pdf'],
  'text/plain': ['.txt'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/msword': ['.doc'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/gif': ['.gif'],
  'image/webp': ['.webp'],
};

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export function validateFile(file: File): FileValidationResult {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds 50MB limit (${(file.size / 1024 / 1024).toFixed(2)}MB)`,
    };
  }

  // Check file type
  const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
  const isSupported = Object.entries(SUPPORTED_FILE_TYPES).some(
    ([mimeType, extensions]) => {
      return file.type === mimeType || extensions.includes(fileExtension);
    }
  );

  if (!isSupported) {
    return {
      valid: false,
      error: `Unsupported file type: ${file.type || fileExtension}. Supported types: PDF, TXT, DOCX, Images (JPG, PNG, GIF, WEBP)`,
    };
  }

  return { valid: true };
}

export function validateFiles(files: File[]): { validFiles: File[]; errors: string[] } {
  const validFiles: File[] = [];
  const errors: string[] = [];

  files.forEach((file) => {
    const result = validateFile(file);
    if (result.valid) {
      validFiles.push(file);
    } else {
      errors.push(`${file.name}: ${result.error}`);
    }
  });

  return { validFiles, errors };
}

export function getFilePreviewUrl(file: File): Promise<string | null> {
  return new Promise((resolve) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    } else {
      resolve(null);
    }
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

export function getFileIcon(file: File): string {
  if (file.type === 'application/pdf') return 'picture_as_pdf';
  if (file.type.startsWith('image/')) return 'image';
  if (file.type.includes('word') || file.name.endsWith('.docx') || file.name.endsWith('.doc')) return 'description';
  if (file.type === 'text/plain') return 'article';
  return 'insert_drive_file';
}
