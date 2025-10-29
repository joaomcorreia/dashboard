'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loading } from '@/components/ui/Loading';

interface DashboardPageProps {
  params: {
    locale: string;
  };
}

export default function DashboardPage({ params }: DashboardPageProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Not authenticated, redirect to login
        router.push(`/${params.locale}/login`);
        return;
      }

      // Route based on user type or email for backwards compatibility
      const email = user?.email?.toLowerCase();
      const userType = (user as any)?.user_type;

      if (email === 'admin@test.com' || userType === 'admin_paid') {
        // Admin user (after payment) - redirect to user dashboard
        router.push(`/${params.locale}/dashboard/user`);
      } else if (email === 'business@example.com' || userType === 'business_admin') {
        // Business user - redirect to admin dashboard
        router.push(`/${params.locale}/admin`);
      } else {
        // Regular users and default - redirect to builder
        router.push(`/${params.locale}/builder`);
      }
    }
  }, [user, isAuthenticated, isLoading, router, params.locale]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loading message="Loading dashboard..." />
      </div>
    );
  }

  // This will only show briefly while redirecting
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Loading message="Redirecting..." />
    </div>
  );
}