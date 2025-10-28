'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Navigation } from '@/components/ui/Navigation';

export default function TemplatesPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Website Templates
          </h1>
          <p className="text-gray-600">
            Choose from our collection of professional website templates.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Restaurant Template */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-orange-400 to-red-500 h-48 flex items-center justify-center">
              <div className="text-white text-center">
                <h3 className="text-2xl font-bold mb-2">Restaurant</h3>
                <p>jcw-rest-00</p>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Restaurant Template</h3>
              <p className="text-gray-600 mb-4">
                Perfect for restaurants, cafes, and food businesses. Includes menu sections, about us, and contact forms.
              </p>
              <div className="flex space-x-2">
                <Link href="/dashboard/admin/pages">
                  <button className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700">
                    Use Template
                  </button>
                </Link>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50">
                  Preview
                </button>
              </div>
            </div>
          </div>

          {/* Coming Soon Templates */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden opacity-75">
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-48 flex items-center justify-center">
              <div className="text-white text-center">
                <h3 className="text-2xl font-bold mb-2">Business</h3>
                <p>Coming Soon</p>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Business Template</h3>
              <p className="text-gray-600 mb-4">
                Professional template for business websites with services, team, and portfolio sections.
              </p>
              <button disabled className="bg-gray-300 text-gray-500 px-4 py-2 rounded cursor-not-allowed">
                Coming Soon
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden opacity-75">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 h-48 flex items-center justify-center">
              <div className="text-white text-center">
                <h3 className="text-2xl font-bold mb-2">Portfolio</h3>
                <p>Coming Soon</p>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Portfolio Template</h3>
              <p className="text-gray-600 mb-4">
                Showcase your work with this elegant portfolio template. Perfect for creatives and professionals.
              </p>
              <button disabled className="bg-gray-300 text-gray-500 px-4 py-2 rounded cursor-not-allowed">
                Coming Soon
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/">
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50">
              ← Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}