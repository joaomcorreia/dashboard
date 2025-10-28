'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function ClientPageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Force re-render when pathname changes
    setKey(prev => prev + 1);
  }, [pathname]);

  return (
    <div key={key}>
      {children}
    </div>
  );
}