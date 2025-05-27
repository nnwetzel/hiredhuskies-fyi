'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full px-6 py-5 flex items-center justify-between text-sm text-black relative">
      {/* Left: Logo */}
      <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
        <div className="w-4 h-4 rounded-full bg-black" />
        <span className="text-xl font-medium tracking-tight text-black">
          huskycoops<span className="font-normal">.fyi</span>
        </span>
      </Link>

      {/* Center: Nav */}
      <nav className="hidden md:flex gap-6 text-black absolute left-1/2 -translate-x-1/2">
        <Link href="/reviews">Reviews</Link>
        <Link href="/about">About</Link>
        <Link href="/faqs">FAQs</Link>
      </nav>

      {/* Right: Submit Button */}
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
  );
}