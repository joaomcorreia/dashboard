'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Button } from './Button';
import { Logo } from './Logo';
import { useAuth } from '@/contexts/AuthContext';

export function Navigation() {
  const t = useTranslations('navigation');
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  
  // Extract current locale from pathname
  const currentLocale = pathname.split('/')[1] || 'en';

  const handleLogout = async () => {
    await logout();
    router.push(`/${currentLocale}`);
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Logo variant="nav" />
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link href={`/${currentLocale}/dashboard`}>
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
                <Link href={`/${currentLocale}/login`}>
                  <Button variant="outline">
                    {t('login')}
                  </Button>
                </Link>
                <Link href={`/${currentLocale}/register`}>
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