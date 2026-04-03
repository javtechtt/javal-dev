import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';
import ClientProviders from '@/components/layout/ClientProviders';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'javal.dev — AI Agent Developer & UI/UX Engineer',
  description:
    'Building intelligent web products at the intersection of AI, UX, and modern web development.',
  keywords: ['AI Agent Developer', 'UI/UX Engineer', 'Next.js', 'Web Development', 'Portfolio'],
  authors: [{ name: 'Javal Joseph' }],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'javal.dev — AI Agent Developer & UI/UX Engineer',
    description: 'Building intelligent web products at the intersection of AI, UX, and modern web development.',
    type: 'website',
    url: 'https://javal.dev',
  },
  twitter: {
    card: 'summary',
    title: 'javal.dev — AI Agent Developer & UI/UX Engineer',
    description: 'Building intelligent web products at the intersection of AI, UX, and modern web development.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientProviders>
          <Navbar />
          <main className="relative z-10">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
        </ClientProviders>
      </body>
    </html>
  );
}
