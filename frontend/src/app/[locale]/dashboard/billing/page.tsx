'use client';

import { useState } from 'react';
import { 
  CreditCard, 
  Download, 
  Calendar, 
  DollarSign, 
  CheckCircle, 
  AlertCircle,
  Clock,
  FileText
} from 'lucide-react';

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal';
  last4?: string;
  brand?: string;
  email?: string;
  isDefault: boolean;
}

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState<'invoices' | 'payment-methods'>('invoices');

  // Mock data
  const invoices: Invoice[] = [
    {
      id: 'INV-001',
      date: '2024-10-01',
      amount: 29.99,
      status: 'paid',
      description: 'Pro Plan - Monthly Subscription'
    },
    {
      id: 'INV-002',
      date: '2024-09-01',
      amount: 29.99,
      status: 'paid',
      description: 'Pro Plan - Monthly Subscription'
    },
    {
      id: 'INV-003',
      date: '2024-08-01',
      amount: 29.99,
      status: 'paid',
      description: 'Pro Plan - Monthly Subscription'
    }
  ];

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'pm-1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      isDefault: true
    },
    {
      id: 'pm-2',
      type: 'paypal',
      email: 'user@example.com',
      isDefault: false
    }
  ];

  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'overdue':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Billing</h1>
        <p className="text-gray-600">Manage your billing information, invoices, and payment methods.</p>
      </div>

      {/* Current Plan Card */}
      <div className="bg-white rounded-lg shadow-sm border mb-8">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Current Plan</h2>
              <p className="text-gray-600">You are currently on the Pro plan</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">$29.99</div>
              <div className="text-sm text-gray-500">per month</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-1" />
              Next billing date: November 1, 2024
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Change Plan
            </button>
            <button className="text-red-600 hover:text-red-700 text-sm font-medium">
              Cancel Subscription
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('invoices')}
            className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'invoices'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Invoices & Billing History
          </button>
          <button
            onClick={() => setActiveTab('payment-methods')}
            className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'payment-methods'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Payment Methods
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'invoices' && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Invoices</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invoice
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {invoice.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(invoice.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {invoice.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${invoice.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                          {getStatusIcon(invoice.status)}
                          <span className="ml-1 capitalize">{invoice.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-700 flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'payment-methods' && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center">
                <CreditCard className="w-4 h-4 mr-2" />
                Add Payment Method
              </button>
            </div>

            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center mr-3">
                        <CreditCard className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        {method.type === 'card' ? (
                          <>
                            <p className="text-sm font-medium text-gray-900">
                              {method.brand} ending in {method.last4}
                            </p>
                            <p className="text-sm text-gray-500">Expires 12/25</p>
                          </>
                        ) : (
                          <>
                            <p className="text-sm font-medium text-gray-900">PayPal</p>
                            <p className="text-sm text-gray-500">{method.email}</p>
                          </>
                        )}
                        {method.isDefault && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                            Default
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!method.isDefault && (
                        <button className="text-blue-600 hover:text-blue-700 text-sm">
                          Make Default
                        </button>
                      )}
                      <button className="text-red-600 hover:text-red-700 text-sm">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}