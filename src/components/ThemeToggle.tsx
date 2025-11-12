'use client';

import { useTheme } from '@/contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-surface hover:bg-surface-hover border border-border transition-all duration-150 ease-in-out"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Sun icon for light mode */}
      <span
        className={`material-symbols-outlined absolute transition-all duration-300 ease-in-out ${
          theme === 'light'
            ? 'opacity-100 rotate-0 scale-100'
            : 'opacity-0 rotate-90 scale-0'
        }`}
        style={{ fontSize: '20px' }}
      >
        light_mode
      </span>

      {/* Moon icon for dark mode */}
      <span
        className={`material-symbols-outlined absolute transition-all duration-300 ease-in-out ${
          theme === 'dark'
            ? 'opacity-100 rotate-0 scale-100'
            : 'opacity-0 -rotate-90 scale-0'
        }`}
        style={{ fontSize: '20px' }}
      >
        dark_mode
      </span>
    </button>
  );
}
