'use client';

import { Globe, FileText } from 'lucide-react';
import Link from 'next/link';

const templateCategories = [
  {
    title: 'Website Templates',
    description: 'Upload website screenshots and convert them to Next.js components',
    icon: Globe,
    href: '/dashboard/templates/website',
    count: 12,
    color: 'bg-blue-500',
    available: true,
  },
  {
    title: 'Print Templates',
    description: 'Manage templates for business cards, brochures, and more',
    icon: FileText,
    href: '/dashboard/templates/printing',
    count: 0,
    color: 'bg-green-500',
    available: false,
  },
];

export default function TemplatesOverviewPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Templates</h1>
        <p className="mt-2 text-gray-600">
          Manage and organize your website and print templates in one place.
        </p>
      </div>

      {/* Template Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templateCategories.map((category) => {
          const Icon = category.icon;
          
          return (
            <Link
              key={category.title}
              href={category.href}
              className={`bg-white rounded-lg border p-6 hover:shadow-lg transition-shadow ${
                !category.available ? 'opacity-75' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <div className={`p-3 ${category.color} rounded-lg mr-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                      {!category.available && (
                        <span className="text-sm text-amber-600 font-medium">Coming Soon</span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {category.count} template{category.count !== 1 ? 's' : ''}
                    </span>
                    <span className="text-blue-600 font-medium text-sm">
                      {category.available ? 'Manage →' : 'Preview →'}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Template Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">12</div>
            <div className="text-sm text-gray-600">Website Templates</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">0</div>
            <div className="text-sm text-gray-600">Print Templates</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">5</div>
            <div className="text-sm text-gray-600">Templates in Library</div>
          </div>
        </div>
      </div>
    </div>
  );
}