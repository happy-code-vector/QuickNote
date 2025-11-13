import { Profile, Folder, Document } from '@/types';

const STORAGE_KEYS = {
  PROFILES: 'quicknote_profiles',
  FOLDERS: 'quicknote_folders',
  DOCUMENTS: 'quicknote_documents',
  CURRENT_PROFILE: 'quicknote_current_profile',
};

export const storage = {
  // Profiles
  getProfiles: (): Profile[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.PROFILES);
    return data ? JSON.parse(data) : [];
  },
  
  saveProfile: (profile: Profile) => {
    const profiles = storage.getProfiles();
    const index = profiles.findIndex(p => p.id === profile.id);
    if (index >= 0) {
      profiles[index] = profile;
    } else {
      profiles.push(profile);
    }
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));
  },
  
  deleteProfile: (id: string) => {
    const profiles = storage.getProfiles().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));
  },
  
  getCurrentProfile: (): Profile | null => {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_PROFILE);
    return data ? JSON.parse(data) : null;
  },
  
  setCurrentProfile: (profile: Profile | null) => {
    if (profile) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_PROFILE, JSON.stringify(profile));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_PROFILE);
    }
  },
  
  // Folders
  getFolders: (profileId?: string): Folder[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.FOLDERS);
    const folders = data ? JSON.parse(data) : [];
    return profileId ? folders.filter((f: Folder) => f.profileId === profileId) : folders;
  },
  
  saveFolder: (folder: Folder) => {
    const folders = storage.getFolders();
    const index = folders.findIndex(f => f.id === folder.id);
    if (index >= 0) {
      folders[index] = folder;
    } else {
      folders.push(folder);
    }
    localStorage.setItem(STORAGE_KEYS.FOLDERS, JSON.stringify(folders));
  },
  
  deleteFolder: (id: string) => {
    const folders = storage.getFolders().filter(f => f.id !== id);
    localStorage.setItem(STORAGE_KEYS.FOLDERS, JSON.stringify(folders));
    // Delete associated documents
    const documents = storage.getDocuments().filter(d => d.folderId !== id);
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents));
  },
  
  // Documents
  getDocuments: (folderId?: string): Document[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
    const documents = data ? JSON.parse(data) : [];
    return folderId ? documents.filter((d: Document) => d.folderId === folderId) : documents;
  },
  
  getDocument: (id: string): Document | null => {
    const documents = storage.getDocuments();
    return documents.find(d => d.id === id) || null;
  },
  
  saveDocument: (document: Document) => {
    const documents = storage.getDocuments();
    const index = documents.findIndex(d => d.id === document.id);
    if (index >= 0) {
      documents[index] = document;
    } else {
      documents.push(document);
    }
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents));
  },
  
  deleteDocument: (id: string) => {
    const documents = storage.getDocuments().filter(d => d.id !== id);
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents));
  },
};
