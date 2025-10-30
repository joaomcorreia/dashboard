'use client';

import { DollarSign, TrendingUp, TrendingDown, Calendar, BarChart3, PieChart, Plus, Download } from 'lucide-react';

const revenueStreams = [
  {
    id: 1,
    name: 'Just Code Works',
    description: 'Main web development and digital services business',
    monthlyRevenue: 8450.75,
    yearlyRevenue: 89250.50,
    growth: 15.3,
    lastUpdate: '2025-10-28',
    status: 'active',
    color: 'blue',
    transactions: 142,
    avgTransactionValue: 595.42
  },
  {
    id: 2,
    name: 'List Across EU',
    description: 'European business directory and listing services',
    monthlyRevenue: 2340.25,
    yearlyRevenue: 26850.75,
    growth: 8.7,
    lastUpdate: '2025-10-27',
    status: 'active',
    color: 'green',
    transactions: 89,
    avgTransactionValue: 263.82
  },
  {
    id: 3,
    name: 'ProWebZone',
    description: 'Premium web hosting and domain services',
    monthlyRevenue: 1680.50,
    yearlyRevenue: 19450.25,
    growth: -2.1,
    lastUpdate: '2025-10-26',
    status: 'declining',
    color: 'orange',
    transactions: 67,
    avgTransactionValue: 250.82
  }
];

const totalMonthlyRevenue = revenueStreams.reduce((sum, stream) => sum + stream.monthlyRevenue, 0);
const totalYearlyRevenue = revenueStreams.reduce((sum, stream) => sum + stream.yearlyRevenue, 0);
const averageGrowth = revenueStreams.reduce((sum, stream) => sum + stream.growth, 0) / revenueStreams.length;

const getGrowthColor = (growth: number) => {
  if (growth > 0) return 'text-green-600';
  if (growth < 0) return 'text-red-600';
  return 'text-gray-600';
};

const getGrowthIcon = (growth: number) => {
  if (growth > 0) return <TrendingUp className="w-4 h-4" />;
  if (growth < 0) return <TrendingDown className="w-4 h-4" />;
  return <TrendingUp className="w-4 h-4" />;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'declining': return 'bg-orange-100 text-orange-800';
    case 'inactive': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function RevenuesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Revenues</h1>
          <p className="mt-2 text-gray-600">
            Track revenue performance across all business streams and analyze growth trends.
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Revenue Stream</span>
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Monthly</p>
              <p className="text-2xl font-bold text-gray-900">${totalMonthlyRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Yearly</p>
              <p className="text-2xl font-bold text-gray-900">${totalYearlyRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Average Growth</p>
              <p className={`text-2xl font-bold ${getGrowthColor(averageGrowth)}`}>
                {averageGrowth > 0 ? '+' : ''}{averageGrowth.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Revenue Streams</p>
              <p className="text-2xl font-bold text-gray-900">{revenueStreams.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Streams */}
      <div className="space-y-6">
        {revenueStreams.map((stream) => (
          <div key={stream.id} className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full bg-${stream.color}-500 mr-3`}></div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{stream.name}</h3>
                  <p className="text-gray-600 text-sm">{stream.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(stream.status)}`}>
                  {stream.status}
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Monthly Revenue */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">${stream.monthlyRevenue.toLocaleString()}</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>

              {/* Yearly Revenue */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Yearly Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">${stream.yearlyRevenue.toLocaleString()}</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </div>

              {/* Growth Rate */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                    <p className={`text-2xl font-bold ${getGrowthColor(stream.growth)}`}>
                      {stream.growth > 0 ? '+' : ''}{stream.growth}%
                    </p>
                  </div>
                  <div className={`p-2 rounded-lg ${stream.growth > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                    <span className={stream.growth > 0 ? 'text-green-600' : 'text-red-600'}>
                      {getGrowthIcon(stream.growth)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Transactions */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Transactions</p>
                    <p className="text-2xl font-bold text-gray-900">{stream.transactions}</p>
                    <p className="text-xs text-gray-500">Avg: ${stream.avgTransactionValue}</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <PieChart className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Last Update */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Last updated: {stream.lastUpdate}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Revenue Trends</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg">Monthly</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Yearly</button>
          </div>
        </div>
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
          <div className="text-center">
            <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">Revenue trends chart will be displayed here</p>
            <p className="text-xs text-gray-400">Integration with charting library needed</p>
          </div>
        </div>
      </div>

      {/* Revenue Distribution */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Distribution</h2>
        <div className="space-y-4">
          {revenueStreams.map((stream) => {
            const percentage = (stream.monthlyRevenue / totalMonthlyRevenue) * 100;
            return (
              <div key={stream.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full bg-${stream.color}-500 mr-3`}></div>
                  <span className="text-sm font-medium text-gray-900">{stream.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-${stream.color}-500 h-2 rounded-full`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{percentage.toFixed(1)}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}