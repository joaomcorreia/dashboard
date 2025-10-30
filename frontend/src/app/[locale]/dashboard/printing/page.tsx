'use client';

import { useState } from 'react';
import { 
  Printer, 
  Search, 
  Filter, 
  Star, 
  ShoppingCart, 
  Eye, 
  Heart,
  Grid3X3,
  List,
  ChevronDown,
  Package,
  Clock,
  DollarSign
} from 'lucide-react';

interface PrintingMaterial {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  tags: string[];
  featured: boolean;
  bestseller: boolean;
  dimensions?: string;
  material?: string;
  colors: string[];
  turnaround: string;
}

export default function PrintMarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');

  // Mock data for printing materials
  const printingMaterials: PrintingMaterial[] = [
    {
      id: '1',
      name: 'Premium Business Cards',
      category: 'business-cards',
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.8,
      reviews: 324,
      image: '/api/placeholder/300/200',
      description: 'High-quality matte finish business cards with rounded corners',
      tags: ['premium', 'matte', 'rounded corners'],
      featured: true,
      bestseller: true,
      dimensions: '3.5" x 2"',
      material: 'Premium Cardstock',
      colors: ['White', 'Cream', 'Black'],
      turnaround: '3-5 days'
    },
    {
      id: '2',
      name: 'A4 Promotional Flyers',
      category: 'flyers',
      price: 45.99,
      rating: 4.6,
      reviews: 189,
      image: '/api/placeholder/300/200',
      description: 'Eye-catching full-color flyers perfect for promotions and events',
      tags: ['promotional', 'full-color', 'glossy'],
      featured: false,
      bestseller: true,
      dimensions: '8.27" x 11.69"',
      material: 'Glossy Paper',
      colors: ['Full Color'],
      turnaround: '2-4 days'
    },
    {
      id: '3',
      name: 'Tri-fold Brochures',
      category: 'brochures',
      price: 89.99,
      originalPrice: 109.99,
      rating: 4.7,
      reviews: 156,
      image: '/api/placeholder/300/200',
      description: 'Professional tri-fold brochures with premium finish',
      tags: ['tri-fold', 'professional', 'premium'],
      featured: true,
      bestseller: false,
      dimensions: '11" x 8.5"',
      material: 'Premium Gloss',
      colors: ['Full Color', 'Black & White'],
      turnaround: '5-7 days'
    },
    {
      id: '4',
      name: 'Large Format Posters',
      category: 'posters',
      price: 125.99,
      rating: 4.9,
      reviews: 78,
      image: '/api/placeholder/300/200',
      description: 'High-resolution large format posters for maximum impact',
      tags: ['large format', 'high resolution', 'waterproof'],
      featured: false,
      bestseller: false,
      dimensions: '24" x 36"',
      material: 'Vinyl Banner',
      colors: ['Full Color'],
      turnaround: '7-10 days'
    },
    {
      id: '5',
      name: 'Custom Banners',
      category: 'banners',
      price: 199.99,
      rating: 4.5,
      reviews: 92,
      image: '/api/placeholder/300/200',
      description: 'Weather-resistant custom banners for outdoor advertising',
      tags: ['custom', 'weather-resistant', 'outdoor'],
      featured: true,
      bestseller: false,
      dimensions: '6" x 3"',
      material: 'Vinyl',
      colors: ['Full Color'],
      turnaround: '10-14 days'
    },
    {
      id: '6',
      name: 'Letterhead Stationery',
      category: 'stationery',
      price: 35.99,
      rating: 4.4,
      reviews: 203,
      image: '/api/placeholder/300/200',
      description: 'Professional letterhead stationery for business correspondence',
      tags: ['letterhead', 'professional', 'watermark'],
      featured: false,
      bestseller: true,
      dimensions: '8.5" x 11"',
      material: 'Premium Paper',
      colors: ['White', 'Cream'],
      turnaround: '3-5 days'
    },
    {
      id: '7',
      name: 'Marketing Postcards',
      category: 'postcards',
      price: 22.99,
      originalPrice: 29.99,
      rating: 4.6,
      reviews: 145,
      image: '/api/placeholder/300/200',
      description: 'High-impact marketing postcards with UV coating',
      tags: ['marketing', 'UV coating', 'glossy'],
      featured: false,
      bestseller: true,
      dimensions: '6" x 4"',
      material: 'Cardstock',
      colors: ['Full Color'],
      turnaround: '2-3 days'
    },
    {
      id: '8',
      name: 'Window Decals',
      category: 'decals',
      price: 67.99,
      rating: 4.3,
      reviews: 87,
      image: '/api/placeholder/300/200',
      description: 'Removable window decals for storefronts and vehicles',
      tags: ['removable', 'storefront', 'vehicle'],
      featured: false,
      bestseller: false,
      dimensions: '12" x 8"',
      material: 'Vinyl',
      colors: ['Full Color', 'White', 'Clear'],
      turnaround: '5-7 days'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'business-cards', label: 'Business Cards' },
    { id: 'flyers', label: 'Flyers' },
    { id: 'brochures', label: 'Brochures' },
    { id: 'posters', label: 'Posters' },
    { id: 'banners', label: 'Banners' },
    { id: 'stationery', label: 'Stationery' },
    { id: 'postcards', label: 'Postcards' },
    { id: 'decals', label: 'Decals' }
  ];

  const filteredMaterials = printingMaterials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedMaterials = [...filteredMaterials].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'popular':
      default:
        return b.reviews - a.reviews;
    }
  });

  const featuredMaterials = printingMaterials.filter(material => material.featured);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Print Marketplace</h1>
        <p className="text-gray-600">Discover premium printing materials for your marketing and promotional needs.</p>
      </div>

      {/* My Products Section */}
      {featuredMaterials.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">My Products</h2>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
            <p className="text-sm text-gray-600 mb-4">Products you've previously ordered or customized</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredMaterials.slice(0, 3).map((material) => (
                <div key={material.id} className="bg-white rounded-lg shadow-sm border p-4">
                  <div className="relative mb-3">
                    <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Printer className="w-12 h-12 text-gray-400" />
                    </div>
                    {material.bestseller && (
                      <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Previously Ordered
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{material.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(material.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">({material.reviews})</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">${material.price}</span>
                      {material.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${material.originalPrice}</span>
                      )}
                    </div>
                    <button className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors text-sm">
                      Reorder
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search printing materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            
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
        </div>
      </div>

      {/* Products Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
        {sortedMaterials.map((material) => (
          <div key={material.id} className={`bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow ${
            viewMode === 'list' ? 'flex' : ''
          }`}>
            {/* Product Image */}
            <div className={`relative ${viewMode === 'list' ? 'w-48 h-32' : 'h-48'} bg-gray-200 flex items-center justify-center`}>
              <Printer className="w-12 h-12 text-gray-400" />
              
              {/* Badges */}
              <div className="absolute top-2 left-2 space-y-1">
                {material.bestseller && (
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                    Bestseller
                  </span>
                )}
                {material.originalPrice && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    Sale
                  </span>
                )}
              </div>
              
              {/* Actions */}
              <div className="absolute top-2 right-2 space-y-1">
                <button className="bg-white rounded-full p-2 shadow-sm hover:shadow-md transition-shadow">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
                <button className="bg-white rounded-full p-2 shadow-sm hover:shadow-md transition-shadow">
                  <Eye className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
              <div className={viewMode === 'list' ? 'flex items-center justify-between h-full' : ''}>
                <div className={viewMode === 'list' ? 'flex-1' : ''}>
                  <h3 className="font-semibold text-gray-900 mb-1">{material.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{material.description}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(material.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">({material.reviews})</span>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center text-xs text-gray-500">
                      <Package className="w-3 h-3 mr-1" />
                      {material.dimensions} • {material.material}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {material.turnaround}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {material.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price and Actions */}
                <div className={`${viewMode === 'list' ? 'ml-4 text-right' : ''}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">${material.price}</span>
                      {material.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${material.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {material.category === 'business-cards' || material.category === 'flyers' || material.category === 'stationery' ? (
                      <a 
                        href={`/en/order?product=${material.category}`}
                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm flex items-center justify-center"
                      >
                        <Printer className="w-4 h-4 mr-1" />
                        Order Now
                      </a>
                    ) : (
                      <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm flex items-center justify-center">
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Add to Cart
                      </button>
                    )}
                    <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {sortedMaterials.length === 0 && (
        <div className="text-center py-12">
          <Printer className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No materials found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Bottom Stats */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{printingMaterials.length}</div>
            <div className="text-sm text-gray-600">Products Available</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{categories.length - 1}</div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">24/7</div>
            <div className="text-sm text-gray-600">Support</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">Free</div>
            <div className="text-sm text-gray-600">Design Consultation</div>
          </div>
        </div>
      </div>
    </div>
  );
}