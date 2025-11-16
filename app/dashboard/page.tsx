"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { generateContentFromSource, getSourceTypeLabel } from "../lib/mockAI";
import { ProcessingModal } from "../components/ProcessingModal";

const avatarColors: Record<string, string> = {
  "avatar-1": "from-blue-400 to-purple-400",
  "avatar-2": "from-green-400 to-teal-400",
  "avatar-3": "from-orange-400 to-red-400",
  "avatar-4": "from-pink-400 to-rose-400",
  "avatar-5": "from-yellow-400 to-orange-400",
  "avatar-6": "from-indigo-400 to-blue-400",
};

const contentIcons: Record<string, string> = {
  notes: "description",
  flashcards: "style",
  quiz: "quiz",
};

interface Profile {
  id: number;
  name: string;
  type: string;
  avatar: string;
}

interface ContentItem {
  id: number;
  title: string;
  description: string;
  type: string;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [contentType, setContentType] = useState("url");
  const [contentInput, setContentInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentProfile = localStorage.getItem("currentProfile");
      if (!currentProfile) {
        router.push("/profile-selection");
        return;
      }
      setProfile(JSON.parse(currentProfile));

      const profileData = JSON.parse(currentProfile);
      const storedContent = localStorage.getItem(`content_${profileData.id}`);
      if (storedContent) {
        setContent(JSON.parse(storedContent));
      } else {
        const demoContent = [
          {
            id: Date.now(),
            title: "Introduction to Psychology",
            description: "Comprehensive notes on the fundamentals of psychology",
            type: "notes",
            createdAt: new Date().toISOString(),
          },
          {
            id: Date.now() + 1,
            title: "History of Rome Flashcards",
            description: "50 flashcards covering key events and figures from the Roman Empire",
            type: "flashcards",
            createdAt: new Date(Date.now() - 86400000).toISOString(),
          },
          {
            id: Date.now() + 2,
            title: "Biology 101 Quiz",
            description: "A 20-question quiz on cellular biology",
            type: "quiz",
            createdAt: new Date(Date.now() - 172800000).toISOString(),
          },
        ];
        setContent(demoContent);
        localStorage.setItem(`content_${profileData.id}`, JSON.stringify(demoContent));
      }
    }
  }, [router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setContentInput(file.name);
    }
  };

  const generateContent = async () => {
    if (!contentInput.trim() && !selectedFile) return;

    setIsProcessing(true);

    try {
      const source = selectedFile || contentInput;
      const sourceText = selectedFile ? selectedFile.name : contentInput;

      // Call mock AI to generate content
      const generated = await generateContentFromSource(
        contentType as "url" | "pdf" | "youtube" | "image",
        source
      );

      // Create content items for each type
      const timestamp = Date.now();
      const sourceLabel = getSourceTypeLabel(contentType);

      const newItems: ContentItem[] = [
        {
          id: timestamp,
          title: `Notes: ${sourceText.substring(0, 30)}...`,
          description: `AI-generated notes from ${sourceLabel}`,
          type: "notes",
          createdAt: new Date().toISOString(),
        },
        {
          id: timestamp + 1,
          title: `Flashcards: ${sourceText.substring(0, 30)}...`,
          description: `${generated.flashcards.length} flashcards from ${sourceLabel}`,
          type: "flashcards",
          createdAt: new Date().toISOString(),
        },
        {
          id: timestamp + 2,
          title: `Quiz: ${sourceText.substring(0, 30)}...`,
          description: `${generated.quiz.length} questions from ${sourceLabel}`,
          type: "quiz",
          createdAt: new Date().toISOString(),
        },
      ];

      const updatedContent = [...newItems, ...content];
      setContent(updatedContent);

      if (profile && typeof window !== "undefined") {
        localStorage.setItem(`content_${profile.id}`, JSON.stringify(updatedContent));
      }

      setContentInput("");
      setSelectedFile(null);
    } catch (error) {
      console.error("Error generating content:", error);
      alert("Failed to generate content. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  if (!profile) return null;

  return (
    <>
      <ProcessingModal
        isOpen={isProcessing}
        message="Analyzing your content and generating study materials..."
      />

      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        <aside className={`${sidebarExpanded ? "w-64" : "w-20"} bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 hidden md:flex flex-col transition-all duration-300`}>
          <div className="flex h-full flex-col justify-between p-4">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center rounded-lg w-10 h-10">
                    <span className="material-symbols-outlined">auto_stories</span>
                  </div>
                  {sidebarExpanded && <h1 className="text-lg font-bold text-gray-900 dark:text-white">QuickNote</h1>}
                </div>
                <button onClick={() => setSidebarExpanded(!sidebarExpanded)} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  <span className="material-symbols-outlined">menu_open</span>
                </button>
              </div>

              <div className="flex items-center gap-3 p-2">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${avatarColors[profile.avatar]} shrink-0`} />
                {sidebarExpanded && (
                  <div className="flex flex-col">
                    <h1 className="text-sm font-medium text-gray-900 dark:text-white">{profile.name}</h1>
                    <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">{profile.type}</p>
                  </div>
                )}
              </div>

              <nav className="flex flex-col gap-1 mt-4">
                <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                  <span className="material-symbols-outlined fill">home</span>
                  {sidebarExpanded && <p className="text-sm font-medium">Dashboard</p>}
                </Link>
                <Link href="/notes" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400">
                  <span className="material-symbols-outlined">description</span>
                  {sidebarExpanded && <p className="text-sm font-medium">All Notes</p>}
                </Link>
                <Link href="/flashcards" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400">
                  <span className="material-symbols-outlined">style</span>
                  {sidebarExpanded && <p className="text-sm font-medium">All Flashcards</p>}
                </Link>
                <Link href="/quizzes" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400">
                  <span className="material-symbols-outlined">quiz</span>
                  {sidebarExpanded && <p className="text-sm font-medium">All Quizzes</p>}
                </Link>
              </nav>
            </div>

            <div className="flex flex-col gap-4">
              <Link href="/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400">
                <span className="material-symbols-outlined">settings</span>
                {sidebarExpanded && <p className="text-sm font-medium">Settings</p>}
              </Link>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-6 lg:px-10 py-8 w-full max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-between gap-3 p-4 mb-6">
              <div className="flex min-w-72 flex-col gap-3">
                <h1 className="text-4xl font-black text-gray-900 dark:text-white">What do you want to learn today?</h1>
                <p className="text-gray-600 dark:text-gray-400">Generate notes, flashcards, and quizzes from any content</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 mb-8 border border-gray-200 dark:border-gray-800">
              <div className="flex flex-col sm:flex-row h-auto sm:h-12 w-full items-center rounded-xl bg-gray-100 dark:bg-gray-800 p-1.5 gap-2 sm:gap-0 mb-6">
                {["url", "pdf", "youtube", "image"].map((type) => (
                  <label key={type} className="flex cursor-pointer h-full grow items-center justify-center rounded-lg px-3 py-2 sm:py-0 w-full has-checked:bg-white has-checked:dark:bg-gray-900 has-checked:shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300">
                    <span className="capitalize">From {type === "url" ? "URL" : type === "youtube" ? "YouTube" : type.toUpperCase()}</span>
                    <input type="radio" name="content-type" value={type} checked={contentType === type} onChange={(e) => setContentType(e.target.value)} className="hidden" />
                  </label>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {contentType === "url" || contentType === "youtube" ? (
                  <input
                    type="text"
                    value={contentInput}
                    onChange={(e) => setContentInput(e.target.value)}
                    placeholder={contentType === "url" ? "Paste URL here..." : "Paste YouTube URL here..."}
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="flex-1 relative">
                    <input
                      type="file"
                      id="file-upload"
                      accept={contentType === "pdf" ? ".pdf" : "image/*"}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex items-center justify-between w-full px-4 py-3 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:border-blue-500 dark:hover:border-blue-500 cursor-pointer transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-gray-400">upload_file</span>
                        <span className="text-sm">
                          {selectedFile ? selectedFile.name : `Click to upload ${contentType.toUpperCase()}`}
                        </span>
                      </span>
                      {selectedFile && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedFile(null);
                            setContentInput("");
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                      )}
                    </label>
                  </div>
                )}
                <button
                  onClick={generateContent}
                  disabled={!contentInput.trim() && !selectedFile}
                  className="btn-primary px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Generate
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Library</h2>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="w-full sm:w-64">
                  <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                    <span className="material-symbols-outlined text-gray-600 dark:text-gray-400 pl-3">search</span>
                    <input type="text" placeholder="Search your library..." className="flex-1 px-3 py-2 bg-transparent text-gray-900 dark:text-white focus:outline-none text-sm" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.map((item) => (
                <div key={item.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-md p-1.5">
                        <span className="material-symbols-outlined">{contentIcons[item.type]}</span>
                      </div>
                      <h3 className="text-base font-semibold flex-1 truncate text-gray-900 dark:text-white">{item.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{item.description}</p>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-800 px-5 py-3 flex justify-between items-center">
                    <span className="text-xs text-gray-600 dark:text-gray-400">{formatDate(item.createdAt)}</span>
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 p-1 rounded">
                        <span className="material-symbols-outlined text-lg">visibility</span>
                      </button>
                      <button className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 rounded">
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
