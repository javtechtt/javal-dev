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
  title: 'javal.dev — Digital Creative & UI/UX Developer',
  description:
    'Portfolio of Javal — a digital creative and UI/UX developer crafting premium web experiences. Available for freelance and collaborative projects.',
  keywords: ['UI/UX', 'Web Design', 'Next.js', 'Frontend Developer', 'Portfolio'],
  authors: [{ name: 'Javal' }],
  openGraph: {
    title: 'javal.dev — Digital Creative & UI/UX Developer',
    description: 'Premium web experiences crafted with design and code.',
    type: 'website',
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
