'use client';

import { Printer, Package, Plus, Eye, Download, FileText } from 'lucide-react';
import Link from 'next/link';

const mockOrders = [
  {
    id: 1001,
    productType: 'Business Cards',
    design: 'Modern Blue Design',
    quantity: 500,
    status: 'delivered',
    orderDate: '2024-10-15',
    price: 45.99,
  },
  {
    id: 1002,
    productType: 'Brochures',
    design: 'Company Trifold',
    quantity: 100,
    status: 'printing',
    orderDate: '2024-10-20',
    price: 89.50,
  },
  {
    id: 1003,
    productType: 'Flyers',
    design: 'Event Promotion',
    quantity: 250,
    status: 'processing',
    orderDate: '2024-10-22',
    price: 32.75,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered': return 'bg-green-100 text-green-800';
    case 'printing': return 'bg-blue-100 text-blue-800';
    case 'processing': return 'bg-yellow-100 text-yellow-800';
    case 'shipped': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function PrintingPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Print Studio</h1>
          <p className="mt-2 text-gray-600">
            Design and order business cards, flyers, brochures, and more.
          </p>
        </div>
        
        <Link
          href="/dashboard/printing/builder"
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Print Order
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">28</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Printer className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Production</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Delivered</p>
              <p className="text-2xl font-bold text-gray-900">22</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Package className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">$234</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/dashboard/printing/products" className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-blue-500 rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <h3 className="ml-4 text-lg font-semibold text-gray-900">Browse Products</h3>
          </div>
          <p className="text-gray-600">Explore business cards, flyers, brochures, and merchandise</p>
        </Link>

        <Link href="/dashboard/templates/printing" className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-green-500 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="ml-4 text-lg font-semibold text-gray-900">Design Templates</h3>
          </div>
          <p className="text-gray-600">Use pre-made templates or upload your own designs</p>
        </Link>

        <Link href="/dashboard/printing/orders" className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-purple-500 rounded-lg">
              <Printer className="w-6 h-6 text-white" />
            </div>
            <h3 className="ml-4 text-lg font-semibold text-gray-900">Order History</h3>
          </div>
          <p className="text-gray-600">Track your orders and download files</p>
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            <Link href="/dashboard/printing/orders" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All Orders
            </Link>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                      <div className="text-sm text-gray-500">{order.orderDate}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.productType}</div>
                      <div className="text-sm text-gray-500">{order.design}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${order.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      {order.status === 'delivered' && (
                        <button className="text-green-600 hover:text-green-900">
                          <Download className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}