'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { fontClasses } from '@/config/fonts';

interface LogoProps {
  variant?: 'nav' | 'auth' | 'hero';
  href?: string;
  className?: string;
}

export function Logo({ 
  variant = 'nav', 
  href = '/', 
  className = '' 
}: LogoProps) {
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';
  
  const logoClass = {
    nav: fontClasses.logoNav,
    auth: fontClasses.logoAuth,
    hero: fontClasses.logoHero
  }[variant];

  const combinedClass = `${logoClass} ${className}`;

  if (href) {
    // Handle locale-aware routing
    const localizedHref = href === '/' ? `/${currentLocale}` : `/${currentLocale}${href}`;
    
    return (
      <Link href={localizedHref} className={`${combinedClass} hover:text-gray-700 transition-colors`}>
        Just Code Works
      </Link>
    );
  }

  return (
    <h1 className={combinedClass}>
      Just Code Works
    </h1>
  );
}