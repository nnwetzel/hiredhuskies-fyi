'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Header from '@/app/components/Header';

const mockReviews = [
  {
    company: 'Brigham and Women’s Hospital',
    logo: '', // Add path to logo if available
    position: 'Patient Care Associate',
    location: 'Boston, MA',
    pay: '$18/hr',
    term: 'Spring 2023',
    length: '6 months',
    major: 'College of Science',
    rating: '3.5 / 5',
    source: 'NUWorks',
    interview: `Phone screen and Zoom interview with the manager. Mix of technical and personal questions about your goals and skill set.`,
    description: `A lot of grunt work and close collaboration with nursing staff. As a premed, it gave me strong clinical exposure and stories for my med school application. Some units were understaffed at times, and I was occasionally floated to different units.`,
    date: '2023-05-27',
  },
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
    source: 'NUWorks',
    interview: `I interviewed with two team members for 30 minutes each, then with the manager for 30 minutes, followed by two 15-minute sessions, one with the co-op program manager and one with my recruiter. No LeetCode. They asked about Git, Linux, Ansible, Docker, and possibly Terraform or Kubernetes. For example, "How do you check a file’s disk usage in Linux?" or "What’s the difference between git rebase and git restore?" The questions were mostly high-level and practical.`,
    description: `I worked on a really cool dosing NLP service and gained a lot of experience in infrastructure automation. I used technologies like Git, Ansible, Jenkins, Docker, Kubernetes, Azure Blob Storage, and FastAPI, which I was able to include on my resume. One downside was that the co-op was fully remote. I prefer more in-person interaction, but the team was supportive and I collaborated with other Northeastern co-ops and full-time engineers who had been co-ops themselves. They had a good support system because former co-ops ran the program and understood what students needed.`,
    date: '2025-05-29',
  },
  {
    company: 'CaNCURE',
    logo: '', // Add path to logo if available
    position: 'Research Assistant/Mentee',
    location: 'Boston, MA',
    pay: '$12,000 stipend',
    term: 'Spring 2022',
    length: '6 months',
    major: 'College of Science',
    rating: '3 / 5',
    source: 'NUWorks',
    interview: `One interview to get accepted into the program. After that, you submit rankings of mentors you’d like to work with. They match you based on responses, then you meet with the mentor to confirm fit before the co-op begins.`,
    description: `Got connected to strong mentors in prestigious institutions and worked on meaningful research. Great for pre-med students or those interested in academia and hospital-based research. You’re part of a cohort of 8 students for workshops, but will likely be the only undergrad in your lab, which can feel isolating. Flexible hours depending on the project. Good learning experience overall. Main downside is the stipend—it’s not much for 6 months.`,
    date: '2022-05-29',
  }
];

export default function ReviewsPage() {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
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
    setFilters({
      location: query.location || '',
      company: query.company || '',
      position: query.position || '',
      pay: query.pay || '',
      major: query.major || '',
      term: query.term || '',
      length: query.length || '',
    });
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
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-100 to-pink-50 text-black font-inter relative">
      <Header />

      <div className="mt-10 w-full max-w-6xl px-4 mx-auto">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col md:flex-row md:items-end md:space-x-4 gap-4"
        >
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
              type="button"
              onClick={() => setShowFilters((prev) => !prev)}
              className="text-sm underline text-zinc-700 hover:text-black transition"
            >
              {showFilters ? 'Hide Filters' : 'More Filters'}
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-md hover:bg-zinc-800 transition w-full md:w-auto"
            >
              Search
            </button>
          </div>
        </form>

        {showFilters && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <input type="text" placeholder="Company (e.g. Wolters Kluwer)" name="company" value={filters.company} onChange={handleFilterChange} className="w-full px-4 py-2 border border-zinc-300 rounded-md" />
            <input type="text" placeholder="Position Title (e.g. Software Engineer Co-op)" name="position" value={filters.position} onChange={handleFilterChange} className="w-full px-4 py-2 border border-zinc-300 rounded-md" />
            <select name="pay" value={filters.pay} onChange={handleFilterChange} className="w-full px-4 py-2 border border-zinc-300 rounded-md">
              <option value="">Pay Range</option>
              <option value="$20">Under $20/hr</option>
              <option value="$30">$20–30/hr</option>
              <option value="$40">Above $30/hr</option>
            </select>
            <select name="major" value={filters.major} onChange={handleFilterChange} className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black">
              <option value="">Academic Major</option>
              <option value="Bouvé College of Health Sciences">Bouvé College of Health Sciences</option>
              <option value="College of Arts, Media & Design">College of Arts, Media & Design</option>
              <option value="College of Engineering">College of Engineering</option>
              <option value="College of Professional Studies">College of Professional Studies</option>
              <option value="College of Science">College of Science</option>
              <option value="College of Social Sciences & Humanities">College of Social Sciences & Humanities</option>
              <option value="D'Amore-McKim School of Business">D'Amore-McKim School of Business</option>
              <option value="Khoury College of Computer Sciences">Khoury College of Computer Sciences</option>
            </select>
            <input type="text" placeholder="Work Term (e.g. Spring 2025)" name="term" value={filters.term} onChange={handleFilterChange} className="w-full px-4 py-2 border border-zinc-300 rounded-md" />
            <select name="length" value={filters.length} onChange={handleFilterChange} className="w-full px-4 py-2 border border-zinc-300 rounded-md">
              <option value="">Job Length</option>
              <option value="3">3 month</option>
              <option value="4">4 month</option>
              <option value="6">6 month</option>
              <option value="8">8 month</option>
              <option value="12">12 month</option>
            </select>
          </div>
        )}
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
                <p><strong>Found via:</strong> {review.source}</p>
                <p><strong>Rating:</strong> {review.rating}</p>
                <p className="text-sm text-zinc-500 pt-1">
                  Added on {new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <h3 className="font-semibold pt-2">Application Process</h3>
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