'use client';

import { Package, Plus, FileText, Settings } from 'lucide-react';
import Link from 'next/link';

export default function PrintTemplatesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Print Templates</h1>
        <p className="mt-2 text-gray-600">
          Manage templates for business cards, brochures, flyers, and more.
        </p>
      </div>

      {/* Coming Soon Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
        <Package className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Print Templates Coming Soon</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          We're working on an amazing template system for print products. Soon you'll be able to upload, 
          customize, and manage templates for business cards, brochures, flyers, merchandise, and more.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-3xl mx-auto">
          <div className="bg-white rounded-lg p-6 border">
            <FileText className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Template Upload</h3>
            <p className="text-sm text-gray-600">Upload your print designs and convert them to customizable templates</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 border">
            <Settings className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Easy Customization</h3>
            <p className="text-sm text-gray-600">Customize text, colors, and images with our intuitive design tools</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 border">
            <Package className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-3">Multi-Product Support</h3>
            <p className="text-sm text-gray-600">Support for business cards, flyers, brochures, and merchandise</p>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/dashboard/printing"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Explore Print Studio
          </Link>
        </div>
      </div>
    </div>
  );
}