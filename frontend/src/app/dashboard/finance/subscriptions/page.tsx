'use client';

import { Plus, ExternalLink, Calendar, DollarSign, Globe, CreditCard } from 'lucide-react';

const mockSubscriptions = [
  {
    id: 1,
    name: 'Website Hosting Pro',
    description: 'Premium hosting plan with SSL, CDN, and 24/7 support',
    renewDate: '2025-11-15',
    registeredDate: '2024-11-15',
    url: 'https://hosting.jcw.com/dashboard',
    status: 'active',
    price: '$19.99/month',
    type: 'hosting'
  },
  {
    id: 2,
    name: 'Domain Registration',
    description: 'Premium .com domain with privacy protection',
    renewDate: '2025-12-03',
    registeredDate: '2023-12-03',
    url: 'https://domains.jcw.com/manage',
    status: 'active',
    price: '$12.99/year',
    type: 'domain'
  },
  {
    id: 3,
    name: 'Email Marketing Suite',
    description: 'Professional email marketing with automation tools',
    renewDate: '2025-10-30',
    registeredDate: '2025-01-30',
    url: 'https://email.jcw.com/campaigns',
    status: 'expiring_soon',
    price: '$29.99/month',
    type: 'marketing'
  },
  {
    id: 4,
    name: 'Analytics Premium',
    description: 'Advanced website analytics and reporting tools',
    renewDate: '2026-01-20',
    registeredDate: '2025-01-20',
    url: 'https://analytics.jcw.com/reports',
    status: 'active',
    price: '$15.99/month',
    type: 'analytics'
  },
  {
    id: 5,
    name: 'SSL Certificate',
    description: 'Extended validation SSL certificate for secure connections',
    renewDate: '2025-11-08',
    registeredDate: '2024-11-08',
    url: 'https://ssl.jcw.com/certificates',
    status: 'active',
    price: '$89.99/year',
    type: 'security'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'expiring_soon': return 'bg-yellow-100 text-yellow-800';
    case 'expired': return 'bg-red-100 text-red-800';
    case 'cancelled': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'hosting': return <Globe className="w-4 h-4" />;
    case 'domain': return <Globe className="w-4 h-4" />;
    case 'marketing': return <CreditCard className="w-4 h-4" />;
    case 'analytics': return <DollarSign className="w-4 h-4" />;
    case 'security': return <CreditCard className="w-4 h-4" />;
    default: return <CreditCard className="w-4 h-4" />;
  }
};

export default function SubscriptionsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Subscriptions</h1>
          <p className="mt-2 text-gray-600">
            Manage all your active subscriptions and renewals in one place.
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Subscription</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Subscriptions</p>
              <p className="text-2xl font-bold text-gray-900">{mockSubscriptions.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Monthly Cost</p>
              <p className="text-2xl font-bold text-gray-900">$97.96</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Globe className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Services</p>
              <p className="text-2xl font-bold text-gray-900">4</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">All Subscriptions</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Renew Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockSubscriptions.map((subscription) => (
                <tr key={subscription.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="p-2 bg-gray-100 rounded-lg mr-3">
                        {getTypeIcon(subscription.type)}
                      </div>
                      <div className="text-sm font-medium text-gray-900">{subscription.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs">{subscription.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{subscription.renewDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{subscription.registeredDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a 
                      href={subscription.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-900 text-sm flex items-center"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Visit
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(subscription.status)}`}>
                      {subscription.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{subscription.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-4">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Plus className="w-8 h-8 text-blue-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Add New Subscription</p>
              <p className="text-sm text-gray-500">Track a new service</p>
            </div>
          </button>
          
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="w-8 h-8 text-green-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Renewal Calendar</p>
              <p className="text-sm text-gray-500">View upcoming renewals</p>
            </div>
          </button>
          
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <DollarSign className="w-8 h-8 text-purple-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Cost Analysis</p>
              <p className="text-sm text-gray-500">Analyze spending patterns</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}