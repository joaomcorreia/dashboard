'use client';

import { useTranslations } from 'next-intl';
import { AdminRoute } from '@/components/auth/ProtectedRoute';
import { Navigation } from '@/components/ui/Navigation';
import PageBuilder from '@/components/PageBuilder';

export default function AdminPageBuilder() {
  const t = useTranslations('admin');

  return (
    <AdminRoute>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <PageBuilder 
          businessType="restaurant"
          locale="en"
        />
      </div>
    </AdminRoute>
  );
}