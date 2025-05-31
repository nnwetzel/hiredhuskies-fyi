'use client';

import Header from '@/app/components/Header';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-white to-rose-50 text-black font-sans">
      <Header />

      <div className="max-w-3xl mx-auto px-6 py-24 space-y-8">
        <h1 className="text-4xl font-serif font-bold text-center">About hiredhuskies.fyi</h1>

        <p className="text-lg leading-relaxed text-zinc-800">
          Co-ops are a core part of the Northeastern experience — but students often walk into roles with little idea what to expect. I created <span className="font-semibold">hiredhuskies.fyi</span> to bring transparency to the process.
        </p>

        <p className="text-lg leading-relaxed text-zinc-800">
          This site is a student-built initiative to help others make more informed decisions about where to apply, what interviews are like, how teams operate, and what kind of mentorship or responsibilities you might encounter.
        </p>

        <p className="text-lg leading-relaxed text-zinc-800">
          Every review includes details about the role, pay, term length, academic major, and — most importantly — the <span className="font-semibold">interview process</span> and <span className="font-semibold">on-the-job experience</span>. The goal is to share honest insight from students who’ve been there.
        </p>

        <p className="text-lg leading-relaxed text-zinc-800">
          If you’ve completed a co-op, please consider <a href="/submit" className="underline hover:text-black font-medium">submitting a review</a>. It helps everyone.
        </p>

        <p className="text-sm text-zinc-500 text-center mt-10">
          Built by students, for students — hiredhuskies.fyi is not affiliated with Northeastern University.
        </p>
      </div>
    </main>
  );
}