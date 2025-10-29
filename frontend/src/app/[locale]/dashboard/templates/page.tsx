'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import MainTab from './MainTab';

export default function DashboardTemplatesPage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'website';
  const [activeTab, setActiveTab] = useState(initialTab);

  const tabs = [
    { id: 'website', label: 'Website Templates' },
    { id: 'email', label: 'Email Templates' },
    { id: 'main', label: 'Main Template' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
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
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Website Templates</h3>
              <p className="text-gray-500">Coming soon - Manage your website templates here.</p>
            </div>
          )}
          
          {activeTab === 'email' && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Email Templates</h3>
              <p className="text-gray-500">Coming soon - Create and manage email templates here.</p>
            </div>
          )}
          
          {activeTab === 'main' && <MainTab />}
        </div>
      </div>
    </div>
  );
}