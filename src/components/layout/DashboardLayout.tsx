'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Spinner } from '@/components/ui/Spinner';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  actions?: React.ReactNode;
  showSearch?: boolean;
  showNotifications?: boolean;
  showThemeToggle?: boolean;
  loading?: boolean;
}

export function DashboardLayout({
  children,
  title,
  actions,
  showSearch = true,
  showNotifications = true,
  showThemeToggle = true,
  loading = false,
}: DashboardLayoutProps) {
  const [currentProfile, setCurrentProfile] = useState<{
    id: string;
    name: string;
    avatar: string;
    avatarBg: string;
  } | null>(null);
  const [mounted, setMounted] = useState(false);

  // Load current profile from localStorage
  useEffect(() => {
    setMounted(true);
    const storedProfile = localStorage.getItem('currentProfile');
    if (storedProfile) {
      try {
        const profile = JSON.parse(storedProfile);
        setCurrentProfile({
          id: profile.id,
          name: profile.name,
          avatar: profile.avatar,
          avatarBg: profile.avatarBg,
        });
      } catch (error) {
        console.error('Failed to parse profile:', error);
      }
    }
  }, []);

  // Prevent flash of unstyled content
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar currentProfile={currentProfile} />

      {/* Main Content Area */}
      <div className="md:pl-64 transition-all duration-300 ease-in-out">
        {/* Header */}
        <Header
          currentProfile={currentProfile}
          showSearch={showSearch}
          showNotifications={showNotifications}
          showThemeToggle={showThemeToggle}
        />

        {/* Page Content */}
        <main className="min-h-[calc(100vh-4rem)]">
          {/* Title and Actions Bar */}
          {(title || actions) && (
            <div className="sticky top-16 z-20 bg-background/95 backdrop-blur-sm border-b border-border">
              <div className="px-6 py-4 flex items-center justify-between gap-4">
                {title && (
                  <h1 className="text-2xl font-bold text-text-primary">{title}</h1>
                )}
                {actions && <div className="flex items-center gap-2">{actions}</div>}
              </div>
            </div>
          )}

          {/* Content Area with Loading State */}
          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Spinner size="lg" />
              </div>
            ) : (
              children
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
