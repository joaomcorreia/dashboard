'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Building2, 
  DollarSign, 
  Eye, 
  Calendar,
  Filter,
  Download
} from 'lucide-react';

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');

  // Real data - to be loaded from API
  const metrics = {
    totalUsers: { value: 0, change: 0, trend: 'neutral' as 'up' | 'down' | 'neutral' },
    activeBusinesses: { value: 0, change: 0, trend: 'neutral' as 'up' | 'down' | 'neutral' },
    monthlyRevenue: { value: 0, change: 0, trend: 'neutral' as 'up' | 'down' | 'neutral' },
    totalPageViews: { value: 0, change: 0, trend: 'neutral' as 'up' | 'down' | 'neutral' }
  };

  const chartData: Array<{ date: string; users: number; businesses: number; revenue: number }> = [];

  const topBusinessTypes: Array<{ type: string; count: number; percentage: number }> = [];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Platform performance and usage statistics</p>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(metrics.totalUsers.value)}</p>
              <div className="flex items-center mt-1">
                {metrics.totalUsers.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
                <p className={`text-sm ml-1 ${metrics.totalUsers.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {metrics.totalUsers.change}%
                </p>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Businesses</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(metrics.activeBusinesses.value)}</p>
              <div className="flex items-center mt-1">
                {metrics.activeBusinesses.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
                <p className={`text-sm ml-1 ${metrics.activeBusinesses.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {metrics.activeBusinesses.change}%
                </p>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(metrics.monthlyRevenue.value)}</p>
              <div className="flex items-center mt-1">
                {metrics.monthlyRevenue.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
                <p className={`text-sm ml-1 ${metrics.monthlyRevenue.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {metrics.monthlyRevenue.change}%
                </p>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Page Views</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(metrics.totalPageViews.value)}</p>
              <div className="flex items-center mt-1">
                {metrics.totalPageViews.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
                <p className={`text-sm ml-1 ${metrics.totalPageViews.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(metrics.totalPageViews.change)}%
                </p>
              </div>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Growth Chart */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Growth Overview</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          
          {/* Simple chart representation */}
          <div className="space-y-4">
            {chartData.slice(-5).map((data, index) => (
              <div key={data.date} className="flex items-center">
                <div className="w-16 text-xs text-gray-600">
                  {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <div className="flex-1 mx-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(data.users / 250) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{data.users}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Total new users this week</span>
              <span className="font-semibold text-gray-900">
                {chartData.reduce((sum, data) => sum + data.users, 0)}
              </span>
            </div>
          </div>
        </div>

        {/* Business Types Distribution */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Business Types</h3>
            <Building2 className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {topBusinessTypes.map((business, index) => (
              <div key={business.type} className="flex items-center">
                <div className="w-20 text-sm text-gray-900">{business.type}</div>
                <div className="flex-1 mx-4">
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        className={`h-2 rounded-full ${
                          index === 0 ? 'bg-blue-600' :
                          index === 1 ? 'bg-green-600' :
                          index === 2 ? 'bg-purple-600' :
                          index === 3 ? 'bg-orange-600' : 'bg-gray-600'
                        }`}
                        style={{ width: `${business.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{business.count}</div>
                      <div className="text-xs text-gray-500">{business.percentage}%</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center p-3 bg-blue-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                <span className="font-medium">John Doe</span> registered a new restaurant business
              </p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                Monthly revenue target exceeded by <span className="font-medium">15%</span>
              </p>
              <p className="text-xs text-gray-500">4 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-purple-50 rounded-lg">
            <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                <span className="font-medium">25 new websites</span> were published today
              </p>
              <p className="text-xs text-gray-500">6 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}