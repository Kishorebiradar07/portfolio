import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Recruiter OS — Kishore Biradar Portfolio',
  description:
    'Interactive AI-powered recruiter operating system for Kishore Biradar. View candidate summary, skill intelligence, project case studies, academic timeline, and AI evaluation insights.',
  openGraph: {
    title: 'AI Recruiter OS — Kishore Biradar',
    description:
      "Deep-dive into Kishore Biradar's engineering projects, certifications, and skills through an AI-powered recruiter dashboard.",
    type: 'website',
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
