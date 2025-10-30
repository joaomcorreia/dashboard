'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  ArrowLeft,
  Save,
  Download,
  Eye,
  Type,
  Palette,
  Image,
  Move,
  RotateCw,
  Trash2,
  Plus,
  CheckCircle,
  Upload,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline
} from 'lucide-react';

export default function PrintCustomizePage() {
  const searchParams = useSearchParams();
  const template = searchParams.get('template');
  const product = searchParams.get('product') || 'business-cards';
  
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('Inter');
  const [textColor, setTextColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textAlign, setTextAlign] = useState('left');

  const productNames: Record<string, string> = {
    'business-cards': 'Business Cards',
    'flyers': 'Flyers',
    'stationery': 'Letterhead'
  };

  const elements = [
    { id: 'company-name', type: 'text', content: 'Your Company Name', x: 50, y: 100 },
    { id: 'your-name', type: 'text', content: 'John Doe', x: 50, y: 140 },
    { id: 'title', type: 'text', content: 'CEO & Founder', x: 50, y: 160 },
    { id: 'phone', type: 'text', content: '+1 (555) 123-4567', x: 50, y: 200 },
    { id: 'email', type: 'text', content: 'john@company.com', x: 50, y: 220 },
    { id: 'website', type: 'text', content: 'www.company.com', x: 50, y: 240 },
    { id: 'logo', type: 'image', content: 'Logo', x: 250, y: 100 }
  ];

  const fonts = [
    'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 
    'Poppins', 'Source Sans Pro', 'Oswald', 'Raleway', 'Ubuntu'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left - Back and Title */}
            <div className="flex items-center space-x-4">
              <Link href="/en/dashboard/printing/builder" className="p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Customize {productNames[product]}
                </h1>
                <p className="text-sm text-gray-500">Template: {template || 'Executive Pro'}</p>
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
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <span className="text-sm font-medium text-blue-600">Customize</span>
              </div>
              <div className="w-12 h-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <span className="text-sm text-gray-500">Review</span>
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
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </button>
              <Link 
                href="/en/dashboard/printing/review"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
              >
                Continue
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Design Tools */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Design Tools</h3>
              
              {selectedElement ? (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Text Properties</h4>
                    
                    {/* Font Family */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Font</label>
                      <select
                        value={fontFamily}
                        onChange={(e) => setFontFamily(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {fonts.map(font => (
                          <option key={font} value={font}>{font}</option>
                        ))}
                      </select>
                    </div>

                    {/* Font Size */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                      <input
                        type="range"
                        min="8"
                        max="72"
                        value={fontSize}
                        onChange={(e) => setFontSize(Number(e.target.value))}
                        className="w-full"
                      />
                      <div className="text-sm text-gray-500 mt-1">{fontSize}px</div>
                    </div>

                    {/* Text Color */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                          className="w-12 h-10 border border-gray-300 rounded"
                        />
                        <input
                          type="text"
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                    </div>

                    {/* Text Alignment */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Alignment</label>
                      <div className="flex space-x-1">
                        {[
                          { value: 'left', icon: AlignLeft },
                          { value: 'center', icon: AlignCenter },
                          { value: 'right', icon: AlignRight }
                        ].map(({ value, icon: Icon }) => (
                          <button
                            key={value}
                            onClick={() => setTextAlign(value)}
                            className={`p-2 border rounded ${
                              textAlign === value 
                                ? 'bg-blue-600 text-white border-blue-600' 
                                : 'border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Text Style */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
                      <div className="flex space-x-1">
                        {[
                          { value: 'bold', icon: Bold },
                          { value: 'italic', icon: Italic },
                          { value: 'underline', icon: Underline }
                        ].map(({ value, icon: Icon }) => (
                          <button
                            key={value}
                            className="p-2 border border-gray-300 rounded hover:bg-gray-50"
                          >
                            <Icon className="w-4 h-4" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center space-x-2">
                      <Trash2 className="w-4 h-4" />
                      <span>Delete Element</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-600 text-sm">Select an element to edit its properties</p>
                  
                  {/* Add Elements */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Add Elements</h4>
                    <div className="space-y-2">
                      <button className="w-full flex items-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Type className="w-4 h-4" />
                        <span>Add Text</span>
                      </button>
                      <button className="w-full flex items-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Image className="w-4 h-4" />
                        <span>Add Image</span>
                      </button>
                      <button className="w-full flex items-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Upload className="w-4 h-4" />
                        <span>Upload Logo</span>
                      </button>
                    </div>
                  </div>

                  {/* Background */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Background</h4>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="w-12 h-10 border border-gray-300 rounded"
                      />
                      <input
                        type="text"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Canvas Area */}
          <div className="col-span-12 lg:col-span-6">
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Design Canvas</h2>
                <p className="text-gray-600">Click on any element to edit it</p>
              </div>

              {/* Canvas */}
              <div className="mx-auto bg-white shadow-lg" style={{ width: '350px', height: '200px', position: 'relative' }}>
                <div 
                  className="w-full h-full border-2 border-gray-200 rounded-lg"
                  style={{ backgroundColor: backgroundColor, position: 'relative', overflow: 'hidden' }}
                >
                  {elements.map((element) => (
                    <div
                      key={element.id}
                      onClick={() => setSelectedElement(element.id)}
                      className={`absolute cursor-pointer hover:ring-2 hover:ring-blue-500 ${
                        selectedElement === element.id ? 'ring-2 ring-blue-600' : ''
                      }`}
                      style={{
                        left: `${element.x}px`,
                        top: `${element.y}px`,
                        fontSize: element.id === selectedElement ? `${fontSize}px` : '14px',
                        color: element.id === selectedElement ? textColor : '#000000',
                        fontFamily: element.id === selectedElement ? fontFamily : 'Inter',
                        textAlign: element.id === selectedElement ? textAlign as any : 'left'
                      }}
                    >
                      {element.type === 'text' ? (
                        <span className="px-1 py-0.5 block min-w-[60px] min-h-[20px]">
                          {element.content}
                        </span>
                      ) : (
                        <div className="w-16 h-16 bg-gray-300 rounded flex items-center justify-center text-xs text-gray-600">
                          Logo
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Canvas Info */}
              <div className="mt-6 text-center text-sm text-gray-500">
                Business Card • 3.5" x 2" • 300 DPI
              </div>
            </div>
          </div>

          {/* Right Sidebar - Layers & Options */}
          <div className="col-span-12 lg:col-span-3">
            <div className="space-y-6">
              {/* Layers Panel */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Layers</h3>
                <div className="space-y-2">
                  {elements.map((element) => (
                    <div
                      key={element.id}
                      onClick={() => setSelectedElement(element.id)}
                      className={`flex items-center justify-between p-2 rounded cursor-pointer ${
                        selectedElement === element.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {element.type === 'text' ? (
                          <Type className="w-4 h-4 text-gray-500" />
                        ) : (
                          <Image className="w-4 h-4 text-gray-500" />
                        )}
                        <span className="text-sm text-gray-700 capitalize">
                          {element.content.length > 15 
                            ? element.content.substring(0, 15) + '...' 
                            : element.content}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <Eye className="w-3 h-3 text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <Trash2 className="w-3 h-3 text-gray-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Download Preview</span>
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>Save Design</span>
                  </button>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Design Tips</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Keep text readable with good contrast</li>
                  <li>• Use consistent fonts (max 2-3 types)</li>
                  <li>• Leave white space around elements</li>
                  <li>• High-res images work best (300 DPI)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}