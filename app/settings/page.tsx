"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "../components/ThemeProvider";

export default function SettingsPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [profile, setProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"general" | "billing" | "notifications" | "account">("general");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentProfile = localStorage.getItem("currentProfile");
      if (!currentProfile) {
        router.push("/profile-selection");
        return;
      }
      setProfile(JSON.parse(currentProfile));
    }
  }, [router]);

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your account and preferences</p>
          </div>
          <Link href="/dashboard" className="btn-secondary">
            <span className="material-symbols-outlined mr-2">arrow_back</span>
            Back to Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-2">
              <button
                onClick={() => setActiveTab("general")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === "general"
                    ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <span className="material-symbols-outlined">settings</span>
                <span className="font-medium">General</span>
              </button>
              <button
                onClick={() => setActiveTab("billing")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === "billing"
                    ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <span className="material-symbols-outlined">credit_card</span>
                <span className="font-medium">Billing</span>
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === "notifications"
                    ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <span className="material-symbols-outlined">notifications</span>
                <span className="font-medium">Notifications</span>
              </button>
              <button
                onClick={() => setActiveTab("account")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === "account"
                    ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <span className="material-symbols-outlined">person</span>
                <span className="font-medium">Account</span>
              </button>
            </nav>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* General Tab */}
            {activeTab === "general" && (
              <>
                {/* Appearance */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Appearance</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Customize how QuickNote looks</p>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Theme</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Choose your preferred theme</p>
                      </div>
                      <button
                        onClick={toggleTheme}
                        className="relative inline-flex h-12 w-24 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors"
                      >
                        <span
                          className={`flex h-10 w-10 transform rounded-full bg-white dark:bg-gray-900 shadow-lg transition-transform items-center justify-center ${
                            theme === "dark" ? "translate-x-12" : "translate-x-1"
                          }`}
                        >
                          <span className="material-symbols-outlined text-yellow-500 dark:text-blue-400">
                            {theme === "dark" ? "dark_mode" : "light_mode"}
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Language */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Language & Region</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Set your language preferences</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Language</label>
                      <select className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>English (US)</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Billing Tab */}
            {activeTab === "billing" && (
              <>
                {/* Current Plan */}
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold">Free Plan</h2>
                      <p className="text-blue-100 mt-1">Perfect for getting started</p>
                    </div>
                    <span className="material-symbols-outlined text-5xl opacity-20">workspace_premium</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-blue-100">/month</span>
                  </div>
                  <button className="w-full bg-white text-blue-600 font-semibold py-3 rounded-lg hover:bg-blue-50 transition-colors">
                    Upgrade to Pro
                  </button>
                </div>

                {/* Plan Features */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Plan Features</h2>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-green-600">check_circle</span>
                      <span className="text-gray-700 dark:text-gray-300">10 documents per month</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-green-600">check_circle</span>
                      <span className="text-gray-700 dark:text-gray-300">Basic AI features</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-gray-400">cancel</span>
                      <span className="text-gray-400 line-through">Unlimited documents</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-gray-400">cancel</span>
                      <span className="text-gray-400 line-through">Advanced AI models</span>
                    </div>
                  </div>
                </div>

                {/* Billing History */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Billing History</h2>
                  </div>
                  <div className="p-6">
                    <p className="text-center text-gray-500 dark:text-gray-400 py-8">No billing history yet</p>
                  </div>
                </div>
              </>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Notification Preferences</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage how you receive notifications</p>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    { title: "Email Notifications", desc: "Receive updates via email" },
                    { title: "Content Generation Complete", desc: "Notify when AI finishes processing" },
                    { title: "Weekly Summary", desc: "Get a weekly report of your activity" },
                    { title: "Tips & Tricks", desc: "Learn new ways to use QuickNote" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={index < 2} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Account Tab */}
            {activeTab === "account" && (
              <>
                {/* Profile Information */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile Information</h2>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Name</label>
                      <input
                        type="text"
                        value={profile.name}
                        readOnly
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Profile Type</label>
                      <input
                        type="text"
                        value={profile.type}
                        readOnly
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white capitalize"
                      />
                    </div>
                  </div>
                </div>

                {/* Profile Actions */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile Actions</h2>
                  </div>
                  <div className="p-6 space-y-3">
                    <Link href="/profile-selection" className="btn-secondary w-full flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined">swap_horiz</span>
                      Switch Profile
                    </Link>
                    <Link href="/create-profile" className="btn-secondary w-full flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined">add</span>
                      Create New Profile
                    </Link>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-red-50 dark:bg-red-950/20 rounded-xl border-2 border-red-200 dark:border-red-900/50 overflow-hidden">
                  <div className="p-6 border-b border-red-200 dark:border-red-900/50">
                    <h2 className="text-xl font-bold text-red-900 dark:text-red-400">Danger Zone</h2>
                    <p className="text-sm text-red-700 dark:text-red-400 mt-1">Irreversible actions</p>
                  </div>
                  <div className="p-6">
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined">delete_forever</span>
                      Delete Profile
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
