'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function RouterDebugPage() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log('Router Debug - Component mounted');
    console.log('Current pathname:', pathname);
  }, [pathname]);

  const handleProgrammaticNavigation = () => {
    console.log('Attempting programmatic navigation...');
    router.push('/login');
  };

  const handleRefresh = () => {
    console.log('Forcing page refresh...');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Router Debug Page</h1>
        
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Current State</h2>
          <p className="mb-2"><strong>Pathname:</strong> {pathname}</p>
          <p className="mb-2"><strong>User Agent:</strong> {typeof window !== 'undefined' ? navigator.userAgent : 'Server'}</p>
          <p className="mb-2"><strong>Window Location:</strong> {typeof window !== 'undefined' ? window.location.href : 'Server'}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Navigation Tests</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">1. Next.js Link</h3>
              <Link href="/login" className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Go to Login (Link)
              </Link>
            </div>

            <div>
              <h3 className="font-medium mb-2">2. Programmatic Navigation</h3>
              <button 
                onClick={handleProgrammaticNavigation}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Go to Login (router.push)
              </button>
            </div>

            <div>
              <h3 className="font-medium mb-2">3. Force Refresh</h3>
              <button 
                onClick={handleRefresh}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Go to Login (window.location)
              </button>
            </div>

            <div>
              <h3 className="font-medium mb-2">4. Regular HTML Link</h3>
              <a href="/login" className="inline-block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                Go to Login (anchor)
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Open browser developer tools (F12)</li>
            <li>Go to Console tab</li>
            <li>Try each navigation method above</li>
            <li>Check console for any errors or logs</li>
            <li>Note which methods work and which don't</li>
          </ol>
        </div>
      </div>
    </div>
  );
}