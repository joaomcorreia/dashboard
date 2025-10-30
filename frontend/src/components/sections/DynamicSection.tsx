'use client';

import { useState, useEffect } from 'react';
import ComponentExtractor from './ComponentExtractor';

interface DynamicSectionProps {
  libraryItem: {
    id: string;
    name: string;
    target: 'DJANGO' | 'NEXTJS';
    zip_file: string;
    created_at: string;
  };
}

export default function DynamicSection({ libraryItem }: DynamicSectionProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | Error | null>(null);

  useEffect(() => {
    // ComponentExtractor will handle the actual rendering
    setLoading(false);
  }, [libraryItem]);

  if (loading) {
    return (
      <div className="py-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading {libraryItem.name} section...</p>
      </div>
    );
  }

  if (error) {
    const errorMessage = error instanceof Error ? error.message : 
                         typeof error === 'string' ? error : 
                         'An unknown error occurred';
    return (
      <div className="py-8 text-center">
        <p className="text-red-600">Error loading {libraryItem.name}: {errorMessage}</p>
      </div>
    );
  }

  // Use ComponentExtractor to render the actual component from zip file
  return (
    <ComponentExtractor libraryItem={libraryItem} />
  );
}