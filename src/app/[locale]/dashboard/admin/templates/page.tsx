'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

// Mock data for demonstration
const mockTemplates = [
  {
    id: 1,
    name: 'jcw-rest-01-modern',
    category: 'restaurant',
    status: 'published',
    sections: 5,
    preview: '/api/placeholder/400/300',
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    name: 'jcw-svc-01-professional',
    category: 'services',
    status: 'draft',
    sections: 7,
    preview: '/api/placeholder/400/300',
    createdAt: '2024-01-20',
  },
  {
    id: 3,
    name: 'jcw-shop-01-minimal',
    category: 'ecommerce',
    status: 'published',
    sections: 8,
    preview: '/api/placeholder/400/300',
    createdAt: '2024-01-25',
  },
];

export default function AdminTemplatesPage() {
  const t = useTranslations('admin');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/admin" className="text-xl font-bold text-gray-900">
                Just Code Works - Admin
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">{t('templates')}</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button>
                Create Template
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Template Management
          </h1>
          <p className="text-gray-600">
            Create and manage website templates for different industries.
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">
                  Category:
                </label>
                <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                  <option value="">All Categories</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="services">Services</option>
                  <option value="ecommerce">E-commerce</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">
                  Status:
                </label>
                <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                  <option value="">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div className="flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search templates..."
                  className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTemplates.map((template) => (
            <Card key={template.id} className="hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gray-200 rounded-t-lg flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <CardContent>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {template.name}
                  </h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    template.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : template.status === 'draft'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {template.status}
                  </span>
                </div>
                <div className="text-xs text-gray-600 space-y-1 mb-4">
                  <p>Category: {template.category}</p>
                  <p>Sections: {template.sections}</p>
                  <p>Created: {template.createdAt}</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State (if no templates) */}
        {mockTemplates.length === 0 && (
          <Card>
            <CardContent>
              <div className="text-center py-12">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No templates found
                </h3>
                <p className="text-gray-600 mb-4">
                  Get started by creating your first template.
                </p>
                <Button>
                  Create Template
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}