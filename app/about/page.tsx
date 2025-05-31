import { Suspense } from 'react';
import AboutPageContent from './AboutPageContent';

export default function AboutPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10 font-sans">Loading...</div>}>
      <AboutPageContent />
    </Suspense>
  );
}