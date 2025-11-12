# QuickNote Web - Quick Start Guide

## 🚀 Get Started in 3 Minutes

### Step 1: Install Dependencies (30 seconds)
```bash
cd quicknote-web
yarn install
```

### Step 2: Add Your API Key (30 seconds)
1. Get a free Gemini API key: https://makersuite.google.com/app/apikey
2. Open `.env.local` file
3. Replace `your_gemini_api_key_here` with your actual key:
```
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSy...your_key_here
```

### Step 3: Start the App (10 seconds)
```bash
yarn dev
```

### Step 4: Open in Browser (5 seconds)
Open http://localhost:3000

## 🎉 You're Done!

The app will automatically:
1. Show you the onboarding flow (first time only)
2. Guide you through creating a profile
3. Let you create folders and documents
4. Generate AI-powered study materials

## 📱 First-Time User Flow

### 1. Onboarding (2 minutes)
- **Welcome Screen**: Learn about QuickNote features
- **Statistics**: See why traditional learning is hard
- **Profile**: Select your education level (K-8, High School, etc.)
- **Notifications**: Enable browser notifications (optional)
- **Rating**: Rate the app (optional)

### 2. Create Profile (1 minute)
- Choose Adult or Child
- Pick an avatar emoji
- Select background color
- Enter your name and details
- Click "Create Profile"

### 3. Create Your First Folder (30 seconds)
- Click "Create Folder"
- Enter folder name (e.g., "Biology Notes")
- Click "Create"

### 4. Create Your First Document (2 minutes)
- Click on your folder
- Click "New Document"
- Choose content type:
  - **Text**: Paste your notes
  - **YouTube**: Paste video URL
  - **Image**: Paste image URL
  - **Website**: Paste article URL
- Enter a title
- Add content
- Click "Create Document"

### 5. Watch the Magic! (15 seconds)
The AI will:
- ✅ Analyze your content
- ✅ Generate comprehensive notes
- ✅ Create flashcards
- ✅ Build quiz questions

### 6. Study! (Unlimited)
- **Notes Tab**: Read AI-generated summaries
- **Flashcards Tab**: Click cards to flip and memorize
- **Quiz Tab**: Test your knowledge with multiple choice
- **Chat Tab**: Coming soon!

## 💡 Pro Tips

### Content Type Guide

**📝 Text**
- Best for: Lecture notes, textbook passages, study guides
- Example: Copy-paste your class notes
- AI generates: Summary, key points, flashcards, quiz

**🎥 YouTube**
- Best for: Educational videos, lectures, tutorials
- Example: `https://youtube.com/watch?v=dQw4w9WgXcQ`
- AI generates: Video summary, key concepts, study materials

**🖼️ Image**
- Best for: Diagrams, charts, infographics
- Example: `https://example.com/biology-diagram.jpg`
- AI generates: Image description, key elements, quiz

**🌐 Website**
- Best for: Articles, blog posts, research papers
- Example: `https://wikipedia.org/wiki/Photosynthesis`
- AI generates: Article summary, main points, flashcards

### Study Tips

**Flashcards**
- Click to flip between question and answer
- Study in short sessions (10-15 minutes)
- Review regularly for best retention

**Quizzes**
- Take quiz immediately after creating document
- Review explanations for wrong answers
- Retake quiz after studying flashcards

**Notes**
- Read summary first for overview
- Focus on key findings
- Review important notes before exams

## 🎨 Customization

### Profile Avatars
Choose from 13+ emoji avatars:
- 👤 👨 👩 🧑 👦 👧 🧒
- And more!

### Background Colors
Pick from 9 vibrant colors:
- 🔴 Red
- 🟠 Orange
- 🟡 Yellow
- 🟢 Green
- 🔵 Blue
- 🟣 Purple
- 🟤 Brown
- ⚫ Black
- ⚪ White

### Profile Types
- **Adult**: For college students, professionals, lifelong learners
- **Child**: For K-12 students with age-appropriate interface

## 🔧 Troubleshooting

### "Failed to generate notes"
**Problem**: API key not working
**Solution**: 
1. Check `.env.local` has correct key
2. Verify key is active at https://makersuite.google.com
3. Restart dev server (`yarn dev`)

### "No profiles showing"
**Problem**: localStorage cleared
**Solution**: Create a new profile - data is stored locally

### "Onboarding shows every time"
**Problem**: localStorage not persisting
**Solution**: Check browser settings allow localStorage

### "Loading screen stuck"
**Problem**: API request failed
**Solution**: 
1. Check internet connection
2. Verify API key is valid
3. Check browser console for errors

## 📊 Example Use Cases

### High School Student
1. Create profile: "High School Student"
2. Create folder: "AP Biology"
3. Paste YouTube lecture URL
4. Study with generated flashcards
5. Take quiz before test

### College Student
1. Create profile: "Undergraduate Student"
2. Create folder: "Computer Science"
3. Paste textbook chapter text
4. Review AI-generated notes
5. Use flashcards for memorization

### Teacher
1. Create profile: "Teacher"
2. Create folder: "Lesson Plans"
3. Paste article about teaching methods
4. Generate quiz for students
5. Share flashcards with class

### Parent
1. Create profile: "Parent"
2. Create child profile for kid
3. Create folder: "Math Homework"
4. Paste homework problems
5. Help child study with flashcards

## 🎯 Best Practices

### Content Length
- **Minimum**: 100 words for good results
- **Optimal**: 500-2000 words
- **Maximum**: 10,000 words (API limits)

### Content Quality
- Use clear, well-written text
- Include complete sentences
- Avoid excessive formatting
- Focus on educational content

### Organization
- Create separate folders for each subject
- Use descriptive document titles
- Review and update regularly
- Delete outdated materials

### Study Habits
- Create documents right after class
- Review flashcards daily
- Take quizzes weekly
- Update notes as you learn more

## 🚀 Advanced Features

### Multiple Profiles
- Create profiles for different subjects
- Switch between adult and child modes
- Keep work and personal separate
- Share device with family

### Folder Organization
- Group by subject, semester, or topic
- Use consistent naming conventions
- Archive old folders
- Keep active folders at top

### Document Management
- Edit document titles
- Delete outdated documents
- Move documents between folders (coming soon)
- Export documents (coming soon)

## 📱 Mobile Usage

The app works great on mobile!
- Responsive design adapts to screen size
- Touch-friendly buttons
- Swipe-friendly flashcards
- Mobile-optimized layouts

## 🔐 Privacy & Data

### What's Stored Locally
- Your profiles
- Folder structure
- Document content
- AI-generated materials
- Preferences

### What's Sent to AI
- Document content only
- No personal information
- No profile data
- No usage analytics

### Data Security
- All data stored in browser
- No server storage
- No account required
- No tracking

## 🆘 Need Help?

### Common Questions

**Q: Is this free?**
A: Yes! Just need a free Gemini API key.

**Q: Do I need an account?**
A: No! Everything works locally in your browser.

**Q: Can I use offline?**
A: Viewing works offline, but AI generation needs internet.

**Q: Is my data private?**
A: Yes! Data stays in your browser, not on any server.

**Q: Can I export my notes?**
A: Coming soon! Currently view-only.

**Q: Does it work on mobile?**
A: Yes! Fully responsive design.

## 🎉 Ready to Learn!

You're all set! Start creating documents and let AI help you study smarter, not harder.

**Happy Learning! 📚✨**

---

**Need more help?** Check out:
- `README.md` - Full documentation
- `FEATURES.md` - Complete feature list
- `CHECKLIST.md` - Feature verification
