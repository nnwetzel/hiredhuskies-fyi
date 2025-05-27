import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const title = 'Husky Co-ops';
const description =
  'Student-powered co-op reviews, built for those who want real insight before their next job. Know what to expect — from Huskies who’ve been there.';

export const metadata = {
  title,
  description,
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  metadataBase: new URL('https://huskycoops.fyi'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-inter bg-white text-black">{children}</body>
    </html>
  );
}