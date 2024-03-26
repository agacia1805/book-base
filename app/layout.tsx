import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/app/ui/footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BookBase app',
  description: 'BookBase app for cataloging all your favourite books in one place',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} flex min-h-screen flex-col text-white`}
      >
        <div className='flex flex-grow flex-col justify-center px-8'>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
