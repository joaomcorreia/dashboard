'use client';

export default function FinancePage() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Finance Overview</h1>
          <p className="mt-2 text-gray-600">Monitor your revenue and financial metrics.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-green-600">$2,450</p>
            <p className="text-sm text-gray-500 mt-1">This month</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Subscriptions</h3>
            <p className="text-3xl font-bold text-blue-600">15</p>
            <p className="text-sm text-gray-500 mt-1">Monthly recurring</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pending Payments</h3>
            <p className="text-3xl font-bold text-orange-600">$340</p>
            <p className="text-sm text-gray-500 mt-1">Due this week</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Transactions</h2>
          <p className="text-gray-500">Transaction history will appear here. This page is under development.</p>
        </div>
      </div>
    </div>
  );
}