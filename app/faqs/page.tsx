import { Suspense } from 'react';
import FAQsPageContent from './FAQsPageContent';

export default function FAQsPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10 font-sans">Loading...</div>}>
      <FAQsPageContent />
    </Suspense>
  );
}