'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import { Profile } from '@/types';
import { UserPlus, Settings, Edit2, Trash2 } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

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
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-text-primary">QuickNote</h1>
            <p className="text-text-secondary mt-1">Select or create a profile</p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setShowAuth(true)}
              className="flex items-center gap-2 px-4 py-2 bg-surface rounded-lg border border-border hover:bg-surface-hover transition-all"
            >
              <Settings className="w-5 h-5 text-text-secondary" />
              <span className="text-text-primary">Settings</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <div key={profile.id} className="relative group">
              <button
                onClick={() => selectProfile(profile)}
                className="w-full bg-surface rounded-2xl p-6 border border-border hover:bg-surface-hover transition-all flex flex-col items-center gap-3"
              >
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center text-3xl"
                  style={{ backgroundColor: profile.avatarBg }}
                >
                  {profile.avatar}
                </div>
                <span className="font-semibold text-text-primary">{profile.name}</span>
                <span className="text-sm text-text-secondary capitalize">{profile.profileType}</span>
              </button>
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/profile/edit/${profile.id}`);
                  }}
                  className="bg-primary text-white p-2 rounded-full hover:bg-primary-hover"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => deleteProfile(e, profile.id)}
                  className="bg-error text-white p-2 rounded-full hover:opacity-90"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          
          <button
            onClick={() => router.push('/profile/new')}
            className="bg-surface rounded-2xl p-6 border-2 border-dashed border-border hover:bg-surface-hover transition-all flex flex-col items-center gap-3"
          >
            <div className="w-20 h-20 rounded-full bg-surface-hover flex items-center justify-center">
              <UserPlus className="w-10 h-10 text-text-tertiary" />
            </div>
            <span className="font-semibold text-text-secondary">New Profile</span>
          </button>
        </div>
      </div>

      {/* Auth Modal (placeholder for future) */}
      {showAuth && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-surface rounded-2xl p-8 max-w-md w-full border border-border">
            <h2 className="text-2xl font-bold mb-4 text-text-primary">Settings</h2>
            <p className="text-text-secondary mb-6">Authentication and settings coming soon!</p>
            <button
              onClick={() => setShowAuth(false)}
              className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
