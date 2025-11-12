'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import { Profile, Folder } from '@/types';
import { ArrowLeft, FolderPlus, Folder as FolderIcon, Trash2 } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Folders() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [showNewFolder, setShowNewFolder] = useState(false);
  const [folderName, setFolderName] = useState('');

  useEffect(() => {
    const currentProfile = storage.getCurrentProfile();
    if (!currentProfile) {
      router.push('/');
      return;
    }
    setProfile(currentProfile);
    setFolders(storage.getFolders(currentProfile.id));
  }, [router]);

  const createFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !folderName.trim()) return;

    const newFolder: Folder = {
      id: Date.now().toString(),
      profileId: profile.id,
      folderName: folderName.trim(),
      createdAt: new Date().toISOString(),
    };

    storage.saveFolder(newFolder);
    setFolders(storage.getFolders(profile.id));
    setFolderName('');
    setShowNewFolder(false);
  };

  const deleteFolder = (id: string) => {
    if (confirm('Delete this folder and all its documents?')) {
      storage.deleteFolder(id);
      setFolders(storage.getFolders(profile?.id));
    }
  };

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => {
              storage.setCurrentProfile(null);
              router.push('/');
            }}
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
              style={{ backgroundColor: profile.avatarBg }}
            >
              {profile.avatar}
            </div>
            <span className="font-semibold text-text-primary">{profile.name}</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-8 text-text-primary">My Folders</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {folders.map((folder) => (
            <div key={folder.id} className="relative group">
              <button
                onClick={() => router.push(`/documents/${folder.id}`)}
                className="w-full bg-surface rounded-2xl p-6 border border-border hover:bg-surface-hover transition-all flex flex-col items-center gap-3"
              >
                <FolderIcon className="w-16 h-16 text-primary" />
                <span className="font-semibold text-text-primary text-center">{folder.folderName}</span>
              </button>
              <button
                onClick={() => deleteFolder(folder.id)}
                className="absolute top-2 right-2 bg-error text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          <button
            onClick={() => setShowNewFolder(true)}
            className="bg-surface rounded-2xl p-6 border-2 border-dashed border-border hover:bg-surface-hover transition-all flex flex-col items-center gap-3"
          >
            <FolderPlus className="w-16 h-16 text-text-tertiary" />
            <span className="font-semibold text-text-secondary">New Folder</span>
          </button>
        </div>

        {showNewFolder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-surface rounded-2xl p-6 max-w-md w-full border border-border">
              <h2 className="text-2xl font-bold mb-4 text-text-primary">New Folder</h2>
              <form onSubmit={createFolder}>
                <input
                  type="text"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  placeholder="Folder name"
                  className="w-full px-4 py-2 bg-surface border border-border rounded-lg mb-4 focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary"
                  autoFocus
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewFolder(false);
                      setFolderName('');
                    }}
                    className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-surface-hover text-text-primary transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
