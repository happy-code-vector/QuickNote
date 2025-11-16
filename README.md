# QuickNote - Web Version

AI-powered study materials generator. Transform any content into notes, flashcards, and quizzes.

## Features

- 🎯 Multiple content sources: URL, PDF, YouTube, Images
- 🤖 AI-powered content generation using Gemini API
- 📝 Generate Notes, Flashcards, and Quizzes
- 👤 Multiple user profiles
- 🌓 Dark/Light theme
- 💾 Local storage for all generated content
- 📱 Fully responsive design

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Gemini API

1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create `.env.local` file in the root directory:

```bash
GEMINI_API_KEY=your_api_key_here
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Usage

1. **Onboarding**: Complete the 6-screen onboarding flow
2. **Create Profile**: Set up your learning profile
3. **Dashboard**: Upload content (URL, PDF, YouTube, or Image)
4. **Generate**: AI creates notes, flashcards, and quizzes
5. **Study**: Access your generated materials anytime

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v3
- **AI**: Google Gemini API
- **Storage**: Browser localStorage
- **Language**: TypeScript

## Project Structure

```
quicknote-nextjs/
├── app/
│   ├── api/generate/          # Gemini API route
│   ├── components/            # Reusable components
│   ├── dashboard/             # Main dashboard
│   ├── onboarding/            # Onboarding flow
│   ├── login/signup/          # Authentication pages
│   ├── create-profile/        # Profile creation
│   ├── profile-selection/     # Profile switcher
│   ├── notes/flashcards/quizzes/  # Content pages
│   └── settings/              # Settings page
├── .env.local                 # Environment variables
└── tailwind.config.ts         # Tailwind configuration
```

## API Routes

### POST /api/generate

Generate study materials from content.

**Request:**
```json
{
  "type": "note" | "flashcard" | "quiz",
  "content": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    // Generated content based on type
  }
}
```

## Features vs iOS App

| Feature | iOS | Web | Status |
|---------|-----|-----|--------|
| URL Analysis | ✅ | ✅ | Complete |
| YouTube | ✅ | ✅ | Complete |
| PDF Upload | ✅ | 🚧 | Mock (needs server-side processing) |
| Image OCR | ✅ | 🚧 | Mock (needs OCR integration) |
| Notes Generation | ✅ | ✅ | Complete |
| Flashcards | ✅ | ✅ | Complete |
| Quizzes | ✅ | ✅ | Complete |
| Multiple Profiles | ✅ | ✅ | Complete |
| Dark Mode | ✅ | ✅ | Complete |
| Folders | ✅ | ❌ | Not implemented |
| Chat | ✅ | ❌ | Not implemented |

## Future Enhancements

- [ ] PDF text extraction (server-side)
- [ ] Image OCR integration
- [ ] Folder organization
- [ ] AI chat for Q&A
- [ ] Export to PDF/Anki
- [ ] Spaced repetition system
- [ ] Progress tracking
- [ ] Cloud sync (Firebase/Supabase)

## Development

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Lint
npm run lint
```

## License

Private project - All rights reserved
