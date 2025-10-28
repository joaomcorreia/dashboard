import { redirect } from 'next/navigation';

interface DashboardPageProps {
  params: {
    locale: string;
  };
}

export default function DashboardPage({ params }: DashboardPageProps) {
  // Redirect users to the website builder after successful onboarding
  redirect(`/${params.locale}/builder`);
}