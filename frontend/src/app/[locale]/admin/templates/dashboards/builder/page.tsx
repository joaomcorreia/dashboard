'use client';

import { useState } from 'react';
import { ArrowLeft, Save, Eye, Settings, Layout, Palette, Code } from 'lucide-react';
import Link from 'next/link';

export default function BuilderDashboardEditor() {
  const [isDirty, setIsDirty] = useState(false);
  const [activeSection, setActiveSection] = useState('layout');

  const sections = [
    { id: 'layout', label: 'Layout', icon: Layout },
    { id: 'styling', label: 'Styling', icon: Palette },
    { id: 'tools', label: 'Builder Tools', icon: Settings },
    { id: 'templates', label: 'Templates', icon: Code },
  ];

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving builder dashboard changes...');
    setIsDirty(false);
  };

  const handlePreview = () => {
    // TODO: Implement preview functionality
    window.open('/en/builder', '_blank');
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
                <h1 className="text-xl font-semibold text-gray-900">Website Builder Dashboard Editor</h1>
                <p className="text-sm text-gray-500">Interface for website creation with templates and design tools</p>
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
                    ? 'bg-green-600 text-white hover:bg-green-700'
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
                          ? 'bg-green-50 text-green-700 border-green-200'
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
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Builder Dashboard Layout</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Canvas Area
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center col-span-2">
                            <p className="text-sm text-gray-500">Main Canvas</p>
                            <p className="text-xs text-gray-400">Website editing area</p>
                          </div>
                          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                            <p className="text-sm text-gray-500">Properties Panel</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tool Panels
                        </label>
                        <div className="grid grid-cols-4 gap-4">
                          <div className="p-4 border border-gray-300 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">Elements</h4>
                            <p className="text-xs text-gray-500">Drag & drop components</p>
                          </div>
                          <div className="p-4 border border-gray-300 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">Styles</h4>
                            <p className="text-xs text-gray-500">CSS styling tools</p>
                          </div>
                          <div className="p-4 border border-gray-300 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">Assets</h4>
                            <p className="text-xs text-gray-500">Images and media</p>
                          </div>
                          <div className="p-4 border border-gray-300 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">Pages</h4>
                            <p className="text-xs text-gray-500">Site structure</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'styling' && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Builder Interface Styling</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Interface Theme
                        </label>
                        <div className="flex space-x-4">
                          <div className="w-16 h-16 bg-green-600 rounded-lg border-2 border-green-600"></div>
                          <div className="w-16 h-16 bg-blue-600 rounded-lg border-2 border-transparent hover:border-gray-300 cursor-pointer"></div>
                          <div className="w-16 h-16 bg-purple-600 rounded-lg border-2 border-transparent hover:border-gray-300 cursor-pointer"></div>
                          <div className="w-16 h-16 bg-gray-800 rounded-lg border-2 border-transparent hover:border-gray-300 cursor-pointer"></div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Canvas Background
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                          <button 
                            onClick={() => setIsDirty(true)}
                            className="p-4 border-2 border-green-600 rounded-lg bg-white"
                          >
                            <p className="text-sm font-medium">Light</p>
                          </button>
                          <button 
                            onClick={() => setIsDirty(true)}
                            className="p-4 border-2 border-gray-300 rounded-lg bg-gray-100"
                          >
                            <p className="text-sm font-medium">Gray</p>
                          </button>
                          <button 
                            onClick={() => setIsDirty(true)}
                            className="p-4 border-2 border-gray-300 rounded-lg bg-gray-900 text-white"
                          >
                            <p className="text-sm font-medium">Dark</p>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'tools' && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Builder Tools Configuration</h3>
                    <div className="space-y-4">
                      {[
                        { name: 'Drag & Drop Editor', description: 'Visual element positioning and arrangement' },
                        { name: 'Code Editor', description: 'Direct HTML/CSS/JS editing capabilities' },
                        { name: 'Responsive Preview', description: 'Multi-device preview modes' },
                        { name: 'Asset Manager', description: 'File upload and media management' },
                        { name: 'Template Library', description: 'Pre-built component templates' },
                        { name: 'Style Inspector', description: 'Advanced CSS styling tools' },
                      ].map((tool) => (
                        <div key={tool.name} className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">{tool.name}</h4>
                            <p className="text-xs text-gray-500">{tool.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                defaultChecked 
                                onChange={() => setIsDirty(true)}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                            </label>
                            <button 
                              onClick={() => setIsDirty(true)}
                              className="text-green-600 hover:text-green-800 text-sm font-medium"
                            >
                              Configure
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSection === 'templates' && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Template Management</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Available Template Categories
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            'Business Templates',
                            'E-commerce Templates', 
                            'Portfolio Templates',
                            'Blog Templates',
                            'Landing Pages',
                            'Custom Components'
                          ].map((category) => (
                            <div key={category} className="p-4 border border-gray-300 rounded-lg">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-gray-900">{category}</h4>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input 
                                    type="checkbox" 
                                    className="sr-only peer" 
                                    defaultChecked 
                                    onChange={() => setIsDirty(true)}
                                  />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                </label>
                              </div>
                            </div>
                          ))}
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