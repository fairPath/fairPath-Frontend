import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../app/globals.css';
import { Toaster } from 'sonner';
import Providers from './providers';

//import '@radix-ui/themes/styles.css'; // Don't forget to import Radix Themes CSS
import '@radix-ui/themes/styles.css';
import './globals.css';



const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Online Job Portal',
  description: 'Create your own job portal application ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
            {children}
        </Providers>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
