'use client';

import { useState } from 'react';
import { Upload, Palette, Phone, MapPin, MessageCircle, Clock, Globe, Eye, EyeOff } from 'lucide-react';

export default function SettingsPage() {
  const [languages, setLanguages] = useState<Record<string, { name: string; enabled: boolean }>>({
    en: { name: 'English', enabled: true },
    es: { name: 'Spanish', enabled: true },
    fr: { name: 'French', enabled: false },
    de: { name: 'German', enabled: false },
    pt: { name: 'Portuguese', enabled: true },
  });

  const [siteColors, setSiteColors] = useState({
    primary: '#3B82F6',
    secondary: '#10B981',
    accent: '#8B5CF6',
  });

  const toggleLanguage = (langCode: string) => {
    setLanguages(prev => ({
      ...prev,
      [langCode]: {
        ...prev[langCode],
        enabled: !prev[langCode].enabled
      }
    }));
  };
  return (
    <div className="p-6">
      <div className="max-w-full mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="mt-2 text-gray-600">Manage your account preferences and settings.</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue="Test"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue="User"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue="admin@test.com"
                />
              </div>
            </div>
            <div className="mt-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Save Changes
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Preferences</h2>
            <p className="text-gray-500">Additional settings will appear here. This section is under development.</p>
          </div>

          {/* Site Settings Section */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-8 py-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900">Site Settings</h2>
              <p className="text-gray-600 mt-1">Customize your site appearance, contact information, and language preferences</p>
            </div>
            
            <div className="p-8 space-y-12">
              {/* Logo Settings */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <Upload className="w-5 h-5 text-blue-600" />
                  </div>
                  Logo & Branding
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Main Logo</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Favicon</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Upload favicon</p>
                    <p className="text-xs text-gray-500 mt-1">ICO, PNG 32x32px</p>
                  </div>
                </div>
                </div>
              </div>

              {/* Color Settings */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <Palette className="w-5 h-5 text-purple-600" />
                  </div>
                  Brand Colors
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <label className="block text-base font-medium text-gray-700 mb-3">Primary Color</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={siteColors.primary}
                      onChange={(e) => setSiteColors(prev => ({ ...prev, primary: e.target.value }))}
                      className="w-16 h-12 rounded-lg border-2 border-gray-300 cursor-pointer shadow-sm"
                    />
                    <input
                      type="text"
                      value={siteColors.primary}
                      onChange={(e) => setSiteColors(prev => ({ ...prev, primary: e.target.value }))}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <label className="block text-base font-medium text-gray-700 mb-3">Secondary Color</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={siteColors.secondary}
                      onChange={(e) => setSiteColors(prev => ({ ...prev, secondary: e.target.value }))}
                      className="w-16 h-12 rounded-lg border-2 border-gray-300 cursor-pointer shadow-sm"
                    />
                    <input
                      type="text"
                      value={siteColors.secondary}
                      onChange={(e) => setSiteColors(prev => ({ ...prev, secondary: e.target.value }))}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <label className="block text-base font-medium text-gray-700 mb-3">Accent Color</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={siteColors.accent}
                      onChange={(e) => setSiteColors(prev => ({ ...prev, accent: e.target.value }))}
                      className="w-16 h-12 rounded-lg border-2 border-gray-300 cursor-pointer shadow-sm"
                    />
                    <input
                      type="text"
                      value={siteColors.accent}
                      onChange={(e) => setSiteColors(prev => ({ ...prev, accent: e.target.value }))}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+1 (555) 123-4567"
                    defaultValue="+1 (555) 987-6543"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+1 (555) 123-4567"
                    defaultValue="+1 (555) 987-6543"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    Business Address
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Enter your complete business address"
                    defaultValue="123 Business Street, Suite 100&#10;Business City, BC 12345&#10;United States"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Hourly Rate (USD)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="75"
                    defaultValue="85"
                    min="0"
                    step="5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="contact@yourbusiness.com"
                    defaultValue="hello@mybusiness.com"
                  />
                </div>
                </div>
              </div>

              {/* Language Settings */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                    <Globe className="w-5 h-5 text-indigo-600" />
                  </div>
                  Language Settings
                </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(languages).map(([code, lang]) => (
                  <div key={code} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <span className="text-base font-medium text-gray-900">{lang.name}</span>
                      </div>
                      <span className="text-xs text-gray-500 uppercase bg-gray-100 px-2 py-1 rounded font-medium">{code}</span>
                    </div>
                    <button
                      onClick={() => toggleLanguage(code)}
                      className={`w-full flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        lang.enabled
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {lang.enabled ? (
                        <>
                          <Eye className="w-4 h-4 mr-2" />
                          Enabled
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-4 h-4 mr-2" />
                          Disabled
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg border-l-4 border-l-blue-400">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Enabled languages will be available for users to switch between on your website. 
                  At least one language must remain enabled.
                </p>
              </div>
              </div>

              {/* Additional Business Details */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  Additional Business Details
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue="My Business LLC"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Technology</option>
                    <option>Consulting</option>
                    <option>Marketing</option>
                    <option>Design</option>
                    <option>E-commerce</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
                  <input
                    type="url"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://yourbusiness.com"
                    defaultValue="https://mybusiness.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>UTC-8 (Pacific Time)</option>
                    <option>UTC-5 (Eastern Time)</option>
                    <option>UTC+0 (GMT)</option>
                    <option>UTC+1 (Central European Time)</option>
                    <option>UTC+8 (China Standard Time)</option>
                  </select>
                </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-center pt-8">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center text-lg font-medium shadow-lg hover:shadow-xl">
                  Save Site Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}