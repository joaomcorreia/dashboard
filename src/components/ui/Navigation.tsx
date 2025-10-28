'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Button } from './Button';
import { useAuth } from '@/contexts/AuthContext';

export function Navigation() {
  const t = useTranslations('navigation');
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Just Code Works
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <Button variant="outline">
                    {t('dashboard')}
                  </Button>
                </Link>
                <span className="text-sm text-gray-600">
                  {user?.email}
                </span>
                <Button variant="outline" onClick={handleLogout}>
                  {t('logout')}
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline">
                    {t('login')}
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary">
                    {t('register')}
                  </Button>
                </Link>
              </>
            )}
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}