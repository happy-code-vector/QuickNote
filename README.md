# QuickNote Web

AI-powered note-taking web app built with Next.js and Gemini AI. A complete web version of the QuickNote iOS app with all features replicated.

## 🚀 Setup

1. Install dependencies:
```bash
yarn install
```

2. Create `.env.local` file and add your Gemini API key:
```
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

Get your API key from: https://makersuite.google.com/app/apikey

3. Run the development server:
```bash
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## ✨ Features (Matching iOS App)

### Onboarding Experience
- ✅ Welcome screen with feature highlights
- ✅ Educational statistics and learning challenges
- ✅ User profile selection (K-8, High School, Undergraduate, Graduate, Parent, Teacher)
- ✅ Notification preferences
- ✅ Rating prompt

### Profile Management
- ✅ Multiple user profiles (Adult/Child)
- ✅ Customizable avatars with emoji and background colors
- ✅ Profile editing and deletion
- ✅ Age, education status, and favorite topics
- ✅ Profile switching

### Content Organization
- ✅ Folder-based organization
- ✅ Create, edit, and delete folders
- ✅ Document management within folders
- ✅ Recent activity tracking

### Document Creation
- ✅ Multiple content types:
  - 📝 Text input
  - 🎥 YouTube video URLs
  - 🖼️ Image URLs
  - 🌐 Website URLs
- ✅ Animated loading screen with progress steps
- ✅ AI-powered content analysis

### AI-Generated Study Materials
- ✅ **Notes**: Comprehensive summaries with key findings
- ✅ **Flashcards**: Interactive flip cards for memorization
- ✅ **Quizzes**: Multiple-choice questions with instant feedback
- ✅ **Chat**: AI assistant (placeholder for future implementation)

### User Interface
- ✅ Gradient backgrounds matching iOS design
- ✅ Smooth animations and transitions
- ✅ Responsive design for all screen sizes
- ✅ Modern card-based layouts
- ✅ Color-coded content types
- ✅ Hover effects and interactive elements

### Data Management
- ✅ Local storage (browser-based)
- ✅ No backend required
- ✅ Persistent data across sessions
- ✅ Profile-specific data isolation

## 🎨 Design Philosophy

The web version faithfully replicates the iOS app's:
- Color schemes and gradients
- Typography and spacing
- Animation patterns
- User flow and navigation
- Feature set and functionality

## 📱 iOS vs Web Differences

| Feature | iOS | Web |
|---------|-----|-----|
| Storage | Device local | Browser localStorage |
| Images | Camera/Gallery | URL-based |
| Notifications | Native | Browser-based |
| Authentication | Apple/Google Sign-in | Coming soon |
| Offline Mode | Full support | Requires internet for AI |

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini AI
- **Icons**: Lucide React
- **Storage**: Browser localStorage

## 📂 Project Structure

```
quicknote-web/
├── src/
│   ├── app/
│   │   ├── onboarding/          # Onboarding flow
│   │   ├── profile/             # Profile management
│   │   ├── folders/             # Folder listing
│   │   ├── documents/           # Document listing
│   │   ├── document/            # Document viewer & creator
│   │   └── page.tsx             # Home/Profile selection
│   ├── components/
│   │   └── LoadingScreen.tsx    # AI processing animation
│   ├── lib/
│   │   ├── gemini.ts            # AI integration
│   │   └── storage.ts           # Data persistence
│   └── types/
│       └── index.ts             # TypeScript definitions
└── public/                      # Static assets
```

## 🎯 Key Features Explained

### Onboarding Flow
6-step interactive onboarding that educates users about:
- App capabilities
- Learning statistics
- User profiling
- Notifications
- App rating

### Profile System
- Separate Adult and Child profile types
- 13+ avatar options per type
- 9 background color choices
- Custom profile metadata

### AI Processing
Multi-step loading animation showing:
1. Content analysis
2. Note generation
3. Quiz creation
4. Flashcard building

### Study Tools
- **Notes**: Rich HTML formatting with summaries and key points
- **Flashcards**: Swipeable cards with flip animation
- **Quizzes**: Real-time feedback with correct/incorrect highlighting
- **Chat**: AI conversation interface (coming soon)

## 🚧 Future Enhancements

- [ ] User authentication (Google/Apple Sign-in)
- [ ] Cloud sync across devices
- [ ] PDF upload support
- [ ] Advanced chat with AI
- [ ] Study statistics and progress tracking
- [ ] Spaced repetition for flashcards
- [ ] Export notes as PDF
- [ ] Collaborative folders
- [ ] Dark mode toggle
- [ ] Mobile app (React Native)

## 📝 License

This project is a web implementation of the QuickNote iOS app.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
