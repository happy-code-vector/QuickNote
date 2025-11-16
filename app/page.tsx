import Link from "next/link";
import { Header } from "./components/Header";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white dark:bg-gray-950">
      <Header />

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 text-gray-900 dark:text-white">
                Turn Any Content Into Study Materials
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
                Upload articles, videos, PDFs, or images and instantly generate flashcards, quizzes, and notes powered by AI to accelerate your learning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/onboarding" className="btn-primary btn-lg">Start Learning Free</Link>
                <a href="#how-it-works" className="btn-secondary btn-lg">See How It Works</a>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="aspect-video rounded-2xl bg-linear-to-br from-blue-100 via-purple-100 to-indigo-200 dark:from-blue-900/50 dark:via-purple-900/50 dark:to-indigo-900/50 shadow-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Powerful Learning Tools</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Transform your study materials into effective learning resources with AI
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="feature-card">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-blue-600">upload_file</span>
              </div>
              <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Flexible Uploads</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Support for URLs, PDFs, YouTube videos, images, and more
              </p>
            </div>
            <div className="feature-card">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-blue-600">style</span>
              </div>
              <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Smart Flashcards</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                AI-generated flashcards to test and reinforce your knowledge
              </p>
            </div>
            <div className="feature-card">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-blue-600">quiz</span>
              </div>
              <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Interactive Quizzes</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Create challenging quizzes to prepare for any exam
              </p>
            </div>
            <div className="feature-card">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-blue-600">description</span>
              </div>
              <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Smart Notes</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get summarized, key-point notes from any document
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">How It Works</h3>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center font-bold text-lg">1</div>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Upload Your Content</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Provide a link, PDF, YouTube video, or image of your study material
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center font-bold text-lg">2</div>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">AI Generates Materials</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Our AI analyzes your content and creates flashcards, quizzes, and notes
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center font-bold text-lg">3</div>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Start Learning</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Use your personalized study materials to learn smarter, not harder
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-50 dark:bg-blue-950/30">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Ready to Transform Your Learning?</h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Join thousands of students who are already studying more effectively
          </p>
          <Link href="/onboarding" className="btn-primary btn-lg">Get Started for Free</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2024 QuickNote. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/terms" className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Terms of Service</Link>
              <Link href="/privacy" className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
