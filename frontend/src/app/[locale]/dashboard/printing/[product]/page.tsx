'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductBuilderPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const product = searchParams.get('product');

  useEffect(() => {
    // Redirect to the main builder with the product parameter
    if (product) {
      router.push(`/en/dashboard/printing/builder?product=${product}`);
    } else {
      router.push('/en/dashboard/printing/builder?product=business-cards');
    }
  }, [product, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading design studio...</p>
      </div>
    </div>
  );
}