'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import { Profile } from '@/types';
import { ArrowLeft } from 'lucide-react';

const AVATARS = ['👤', '👨', '👩', '🧑', '👦', '👧', '🧒'];
const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'];

export default function NewProfile() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    avatar: AVATARS[0],
    avatarBg: COLORS[0],
    age: 18,
    educationStatus: '',
    favouriteTopic: '',
    profileType: 'adult' as 'adult' | 'child',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const profile: Profile = {
      id: Date.now().toString(),
      ...formData,
    };
    
    storage.saveProfile(profile);
    storage.setCurrentProfile(profile);
    router.push('/folders');
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => router.push('/')}
          className="mb-6 flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-surface rounded-2xl border border-border p-8">
          <h1 className="text-3xl font-bold mb-6 text-text-primary">Create Profile</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avatar
              </label>
              <div className="flex gap-3">
                {AVATARS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setFormData({ ...formData, avatar: emoji })}
                    className={`w-12 h-12 rounded-full text-2xl transition-all ${
                      formData.avatar === emoji ? 'ring-4 ring-primary' : ''
                    }`}
                    style={{ backgroundColor: formData.avatarBg }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Background Color
              </label>
              <div className="flex gap-3">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData({ ...formData, avatarBg: color })}
                    className={`w-10 h-10 rounded-full transition-all ${
                      formData.avatarBg === color ? 'ring-4 ring-primary' : ''
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Profile Type
              </label>
              <select
                value={formData.profileType}
                onChange={(e) => setFormData({ ...formData, profileType: e.target.value as 'adult' | 'child' })}
                className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary"
              >
                <option value="adult">Adult</option>
                <option value="child">Child</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Age
              </label>
              <input
                type="number"
                required
                min="1"
                max="120"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Education Status
              </label>
              <input
                type="text"
                value={formData.educationStatus}
                onChange={(e) => setFormData({ ...formData, educationStatus: e.target.value })}
                className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary"
                placeholder="e.g., High School, University"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Favourite Topic
              </label>
              <input
                type="text"
                value={formData.favouriteTopic}
                onChange={(e) => setFormData({ ...formData, favouriteTopic: e.target.value })}
                className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary"
                placeholder="e.g., Science, History"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors"
            >
              Create Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
