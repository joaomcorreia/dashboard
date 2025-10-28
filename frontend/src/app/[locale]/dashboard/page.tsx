import { redirect } from 'next/navigation';

interface DashboardPageProps {
  params: {
    locale: string;
  };
}

export default function DashboardPage({ params }: DashboardPageProps) {
  // In a real app, you would check user role here
  // For now, redirect to user dashboard with proper locale
  redirect(`/${params.locale}/dashboard/user`);
}