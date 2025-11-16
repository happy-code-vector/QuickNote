"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const avatarColors = [
  "from-blue-400 to-purple-400",
  "from-green-400 to-teal-400",
  "from-orange-400 to-red-400",
  "from-pink-400 to-rose-400",
  "from-yellow-400 to-orange-400",
  "from-indigo-400 to-blue-400",
];

export default function CreateProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    avatar: "avatar-1",
    name: "",
    type: "student",
    gradeLevel: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (typeof window !== "undefined") {
      const profiles = JSON.parse(localStorage.getItem("profiles") || "[]");
      const newProfile = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
      profiles.push(newProfile);
      localStorage.setItem("profiles", JSON.stringify(profiles));
      localStorage.setItem("currentProfile", JSON.stringify(newProfile));
    }
    
    router.push("/profile-selection");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Create Your Profile</h1>
          <p className="text-text-muted-light dark:text-text-muted-dark">
            Personalize your learning experience
          </p>
        </div>

        <div className="bg-white dark:bg-card-dark rounded-2xl shadow-lg p-8 border border-border-light dark:border-border-dark">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Avatar Selection */}
              <div>
                <label className="block text-sm font-medium mb-4">Choose Avatar</label>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                  {avatarColors.map((color, index) => (
                    <label key={index} className="cursor-pointer">
                      <input
                        type="radio"
                        name="avatar"
                        value={`avatar-${index + 1}`}
                        checked={formData.avatar === `avatar-${index + 1}`}
                        onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                        className="hidden peer"
                      />
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${color} peer-checked:ring-4 peer-checked:ring-primary transition-all`}
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Profile Name */}
              <div>
                <label className="block text-sm font-medium mb-2">Profile Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="e.g., Sarah, Math Studies, etc."
                />
              </div>

              {/* Profile Type */}
              <div>
                <label className="block text-sm font-medium mb-3">Profile Type</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="profile-type"
                      value="student"
                      checked={formData.type === "student"}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="hidden peer"
                    />
                    <div className="p-4 rounded-lg border-2 border-border-light dark:border-border-dark peer-checked:border-primary peer-checked:bg-primary/5 transition-all">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">school</span>
                        <div>
                          <p className="font-semibold">Student</p>
                          <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                            For learners
                          </p>
                        </div>
                      </div>
                    </div>
                  </label>
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="profile-type"
                      value="parent"
                      checked={formData.type === "parent"}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="hidden peer"
                    />
                    <div className="p-4 rounded-lg border-2 border-border-light dark:border-border-dark peer-checked:border-primary peer-checked:bg-primary/5 transition-all">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">family_restroom</span>
                        <div>
                          <p className="font-semibold">Parent</p>
                          <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                            For families
                          </p>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Grade Level */}
              <div>
                <label className="block text-sm font-medium mb-2">Grade Level (Optional)</label>
                <select
                  value={formData.gradeLevel}
                  onChange={(e) => setFormData({ ...formData, gradeLevel: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">Select grade level</option>
                  <option value="elementary">Elementary</option>
                  <option value="middle">Middle School</option>
                  <option value="high">High School</option>
                  <option value="college">College</option>
                  <option value="adult">Adult Learner</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                type="button"
                onClick={() => router.push("/profile-selection")}
                className="flex-1 btn-secondary"
              >
                Skip for Now
              </button>
              <button type="submit" className="flex-1 btn-primary">
                Create Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
