'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import { Profile } from '@/types';
import { UserPlus, Settings, Edit2, Trash2 } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    // Check if onboarding is complete
    const onboardingComplete = localStorage.getItem('quicknote_onboarding_complete');
    if (!onboardingComplete) {
      router.push('/onboarding');
      return;
    }
    
    setProfiles(storage.getProfiles());
  }, [router]);

  const selectProfile = (profile: Profile) => {
    storage.setCurrentProfile(profile);
    router.push('/folders');
  };

  const deleteProfile = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Delete this profile?')) {
      storage.deleteProfile(id);
      setProfiles(storage.getProfiles());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">QuickNote</h1>
            <p className="text-gray-600 mt-1">Select or create a profile</p>
          </div>
          <button
            onClick={() => setShowAuth(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <Settings className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">Settings</span>
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <div key={profile.id} className="relative group">
              <button
                onClick={() => selectProfile(profile)}
                className="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center gap-3"
              >
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center text-3xl"
                  style={{ backgroundColor: profile.avatarBg }}
                >
                  {profile.avatar}
                </div>
                <span className="font-semibold text-gray-800">{profile.name}</span>
                <span className="text-sm text-gray-500 capitalize">{profile.profileType}</span>
              </button>
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/profile/edit/${profile.id}`);
                  }}
                  className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => deleteProfile(e, profile.id)}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          
          <button
            onClick={() => router.push('/profile/new')}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center gap-3 border-2 border-dashed border-gray-300"
          >
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
              <UserPlus className="w-10 h-10 text-gray-400" />
            </div>
            <span className="font-semibold text-gray-600">New Profile</span>
          </button>
        </div>
      </div>

      {/* Auth Modal (placeholder for future) */}
      {showAuth && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Settings</h2>
            <p className="text-gray-600 mb-6">Authentication and settings coming soon!</p>
            <button
              onClick={() => setShowAuth(false)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
