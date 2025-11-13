'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  badge?: number;
}

interface SidebarProps {
  currentProfile?: {
    id: string;
    name: string;
    avatar: string;
    avatarBg: string;
  } | null;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: 'home', href: '/documents' },
  { id: 'notes', label: 'Notes', icon: 'description', href: '/documents?type=notes' },
  { id: 'flashcards', label: 'Flashcards', icon: 'style', href: '/documents?type=flashcards' },
  { id: 'quizzes', label: 'Quizzes', icon: 'quiz', href: '/documents?type=quizzes' },
  { id: 'folders', label: 'Folders', icon: 'folder', href: '/folders' },
];

export function Sidebar({ currentProfile }: SidebarProps) {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Close mobile sidebar on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileOpen]);

  const isActive = (href: string) => {
    if (href === '/documents') {
      return pathname === '/documents' && !window.location.search;
    }
    return pathname === href || (href.includes('?') && window.location.href.includes(href));
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile toggle button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-surface border border-border shadow-lg"
        aria-label="Toggle menu"
      >
        <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
          {isMobileOpen ? 'close' : 'menu'}
        </span>
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-surface border-r border-border z-40
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          flex flex-col
        `}
      >
        {/* User Profile Section */}
        <div className="p-4 border-b border-border">
          {currentProfile ? (
            <Link
              href="/profile"
              className={`flex items-center gap-3 p-2 rounded-lg hover:bg-surface-hover transition-colors ${
                isCollapsed ? 'justify-center' : ''
              }`}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0"
                style={{ backgroundColor: currentProfile.avatarBg }}
              >
                {currentProfile.avatar}
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text-primary truncate">
                    {currentProfile.name}
                  </p>
                  <p className="text-xs text-text-tertiary">View profile</p>
                </div>
              )}
            </Link>
          ) : (
            <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
              <div className="w-10 h-10 rounded-full bg-surface-hover flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-text-tertiary" style={{ fontSize: '24px' }}>
                  person
                </span>
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-secondary">Guest</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg
                      transition-all duration-150 ease-in-out
                      ${isCollapsed ? 'justify-center' : ''}
                      ${
                        active
                          ? 'bg-primary/10 text-primary'
                          : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                      }
                    `}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <span
                      className="material-symbols-outlined flex-shrink-0"
                      style={{ fontSize: '24px' }}
                    >
                      {item.icon}
                    </span>
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 font-medium text-sm">{item.label}</span>
                        {item.badge !== undefined && item.badge > 0 && (
                          <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-primary text-white">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Settings and Collapse Toggle */}
        <div className="p-4 border-t border-border space-y-1">
          <Link
            href="/profile/settings"
            className={`
              flex items-center gap-3 px-3 py-2.5 rounded-lg
              text-text-secondary hover:bg-surface-hover hover:text-text-primary
              transition-all duration-150 ease-in-out
              ${isCollapsed ? 'justify-center' : ''}
            `}
            title={isCollapsed ? 'Settings' : undefined}
          >
            <span className="material-symbols-outlined flex-shrink-0" style={{ fontSize: '24px' }}>
              settings
            </span>
            {!isCollapsed && <span className="flex-1 font-medium text-sm">Settings</span>}
          </Link>

          {/* Desktop collapse toggle */}
          <button
            onClick={toggleCollapse}
            className={`
              hidden md:flex items-center gap-3 px-3 py-2.5 rounded-lg w-full
              text-text-secondary hover:bg-surface-hover hover:text-text-primary
              transition-all duration-150 ease-in-out
              ${isCollapsed ? 'justify-center' : ''}
            `}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <span className="material-symbols-outlined flex-shrink-0" style={{ fontSize: '24px' }}>
              {isCollapsed ? 'chevron_right' : 'chevron_left'}
            </span>
            {!isCollapsed && <span className="flex-1 font-medium text-sm">Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
