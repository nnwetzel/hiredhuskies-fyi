'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Header from '@/app/components/Header';

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
    fields.forEach((field) => {
      localStorage.setItem(`submit-${field}`, formValues[field]);
    });
  }, [formValues]);

  const handleChange = (name: FieldName, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: name === 'rating' ? String(Math.min(5, Math.max(1, parseFloat(value) || 0))) : value,
    }));
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
    <main className="min-h-screen pb-24 bg-gradient-to-br from-indigo-50 via-purple-100 to-pink-50 text-black font-inter relative">
      <Header />

      <div className="max-w-2xl mx-auto bg-white p-6 mt-12 mb-4 rounded-2xl shadow-md border border-zinc-200">
        <h1 className="text-3xl font-bold mb-4 text-center">Submit a Co-op Review</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Company Name" name="company" value={formValues.company} onChange={handleChange} />
          <Input label="Position Title" name="position" value={formValues.position} onChange={handleChange} />
          <Input label="Location" name="location" hint="e.g. Boston, MA (Remote)" value={formValues.location} onChange={handleChange} />
          <Input label="Pay" name="pay" hint="e.g. $28/hr, Unpaid" value={formValues.pay} onChange={handleChange} />
          <Input label="Work Term" name="term" hint="e.g. Spring 2025" value={formValues.term} onChange={handleChange} />

          <Select
            label="Academic Major"
            name="major"
            value={formValues.major}
            onChange={handleChange}
            options={[
              '',
              'Bouvé College of Health Sciences',
              'College of Arts, Media & Design',
              'College of Engineering',
              'College of Professional Studies',
              'College of Science',
              'College of Social Sciences & Humanities',
              "D'Amore-McKim School of Business",
              'Khoury College of Computer Sciences',
            ]}
          />

          <Select
            label="Job Length"
            name="length"
            value={formValues.length}
            onChange={handleChange}
            options={['', '3 month', '4 month', '6 month', '8 month', '12 month']}
          />

          <Input
            label="Rating (1–5)"
            name="rating"
            type="number"
            min={1}
            max={5}
            step={0.1}
            value={formValues.rating}
            onChange={handleChange}
          />

          <Textarea label="Interview Process" name="interview" hint="e.g. number of rounds, interview format, questions asked, technical challenges" value={formValues.interview} onChange={handleChange} />

          <Textarea label="Review Description" name="description" hint="e.g. responsibilities, team culture, mentorship, work-life balance, would you recommend it" value={formValues.description} onChange={handleChange} />

          <button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-zinc-800 transition">
            Submit Review
          </button>

          {formState === 'success' && <p className="text-green-600 text-center">Submitted successfully! Please wait 24–48 hours for approval.</p>}
          {formState === 'error' && <p className="text-red-600 text-center">Something went wrong. Please try again.</p>}
        </form>
      </div>
    </main>
  );
}

function Input({ label, name, type = 'text', hint, min, max, step, value, onChange }: {
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
      <label htmlFor={name} className="text-sm font-medium text-zinc-600">{label}</label>
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

function Select({ label, name, value, onChange, options }: {
  label: string;
  name: FieldName;
  value: string;
  onChange: (name: FieldName, value: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="text-sm font-medium text-zinc-600">{label}</label>
      <select
        name={name}
        value={value}
        required
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full px-4 py-2 mt-1 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
      >
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function Textarea({ label, name, hint, value, onChange }: {
  label: string;
  name: FieldName;
  hint?: string;
  value: string;
  onChange: (name: FieldName, value: string) => void;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-zinc-600">{label}</label>
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