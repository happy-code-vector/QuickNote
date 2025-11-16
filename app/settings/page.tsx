"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SettingsPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentProfile = localStorage.getItem("currentProfile");
      if (!currentProfile) {
        router.push("/profile-selection");
        return;
      }
      setProfile(JSON.parse(currentProfile));
    }
  }, [router]);

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <Link href="/dashboard" className="btn-secondary">
            <span className="material-symbols-outlined mr-2">arrow_back</span>
            Back to Dashboard
          </Link>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Profile Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Name</label>
                <p className="text-gray-900 dark:text-white">{profile.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Type</label>
                <p className="text-gray-900 dark:text-white capitalize">{profile.type}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Account Actions</h2>
            <div className="space-y-3">
              <Link href="/profile-selection" className="btn-secondary w-full">
                Switch Profile
              </Link>
              <Link href="/create-profile" className="btn-secondary w-full">
                Create New Profile
              </Link>
              <button className="btn-secondary w-full text-red-600 border-red-600 hover:bg-red-600 hover:text-white">
                Delete Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
