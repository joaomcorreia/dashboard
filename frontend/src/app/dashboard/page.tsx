'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Globe, 
  Printer, 
  FileText, 
  Package, 
  TrendingUp, 
  Users,
  DollarSign,
  Activity,
  Plus,
  ArrowRight,
  Edit2,
  Trash2,
  MoreHorizontal
} from 'lucide-react';

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
}

interface QuickAction {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const stats: StatCard[] = [
  {
    title: 'Total Websites',
    value: '12',
    change: '+2 this month',
    changeType: 'positive',
    icon: Globe,
  },
  {
    title: 'Print Orders',
    value: '28',
    change: '+12% from last month',
    changeType: 'positive',
    icon: Package,
  },
  {
    title: 'Templates',
    value: '45',
    change: '+5 this week',
    changeType: 'positive',
    icon: FileText,
  },
  {
    title: 'Revenue',
    value: '$2,845',
    change: '+18% from last month',
    changeType: 'positive',
    icon: DollarSign,
  },
];

const quickActions: QuickAction[] = [
  {
    title: 'Create Website',
    description: 'Start building a new website with our drag-and-drop builder',
    href: '/dashboard/websites/builder',
    icon: Globe,
    color: 'bg-blue-500',
  },
  {
    title: 'New Print Order',
    description: 'Design and order business cards, flyers, and more',
    href: '/dashboard/printing/builder',
    icon: Printer,
    color: 'bg-green-500',
  },
  {
    title: 'Browse Templates',
    description: 'Explore our collection of website and print templates',
    href: '/dashboard/templates',
    icon: FileText,
    color: 'bg-purple-500',
  },
  {
    title: 'Manage Assets',
    description: 'Upload logos, manage brand colors and fonts',
    href: '/dashboard/assets',
    icon: Package,
    color: 'bg-orange-500',
  },
];

export default function DashboardPage() {
  const [showDropdown, setShowDropdown] = useState<number | null>(null);

  const handleEdit = (id: number, type: 'website' | 'order') => {
    console.log(`Edit ${type} ${id}`);
    // Add edit functionality here
    setShowDropdown(null);
  };

  const handleDelete = (id: number, type: 'website' | 'order') => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      console.log(`Delete ${type} ${id}`);
      // Add delete functionality here
    }
    setShowDropdown(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome back! Here's an overview of your projects and activity.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <Icon className="w-6 h-6 text-gray-600" />
                </div>
              </div>
              <div className="mt-4">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 
                  stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                href={action.href}
                className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 ${action.color} rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Websites */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Websites</h3>
            <Link href="/dashboard/websites" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Website {i}</p>
                    <p className="text-xs text-gray-500">Updated 2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Live
                  </span>
                  <div className="relative">
                    <button
                      onClick={() => setShowDropdown(showDropdown === i ? null : i)}
                      className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                    {showDropdown === i && (
                      <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg border z-10">
                        <button
                          onClick={() => handleEdit(i, 'website')}
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(i, 'website')}
                          className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Print Orders */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Print Orders</h3>
            <Link href="/dashboard/printing/orders" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={`order-${i}`} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Business Cards #{i}00{i}</p>
                    <p className="text-xs text-gray-500">Ordered 1 week ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                    Processing
                  </span>
                  <div className="relative">
                    <button
                      onClick={() => setShowDropdown(showDropdown === i + 10 ? null : i + 10)}
                      className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                    {showDropdown === i + 10 && (
                      <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg border z-10">
                        <button
                          onClick={() => handleEdit(i, 'order')}
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(i, 'order')}
                          className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}