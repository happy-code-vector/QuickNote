'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';

interface HeaderProps {
  currentProfile?: {
    id: string;
    name: string;
    avatar: string;
    avatarBg: string;
  } | null;
  showSearch?: boolean;
  showNotifications?: boolean;
  showThemeToggle?: boolean;
}

export function Header({
  currentProfile,
  showSearch = true,
  showNotifications = true,
  showThemeToggle = true,
}: HeaderProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const notificationsDropdownRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }

      // Close dropdowns on Escape
      if (e.key === 'Escape') {
        setIsProfileOpen(false);
        setIsNotificationsOpen(false);
        if (isSearchFocused) {
          searchInputRef.current?.blur();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSearchFocused]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(e.target as Node)
      ) {
        setIsProfileOpen(false);
      }
      if (
        notificationsDropdownRef.current &&
        !notificationsDropdownRef.current.contains(e.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/documents?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      searchInputRef.current?.blur();
    }
  };

  const handleLogout = () => {
    // Clear profile from localStorage
    localStorage.removeItem('currentProfile');
    router.push('/onboarding');
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-surface border-b border-border">
      <div className="h-full px-6 flex items-center justify-between gap-4">
        {/* Search Bar */}
        {showSearch && (
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-tertiary"
                style={{ fontSize: '20px' }}
              >
                search
              </span>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search documents... (⌘K)"
                className={`
                  w-full h-10 pl-10 pr-4 rounded-lg
                  bg-background border border-border
                  text-text-primary placeholder:text-text-tertiary
                  focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                  transition-all duration-150 ease-in-out
                `}
              />
            </div>
          </form>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          {showThemeToggle && <ThemeToggle />}

          {/* Notifications */}
          {showNotifications && (
            <div className="relative" ref={notificationsDropdownRef}>
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-surface hover:bg-surface-hover border border-border transition-all duration-150 ease-in-out"
                aria-label="Notifications"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                  notifications
                </span>
                {/* Notification badge */}
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full" />
              </button>

              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-surface border border-border rounded-lg shadow-lg overflow-hidden">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-semibold text-text-primary">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="p-8 text-center text-text-tertiary">
                      <span className="material-symbols-outlined mb-2" style={{ fontSize: '48px' }}>
                        notifications_off
                      </span>
                      <p className="text-sm">No new notifications</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Profile Dropdown */}
          <div className="relative" ref={profileDropdownRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-surface-hover transition-colors"
              aria-label="Profile menu"
            >
              {currentProfile ? (
                <>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                    style={{ backgroundColor: currentProfile.avatarBg }}
                  >
                    {currentProfile.avatar}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-text-primary">
                    {currentProfile.name}
                  </span>
                </>
              ) : (
                <>
                  <div className="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center">
                    <span className="material-symbols-outlined text-text-tertiary" style={{ fontSize: '20px' }}>
                      person
                    </span>
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-text-secondary">
                    Guest
                  </span>
                </>
              )}
              <span className="material-symbols-outlined text-text-tertiary" style={{ fontSize: '20px' }}>
                {isProfileOpen ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-surface border border-border rounded-lg shadow-lg overflow-hidden">
                {currentProfile && (
                  <>
                    <div className="p-4 border-b border-border">
                      <p className="font-semibold text-text-primary">{currentProfile.name}</p>
                      <p className="text-xs text-text-tertiary mt-0.5">View and edit profile</p>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-hover transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <span className="material-symbols-outlined text-text-secondary" style={{ fontSize: '20px' }}>
                          person
                        </span>
                        <span className="text-sm text-text-primary">Profile</span>
                      </Link>
                      <Link
                        href="/profile/settings"
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-hover transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <span className="material-symbols-outlined text-text-secondary" style={{ fontSize: '20px' }}>
                          settings
                        </span>
                        <span className="text-sm text-text-primary">Settings</span>
                      </Link>
                      <Link
                        href="/folders"
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-hover transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <span className="material-symbols-outlined text-text-secondary" style={{ fontSize: '20px' }}>
                          folder
                        </span>
                        <span className="text-sm text-text-primary">Folders</span>
                      </Link>
                    </div>
                    <div className="border-t border-border py-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-hover transition-colors w-full text-left"
                      >
                        <span className="material-symbols-outlined text-error" style={{ fontSize: '20px' }}>
                          logout
                        </span>
                        <span className="text-sm text-error">Log out</span>
                      </button>
                    </div>
                  </>
                )}
                {!currentProfile && (
                  <div className="py-1">
                    <Link
                      href="/onboarding"
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-hover transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <span className="material-symbols-outlined text-text-secondary" style={{ fontSize: '20px' }}>
                        login
                      </span>
                      <span className="text-sm text-text-primary">Sign in</span>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
