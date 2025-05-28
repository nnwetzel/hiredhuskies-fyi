'use client';

import Header from '@/app/components/Header';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-100 to-pink-50 text-black font-inter">
      <Header />

      <div className="max-w-3xl mx-auto px-6 py-24 space-y-8">
        <h1 className="text-4xl font-bold text-center">About huskycoops.fyi</h1>

        <p className="text-lg leading-relaxed text-zinc-800">
          Co-ops are a core part of the Northeastern experience — but students often walk into roles with little idea what to expect. I created <strong>huskycoops.fyi</strong> to bring transparency to the process.
        </p>

        <p className="text-lg leading-relaxed text-zinc-800">
          This site is a student-built initiative to help others make more informed decisions about where to apply, what interviews are like, how teams operate, and what kind of mentorship or responsibilities you might encounter.
        </p>

        <p className="text-lg leading-relaxed text-zinc-800">
          Every review includes details about the role, pay, term length, academic major, and — most importantly — the <strong>interview process</strong> and <strong>on-the-job experience</strong>. The goal is to share honest insight from students who’ve been there.
        </p>

        <p className="text-lg leading-relaxed text-zinc-800">
          If you’ve completed a co-op, please consider <a href="/submit" className="underline hover:text-black font-medium">submitting a review</a>. It helps everyone.
        </p>

        <p className="text-sm text-zinc-500 text-center mt-10">
          Built by students, for students — huskycoops.fyi is not affiliated with Northeastern University.
        </p>
      </div>
    </main>
  );
}