'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/app/components/Header';
import Image from 'next/image';

const mockReviews = [
  {
    company: 'Wolters Kluwer',
    logo: '/logos/wk.png',
    position: 'DevOps Software Engineer Co-op',
    location: 'Waltham, MA (Remote)',
    pay: '$27/hr',
    term: 'Spring 2025',
    length: '6 months',
    major: 'Khoury College of Computer Sciences',
    rating: '4.5 / 5',
    interview: 'Went well!',
    description: 'Good experience overall.',
  },
];

export default function ReviewsPageContent() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    company: '',
    position: '',
    pay: '',
    major: '',
    term: '',
    length: '',
  });

  useEffect(() => {
    const query = Object.fromEntries(searchParams.entries());
    setSearch(query.search || '');
    setFilters((prev) => ({
      ...prev,
      ...query,
    }));
  }, [searchParams]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredReviews = mockReviews.filter((review) => {
    const match = review.pay.match(/\$(\d+)/);
    const hourly = match ? parseInt(match[1]) : 0;
    const payMatch =
      filters.pay === '' ||
      (filters.pay === '$20' && hourly < 20) ||
      (filters.pay === '$30' && hourly >= 20 && hourly <= 30) ||
      (filters.pay === '$40' && hourly > 30);

    return (
      (search === '' ||
        [
          review.company,
          review.position,
          review.location,
          review.major,
          review.term,
          review.length,
          review.description,
          review.interview,
          review.pay,
          review.pay.match(/\d+/g)?.join(' ') ?? '',
          review.rating,
          review.rating.match(/[\d.]+/g)?.join(' ') ?? '',
        ]
          .join(' ')
          .toLowerCase()
          .includes(search.toLowerCase())) &&
      (filters.location === '' || review.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.company === '' || review.company.toLowerCase().includes(filters.company.toLowerCase())) &&
      (filters.position === '' || review.position.toLowerCase().includes(filters.position.toLowerCase())) &&
      payMatch &&
      (filters.major === '' || review.major.toLowerCase().includes(filters.major.toLowerCase())) &&
      (filters.term === '' || review.term.toLowerCase().includes(filters.term.toLowerCase())) &&
      (filters.length === '' || review.length.includes(filters.length))
    );
  },

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-100 to-pink-50 text-black font-inter relative">
      <Header />

      <div className="mt-10 w-full max-w-6xl px-4 mx-auto">
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col md:flex-row md:items-end md:space-x-4 gap-4">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Keywords"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="text"
              placeholder="Location (e.g. Boston, MA)"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="flex flex-col gap-2 md:gap-1 md:items-center">
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-md hover:bg-zinc-800 transition w-full md:w-auto"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="max-w-4xl mx-auto space-y-6 mt-10 px-4">
        {filteredReviews.length === 0 ? (
          <p className="text-center text-zinc-600">No reviews found.</p>
        ) : (
          filteredReviews.map((review, index) => (
            <div key={index} className="bg-white border border-zinc-200 rounded-xl p-6 shadow-md flex gap-4">
              {review.logo && (
                <div className="w-16 h-16 relative shrink-0">
                  <Image src={review.logo} alt={review.company} fill className="object-contain rounded-md" />
                </div>
              )}
              <div className="space-y-1">
                <h2 className="text-xl font-semibold">{review.company} — {review.position}</h2>
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
            </div>
          ))
        )}
      </div>
    </main>
  );
}