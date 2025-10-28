'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ClientLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function ClientLink({ href, children, className, onClick }: ClientLinkProps) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (onClick) {
      onClick();
    }

    if (!isMounted) {
      window.location.href = href;
      return;
    }

    try {
      router.push(href);
    } catch (error) {
      console.error('Client navigation failed, using fallback:', error);
      window.location.href = href;
    }
  };

  // Fallback to regular link if not mounted
  if (!isMounted) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}