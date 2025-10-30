'use client';

import { Settings, User, Lock, Bell, Palette, Globe, Shield, CreditCard } from 'lucide-react';

const settingsSections = [
  {
    title: 'Account',
    description: 'Manage your account information and preferences',
    icon: User,
    items: [
      { label: 'Profile Information', description: 'Update your name, email, and profile photo', href: '#' },
      { label: 'Account Security', description: 'Change password and enable two-factor authentication', href: '#' },
      { label: 'Email Preferences', description: 'Control which emails you receive', href: '#' },
    ]
  },
  {
    title: 'Notifications',
    description: 'Configure how and when you receive notifications',
    icon: Bell,
    items: [
      { label: 'Push Notifications', description: 'Manage browser and mobile notifications', href: '#' },
      { label: 'Email Notifications', description: 'Choose which emails to receive', href: '#' },
      { label: 'SMS Notifications', description: 'Set up text message alerts', href: '#' },
    ]
  },
  {
    title: 'Appearance',
    description: 'Customize the look and feel of your dashboard',
    icon: Palette,
    items: [
      { label: 'Theme', description: 'Choose between light and dark mode', href: '#' },
      { label: 'Language', description: 'Select your preferred language', href: '#' },
      { label: 'Timezone', description: 'Set your local timezone', href: '#' },
    ]
  },
  {
    title: 'Privacy & Security',
    description: 'Control your privacy settings and security options',
    icon: Shield,
    items: [
      { label: 'Privacy Settings', description: 'Manage data sharing and visibility', href: '#' },
      { label: 'Login Sessions', description: 'View and manage active sessions', href: '#' },
      { label: 'API Keys', description: 'Generate and manage API access keys', href: '#' },
    ]
  },
  {
    title: 'Billing & Subscription',
    description: 'Manage your subscription and billing preferences',
    icon: CreditCard,
    items: [
      { label: 'Subscription Plan', description: 'View and change your current plan', href: '#' },
      { label: 'Payment Methods', description: 'Add or update payment information', href: '#' },
      { label: 'Billing History', description: 'View past invoices and payments', href: '#' },
    ]
  },
  {
    title: 'Integration',
    description: 'Connect with third-party services and tools',
    icon: Globe,
    items: [
      { label: 'Connected Apps', description: 'Manage third-party integrations', href: '#' },
      { label: 'Webhooks', description: 'Set up webhook endpoints', href: '#' },
      { label: 'Export Data', description: 'Download your data and content', href: '#' },
    ]
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">
          Manage your account settings and preferences.
        </p>
      </div>

      {/* Quick Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsSections.map((section) => {
          const IconComponent = section.icon;
          return (
            <div key={section.title} className="bg-white rounded-lg border hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{section.description}</p>
                
                <div className="space-y-3">
                  {section.items.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="block p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-medium text-gray-900 text-sm">{item.label}</div>
                      <div className="text-gray-500 text-xs mt-1">{item.description}</div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left">
              <Lock className="w-6 h-6 text-blue-600 mb-2" />
              <div className="font-medium text-gray-900">Change Password</div>
              <div className="text-sm text-gray-500">Update your password</div>
            </button>
            
            <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left">
              <Bell className="w-6 h-6 text-green-600 mb-2" />
              <div className="font-medium text-gray-900">Notification Center</div>
              <div className="text-sm text-gray-500">Manage all notifications</div>
            </button>
            
            <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left">
              <Palette className="w-6 h-6 text-purple-600 mb-2" />
              <div className="font-medium text-gray-900">Theme Settings</div>
              <div className="text-sm text-gray-500">Customize appearance</div>
            </button>
            
            <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left">
              <Globe className="w-6 h-6 text-orange-600 mb-2" />
              <div className="font-medium text-gray-900">API Access</div>
              <div className="text-sm text-gray-500">Manage API keys</div>
            </button>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Account Actions</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div>
                <h3 className="font-medium text-gray-900">Export Your Data</h3>
                <p className="text-sm text-gray-600">Download a copy of all your data and content</p>
              </div>
              <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700">
                Export
              </button>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg border border-red-200">
              <div>
                <h3 className="font-medium text-gray-900">Delete Account</h3>
                <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
              </div>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}