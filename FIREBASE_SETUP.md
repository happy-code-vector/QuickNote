# Firebase Setup Guide

This guide explains how to set up Firebase for the QuickNote web app to enable cloud sync and cross-device subscriptions (matching the iOS app implementation).

## Why Firebase?

The iOS app uses Firebase Firestore to store:
- User subscription data
- Promo codes
- Cross-device sync

The web app now supports the same Firebase backend for consistency.

## Setup Steps

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name (e.g., "QuickNote")
4. Disable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in production mode"
4. Select a location (choose same as iOS app if applicable)
5. Click "Enable"

### 3. Set Up Firestore Security Rules

Go to "Firestore Database" → "Rules" and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && 
                           request.auth.token.email.replace('@', '_').replace('.', '_') == userId;
    }
  }
}
```

### 4. Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll to "Your apps"
3. Click the web icon (`</>`)
4. Register app with nickname "QuickNote Web"
5. Copy the configuration object

### 5. Add Configuration to .env.local

Create `quicknote-nextjs/.env.local` and add:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

## Features Enabled

### ✅ Cloud Sync
- Subscriptions sync across devices
- User data backed up to cloud
- Offline support with localStorage fallback

### ✅ Promo Codes
- Apply promo codes for free Pro access
- 1 month free trial via promo
- Tracked in Firestore

### ✅ Cross-Platform Compatibility
- Same database as iOS app
- Shared user accounts
- Consistent subscription status

## Firestore Data Structure

```javascript
users/{email_with_underscores}/
  {
    email: "user@example.com",
    subscriptions: {
      monthly: { active: false, renewalDate: null },
      yearly: { active: false, renewalDate: null },
      yearlyOffer: { active: false, renewalDate: null }
    },
    promoApplied: "PROMO2024",
    promoAppliedAt: Timestamp,
    promoExpiresAt: Timestamp,
    freePlanActive: true,
    freePlanExpiresAt: Timestamp,
    isLocked: false,
    createdAt: Timestamp,
    lastLoginAt: Timestamp
  }
```

## Testing Without Firebase

The app works without Firebase configuration:
- Falls back to localStorage only
- No cloud sync
- Promo codes won't work
- Single-device only

## Troubleshooting

### "Firebase not configured" message
- Check `.env.local` has all Firebase variables
- Restart dev server after adding env variables
- Verify variables start with `NEXT_PUBLIC_`

### Firestore permission denied
- Check security rules are set correctly
- Ensure user email matches document ID format
- Email format: `user@example.com` → `user_example_com`

### Data not syncing
- Check browser console for errors
- Verify Firebase project is active
- Check Firestore usage limits (free tier: 50K reads/day)

## Production Deployment

1. Add Firebase config to production environment variables
2. Update Firestore security rules for production
3. Enable Firebase Authentication if needed
4. Monitor usage in Firebase Console

## Cost

Firebase Free Tier includes:
- 50,000 document reads/day
- 20,000 document writes/day
- 1 GB storage

This is sufficient for most small to medium apps.
