import type { Metadata } from 'next';
import { getGoogleFontsUrl } from '@/config/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Just Code Works',
  description: 'Build professional websites with ease using our pre-designed templates and sections.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={getGoogleFontsUrl()} rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}