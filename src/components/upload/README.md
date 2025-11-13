# Upload Components

This directory contains components for the enhanced file upload interface.

## Components

### DropZone
A drag-and-drop file upload zone with click-to-browse functionality.

**Features:**
- Drag and drop file support
- Visual feedback on dragover
- Click to browse files
- Support for multiple files
- Customizable accepted file types
- Disabled state support

**Usage:**
```tsx
<DropZone
  onFilesSelected={(files) => console.log(files)}
  accept=".pdf,.txt,.docx,image/*"
  multiple={true}
/>
```

### FilePreview
Displays a preview of an uploaded file with status and progress.

**Features:**
- Image preview for image files
- File type icons for other files
- Upload progress bar
- Status indicators (pending, uploading, processing, complete, error)
- Remove button
- File size display

**Usage:**
```tsx
<FilePreview
  uploadFile={uploadFile}
  onRemove={(id) => console.log('Remove', id)}
  showProgress={true}
/>
```

### FileList
Displays a list of uploaded files using FilePreview components.

**Features:**
- Displays multiple files
- Shows file count
- Passes through remove handler
- Optional progress display

**Usage:**
```tsx
<FileList
  files={uploadFiles}
  onRemove={(id) => removeFile(id)}
  showProgress={true}
/>
```

### ErrorMessage
Displays upload errors with retry functionality.

**Features:**
- Lists multiple errors
- Clear button
- Optional retry button
- Error icon and styling

**Usage:**
```tsx
<ErrorMessage
  errors={['File too large', 'Unsupported type']}
  onClear={() => clearErrors()}
  onRetry={() => retryUpload()}
/>
```

## Hooks

### useFileUpload
Custom hook for managing file upload state and operations.

**Features:**
- File validation
- Batch upload support
- Progress tracking
- Error handling
- File status management
- Retry functionality

**Usage:**
```tsx
const {
  uploadFiles,
  errors,
  addFiles,
  removeFile,
  clearFiles,
  clearErrors,
  processFile,
  processAllFiles,
  retryFile,
} = useFileUpload({
  onUploadComplete: (files) => console.log('Complete', files),
  onUploadError: (errors) => console.log('Errors', errors),
  autoProcess: false,
});
```

## Utilities

### fileValidation.ts
Utility functions for file validation and formatting.

**Functions:**
- `validateFile(file)` - Validates a single file
- `validateFiles(files)` - Validates multiple files
- `getFilePreviewUrl(file)` - Gets preview URL for images
- `formatFileSize(bytes)` - Formats file size for display
- `getFileIcon(file)` - Returns appropriate icon for file type

## Supported File Types

- **Documents:** PDF, TXT, DOCX, DOC
- **Images:** JPG, JPEG, PNG, GIF, WEBP
- **Max Size:** 50MB per file

## Requirements Implemented

This implementation satisfies the following requirements from the design document:

- **8.1:** Drag-and-drop zone with visual indicators
- **8.2:** Dragover highlight effect
- **8.3:** File type validation (PDF, TXT, DOCX, images)
- **8.4:** Preview of uploaded content
- **8.5:** Batch upload support with multiple file selection
- **8.6:** Individual progress bars for each file
- **8.7:** Navigation to content generation on success
- **8.8:** Clear error messages with retry option
