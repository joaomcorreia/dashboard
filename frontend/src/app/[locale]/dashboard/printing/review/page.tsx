'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Download,
  Edit,
  Check,
  Package,
  Clock,
  DollarSign,
  CreditCard,
  CheckCircle,
  Truck,
  Shield
} from 'lucide-react';

export default function PrintReviewPage() {
  const [quantity, setQuantity] = useState(100);
  const [paperType, setPaperType] = useState('standard');
  const [finish, setFinish] = useState('matte');

  const paperOptions = [
    { id: 'standard', name: 'Standard (16pt)', price: 0 },
    { id: 'premium', name: 'Premium (18pt)', price: 0.05 },
    { id: 'luxury', name: 'Luxury (32pt)', price: 0.12 }
  ];

  const finishOptions = [
    { id: 'matte', name: 'Matte Finish', price: 0 },
    { id: 'gloss', name: 'Gloss Finish', price: 0.02 },
    { id: 'silk', name: 'Silk Finish', price: 0.03 }
  ];

  const basePrice = 19.99;
  const paperUpcharge = paperOptions.find(p => p.id === paperType)?.price || 0;
  const finishUpcharge = finishOptions.find(f => f.id === finish)?.price || 0;
  const unitPrice = basePrice + (paperUpcharge * quantity) + (finishUpcharge * quantity);
  const totalPrice = unitPrice;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left - Back and Title */}
            <div className="flex items-center space-x-4">
              <Link href="/en/dashboard/printing/customize" className="p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Review & Order
                </h1>
                <p className="text-sm text-gray-500">Final review before ordering</p>
              </div>
            </div>

            {/* Center - Progress Steps */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-green-600">Template</span>
              </div>
              <div className="w-12 h-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-green-600">Customize</span>
              </div>
              <div className="w-12 h-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <span className="text-sm font-medium text-blue-600">Review</span>
              </div>
              <div className="w-12 h-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
                  4
                </div>
                <span className="text-sm text-gray-500">Payment</span>
              </div>
            </div>

            {/* Right - Actions */}
            <div className="flex items-center space-x-3">
              <Link 
                href="/en/dashboard/printing/customize"
                className="px-4 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Design</span>
              </Link>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="col-span-12 lg:col-span-8">
            <div className="space-y-6">
              {/* Design Preview */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Design Preview</h2>
                
                <div className="flex justify-center">
                  <div className="bg-white shadow-lg rounded-lg p-8" style={{ width: '420px', height: '240px' }}>
                    <div 
                      className="w-full h-full border-2 border-gray-200 rounded-lg bg-white relative"
                      style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}
                    >
                      {/* Mock design elements */}
                      <div className="absolute top-8 left-8">
                        <div className="text-lg font-bold text-gray-900">Your Company Name</div>
                        <div className="text-sm text-gray-700 mt-1">John Doe</div>
                        <div className="text-xs text-gray-600">CEO & Founder</div>
                      </div>
                      <div className="absolute bottom-8 left-8 space-y-1">
                        <div className="text-xs text-gray-600">+1 (555) 123-4567</div>
                        <div className="text-xs text-gray-600">john@company.com</div>
                        <div className="text-xs text-gray-600">www.company.com</div>
                      </div>
                      <div className="absolute top-8 right-8 w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-bold">LOGO</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center text-sm text-gray-500">
                  Business Card • 3.5" x 2" • Print-ready design
                </div>
              </div>

              {/* Product Options */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Product Options</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Quantity */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Quantity</label>
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={50}>50 cards</option>
                      <option value={100}>100 cards</option>
                      <option value={250}>250 cards</option>
                      <option value={500}>500 cards</option>
                      <option value={1000}>1000 cards</option>
                    </select>
                  </div>

                  {/* Paper Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Paper Type</label>
                    <select
                      value={paperType}
                      onChange={(e) => setPaperType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {paperOptions.map(option => (
                        <option key={option.id} value={option.id}>
                          {option.name} {option.price > 0 && `(+$${(option.price * quantity).toFixed(2)})`}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Finish */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Finish</label>
                    <select
                      value={finish}
                      onChange={(e) => setFinish(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {finishOptions.map(option => (
                        <option key={option.id} value={option.id}>
                          {option.name} {option.price > 0 && `(+$${(option.price * quantity).toFixed(2)})`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Production Details */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Production Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Production Time</div>
                      <div className="text-sm text-gray-600">3-5 business days</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Truck className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Shipping</div>
                      <div className="text-sm text-gray-600">Standard (5-7 days)</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Quality Promise</div>
                      <div className="text-sm text-gray-600">100% satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4">
                {/* Product */}
                <div className="flex items-center space-x-3 pb-4 border-b">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Business Cards</div>
                    <div className="text-sm text-gray-600">Premium Design</div>
                  </div>
                </div>

                {/* Pricing Details */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">{quantity} Business Cards</span>
                    <span className="text-sm text-gray-900">${basePrice.toFixed(2)}</span>
                  </div>
                  
                  {paperUpcharge > 0 && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Paper upgrade</span>
                      <span className="text-sm text-gray-900">+${(paperUpcharge * quantity).toFixed(2)}</span>
                    </div>
                  )}
                  
                  {finishUpcharge > 0 && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Finish upgrade</span>
                      <span className="text-sm text-gray-900">+${(finishUpcharge * quantity).toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Shipping</span>
                    <span className="text-sm text-green-600">FREE</span>
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-900">Total</span>
                      <span className="font-bold text-xl text-gray-900">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <Link 
                    href={`/en/order-confirmation?order=ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}&product=business-cards&email=customer@example.com`}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-medium"
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Proceed to Payment</span>
                  </Link>
                  
                  <button className="w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    Save & Continue Later
                  </button>
                </div>

                {/* Guarantees */}
                <div className="pt-4 border-t">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Free design revisions</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Money-back guarantee</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Fast turnaround</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}