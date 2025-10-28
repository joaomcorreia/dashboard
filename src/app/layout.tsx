import type { Metadata } from 'next';
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
      <body>
        {children}
      </body>
    </html>
  );
}