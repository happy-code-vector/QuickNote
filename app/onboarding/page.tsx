"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const router = useRouter();
  const totalScreens = 3;

  const progress = (currentScreen / totalScreens) * 100;

  const nextScreen = () => {
    if (currentScreen < totalScreens) {
      setCurrentScreen(currentScreen + 1);
    } else {
      router.push("/signup");
    }
  };

  const prevScreen = () => {
    if (currentScreen > 1) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-border-light dark:bg-border-dark z-50">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Skip Button */}
      <div className="fixed top-4 right-4 z-40">
        <Link
          href="/signup"
          className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark hover:text-primary"
        >
          Skip
        </Link>
      </div>

      {/* Onboarding Screens */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          {/* Screen 1: Welcome */}
          {currentScreen === 1 && (
            <div className="text-center animate-fade-in">
              <div className="mb-8 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: "48px" }}>
                    auto_awesome
                  </span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-4">Welcome to QuickNote</h1>
              <p className="text-lg text-text-muted-light dark:text-text-muted-dark mb-8 max-w-lg mx-auto">
                Transform any content into personalized study materials with the power of AI
              </p>
              <button onClick={nextScreen} className="btn-primary btn-lg">
                Get Started
                <span className="material-symbols-outlined ml-2">arrow_forward</span>
              </button>
            </div>
          )}

          {/* Screen 2: Features */}
          {currentScreen === 2 && (
            <div className="text-center animate-fade-in">
              <div className="mb-8 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: "48px" }}>
                    school
                  </span>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Learn Smarter, Not Harder</h2>
              <p className="text-lg text-text-muted-light dark:text-text-muted-dark mb-8 max-w-lg mx-auto">
                Upload PDFs, videos, or web pages and instantly get flashcards, quizzes, and notes
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-6 rounded-xl bg-white dark:bg-card-dark border border-border-light dark:border-border-dark">
                  <span className="material-symbols-outlined text-primary text-4xl mb-2">style</span>
                  <h3 className="font-bold mb-1">Flashcards</h3>
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                    Interactive study cards
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-white dark:bg-card-dark border border-border-light dark:border-border-dark">
                  <span className="material-symbols-outlined text-primary text-4xl mb-2">quiz</span>
                  <h3 className="font-bold mb-1">Quizzes</h3>
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                    Test your knowledge
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-white dark:bg-card-dark border border-border-light dark:border-border-dark">
                  <span className="material-symbols-outlined text-primary text-4xl mb-2">description</span>
                  <h3 className="font-bold mb-1">Notes</h3>
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                    Smart summaries
                  </p>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <button onClick={prevScreen} className="btn-secondary">
                  <span className="material-symbols-outlined mr-2">arrow_back</span>
                  Back
                </button>
                <button onClick={nextScreen} className="btn-primary">
                  Continue
                  <span className="material-symbols-outlined ml-2">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* Screen 3: Multi-Profile */}
          {currentScreen === 3 && (
            <div className="text-center animate-fade-in">
              <div className="mb-8 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: "48px" }}>
                    group
                  </span>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Perfect for Everyone</h2>
              <p className="text-lg text-text-muted-light dark:text-text-muted-dark mb-8 max-w-lg mx-auto">
                Create multiple profiles for different family members or study subjects
              </p>
              <div className="flex justify-center gap-6 mb-8">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 mb-2"></div>
                  <p className="text-sm font-medium">Student</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-teal-400 mb-2"></div>
                  <p className="text-sm font-medium">Parent</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-red-400 mb-2"></div>
                  <p className="text-sm font-medium">Teacher</p>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <button onClick={prevScreen} className="btn-secondary">
                  <span className="material-symbols-outlined mr-2">arrow_back</span>
                  Back
                </button>
                <Link href="/signup" className="btn-primary">
                  Create Account
                  <span className="material-symbols-outlined ml-2">arrow_forward</span>
                </Link>
              </div>
              <p className="mt-6 text-sm text-text-muted-light dark:text-text-muted-dark">
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-semibold hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
