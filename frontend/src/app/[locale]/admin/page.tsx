'use client';

import Link from 'next/link';
import { 
  Users, 
  Building2, 
  TrendingUp, 
  DollarSign,
  FileText,
  AlertTriangle,
  Calendar,
  Clock,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Plus
} from 'lucide-react';

const statsData = [
  {
    title: 'Total Users',
    value: '2,543',
    change: '+12%',
    changeType: 'positive' as const,
    icon: Users
  },
  {
    title: 'Active Businesses',
    value: '847',
    change: '+8%',
    changeType: 'positive' as const,
    icon: Building2
  },
  {
    title: 'Monthly Revenue',
    value: '$54,231',
    change: '+15%',
    changeType: 'positive' as const,
    icon: DollarSign
  },
  {
    title: 'Support Tickets',
    value: '23',
    change: '-5%',
    changeType: 'negative' as const,
    icon: AlertTriangle
  }
];

const quickActions = [
  {
    title: 'User Management',
    description: 'View and manage platform users',
    href: '/en/admin/users',
    icon: Users,
    color: 'bg-blue-500'
  },
  {
    title: 'Business Accounts',
    description: 'Manage business registrations',
    href: '/en/admin/businesses',
    icon: Building2,
    color: 'bg-green-500'
  },
  {
    title: 'Finance Overview',
    description: 'View financial reports and expenses',
    href: '/en/admin/finance',
    icon: TrendingUp,
    color: 'bg-purple-500'
  },
  {
    title: 'System Settings',
    description: 'Configure platform settings',
    href: '/en/admin/settings',
    icon: FileText,
    color: 'bg-orange-500'
  }
];

const recentActivityData = [
  {
    id: 1,
    type: 'user_registered',
    message: 'New user John Doe registered',
    timestamp: '2 minutes ago',
    icon: Users
  },
  {
    id: 2,
    type: 'business_created',
    message: 'TechCorp created a new business account',
    timestamp: '15 minutes ago',
    icon: Building2
  },
  {
    id: 3,
    type: 'payment_received',
    message: 'Payment of $299 received from ABC Inc',
    timestamp: '1 hour ago',
    icon: DollarSign
  },
  {
    id: 4,
    type: 'support_ticket',
    message: 'New support ticket #1247 created',
    timestamp: '2 hours ago',
    icon: AlertTriangle
  }
];

export default function AdminOverview() {
  // Mock data - replace with real API calls
  const dashboardStats = [
    {
      title: 'Total Users',
      value: '0',
      change: '0%',
      trend: 'neutral' as const,
      icon: <Users className="w-6 h-6" />
    },
    {
      title: 'Active Businesses',
      value: '0',
      change: '0%',
      trend: 'neutral' as const,
      icon: <Building2 className="w-6 h-6" />
    },
    {
      title: 'Monthly Revenue',
      value: '$0',
      change: '0%',
      trend: 'neutral' as const,
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      title: 'Support Tickets',
      value: '0',
      change: '0%',
      trend: 'neutral' as const,
      icon: <AlertCircle className="w-6 h-6" />
    }
  ];

  const recentUsers: Array<{
    id: string;
    name: string;
    email: string;
    businessName: string;
    status: 'active' | 'pending' | 'inactive';
    createdAt: string;
  }> = [];

  const recentBusinesses: Array<{
    id: string;
    name: string;
    owner: string;
    type: string;
    status: 'active' | 'pending' | 'inactive';
    createdAt: string;
  }> = [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };



  const upcomingEvents = [
    {
      id: 1,
      title: 'System Maintenance',
      date: '2025-01-15',
      time: '2:00 AM',
      type: 'maintenance'
    },
    {
      id: 2,
      title: 'Monthly Review Meeting',
      date: '2025-01-20',
      time: '10:00 AM',
      type: 'meeting'
    },
    {
      id: 3,
      title: 'Feature Release',
      date: '2025-01-25',
      time: '6:00 PM',
      type: 'release'
    }
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${
                stat.changeType === 'positive' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <stat.icon className={`h-6 w-6 ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`} />
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-600 ml-1">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className="block bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-3">
                <div className={`p-2 rounded-lg ${action.color}`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivityData.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <activity.icon className="h-4 w-4 text-gray-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link
                href="/en/admin/activity"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View all activity →
              </Link>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Events</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className={`p-2 rounded-lg ${
                      event.type === 'maintenance' ? 'bg-yellow-100' :
                      event.type === 'meeting' ? 'bg-blue-100' : 'bg-green-100'
                    }`}>
                      {event.type === 'maintenance' ? (
                        <AlertTriangle className={`h-4 w-4 text-yellow-600`} />
                      ) : event.type === 'meeting' ? (
                        <Calendar className="h-4 w-4 text-blue-600" />
                      ) : (
                        <Clock className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{event.title}</p>
                    <p className="text-xs text-gray-500">{event.date} at {event.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link
                href="/en/admin/calendar"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View calendar →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}