import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NeuroCanvas Studio',
  description:
    'A futuristic digital arts platform for dementia-friendly painting, drawing, music, and guided voice support.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
