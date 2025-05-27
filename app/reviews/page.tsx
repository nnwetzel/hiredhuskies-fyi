'use client';

import { Suspense } from 'react';
import ReviewsPageContent from './ReviewsPageContent';

export default function ReviewsPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading reviews...</div>}>
      <ReviewsPageContent />
    </Suspense>
  );
}