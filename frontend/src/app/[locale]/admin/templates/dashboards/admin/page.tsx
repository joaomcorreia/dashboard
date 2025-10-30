'use client';

import { useState } from 'react';
import { ArrowLeft, Save, Eye, Settings, Layout, Palette, Users, BarChart } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardEditor() {
  const [isDirty, setIsDirty] = useState(false);
  const [activeSection, setActiveSection] = useState('layout');

  const sections = [
    { id: 'layout', label: 'Layout', icon: Layout },
    { id: 'styling', label: 'Styling', icon: Palette },
    { id: 'analytics', label: 'Analytics', icon: BarChart },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving admin dashboard changes...');
    setIsDirty(false);
  };

  const handlePreview = () => {
    // TODO: Implement preview functionality
    window.open('/en/admin', '_blank');
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
                <h1 className="text-xl font-semibold text-gray-900">Administrator Dashboard Editor</h1>
                <p className="text-sm text-gray-500">System admin interface with user management and platform controls</p>
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
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
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
                          ? 'bg-purple-50 text-purple-700 border-purple-200'
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
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Admin Dashboard Layout</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Navigation Structure
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                            <p className="text-sm text-gray-500">Sidebar Menu</p>
                            <p className="text-xs text-gray-400">System navigation</p>
                          </div>
                          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                            <p className="text-sm text-gray-500">Top Header</p>
                            <p className="text-xs text-gray-400">User controls & notifications</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Dashboard Sections
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 border border-gray-300 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">System Overview</h4>
                            <p className="text-xs text-gray-500">Server stats, uptime, performance</p>
                          </div>
                          <div className="p-4 border border-gray-300 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">User Management</h4>
                            <p className="text-xs text-gray-500">Active users, registrations</p>
                          </div>
                          <div className="p-4 border border-gray-300 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">Platform Analytics</h4>
                            <p className="text-xs text-gray-500">Usage statistics and trends</p>
                          </div>
                          <div className="p-4 border border-gray-300 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">System Logs</h4>
                            <p className="text-xs text-gray-500">Error logs and system events</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'styling' && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Admin Interface Styling</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Admin Theme
                        </label>
                        <div className="flex space-x-4">
                          <div className="w-16 h-16 bg-purple-600 rounded-lg border-2 border-purple-600"></div>
                          <div className="w-16 h-16 bg-gray-800 rounded-lg border-2 border-transparent hover:border-gray-300 cursor-pointer"></div>
                          <div className="w-16 h-16 bg-blue-600 rounded-lg border-2 border-transparent hover:border-gray-300 cursor-pointer"></div>
                          <div className="w-16 h-16 bg-red-600 rounded-lg border-2 border-transparent hover:border-gray-300 cursor-pointer"></div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Layout Density
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                          <button 
                            onClick={() => setIsDirty(true)}
                            className="p-4 border-2 border-gray-300 rounded-lg"
                          >
                            <p className="text-sm font-medium">Compact</p>
                            <p className="text-xs text-gray-500">Dense information</p>
                          </button>
                          <button 
                            onClick={() => setIsDirty(true)}
                            className="p-4 border-2 border-purple-600 rounded-lg bg-purple-50"
                          >
                            <p className="text-sm font-medium">Standard</p>
                            <p className="text-xs text-gray-500">Balanced layout</p>
                          </button>
                          <button 
                            onClick={() => setIsDirty(true)}
                            className="p-4 border-2 border-gray-300 rounded-lg"
                          >
                            <p className="text-sm font-medium">Spacious</p>
                            <p className="text-xs text-gray-500">More whitespace</p>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'analytics' && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Analytics Configuration</h3>
                    <div className="space-y-4">
                      {[
                        { name: 'User Activity Tracking', description: 'Monitor user engagement and feature usage' },
                        { name: 'Performance Metrics', description: 'System performance and response times' },
                        { name: 'Business Intelligence', description: 'Revenue, conversions, and growth metrics' },
                        { name: 'Error Monitoring', description: 'Application errors and system failures' },
                        { name: 'Security Analytics', description: 'Login attempts, security events' },
                        { name: 'Custom Reports', description: 'Configurable dashboard reports' },
                      ].map((metric) => (
                        <div key={metric.name} className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">{metric.name}</h4>
                            <p className="text-xs text-gray-500">{metric.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                defaultChecked 
                                onChange={() => setIsDirty(true)}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                            <button 
                              onClick={() => setIsDirty(true)}
                              className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                            >
                              Configure
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSection === 'users' && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">User Management Features</h3>
                    <div className="space-y-4">
                      {[
                        { name: 'User Registration', description: 'New user approval and onboarding workflow' },
                        { name: 'Role Management', description: 'Define and assign user roles and permissions' },
                        { name: 'Account Suspension', description: 'Temporary and permanent account restrictions' },
                        { name: 'Bulk Operations', description: 'Mass user updates and communications' },
                        { name: 'User Impersonation', description: 'Support access to user accounts' },
                        { name: 'Audit Trail', description: 'Track user actions and administrative changes' },
                      ].map((feature) => (
                        <div key={feature.name} className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">{feature.name}</h4>
                            <p className="text-xs text-gray-500">{feature.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                defaultChecked 
                                onChange={() => setIsDirty(true)}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                            <button 
                              onClick={() => setIsDirty(true)}
                              className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                            >
                              Configure
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSection === 'settings' && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">System Settings</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Platform Configuration
                        </label>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Maintenance Mode</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                onChange={() => setIsDirty(true)}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">New User Registration</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                defaultChecked 
                                onChange={() => setIsDirty(true)}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Email Notifications</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                defaultChecked 
                                onChange={() => setIsDirty(true)}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>
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