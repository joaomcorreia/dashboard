'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft,
  Search,
  Filter,
  Grid3X3,
  List,
  Eye,
  Heart,
  ShoppingCart,
  Palette,
  Briefcase,
  Sparkles,
  Crown,
  Zap,
  CheckCircle,
  Clock,
  CreditCard,
  Package
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  category: string;
  industry: string;
  style: string;
  image: string;
  isPremium: boolean;
  isPopular: boolean;
  colors: string[];
}

interface Product {
  id: string;
  name: string;
  size: string;
  material: string;
  startingPrice: number;
  icon: React.ComponentType<{ className?: string }>;
}

export default function PrintBuilderPage() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get('product');
  const emailConfirmed = searchParams.get('email_confirmed');
  
  const [selectedProduct, setSelectedProduct] = useState('business-cards');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showWelcome, setShowWelcome] = useState(false);

  // Update selected product based on URL parameter
  useEffect(() => {
    if (productParam) {
      setSelectedProduct(productParam);
    }
    
    // Show welcome message if user came from email confirmation
    if (emailConfirmed === 'true') {
      setShowWelcome(true);
      // Hide welcome message after 5 seconds
      setTimeout(() => setShowWelcome(false), 5000);
    }
  }, [productParam, emailConfirmed]);

  const products: Product[] = [
    {
      id: 'business-cards',
      name: 'Business Cards',
      size: '3.5" x 2"',
      material: 'Premium Cardstock',
      startingPrice: 19.99,
      icon: Briefcase
    },
    {
      id: 'flyers',
      name: 'Flyers',
      size: '8.5" x 11"',
      material: 'Glossy Paper',
      startingPrice: 29.99,
      icon: Package
    },
    {
      id: 'postcards',
      name: 'Postcards',
      size: '6" x 4"',
      material: 'Cardstock',
      startingPrice: 24.99,
      icon: Package
    }
  ];

  const templates: Template[] = [
    {
      id: '1',
      name: 'Executive Pro',
      category: 'professional',
      industry: 'business',
      style: 'minimalist',
      image: '/api/placeholder/300/180',
      isPremium: false,
      isPopular: true,
      colors: ['#1a1a1a', '#ffffff', '#3b82f6']
    },
    {
      id: '2',
      name: 'Creative Edge',
      category: 'creative',
      industry: 'design',
      style: 'modern',
      image: '/api/placeholder/300/180',
      isPremium: true,
      isPopular: false,
      colors: ['#8b5cf6', '#f59e0b', '#ffffff']
    },
    {
      id: '3',
      name: 'Medical Clean',
      category: 'professional',
      industry: 'healthcare',
      style: 'clean',
      image: '/api/placeholder/300/180',
      isPremium: false,
      isPopular: true,
      colors: ['#06b6d4', '#ffffff', '#1f2937']
    },
    {
      id: '4',
      name: 'Restaurant Delight',
      category: 'creative',
      industry: 'restaurant',
      style: 'elegant',
      image: '/api/placeholder/300/180',
      isPremium: true,
      isPopular: false,
      colors: ['#dc2626', '#fbbf24', '#1f2937']
    },
    {
      id: '5',
      name: 'Tech Innovator',
      category: 'modern',
      industry: 'technology',
      style: 'futuristic',
      image: '/api/placeholder/300/180',
      isPremium: false,
      isPopular: true,
      colors: ['#3b82f6', '#1e293b', '#06b6d4']
    },
    {
      id: '6',
      name: 'Legal Authority',
      category: 'professional',
      industry: 'legal',
      style: 'traditional',
      image: '/api/placeholder/300/180',
      isPremium: false,
      isPopular: false,
      colors: ['#1f2937', '#d4af37', '#ffffff']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Templates' },
    { id: 'professional', label: 'Professional' },
    { id: 'creative', label: 'Creative' },
    { id: 'modern', label: 'Modern' },
    { id: 'minimalist', label: 'Minimalist' }
  ];

  const industries = [
    { id: 'all', label: 'All Industries' },
    { id: 'business', label: 'Business & Consulting' },
    { id: 'technology', label: 'Technology' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'restaurant', label: 'Restaurant & Food' },
    { id: 'legal', label: 'Legal' },
    { id: 'design', label: 'Design & Creative' }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesIndustry = selectedIndustry === 'all' || template.industry === selectedIndustry;
    return matchesSearch && matchesCategory && matchesIndustry;
  });

  const currentProduct = products.find(p => p.id === selectedProduct);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left - Back and Title */}
            <div className="flex items-center space-x-4">
              <Link href="/en/dashboard/printing" className="p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {currentProduct?.name} Design Studio
                </h1>
                <p className="text-sm text-gray-500">Choose your template</p>
              </div>
            </div>

            {/* Center - Progress Steps */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <span className="text-sm font-medium text-blue-600">Template</span>
              </div>
              <div className="w-12 h-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <span className="text-sm text-gray-500">Customize</span>
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
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium">
                Save Draft
              </button>
              <Link 
                href="/en/dashboard/billing"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium flex items-center space-x-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Skip to Payment</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Message */}
        {showWelcome && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <h3 className="text-lg font-semibold text-green-900">Welcome to PrintStudio!</h3>
                <p className="text-green-700">
                  Your email has been confirmed. Now let's create your {currentProduct?.name.toLowerCase()}!
                </p>
              </div>
              <button 
                onClick={() => setShowWelcome(false)}
                className="ml-auto text-green-600 hover:text-green-800"
              >
                ×
              </button>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Filters */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Filters</h3>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Templates</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Industry Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {industries.map(industry => (
                    <option key={industry.id} value={industry.id}>
                      {industry.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Product Switcher */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Switch Product</label>
                <div className="space-y-2">
                  {products.map(product => {
                    const Icon = product.icon;
                    return (
                      <button
                        key={product.id}
                        onClick={() => setSelectedProduct(product.id)}
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                          selectedProduct === product.id 
                            ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                            : 'hover:bg-gray-50 border border-transparent'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.size}</p>
                        </div>
                        <span className="text-sm font-medium">${product.startingPrice}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Template Gallery */}
          <div className="col-span-12 lg:col-span-6">
            <div className="bg-white rounded-lg shadow-sm border">
              {/* Gallery Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Choose Your Template
                  </h2>
                  <div className="flex border border-gray-300 rounded-md overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-600">
                  {filteredTemplates.length} templates found for {currentProduct?.name}
                </p>
              </div>

              {/* Template Grid */}
              <div className="p-6">
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-4'}>
                  {filteredTemplates.map(template => (
                    <div 
                      key={template.id}
                      className={`bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group ${
                        viewMode === 'list' ? 'flex' : ''
                      }`}
                    >
                      {/* Template Image */}
                      <div className={`relative ${viewMode === 'list' ? 'w-48 h-32' : 'h-48'} bg-gray-100 flex items-center justify-center`}>
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <Briefcase className="w-12 h-12 text-gray-400" />
                        </div>
                        
                        {/* Badges */}
                        <div className="absolute top-2 left-2 space-y-1">
                          {template.isPremium && (
                            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                              <Crown className="w-3 h-3" />
                              <span>Premium</span>
                            </span>
                          )}
                          {template.isPopular && (
                            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                              <Zap className="w-3 h-3" />
                              <span>Popular</span>
                            </span>
                          )}
                        </div>

                        {/* Actions Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex space-x-2">
                            <button className="bg-white rounded-full p-2 shadow-lg hover:shadow-xl">
                              <Eye className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="bg-white rounded-full p-2 shadow-lg hover:shadow-xl">
                              <Heart className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>

                        {/* Color Palette */}
                        <div className="absolute bottom-2 left-2 flex space-x-1">
                          {template.colors.slice(0, 3).map((color, index) => (
                            <div
                              key={index}
                              className="w-4 h-4 rounded-full border-2 border-white shadow"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Template Info */}
                      <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                        <div className={viewMode === 'list' ? 'flex items-center justify-between h-full' : ''}>
                          <div className={viewMode === 'list' ? 'flex-1' : ''}>
                            <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
                            <p className="text-sm text-gray-600 mb-3 capitalize">
                              {template.category} • {template.industry}
                            </p>
                          </div>
                          
                          <div className={viewMode === 'list' ? 'ml-4' : ''}>
                            <Link 
                              href={`/en/dashboard/printing/customize?template=${template.id}&product=${selectedProduct}`}
                              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                            >
                              <Palette className="w-4 h-4" />
                              <span>Use Template</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Empty State */}
                {filteredTemplates.length === 0 && (
                  <div className="text-center py-12">
                    <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
                    <p className="text-gray-500 mb-6">Try adjusting your filters to see more templates.</p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('all');
                        setSelectedIndustry('all');
                      }}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Product Info */}
          <div className="col-span-12 lg:col-span-3">
            <div className="space-y-6">
              {/* Current Product Info */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
                {currentProduct && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Product</label>
                      <p className="text-lg font-semibold text-gray-900">{currentProduct.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Size</label>
                      <p className="text-gray-900">{currentProduct.size}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Material</label>
                      <p className="text-gray-900">{currentProduct.material}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Starting Price</label>
                      <p className="text-xl font-bold text-green-600">${currentProduct.startingPrice}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link 
                    href="/en/dashboard/billing"
                    className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Skip to Payment</span>
                  </Link>
                  <button className="w-full border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Save for Later</span>
                  </button>
                </div>
              </div>

              {/* Help */}
              <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help?</h3>
                <p className="text-sm text-blue-700 mb-4">
                  Our design experts are here to help you create the perfect {currentProduct?.name.toLowerCase()}.
                </p>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Contact Support →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}