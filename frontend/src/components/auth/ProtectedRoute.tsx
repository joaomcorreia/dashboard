'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loading } from '@/components/ui/Loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  requireAdmin = false,
  redirectTo 
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // Not authenticated at all
      if (!isAuthenticated) {
        router.push(redirectTo || '/login');
        return;
      }

      // Authenticated but requires admin privileges
      if (requireAdmin && !user?.is_staff && !user?.is_superuser) {
        router.push('/dashboard/user');
        return;
      }
    }
  }, [isAuthenticated, isLoading, user, requireAdmin, router, redirectTo]);

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loading message="Checking authentication..." />
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loading message="Redirecting to login..." />
      </div>
    );
  }

  // Authenticated but not admin when admin required
  if (requireAdmin && !user?.is_staff && !user?.is_superuser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loading message="Redirecting..." />
      </div>
    );
  }

  // All checks passed, render children
  return <>{children}</>;
}

// Helper components for common use cases
export function AdminRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requireAdmin={true}>
      {children}
    </ProtectedRoute>
  );
}

export function AuthRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requireAdmin={false}>
      {children}
    </ProtectedRoute>
  );
}