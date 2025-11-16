"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [selectedEducation, setSelectedEducation] = useState<string | null>(null);
  const router = useRouter();
  const totalScreens = 6;

  const progress = ((currentScreen + 1) / totalScreens) * 100;

  const buttonTitles = ["Get Started", "Continue", "Continue", "Continue", "Continue", "Leave a Rating"];

  const nextScreen = () => {
    if (currentScreen === 3 && !selectedEducation) {
      alert("Please select one option that best describes you.");
      return;
    }

    if (currentScreen === 4) {
      if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
      }
    }

    if (currentScreen < totalScreens - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      if (typeof window !== "undefined" && selectedEducation) {
        localStorage.setItem("educationLevel", selectedEducation);
      }
      router.push("/signup");
    }
  };

  const prevScreen = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 z-50">
        <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <div className="fixed top-4 right-4 z-40">
        <Link href="/signup" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600">Skip</Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 pt-12">
        <div className="max-w-4xl w-full">
          {currentScreen === 0 && (
            <div className="text-center animate-fade-in">
              <div className="mb-8">
                <h1 className="text-5xl md:text-6xl font-black mb-4 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Welcome to QuickNote</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Turn your content into powerful study materials</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-3xl mx-auto">
                <div className="p-6 rounded-2xl bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 border-2 border-blue-200 dark:border-blue-800">
                  <span className="material-symbols-outlined text-4xl text-blue-600 mb-2">description</span>
                  <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">Instant Notes</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">AI-powered summaries</p>
                </div>
                <div className="p-6 rounded-2xl bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 border-2 border-purple-200 dark:border-purple-800">
                  <span className="material-symbols-outlined text-4xl text-purple-600 mb-2">style</span>
                  <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">Flashcards</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Interactive learning</p>
                </div>
                <div className="p-6 rounded-2xl bg-linear-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 border-2 border-green-200 dark:border-green-800">
                  <span className="material-symbols-outlined text-4xl text-green-600 mb-2">quiz</span>
                  <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">Quizzes</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Test your knowledge</p>
                </div>
                <div className="p-6 rounded-2xl bg-linear-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50 border-2 border-orange-200 dark:border-orange-800">
                  <span className="material-symbols-outlined text-4xl text-orange-600 mb-2">groups</span>
                  <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">Study Collaborate</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Learn together</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-linear-to-r from-purple-900 to-blue-900 text-white max-w-2xl mx-auto">
                <h3 className="font-bold text-xl mb-2">Say Goodbye to Boring Study Sessions!</h3>
                <p className="text-purple-100">Make learning fun and effective with AI</p>
              </div>
            </div>
          )}

          {currentScreen === 1 && (
            <div className="text-center animate-fade-in">
              <div className="mb-8">
                <span className="material-symbols-outlined text-6xl text-blue-600 mb-4">calculate</span>
                <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">This Adds Up!</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">See how QuickNote transforms your study routine</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 hover:border-blue-500 transition-all">
                  <div className="text-5xl font-black text-blue-600 mb-2">10x</div>
                  <p className="text-gray-600 dark:text-gray-400">Faster Learning</p>
                </div>
                <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 hover:border-purple-500 transition-all">
                  <div className="text-5xl font-black text-purple-600 mb-2">95%</div>
                  <p className="text-gray-600 dark:text-gray-400">Better Retention</p>
                </div>
                <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 hover:border-green-500 transition-all">
                  <div className="text-5xl font-black text-green-600 mb-2">∞</div>
                  <p className="text-gray-600 dark:text-gray-400">Unlimited Content</p>
                </div>
              </div>
            </div>
          )}

          {currentScreen === 2 && (
            <div className="text-center animate-fade-in">
              <div className="mb-8">
                <span className="material-symbols-outlined text-6xl text-purple-600 mb-4">lightbulb</span>
                <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Did You Know?</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Amazing facts about learning with QuickNote</p>
              </div>

              <div className="space-y-4 max-w-3xl mx-auto">
                <div className="p-6 rounded-2xl bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-2 border-blue-200 dark:border-blue-800 text-left">
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-3xl text-blue-600">auto_awesome</span>
                    <div>
                      <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">AI-Powered Intelligence</h3>
                      <p className="text-gray-600 dark:text-gray-400">Our AI analyzes your content and creates personalized study materials in seconds</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-linear-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-2 border-purple-200 dark:border-purple-800 text-left">
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-3xl text-purple-600">psychology</span>
                    <div>
                      <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">Science-Backed Methods</h3>
                      <p className="text-gray-600 dark:text-gray-400">Based on proven learning techniques like spaced repetition and active recall</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-linear-to-r from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30 border-2 border-green-200 dark:border-green-800 text-left">
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-3xl text-green-600">trending_up</span>
                    <div>
                      <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">Track Your Progress</h3>
                      <p className="text-gray-600 dark:text-gray-400">Monitor your learning journey with detailed analytics and insights</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentScreen === 3 && (
            <div className="text-center animate-fade-in">
              <div className="mb-8">
                <span className="material-symbols-outlined text-6xl text-blue-600 mb-4">school</span>
                <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">What Best Describes You?</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Help us personalize your experience</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {[
                  { id: "elementary", icon: "child_care", label: "Elementary Student" },
                  { id: "middle", icon: "school", label: "Middle School" },
                  { id: "high", icon: "menu_book", label: "High School" },
                  { id: "college", icon: "school", label: "College/University" },
                  { id: "professional", icon: "work", label: "Professional" },
                  { id: "lifelong", icon: "auto_stories", label: "Lifelong Learner" },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedEducation(option.id)}
                    className={`p-6 rounded-2xl border-2 transition-all text-left ${
                      selectedEducation === option.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                        : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-white dark:bg-gray-900"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-3xl text-blue-600">{option.icon}</span>
                      <span className="font-semibold text-lg text-gray-900 dark:text-white">{option.label}</span>
                      {selectedEducation === option.id && (
                        <span className="material-symbols-outlined text-blue-600 ml-auto">check_circle</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentScreen === 4 && (
            <div className="text-center animate-fade-in">
              <div className="mb-8">
                <span className="material-symbols-outlined text-6xl text-blue-600 mb-4">notifications_active</span>
                <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Stay on Track</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Enable notifications to never miss your study sessions</p>
              </div>

              <div className="max-w-2xl mx-auto space-y-6">
                <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800">
                  <div className="flex items-start gap-4 text-left">
                    <span className="material-symbols-outlined text-3xl text-blue-600">schedule</span>
                    <div>
                      <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">Study Reminders</h3>
                      <p className="text-gray-600 dark:text-gray-400">Get timely reminders for your scheduled study sessions</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800">
                  <div className="flex items-start gap-4 text-left">
                    <span className="material-symbols-outlined text-3xl text-purple-600">celebration</span>
                    <div>
                      <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">Achievement Alerts</h3>
                      <p className="text-gray-600 dark:text-gray-400">Celebrate your progress and milestones</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800">
                  <div className="flex items-start gap-4 text-left">
                    <span className="material-symbols-outlined text-3xl text-green-600">tips_and_updates</span>
                    <div>
                      <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">Learning Tips</h3>
                      <p className="text-gray-600 dark:text-gray-400">Receive personalized tips to improve your learning</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentScreen === 5 && (
            <div className="text-center animate-fade-in">
              <div className="mb-8">
                <span className="material-symbols-outlined text-6xl text-yellow-500 mb-4">star</span>
                <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Enjoying QuickNote?</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Your feedback helps us improve and reach more learners</p>
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="p-8 rounded-2xl bg-linear-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 border-2 border-yellow-200 dark:border-yellow-800">
                  <div className="flex justify-center gap-2 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="material-symbols-outlined text-5xl text-yellow-500 fill">star</span>
                    ))}
                  </div>
                  <h3 className="font-bold text-2xl mb-2 text-gray-900 dark:text-white">Rate Us 5 Stars!</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Help other students discover QuickNote</p>
                  <button className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-colors">Leave a Review</button>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 justify-center mt-12">
            {currentScreen > 0 && (
              <button onClick={prevScreen} className="btn-secondary">
                <span className="material-symbols-outlined mr-2">arrow_back</span>
                Back
              </button>
            )}
            <button onClick={nextScreen} className="btn-primary btn-lg">
              {buttonTitles[currentScreen]}
              {currentScreen < totalScreens - 1 && (
                <span className="material-symbols-outlined ml-2">arrow_forward</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
