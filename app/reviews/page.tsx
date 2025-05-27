'use client';

import { useState } from 'react';
import Link from 'next/link';

const mockReviews = [
  {
    company: 'Wolters Kluwer',
    position: 'DevOps Software Engineer Co-op',
    location: 'Waltham, MA (Remote)',
    pay: '$27/hr',
    term: 'Spring 2025',
    length: '6 months',
    major: 'Khoury',
    rating: '4.5 / 5',
    interview: 'Went well!',
    description: 'Good experience overall.',
  },
  // Add more mock entries as needed
];

export default function ReviewsPage() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-100 to-pink-50 text-black font-inter px-4 pb-16">
      {/* Header */}
      <header className="w-full px-6 py-5 flex items-center justify-between text-sm text-black relative">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <div className="w-4 h-4 rounded-full bg-black" />
          <span className="text-xl font-medium tracking-tight text-black">
            huskycoops<span className="font-normal">.fyi</span>
          </span>
        </Link>

        <nav className="hidden md:flex gap-6 text-black absolute left-1/2 -translate-x-1/2">
          <Link href="/reviews">Reviews</Link>
          <Link href="/about">About</Link>
          <Link href="/faqs">FAQs</Link>
        </nav>

        <div className="hidden md:flex">
          <Link
            href="/submit"
            className="px-4 py-1.5 rounded-full text-sm transition bg-black text-white hover:bg-zinc-800"
          >
            Submit a Review
          </Link>
        </div>
      </header>

      {/* Search Form */}
      <div className="mt-10 w-full max-w-3xl mx-auto px-4">
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
                <option value="4">4 month</option>
                <option value="6">6 month</option>
                <option value="8">8 month</option>
                <option value="12">12 month</option>
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

      {/* Review List */}
      <div className="max-w-4xl mx-auto space-y-6 mt-10">
        {mockReviews.length === 0 ? (
          <p className="text-center text-zinc-600">No reviews found.</p>
        ) : (
          mockReviews.map((review, index) => (
            <div
              key={index}
              className="bg-white border border-zinc-200 rounded-xl p-6 shadow-md space-y-2"
            >
              <h2 className="text-xl font-semibold">
                {review.company} — {review.position}
              </h2>
              <p><strong>Location:</strong> {review.location}</p>
              <p><strong>Pay:</strong> {review.pay}</p>
              <p><strong>Term:</strong> {review.term}</p>
              <p><strong>Length:</strong> {review.length}</p>
              <p><strong>Major:</strong> {review.major}</p>
              <p><strong>Rating:</strong> {review.rating}</p>
              <h3 className="font-semibold pt-2">Interview Process</h3>
              <p>{review.interview}</p>
              <h3 className="font-semibold pt-2">Review Description</h3>
              <p>{review.description}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
