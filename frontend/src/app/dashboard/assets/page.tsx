'use client';

import { Palette, Upload, Image, Type, Eye, Download, Plus } from 'lucide-react';
import Link from 'next/link';

const mockAssets = {
  logos: [
    { id: 1, name: 'Primary Logo', type: 'PNG', size: '2.3 MB', url: '#' },
    { id: 2, name: 'Logo Mark', type: 'SVG', size: '1.1 MB', url: '#' },
  ],
  colors: [
    { id: 1, name: 'Primary Blue', hex: '#3B82F6', usage: 'Headers, buttons' },
    { id: 2, name: 'Secondary Green', hex: '#10B981', usage: 'Success states' },
    { id: 3, name: 'Accent Orange', hex: '#F59E0B', usage: 'Highlights' },
  ],
  fonts: [
    { id: 1, name: 'Inter', type: 'Sans-serif', usage: 'Body text' },
    { id: 2, name: 'Playfair Display', type: 'Serif', usage: 'Headlines' },
  ],
};

export default function AssetsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Assets (Brand Kit)</h1>
        <p className="mt-2 text-gray-600">
          Manage your brand assets including logos, colors, fonts, and images.
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Upload New Assets</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Upload Logo</p>
            <p className="text-xs text-gray-500">PNG, SVG, JPG up to 10MB</p>
          </button>
          
          <button className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 hover:bg-green-50 transition-colors">
            <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Upload Images</p>
            <p className="text-xs text-gray-500">Photos, graphics, icons</p>
          </button>
          
          <button className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 hover:bg-purple-50 transition-colors">
            <Type className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Add Fonts</p>
            <p className="text-xs text-gray-500">TTF, OTF, WOFF files</p>
          </button>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Logos */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Logos</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              <Plus className="w-4 h-4 inline mr-1" />
              Add Logo
            </button>
          </div>
          
          <div className="space-y-3">
            {mockAssets.logos.map((logo) => (
              <div key={logo.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white rounded border flex items-center justify-center">
                    <Image className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{logo.name}</p>
                    <p className="text-xs text-gray-500">{logo.type} • {logo.size}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Brand Colors</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              <Plus className="w-4 h-4 inline mr-1" />
              Add Color
            </button>
          </div>
          
          <div className="space-y-3">
            {mockAssets.colors.map((color) => (
              <div key={color.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div 
                    className="w-10 h-10 rounded border-2 border-white shadow-sm"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{color.name}</p>
                    <p className="text-xs text-gray-500">{color.hex} • {color.usage}</p>
                  </div>
                </div>
                <button className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded font-mono">
                  {color.hex}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fonts */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Typography</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            <Plus className="w-4 h-4 inline mr-1" />
            Add Font
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockAssets.fonts.map((font) => (
            <div key={font.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{font.name}</h4>
                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                  {font.type}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{font.usage}</p>
              <div className="text-lg" style={{ fontFamily: font.name }}>
                The quick brown fox jumps over the lazy dog
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Guidelines */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">How to Use Brand Assets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Automatic Integration</h4>
            <p>Your brand assets are automatically available in the Website Builder and Print Studio.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Consistent Branding</h4>
            <p>Use the same logos, colors, and fonts across all your websites and print materials.</p>
          </div>
        </div>
      </div>
    </div>
  );
}