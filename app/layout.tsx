import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Poolify | Professional Pool Care & Luxury Renovations',
  description:
    'Premier pool care, weekly maintenance, algae recovery, and luxury renovations. Trusted by over 2,000+ luxury homeowners.',
  openGraph: {
    title: 'Poolify | Professional Pool Care & Luxury Renovations',
    description:
      'From weekly maintenance to complete custom renovations, we keep your pool crystal clean, balanced, and swim-ready year-round.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Poolify | Professional Pool Care & Luxury Renovations',
    description:
      'Premier pool care, weekly maintenance, algae recovery, and luxury renovations.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
