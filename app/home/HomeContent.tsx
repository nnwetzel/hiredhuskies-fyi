'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';

export default function HomeContent() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (search) query.set('search', search.trim());
    query.set('_ts', Date.now().toString());
    router.push(`/reviews?${query.toString()}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-white to-rose-50 text-black font-sans">
      <Header />
      <section className="flex flex-col items-center justify-center text-center px-6 pt-24 md:pt-36">
      <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight text-black flex items-center justify-center">
        Transparent Co-op Reviews
        <span className="ml-2 inline-block w-2 h-2 rotate-45 bg-red-500 rounded-sm translate-y-4" />
      </h1>

        <p className="text-zinc-600 text-base mt-4 max-w-md font-sans">
          Browse reviews. Skip surprises.
        </p>

        <div className="mt-10 w-full max-w-2xl px-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center justify-center">
            <input
              type="text"
              name="search"
              placeholder="Keywords (e.g. company, position, term)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="mt-2 px-6 py-2 bg-black text-white rounded-md hover:bg-zinc-800 transition"
            >
              Search
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}