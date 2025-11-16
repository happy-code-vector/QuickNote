"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NotesPage() {
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
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">All Notes</h1>
          <Link href="/dashboard" className="btn-secondary">
            <span className="material-symbols-outlined mr-2">arrow_back</span>
            Back to Dashboard
          </Link>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-12 text-center border border-gray-200 dark:border-gray-800">
          <span className="material-symbols-outlined text-6xl text-gray-400 dark:text-gray-600 mb-4">description</span>
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">No Notes Yet</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Start creating notes from your study materials</p>
          <Link href="/dashboard" className="btn-primary">Create Your First Note</Link>
        </div>
      </div>
    </div>
  );
}
