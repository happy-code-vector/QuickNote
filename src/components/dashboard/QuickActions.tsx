import React from 'react';
import { useRouter } from 'next/navigation';
import { FileText, CreditCard, ClipboardList, Upload } from 'lucide-react';

export interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

export const QuickActions: React.FC = () => {
  const router = useRouter();

  const actions: QuickAction[] = [
    {
      id: 'new-note',
      label: 'New Note',
      icon: <FileText className="w-6 h-6" />,
      href: '/document/new?type=note',
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      id: 'flashcards',
      label: 'Flashcards',
      icon: <CreditCard className="w-6 h-6" />,
      href: '/document/new?type=flashcards',
      color: 'bg-purple-500 hover:bg-purple-600',
    },
    {
      id: 'quiz',
      label: 'Quiz',
      icon: <ClipboardList className="w-6 h-6" />,
      href: '/document/new?type=quiz',
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      id: 'upload',
      label: 'Upload',
      icon: <Upload className="w-6 h-6" />,
      href: '/document/new',
      color: 'bg-orange-500 hover:bg-orange-600',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={() => router.push(action.href)}
          className={`${action.color} text-white rounded-xl p-6 transition-all duration-150 hover:scale-105 hover:shadow-lg flex flex-col items-center gap-3`}
        >
          {action.icon}
          <span className="font-semibold text-base">{action.label}</span>
        </button>
      ))}
    </div>
  );
};
