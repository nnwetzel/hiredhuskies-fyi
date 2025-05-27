'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Page() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-100 to-pink-50 text-black font-inter relative">
      {/* Top Nav */}
      <header className="w-full px-6 py-5 flex justify-between items-center text-sm text-black">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-black" />
          <span className="text-xl font-medium tracking-tight text-black">
            husker<span className="font-normal">.fyi</span>
          </span>
        </div>

        <nav className="hidden md:flex gap-6 text-black">
          <Link href="#">Reviews</Link>
          <Link href="#">About</Link>
          <Link href="#">FAQs</Link>
        </nav>

        <Link
          href="/login"
          className="bg-black text-white px-4 py-1.5 rounded-full text-sm hover:bg-zinc-800 transition"
        >
          Log In
        </Link>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-24 md:pt-36">
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-black">
          Transparent Co-op Reviews
        </h1>
        <p className="text-zinc-600 text-base mt-4 max-w-md">
          Browse reviews. Skip surprises.
        </p>

        {/* Search Form */}
        <div className="mt-10 w-full max-w-3xl px-4">
          <form className="flex flex-col gap-4 items-center justify-center">
            {/* Row: Keywords + Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <input
                type="text"
                placeholder="Keywords"
                className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="text"
                placeholder="Location (e.g. Boston, MA)"
                className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              type="button"
              onClick={() => setShowFilters((prev) => !prev)}
              className="text-sm underline text-zinc-700 hover:text-black transition mt-1"
            >
              {showFilters ? 'Hide Filters' : 'More Filters'}
            </button>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">

                <input
                  type="text"
                  placeholder="Company (e.g. Wolters Kluwer)"
                  className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />

                <input
                  type="text"
                  placeholder="Position Title (e.g. Software Engineer Co-op)"
                  className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />

                <select className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black">
                  <option value="">Pay Range</option>
                  <option value="<20">Under $20/hr</option>
                  <option value="20-30">$20–30/hr</option>
                  <option value=">30">Above $30/hr</option>
                </select>

                <select className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black">
                  <option value="">Academic Major</option>
                  <option value="Bouve">Bouvé College of Health Sciences</option>
                  <option value="AMD">College of Arts, Media & Design</option>
                  <option value="Engineering">College of Engineering</option>
                  <option value="Professional">College of Professional Studies</option>
                  <option value="Science">College of Science</option>
                  <option value="SSH">College of Social Sciences & Humanities</option>
                  <option value="Business">D'Amore-McKim School of Business</option>
                  <option value="Khoury">Khoury College of Computer Sciences</option>
                </select>

                <input
                  type="text"
                  placeholder="Work Term (e.g. Spring 2025)"
                  className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />

                <select className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black">
                  <option value="">Job Length</option>
                  <option value="Bouve">6 month</option>
                  <option value="AMD">4 month</option>
                  <option value="Engineering">8 month</option>
                  <option value="Professional">12 month</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-black text-white rounded-md hover:bg-zinc-800 transition"
            >
              Search
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}