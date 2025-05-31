import { Suspense } from 'react';
import HomeContent from './home/HomeContent';

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}