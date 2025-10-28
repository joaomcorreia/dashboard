import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Just Code Works',
  description: 'Build professional websites with ease using our pre-designed templates and sections.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}