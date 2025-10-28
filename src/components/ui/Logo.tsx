'use client';

import Link from 'next/link';
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
  const logoClass = {
    nav: fontClasses.logoNav,
    auth: fontClasses.logoAuth,
    hero: fontClasses.logoHero
  }[variant];

  const combinedClass = `${logoClass} ${className}`;

  if (href) {
    return (
      <Link href={href} className={`${combinedClass} hover:text-gray-700 transition-colors`}>
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