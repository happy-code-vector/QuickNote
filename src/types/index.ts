export interface Profile {
  id: string;
  name: string;
  avatar: string;
  avatarBg: string;
  age: number;
  educationStatus: string;
  favouriteTopic: string;
  profileType: 'adult' | 'child';
}

export interface Folder {
  id: string;
  profileId: string;
  folderName: string;
  createdAt: string;
  folderImage?: string;
}

export interface QuizItem {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface NoteResponse {
  summary: string;
  keyPoints: string[];
}

export interface Document {
  id: string;
  folderId: string;
  title: string;
  contentType: 'text' | 'youtube' | 'image' | 'website';
  contentPath: string;
  note: string;
  flashcards: Array<{ question: string; answer: string }>;
  quizzes: QuizItem[];
  chat: string;
  createdAt: string;
}
