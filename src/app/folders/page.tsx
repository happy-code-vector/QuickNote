'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import { Profile, Folder } from '@/types';
import { ArrowLeft, FolderPlus, Folder as FolderIcon, Trash2 } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => {
              storage.setCurrentProfile(null);
              router.push('/');
            }}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
              style={{ backgroundColor: profile.avatarBg }}
            >
              {profile.avatar}
            </div>
            <span className="font-semibold text-gray-800">{profile.name}</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-8 text-gray-800">My Folders</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {folders.map((folder) => (
            <div key={folder.id} className="relative group">
              <button
                onClick={() => router.push(`/documents/${folder.id}`)}
                className="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center gap-3"
              >
                <FolderIcon className="w-16 h-16 text-blue-500" />
                <span className="font-semibold text-gray-800 text-center">{folder.folderName}</span>
              </button>
              <button
                onClick={() => deleteFolder(folder.id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          <button
            onClick={() => setShowNewFolder(true)}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center gap-3 border-2 border-dashed border-gray-300"
          >
            <FolderPlus className="w-16 h-16 text-gray-400" />
            <span className="font-semibold text-gray-600">New Folder</span>
          </button>
        </div>

        {showNewFolder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">New Folder</h2>
              <form onSubmit={createFolder}>
                <input
                  type="text"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  placeholder="Folder name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewFolder(false);
                      setFolderName('');
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
