'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  CheckCircle,
  Mail,
  CreditCard,
  Package,
  Calendar,
  User,
  Key,
  Eye,
  EyeOff,
  Copy,
  Download,
  Printer,
  Clock,
  Truck,
  Phone,
  MapPin
} from 'lucide-react';

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order') || 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  const email = searchParams.get('email') || 'customer@example.com';
  const product = searchParams.get('product') || 'business-cards';
  
  const [showPassword, setShowPassword] = useState(false);
  const [passwordCopied, setPasswordCopied] = useState(false);
  
  // Generate login credentials
  const loginCredentials = {
    email: email,
    password: 'temp_' + Math.random().toString(36).substr(2, 8),
    dashboardUrl: window.location.origin + '/en/dashboard'
  };

  const orderDetails = {
    product: product === 'business-cards' ? 'Business Cards' : 
             product === 'flyers' ? 'Flyers' : 
             product === 'stationery' ? 'Letterhead' : 'Print Product',
    quantity: 100,
    design: 'Executive Pro Template',
    paper: 'Premium 18pt Cardstock',
    finish: 'Matte Finish',
    total: '$29.99',
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    productionTime: '3-5 business days',
    shippingTime: '2-3 business days'
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'password') {
        setPasswordCopied(true);
        setTimeout(() => setPasswordCopied(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order Confirmed!</h1>
              <p className="text-gray-600">Thank you for your order. We'll get started on your {orderDetails.product.toLowerCase()} right away.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  #{orderNumber}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Printer className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{orderDetails.product}</h3>
                    <p className="text-sm text-gray-600">{orderDetails.quantity} cards • {orderDetails.design}</p>
                    <p className="text-sm text-gray-600">{orderDetails.paper} • {orderDetails.finish}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{orderDetails.total}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="text-gray-900">$24.99</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax:</span>
                    <span className="text-gray-900">$5.00</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-900">Total:</span>
                      <span className="text-gray-900">{orderDetails.total}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Production Timeline */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">What Happens Next</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Design Review</h3>
                    <p className="text-gray-600">We'll review your design and prepare it for printing.</p>
                    <p className="text-sm text-blue-600 mt-1">Within 2 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Production</h3>
                    <p className="text-gray-600">Your {orderDetails.product.toLowerCase()} will be printed on premium materials.</p>
                    <p className="text-sm text-gray-500 mt-1">{orderDetails.productionTime}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Shipping</h3>
                    <p className="text-gray-600">Your order will be carefully packaged and shipped.</p>
                    <p className="text-sm text-gray-500 mt-1">{orderDetails.shippingTime}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Delivery</h3>
                    <p className="text-gray-600">Your order arrives at your door!</p>
                    <p className="text-sm text-gray-500 mt-1">Estimated: {orderDetails.estimatedDelivery}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Access */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Key className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Your Dashboard Access</h2>
                  <p className="text-gray-700 mb-4">
                    We've created your admin dashboard account. Use these credentials to track your order, 
                    view your designs, and manage future orders.
                  </p>
                  
                  <div className="bg-white rounded-lg p-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={loginCredentials.email}
                          readOnly
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
                        />
                        <button
                          onClick={() => copyToClipboard(loginCredentials.email, 'email')}
                          className="p-2 text-gray-500 hover:text-gray-700"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Temporary Password</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={loginCredentials.password}
                          readOnly
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="p-2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => copyToClipboard(loginCredentials.password, 'password')}
                          className="p-2 text-gray-500 hover:text-gray-700"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      {passwordCopied && (
                        <p className="text-sm text-green-600 mt-1">Password copied to clipboard!</p>
                      )}
                    </div>
                    
                    <div className="pt-2 space-y-2">
                      <Link
                        href={`/en/auth/login?from=order&email=${encodeURIComponent(loginCredentials.email)}`}
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                      >
                        <User className="w-4 h-4" />
                        <span>Login to Dashboard</span>
                      </Link>
                      <p className="text-xs text-center text-gray-500">
                        We'll pre-fill your email address
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-3">
                    <strong>Important:</strong> Please change your password after logging in for security.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Status */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-900">Order Placed</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm text-gray-600">In Production</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-400">Shipped</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Package className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-400">Delivered</span>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Information</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Estimated Delivery</p>
                    <p className="text-sm text-gray-600">{orderDetails.estimatedDelivery}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Shipping Address</p>
                    <p className="text-sm text-gray-600">Will be confirmed via email</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Download Receipt</span>
                </button>
                <button className="w-full flex items-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Mail className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Email Order Details</span>
                </button>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>support@printstudio.com</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>1-800-PRINT-US</span>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Our support team is available Monday-Friday, 9AM-6PM EST
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}