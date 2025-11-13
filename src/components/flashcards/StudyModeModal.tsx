'use client';

import React from 'react';
import { Modal, Button } from '@/components/ui';

export type StudyMode = 'sequential' | 'random' | 'difficult';

export interface StudyModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMode: StudyMode;
  onModeChange: (mode: StudyMode) => void;
}

export const StudyModeModal: React.FC<StudyModeModalProps> = ({
  isOpen,
  onClose,
  currentMode,
  onModeChange,
}) => {
  const modes = [
    {
      id: 'sequential' as StudyMode,
      title: 'Sequential',
      description: 'Study cards in order from first to last',
      icon: 'format_list_numbered',
    },
    {
      id: 'random' as StudyMode,
      title: 'Random',
      description: 'Study cards in random order for better retention',
      icon: 'shuffle',
    },
    {
      id: 'difficult' as StudyMode,
      title: 'Difficult Only',
      description: 'Focus on cards you marked as hard or medium',
      icon: 'priority_high',
    },
  ];

  const handleModeSelect = (mode: StudyMode) => {
    onModeChange(mode);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Study Mode"
      size="md"
    >
      <div className="space-y-3">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => handleModeSelect(mode.id)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-150 ${
              currentMode === mode.id
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50 hover:bg-surface-hover'
            }`}
          >
            <div className="flex items-start gap-3">
              <span
                className={`material-symbols-outlined text-2xl ${
                  currentMode === mode.id ? 'text-primary' : 'text-text-secondary'
                }`}
              >
                {mode.icon}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-text-primary">
                    {mode.title}
                  </h3>
                  {currentMode === mode.id && (
                    <span className="material-symbols-outlined text-primary text-lg">
                      check_circle
                    </span>
                  )}
                </div>
                <p className="text-sm text-text-secondary mt-1">
                  {mode.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
};
