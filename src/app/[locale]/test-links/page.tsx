'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navigation } from '@/components/ui/Navigation';
import { Button } from '@/components/ui/Button';

export default function TestPage() {
  const router = useRouter();

  const testNavigation = () => {
    console.log('Testing programmatic navigation...');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Link Testing Page</h1>
        
        <div className="space-y-8">
          {/* Next.js Link Tests */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Next.js Link Components</h2>
            <div className="space-y-3">
              <div>
                <Link href="/login" className="text-blue-600 hover:underline">
                  Login Page (Link component)
                </Link>
              </div>
              <div>
                <Link href="/register" className="text-blue-600 hover:underline">
                  Register Page (Link component)
                </Link>
              </div>
              <div>
                <Link href="/dashboard" className="text-blue-600 hover:underline">
                  Dashboard (Link component)
                </Link>
              </div>
            </div>
          </div>

          {/* Button Tests */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Button Components</h2>
            <div className="space-y-3">
              <div>
                <Link href="/login">
                  <Button variant="primary">Login Button</Button>
                </Link>
              </div>
              <div>
                <Link href="/register">
                  <Button variant="outline">Register Button</Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Programmatic Navigation */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Programmatic Navigation</h2>
            <Button onClick={testNavigation} variant="secondary">
              Test Router.push() - Go to Login
            </Button>
          </div>

          {/* Regular HTML Links */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Regular HTML Links</h2>
            <div className="space-y-3">
              <div>
                <a href="/login" className="text-blue-600 hover:underline">
                  Login (regular anchor tag)
                </a>
              </div>
              <div>
                <a href="/register" className="text-blue-600 hover:underline">
                  Register (regular anchor tag)
                </a>
              </div>
            </div>
          </div>

          {/* Status Display */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Status</h2>
            <p className="text-sm text-gray-600">
              Current URL: {typeof window !== 'undefined' ? window.location.href : 'Server-side'}
            </p>
            <p className="text-sm text-gray-600">
              User Agent: {typeof window !== 'undefined' ? navigator.userAgent : 'Server-side'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}