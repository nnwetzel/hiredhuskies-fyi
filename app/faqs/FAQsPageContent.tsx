'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import Header from '@/app/components/Header';

const faqs = [
  {
    question: 'Who can submit a review?',
    answer: 'Any Northeastern student who has completed a co-op or internship can submit a review.',
  },
  {
    question: 'Do reviews have to be approved?',
    answer: 'Yes, all submissions are reviewed before being published to ensure clarity and appropriateness.',
  },
  {
    question: 'Can I edit or remove my review later?',
    answer:
      'Yes. If you want to update your review, submit a new one detailing your edits. If you want your original removed, just state that clearly in the submission.',
  },
  {
    question: 'Is this affiliated with Northeastern University?',
    answer: 'No. This is a student-made independent project and not officially affiliated with the university.',
  },
];

export default function FAQsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-white to-rose-50 text-black font-sans pb-24">
      <Header />
      <div className="max-w-screen-xl mx-auto px-4 pt-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold font-serif text-center mb-10">FAQs</h1>
          <Accordion.Root type="multiple" className="space-y-4">
            {faqs.map((faq, idx) => (
              <Accordion.Item
                key={idx}
                value={`item-${idx}`}
                className="border border-zinc-200 bg-white rounded-xl shadow-sm"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="w-full flex items-center justify-between px-4 py-4 text-left text-lg font-semibold font-sans bg-white rounded-xl hover:bg-zinc-50 transition">
                    {faq.question}
                    <ChevronDown className="transition-transform duration-300 AccordionChevron" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="px-4 pt-0 pb-4 text-zinc-700 text-sm font-sans">
                  {faq.answer}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>
    </main>
  );
}