'use client';

import { useState } from 'react';
import { ArrowLeft, Save, Eye, Settings, Layout, Palette, Users } from 'lucide-react';
import Link from 'next/link';

export default function UserAdminDashboardEditor() {
  const [isDirty, setIsDirty] = useState(false);
  const [activeSection, setActiveSection] = useState('layout');

  const sections = [
    { id: 'layout', label: 'Layout', icon: Layout },
    { id: 'styling', label: 'Styling', icon: Palette },
    { id: 'components', label: 'Components', icon: Settings },
    { id: 'permissions', label: 'Permissions', icon: Users },
  ];

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving user admin dashboard changes...');
    setIsDirty(false);
  };

  const handlePreview = () => {
    // TODO: Implement preview functionality
    window.open('/en/dashboard', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href="/en/admin/templates?tab=dashboards"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Templates
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">User Admin Dashboard Editor</h1>
                <p className="text-sm text-gray-500">Business user dashboard for order tracking and account management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handlePreview}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </button>
              <button
                onClick={handleSave}
                disabled={!isDirty}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isDirty
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <h3 className="font-medium text-gray-900">Editor Sections</h3>
              </div>
              <nav className="p-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      {section.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6">
                {activeSection === 'layout' && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Dashboard Layout</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Main Navigation
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                            <p className="text-sm text-gray-500">Sidebar Navigation</p>
                          </div>
                          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                            <p className="text-sm text-gray-500">Top Navigation</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Dashboard Widgets
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="p-4 border border-gray-300 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">Orders Overview</h4>
                            <p className="text-xs text-gray-500">Recent orders and status</p>
                          </div>
                          <div className="p-4 border border-gray-300 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">Print Jobs</h4>
                            <p className="text-xs text-gray-500">Active print queue</p>
                          </div>
                          <div className="p-4 border border-gray-300 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">Account Status</h4>
                            <p className="text-xs text-gray-500">Business account info</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'styling' && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Dashboard Styling</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Color Scheme
                        </label>
                        <div className="flex space-x-4">
                          <div className="w-16 h-16 bg-blue-600 rounded-lg border-2 border-blue-600"></div>
                          <div className="w-16 h-16 bg-green-600 rounded-lg border-2 border-transparent hover:border-gray-300 cursor-pointer"></div>
                          <div className="w-16 h-16 bg-purple-600 rounded-lg border-2 border-transparent hover:border-gray-300 cursor-pointer"></div>
                          <div className="w-16 h-16 bg-orange-600 rounded-lg border-2 border-transparent hover:border-gray-300 cursor-pointer"></div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Typography
                        </label>
                        <select className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                          <option>Inter (Default)</option>
                          <option>Roboto</option>
                          <option>Open Sans</option>
                          <option>Lato</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'components' && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Dashboard Components</h3>
                    <div className="space-y-4">
                      {['Orders Table', 'Print Queue', 'Analytics Charts', 'Recent Activity', 'Quick Actions', 'Account Settings'].map((component) => (
                        <div key={component} className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">{component}</h4>
                            <p className="text-xs text-gray-500">Configure {component.toLowerCase()} component</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                            <button 
                              onClick={() => setIsDirty(true)}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              Configure
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSection === 'permissions' && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Access Permissions</h3>
                    <div className="space-y-4">
                      {[
                        { name: 'View Orders', description: 'Access to order history and details' },
                        { name: 'Manage Print Jobs', description: 'Create and modify print orders' },
                        { name: 'Account Settings', description: 'Update business information and preferences' },
                        { name: 'Billing Information', description: 'View invoices and payment methods' },
                        { name: 'Team Management', description: 'Invite and manage team members' },
                      ].map((permission) => (
                        <div key={permission.name} className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">{permission.name}</h4>
                            <p className="text-xs text-gray-500">{permission.description}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer" 
                              defaultChecked 
                              onChange={() => setIsDirty(true)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}