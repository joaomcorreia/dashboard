'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import MainTab from './MainTab';
import SectionOrderManager from '@/components/sections/SectionOrderManager';
import WebsiteTemplatesTab from '@/components/templates/WebsiteTemplatesTab';

export default function AdminTemplatesPage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'website';
  const [activeTab, setActiveTab] = useState(initialTab);

  const tabs = [
    { id: 'website', label: 'Website Templates' },
    { id: 'email', label: 'Email Templates' },
    { id: 'dashboards', label: 'Dashboards' },
    { id: 'main', label: 'Main Template' },
    { id: 'order', label: 'Section Order' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Templates
        </h1>
        <p className="text-gray-600">
          Manage and create templates for your projects.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        {activeTab === 'website' && (
          <WebsiteTemplatesTab />
        )}
        
        {activeTab === 'email' && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Email Templates</h3>
            <p className="text-gray-500">Coming soon - Create and manage email templates here.</p>
          </div>
        )}
        
        {activeTab === 'dashboards' && (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Dashboard Templates</h3>
              <p className="text-gray-500">Manage and customize dashboard layouts for different user types.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Business Dashboard Card */}
              <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-blue-50 to-blue-100 rounded-t-lg p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h4 className="font-medium text-gray-900">Business Dashboard</h4>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Business User Dashboard</h3>
                  <p className="text-gray-600 text-sm mb-4">Dashboard for business users with order tracking, print management, and account features.</p>
                  <div className="flex space-x-3">
                    <Link 
                      href="/en/admin/templates/dashboards/user-admin"
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium text-center"
                    >
                      Edit Dashboard
                    </Link>
                    <button 
                      onClick={() => window.open('/en/dashboard', '_blank')}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                    >
                      Preview
                    </button>
                  </div>
                </div>
              </div>

              {/* Admin Dashboard Card */}
              <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-purple-50 to-purple-100 rounded-t-lg p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h4 className="font-medium text-gray-900">Admin Dashboard</h4>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Administrator Dashboard</h3>
                  <p className="text-gray-600 text-sm mb-4">Admin interface with user management, system statistics, and platform controls.</p>
                  <div className="flex space-x-3">
                    <Link 
                      href="/en/admin/templates/dashboards/admin"
                      className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium text-center"
                    >
                      Edit Dashboard
                    </Link>
                    <button 
                      onClick={() => window.open('/en/admin', '_blank')}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                    >
                      Preview
                    </button>
                  </div>
                </div>
              </div>

              {/* Website Builder Dashboard Card */}
              <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-green-50 to-green-100 rounded-t-lg p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <h4 className="font-medium text-gray-900">Website Builder</h4>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Website Builder Dashboard</h3>
                  <p className="text-gray-600 text-sm mb-4">Interface for website creation with templates, design tools, and site management.</p>
                  <div className="flex space-x-3">
                    <Link 
                      href="/en/admin/templates/dashboards/builder"
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium text-center"
                    >
                      Edit Dashboard
                    </Link>
                    <button 
                      onClick={() => window.open('/en/builder', '_blank')}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                    >
                      Preview
                    </button>
                  </div>
                </div>
              </div>

              {/* Print Studio Dashboard Card */}
              <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-orange-50 to-orange-100 rounded-t-lg p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                    </div>
                    <h4 className="font-medium text-gray-900">Print Studio</h4>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Print Studio Dashboard</h3>
                  <p className="text-gray-600 text-sm mb-4">Dashboard for print order management, design templates, and production tracking.</p>
                  <div className="flex space-x-3">
                    <Link 
                      href="/en/admin/templates/dashboards/print-studio"
                      className="flex-1 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium text-center"
                    >
                      Edit Dashboard
                    </Link>
                    <button 
                      onClick={() => window.open('/en/print-studio', '_blank')}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                    >
                      Preview
                    </button>
                  </div>
                </div>
              </div>

              {/* Custom Dashboard Card */}
              <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-lg p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                      </svg>
                    </div>
                    <h4 className="font-medium text-gray-900">Custom Layout</h4>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Custom Dashboard</h3>
                  <p className="text-gray-600 text-sm mb-4">Create a completely custom dashboard layout with your own components and design.</p>
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium">
                      Create New
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                      Templates
                    </button>
                  </div>
                </div>
              </div>

              {/* Add New Dashboard Card */}
              <div className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
                <div className="aspect-video rounded-t-lg p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <h4 className="font-medium text-gray-500">Add New Dashboard</h4>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-700 mb-2">Create Dashboard Template</h3>
                  <p className="text-gray-500 text-sm mb-4">Start from scratch or duplicate an existing dashboard template.</p>
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      Create Dashboard
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'main' && <MainTab />}
        
        {activeTab === 'order' && (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Section Order Management</h3>
              <p className="text-gray-500">Manage the order of sections on your homepage. Drag and drop to reorder, or use the arrow buttons.</p>
            </div>
            <SectionOrderManager />
          </div>
        )}
      </div>
    </div>
  );
}