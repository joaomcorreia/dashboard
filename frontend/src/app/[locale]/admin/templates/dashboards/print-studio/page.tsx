'use client';

import { useState } from 'react';
import { ArrowLeft, Save, Eye, Settings, Layout, Palette, Printer } from 'lucide-react';
import Link from 'next/link';

export default function PrintStudioDashboardEditor() {
  const [isDirty, setIsDirty] = useState(false);
  const [activeSection, setActiveSection] = useState('layout');

  const sections = [
    { id: 'layout', label: 'Layout', icon: Layout },
    { id: 'styling', label: 'Styling', icon: Palette },
    { id: 'workflow', label: 'Print Workflow', icon: Printer },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving print studio dashboard changes...');
    setIsDirty(false);
  };

  const handlePreview = () => {
    // TODO: Implement preview functionality  
    window.open('/en/print-studio', '_blank');
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
                <h1 className="text-xl font-semibold text-gray-900">Print Studio Dashboard Editor</h1>
                <p className="text-sm text-gray-500">Dashboard for print order management and production tracking</p>
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
                    ? 'bg-orange-600 text-white hover:bg-orange-700'
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
                          ? 'bg-orange-50 text-orange-700 border-orange-200'
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
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Print Studio Layout</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Main Work Area
                        </label>
                        <div className="grid grid-cols-4 gap-4">
                          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                            <p className="text-sm text-gray-500">Design Tools</p>
                          </div>
                          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center col-span-2">
                            <p className="text-sm text-gray-500">Canvas Area</p>
                            <p className="text-xs text-gray-400">Print design workspace</p>
                          </div>
                          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                            <p className="text-sm text-gray-500">Properties</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Dashboard Widgets
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="p-4 border border-gray-300 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">Order Queue</h4>
                            <p className="text-xs text-gray-500">Pending print jobs</p>
                          </div>
                          <div className="p-4 border border-gray-300 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">Production Status</h4>
                            <p className="text-xs text-gray-500">Real-time job tracking</p>
                          </div>
                          <div className="p-4 border border-gray-300 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">Templates Library</h4>
                            <p className="text-xs text-gray-500">Design templates</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'styling' && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Print Studio Styling</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Interface Theme
                        </label>
                        <div className="flex space-x-4">
                          <div className="w-16 h-16 bg-orange-600 rounded-lg border-2 border-orange-600"></div>
                          <div className="w-16 h-16 bg-red-600 rounded-lg border-2 border-transparent hover:border-gray-300 cursor-pointer"></div>
                          <div className="w-16 h-16 bg-blue-600 rounded-lg border-2 border-transparent hover:border-gray-300 cursor-pointer"></div>
                          <div className="w-16 h-16 bg-gray-800 rounded-lg border-2 border-transparent hover:border-gray-300 cursor-pointer"></div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Canvas Settings
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Grid Style</label>
                            <select 
                              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                              onChange={() => setIsDirty(true)}
                            >
                              <option>Dots</option>
                              <option>Lines</option>
                              <option>None</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Rulers</label>
                            <select 
                              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                              onChange={() => setIsDirty(true)}
                            >
                              <option>Visible</option>
                              <option>Hidden</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'workflow' && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Print Workflow Configuration</h3>
                    <div className="space-y-4">
                      {[
                        { name: 'Order Processing', description: 'Automated order intake and validation' },
                        { name: 'Design Review', description: 'Quality check and approval process' },
                        { name: 'Production Queue', description: 'Job scheduling and printer assignment' },
                        { name: 'Quality Control', description: 'Post-print inspection workflow' },
                        { name: 'Shipping Integration', description: 'Packaging and delivery coordination' },
                        { name: 'Customer Notifications', description: 'Automated status updates' },
                      ].map((step) => (
                        <div key={step.name} className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">{step.name}</h4>
                            <p className="text-xs text-gray-500">{step.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                defaultChecked 
                                onChange={() => setIsDirty(true)}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                            </label>
                            <button 
                              onClick={() => setIsDirty(true)}
                              className="text-orange-600 hover:text-orange-800 text-sm font-medium"
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
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Print Studio Settings</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Default Print Settings
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Paper Size</label>
                            <select 
                              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                              onChange={() => setIsDirty(true)}
                            >
                              <option>A4</option>
                              <option>Letter</option>
                              <option>Legal</option>
                              <option>Custom</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Quality</label>
                            <select 
                              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                              onChange={() => setIsDirty(true)}
                            >
                              <option>High (600 DPI)</option>
                              <option>Medium (300 DPI)</option>
                              <option>Draft (150 DPI)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          File Upload Settings
                        </label>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Max file size (MB)</span>
                            <input 
                              type="number" 
                              defaultValue="50" 
                              className="w-20 px-3 py-1 border border-gray-300 rounded text-sm"
                              onChange={() => setIsDirty(true)}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Allowed formats</span>
                            <span className="text-sm text-gray-500">PDF, JPG, PNG, AI, PSD</span>
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