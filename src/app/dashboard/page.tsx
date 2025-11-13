'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout';
import { StatisticsCard, QuickActions, RecentDocuments } from '@/components/dashboard';
import { storage } from '@/lib/storage';
import { Document, Profile } from '@/types';
import { FileText, Clock, Flame } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentProfile = storage.getCurrentProfile();
    if (!currentProfile) {
      router.push('/');
      return;
    }

    setProfile(currentProfile);

    // Get all folders for this profile
    const folders = storage.getFolders(currentProfile.id);
    
    // Get all documents from all folders
    const allDocs: Document[] = [];
    folders.forEach(folder => {
      const folderDocs = storage.getDocuments(folder.id);
      allDocs.push(...folderDocs);
    });

    // Sort by creation date (most recent first) and take top 6
    const recentDocs = allDocs
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 6);

    setDocuments(recentDocs);
    setLoading(false);
  }, [router]);

  // Calculate statistics
  const totalDocuments = documents.length;
  
  // Calculate total study time (mock data - in a real app, this would be tracked)
  const studyTimeHours = Math.floor(totalDocuments * 0.5); // Rough estimate
  
  // Calculate streak (mock data - in a real app, this would be tracked)
  const streakDays = 7;

  if (!profile) {
    return null;
  }

  return (
    <DashboardLayout 
      title={`Welcome back, ${profile.name}!`}
      loading={loading}
    >
      <div className="space-y-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatisticsCard
            title="Total Documents"
            value={totalDocuments}
            icon={FileText}
            trend={{
              value: 12,
              isPositive: true,
            }}
            iconColor="text-blue-500"
          />
          <StatisticsCard
            title="Study Time"
            value={`${studyTimeHours}h`}
            icon={Clock}
            trend={{
              value: 8,
              isPositive: true,
            }}
            iconColor="text-purple-500"
          />
          <StatisticsCard
            title="Streak"
            value={`${streakDays} days`}
            icon={Flame}
            iconColor="text-orange-500"
          />
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-text-primary mb-4">
            Quick Actions
          </h2>
          <QuickActions />
        </div>

        {/* Recent Documents */}
        <div>
          <h2 className="text-xl font-semibold text-text-primary mb-4">
            Recent Documents
          </h2>
          <RecentDocuments documents={documents} />
        </div>
      </div>
    </DashboardLayout>
  );
}
