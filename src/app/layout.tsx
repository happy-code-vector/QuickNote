import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'QuickNote',
  description: 'AI-powered note-taking app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
