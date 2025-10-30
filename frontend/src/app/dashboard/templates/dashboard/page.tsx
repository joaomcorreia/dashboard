'use client';

import { FileText, Download, Eye, Star, Calendar, User } from 'lucide-react';

const mockDashboardTemplates = [
  {
    id: 1,
    name: 'Modern Analytics Dashboard',
    description: 'Clean and modern dashboard template with advanced analytics components',
    thumbnail: '/api/placeholder/300/200',
    category: 'Analytics',
    downloads: 1250,
    rating: 4.8,
    lastUpdated: '2025-10-25',
    author: 'JCW Team',
    tags: ['Analytics', 'Charts', 'Modern', 'Responsive'],
    featured: true
  },
  {
    id: 2,
    name: 'E-commerce Admin Panel',
    description: 'Complete admin dashboard for e-commerce websites with inventory management',
    thumbnail: '/api/placeholder/300/200',
    category: 'E-commerce',
    downloads: 890,
    rating: 4.6,
    lastUpdated: '2025-10-20',
    author: 'JCW Team',
    tags: ['E-commerce', 'Admin', 'Inventory', 'Sales'],
    featured: false
  },
  {
    id: 3,
    name: 'CRM Dashboard Template',
    description: 'Customer relationship management dashboard with lead tracking',
    thumbnail: '/api/placeholder/300/200',
    category: 'CRM',
    downloads: 675,
    rating: 4.7,
    lastUpdated: '2025-10-18',
    author: 'JCW Team',
    tags: ['CRM', 'Leads', 'Customer', 'Sales'],
    featured: true
  },
  {
    id: 4,
    name: 'Project Management Dashboard',
    description: 'Comprehensive project management dashboard with task tracking',
    thumbnail: '/api/placeholder/300/200',
    category: 'Project Management',
    downloads: 1100,
    rating: 4.9,
    lastUpdated: '2025-10-22',
    author: 'JCW Team',
    tags: ['Project', 'Management', 'Tasks', 'Team'],
    featured: false
  },
  {
    id: 5,
    name: 'Financial Dashboard',
    description: 'Professional financial dashboard with budget tracking and reports',
    thumbnail: '/api/placeholder/300/200',
    category: 'Finance',
    downloads: 545,
    rating: 4.5,
    lastUpdated: '2025-10-15',
    author: 'JCW Team',
    tags: ['Finance', 'Budget', 'Reports', 'Analytics'],
    featured: false
  },
  {
    id: 6,
    name: 'Real Estate Dashboard',
    description: 'Real estate management dashboard with property listings and analytics',
    thumbnail: '/api/placeholder/300/200',
    category: 'Real Estate',
    downloads: 320,
    rating: 4.4,
    lastUpdated: '2025-10-12',
    author: 'JCW Team',
    tags: ['Real Estate', 'Properties', 'Listings', 'Analytics'],
    featured: false
  }
];

const categories = ['All', 'Analytics', 'E-commerce', 'CRM', 'Project Management', 'Finance', 'Real Estate'];

export default function DashboardTemplatesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Templates</h1>
        <p className="mt-2 text-gray-600">
          Professional dashboard templates for various business needs. Ready to use and fully customizable.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Templates</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Download className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Downloads</p>
              <p className="text-2xl font-bold text-gray-900">5,420</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900">4.7</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                category === 'All' 
                  ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Templates */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Featured Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockDashboardTemplates.filter(template => template.featured).map((template) => (
            <div key={template.id} className="bg-white rounded-lg border overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <FileText className="w-16 h-16 text-gray-400" />
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Featured
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                
                <div className="text-xs text-gray-500 mb-4">
                  <span className="inline-flex items-center mr-4">
                    <Download className="w-3 h-3 mr-1" />
                    {template.downloads} downloads
                  </span>
                  <span className="inline-flex items-center mr-4">
                    <Star className="w-3 h-3 mr-1 text-yellow-400" />
                    {template.rating}
                  </span>
                  <span className="inline-flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {template.lastUpdated}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {template.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium flex items-center justify-center">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium flex items-center justify-center">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Templates */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">All Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockDashboardTemplates.map((template) => (
            <div key={template.id} className="bg-white rounded-lg border overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <FileText className="w-16 h-16 text-gray-400" />
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                  {template.featured && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Featured
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                
                <div className="text-xs text-gray-500 mb-4">
                  <span className="inline-flex items-center mr-4">
                    <Download className="w-3 h-3 mr-1" />
                    {template.downloads} downloads
                  </span>
                  <span className="inline-flex items-center mr-4">
                    <Star className="w-3 h-3 mr-1 text-yellow-400" />
                    {template.rating}
                  </span>
                  <span className="inline-flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    {template.author}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {template.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium flex items-center justify-center">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium flex items-center justify-center">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}