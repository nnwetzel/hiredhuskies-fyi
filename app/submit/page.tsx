'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const fields = [
  'company',
  'position',
  'location',
  'pay',
  'term',
  'major',
  'length',
  'rating',
  'interview',
  'description',
] as const;

type FieldName = (typeof fields)[number];

export default function SubmitPage() {
  const pathname = usePathname();
  const [formState, setFormState] = useState<'idle' | 'success' | 'error'>('idle');
  const [formValues, setFormValues] = useState<Record<FieldName, string>>(() =>
    fields.reduce((acc, field) => {
      acc[field] = typeof window !== 'undefined'
        ? localStorage.getItem(`submit-${field}`) || ''
        : '';
      return acc;
    }, {} as Record<FieldName, string>)
  );

  useEffect(() => {
    // sync localStorage if values change
    fields.forEach((field) => {
      localStorage.setItem(`submit-${field}`, formValues[field]);
    });
  }, [formValues]);

  const handleChange = (field: FieldName, value: string) => {
    if (field === 'rating') {
      const num = parseFloat(value);
      if (num < 1 || num > 5) return;
    }
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/submit-review', {
      method: 'POST',
      body: JSON.stringify(formValues),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      setFormState('success');
      fields.forEach((field) => localStorage.removeItem(`submit-${field}`));
      setFormValues(fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {} as Record<FieldName, string>));
    } else {
      setFormState('error');
    }
  }

  return (
    <main className="min-h-screen pb-20 bg-gradient-to-br from-indigo-50 via-purple-100 to-pink-50 text-black font-inter relative">
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
            className={`px-4 py-1.5 rounded-full text-sm transition ${
              pathname === '/submit'
                ? 'bg-zinc-400 text-white cursor-not-allowed'
                : 'bg-black text-white hover:bg-zinc-800'
            }`}
          >
            Submit a Review
          </Link>
        </div>
      </header>

      {/* Form Section */}
      <div className="max-w-2xl mx-auto bg-white p-6 mt-12 rounded-2xl shadow-md border border-zinc-200">
        <h1 className="text-3xl font-bold mb-4 text-center">Submit a Co-op Review</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Company Name" name="company" value={formValues.company} onChange={handleChange} />
          <Input label="Position Title" name="position" value={formValues.position} onChange={handleChange} />
          <Input
            label="Location"
            name="location"
            hint="e.g. Boston, MA (Remote)"
            value={formValues.location}
            onChange={handleChange}
          />
          <Input label="Pay" name="pay" hint="e.g. $28/hr, Unpaid" value={formValues.pay} onChange={handleChange} />
          <Input label="Work Term" name="term" hint="e.g. Spring 2025" value={formValues.term} onChange={handleChange} />

          <div>
            <label className="text-sm font-medium text-zinc-600">Academic Major</label>
            <select
              name="major"
              value={formValues.major}
              required
              onChange={(e) => handleChange('major', e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value=""></option>
              <option value="Bouvé College of Health Sciences">Bouvé College of Health Sciences</option>
              <option value="College of Arts, Media & Design">College of Arts, Media & Design</option>
              <option value="College of Engineering">College of Engineering</option>
              <option value="College of Professional Studies">College of Professional Studies</option>
              <option value="College of Science">College of Science</option>
              <option value="ollege of Social Sciences & Humanities">College of Social Sciences & Humanities</option>
              <option value="D'Amore-McKim School of Business">D'Amore-McKim School of Business</option>
              <option value="Khoury College of Computer Sciences">Khoury College of Computer Sciences</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-600">Job Length</label>
            <select
              name="length"
              value={formValues.length}
              required
              onChange={(e) => handleChange('length', e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value=""></option>
              <option value="4">4 month</option>
              <option value="6">6 month</option>
              <option value="8">8 month</option>
              <option value="12">12 month</option>
            </select>
          </div>

          <Input
            label="Rating (1–5)"
            name="rating"
            type="number"
            min="1"
            max="5"
            step="0.1"
            value={formValues.rating}
            onChange={handleChange}
          />

          <Textarea
            label="Interview Process"
            name="interview"
            hint="e.g. number of rounds, interview format, questions asked, technical challenges"
            value={formValues.interview}
            onChange={handleChange}
          />
          <Textarea
            label="Review Description"
            name="description"
            hint="e.g. responsibilities, team culture, mentorship, work-life balance, would you recommend it"
            value={formValues.description}
            onChange={handleChange}
          />

          <button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-zinc-800 transition">
            Submit Review
          </button>

          {formState === 'success' && (
            <p className="text-green-600 text-center">
              Submitted successfully! Please wait 24–48 hours for approval.
            </p>
          )}
          {formState === 'error' && (
            <p className="text-red-600 text-center">Something went wrong. Please try again.</p>
          )}
        </form>
      </div>
    </main>
  );
}

function Input({
    label,
    name,
    type = 'text',
    hint,
    min,
    max,
    step,
    value,
    onChange,
  }: {
    label: string;
    name: FieldName;
    type?: string;
    hint?: string;
    min?: number;
    max?: number;
    step?: number;
    value: string;
    onChange: (name: FieldName, value: string) => void;
  }) {
    return (
      <div>
        <label htmlFor={name} className="text-sm font-medium text-zinc-600">
          {label}
        </label>
        {hint && <p className="text-xs text-zinc-500 mt-1">{hint}</p>}
        <input
          id={name}
          name={name}
          type={type}
          min={min}
          max={max}
          step={step}
          required
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          className="w-full p-2 mt-1 border rounded-md"
        />
      </div>
    );
  }

function Textarea({
  label,
  name,
  hint,
  value,
  onChange,
}: {
  label: string;
  name: FieldName;
  hint?: string;
  value: string;
  onChange: (name: FieldName, value: string) => void;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-zinc-600">
        {label}
      </label>
      {hint && <p className="text-xs text-zinc-500 mt-1">{hint}</p>}
      <textarea
        id={name}
        name={name}
        required
        rows={5}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full p-2 mt-1 border rounded-md"
      />
    </div>
  );
}