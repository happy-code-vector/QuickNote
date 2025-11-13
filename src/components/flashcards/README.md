# Flashcards Interface

This directory contains all components for the enhanced flashcards study interface.

## Components

### StudyHeader
Displays study session progress and controls:
- Current card / total cards indicator
- Visual progress bar
- Elapsed time timer
- Settings button for study mode selection

### FlashCard
The main flashcard component with:
- 3D flip animation (600ms rotateY transition)
- Centered display (400x300px)
- Touch swipe support for mobile navigation
- Question/Answer sides with distinct styling

### CardNavigation
Navigation and difficulty rating controls:
- Previous/Next buttons
- Keyboard shortcuts (Arrow keys, 1/2/3 for difficulty)
- Difficulty rating buttons (Easy, Medium, Hard)
- Auto-advance after rating

### StudyModeModal
Settings modal for selecting study mode:
- Sequential mode (default order)
- Random mode (shuffled cards)
- Difficult-only mode (filters by ratings)

### CompletionSummary
End-of-session summary screen showing:
- Total cards studied
- Time spent
- Difficulty breakdown with visual chart
- Restart and exit options

## Usage

```tsx
import { StudyHeader, FlashCard, CardNavigation } from '@/components/flashcards';

// In your page component
<StudyHeader
  currentCard={1}
  totalCards={20}
  elapsedTime={120}
  onSettingsClick={() => setIsSettingsOpen(true)}
/>

<FlashCard
  question="What is the capital of France?"
  answer="Paris"
  onSwipeLeft={handleNext}
  onSwipeRight={handlePrevious}
/>

<CardNavigation
  onPrevious={handlePrevious}
  onNext={handleNext}
  onDifficultyRate={handleDifficultyRate}
  canGoPrevious={currentIndex > 0}
  canGoNext={currentIndex < totalCards - 1}
/>
```

## Features

- ✅ Progress tracking with visual indicators
- ✅ 3D flip animation for cards
- ✅ Touch swipe support on mobile
- ✅ Keyboard navigation (arrows, 1/2/3)
- ✅ Multiple study modes (sequential, random, difficult-only)
- ✅ Difficulty rating system
- ✅ Session timer
- ✅ Completion summary with statistics
- ✅ Responsive design for all screen sizes

## Requirements Satisfied

- 6.1: Study header with progress indicator and timer ✅
- 6.2: Centered flashcard display ✅
- 6.3: 3D flip animation ✅
- 6.4: Navigation buttons with keyboard support ✅
- 6.5: Difficulty rating buttons ✅
- 6.6: Auto-advance after rating ✅
- 6.7: Progress visualization ✅
- 6.8: Completion summary ✅
- 6.9: Settings button for study modes ✅
- 6.10: Multiple study modes ✅
