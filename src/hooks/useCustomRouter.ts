'use client';

import { useRouter as useNextRouter } from 'next/navigation';
import { useCallback } from 'react';

export function useCustomRouter() {
  const router = useNextRouter();

  const push = useCallback((href: string) => {
    try {
      // Force a small delay to ensure proper hydration
      setTimeout(() => {
        router.push(href);
      }, 0);
    } catch (error) {
      console.error('Router push failed:', error);
      // Fallback to window.location
      window.location.href = href;
    }
  }, [router]);

  const replace = useCallback((href: string) => {
    try {
      setTimeout(() => {
        router.replace(href);
      }, 0);
    } catch (error) {
      console.error('Router replace failed:', error);
      window.location.replace(href);
    }
  }, [router]);

  return {
    ...router,
    push,
    replace
  };
}