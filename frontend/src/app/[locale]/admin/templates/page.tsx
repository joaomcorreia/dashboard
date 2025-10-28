'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  Copy,
  Globe,
  Layout,
  Image,
  Download
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  category: string;
  type: 'website' | 'email' | 'landing';
  status: 'published' | 'draft' | 'archived';
  sections: number;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
  preview?: string;
}

export default function AdminTemplatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Mock data - replace with real API calls
  const templates: Template[] = [
    {
      id: '1',
      name: 'jcw-rest-01-modern',
      category: 'restaurant',
      type: 'website',
      status: 'published',
      sections: 5,
      usageCount: 156,
      createdAt: '2024-10-15',
      updatedAt: '2024-10-25',
      preview: '/api/placeholder/400/300'
    },
    {
      id: '2',
      name: 'jcw-svc-01-professional',
      category: 'services',
      type: 'website',
      status: 'draft',
      sections: 7,
      usageCount: 89,
      createdAt: '2024-10-20',
      updatedAt: '2024-10-27',
      preview: '/api/placeholder/400/300'
    },
    {
      id: '3',
      name: 'jcw-shop-01-minimal',
      category: 'ecommerce',
      type: 'website',
      status: 'published',
      sections: 8,
      usageCount: 234,
      createdAt: '2024-10-25',
      updatedAt: '2024-10-28',
      preview: '/api/placeholder/400/300'
    },
    {
      id: '4',
      name: 'welcome-email-template',
      category: 'email',
      type: 'email',
      status: 'published',
      sections: 3,
      usageCount: 1250,
      createdAt: '2024-10-10',
      updatedAt: '2024-10-20'
    },
    {
      id: '5',
      name: 'landing-page-saas',
      category: 'technology',
      type: 'landing',
      status: 'archived',
      sections: 6,
      usageCount: 45,
      createdAt: '2024-09-15',
      updatedAt: '2024-09-30'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'website': return 'bg-blue-100 text-blue-800';
      case 'email': return 'bg-purple-100 text-purple-800';
      case 'landing': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'website': return <Globe className="w-4 h-4" />;
      case 'email': return <FileText className="w-4 h-4" />;
      case 'landing': return <Layout className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || template.status === statusFilter;
    const matchesType = typeFilter === 'all' || template.type === typeFilter;
    return matchesSearch && matchesCategory && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Template Management</h1>
          <p className="text-gray-600">Create and manage templates for websites, emails, and landing pages</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Import
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            New Template
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Templates</p>
              <p className="text-2xl font-bold text-gray-900">{templates.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Website Templates</p>
              <p className="text-2xl font-bold text-gray-900">
                {templates.filter(t => t.type === 'website').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Email Templates</p>
              <p className="text-2xl font-bold text-gray-900">
                {templates.filter(t => t.type === 'email').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Layout className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Usage</p>
              <p className="text-2xl font-bold text-gray-900">
                {templates.reduce((sum, t) => sum + t.usageCount, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="website">Website</option>
              <option value="email">Email</option>
              <option value="landing">Landing Page</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="restaurant">Restaurant</option>
              <option value="services">Services</option>
              <option value="ecommerce">E-commerce</option>
              <option value="technology">Technology</option>
              <option value="email">Email</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          
          <div className="ml-auto text-sm text-gray-600">
            Showing {filteredTemplates.length} of {templates.length} templates
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            {/* Preview Image */}
            <div className="aspect-video bg-gray-100 rounded-t-lg flex items-center justify-center relative">
              {template.preview ? (
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-t-lg flex items-center justify-center">
                  <Image className="w-12 h-12 text-gray-400" />
                </div>
              ) : (
                <div className="text-center">
                  {getTypeIcon(template.type)}
                  <p className="text-sm text-gray-500 mt-2 capitalize">{template.type} Template</p>
                </div>
              )}
              
              {/* Type Badge */}
              <div className="absolute top-3 left-3">
                <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(template.type)}`}>
                  {getTypeIcon(template.type)}
                  <span className="ml-1 capitalize">{template.type}</span>
                </span>
              </div>

              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(template.status)}`}>
                  {template.status}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-sm">
                  {template.name}
                </h3>
              </div>
              
              <div className="text-xs text-gray-600 space-y-1 mb-4">
                <p>Category: <span className="capitalize">{template.category}</span></p>
                <p>Sections: {template.sections}</p>
                <p>Used: {template.usageCount} times</p>
                <p>Updated: {template.updatedAt}</p>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50 transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50 transition-colors hover:text-red-600 hover:border-red-300">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No templates found
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || categoryFilter !== 'all' || statusFilter !== 'all' || typeFilter !== 'all' 
              ? 'Try adjusting your filters to find templates.'
              : 'Get started by creating your first template.'
            }
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto">
            <Plus className="w-4 h-4 mr-2" />
            Create Template
          </button>
        </div>
      )}
    </div>
  );
}