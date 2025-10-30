'use client';

import { Globe, Plus, Eye, Edit, Trash2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const mockWebsites = [
  {
    id: 1,
    name: 'Restaurant Website',
    domain: 'myrestaurant.com',
    status: 'live',
    lastUpdated: '2 days ago',
    preview: 'https://via.placeholder.com/300x200',
  },
  {
    id: 2,
    name: 'Portfolio Site',
    domain: 'johndoe-portfolio.com',
    status: 'draft',
    lastUpdated: '1 week ago',
    preview: 'https://via.placeholder.com/300x200',
  },
  {
    id: 3,
    name: 'Business Landing',
    domain: 'mybusiness.com',
    status: 'live',
    lastUpdated: '3 days ago',
    preview: 'https://via.placeholder.com/300x200',
  },
];

export default function WebsitesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Websites</h1>
          <p className="mt-2 text-gray-600">
            Manage and build your websites with our drag-and-drop builder.
          </p>
        </div>
        
        <Link
          href="/dashboard/websites/builder"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Website
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Websites</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <ExternalLink className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Live Sites</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Edit className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Drafts</p>
              <p className="text-2xl font-bold text-gray-900">4</p>
            </div>
          </div>
        </div>
      </div>

      {/* Websites Grid */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Your Websites</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {mockWebsites.map((website) => (
            <div key={website.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gray-100 relative">
                <img 
                  src={website.preview} 
                  alt={website.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    website.status === 'live' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {website.status}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{website.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{website.domain}</p>
                <p className="text-xs text-gray-500 mb-4">Updated {website.lastUpdated}</p>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                  <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 hover:text-red-600 hover:border-red-300 transition-colors">
                    <Trash2 className="w-4 h-4" />
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