'use client';

import { useEffect, useState } from 'react';

interface BusinessData {
  businessName: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  services: string[];
  logo?: File | null;
  gallery: File[];
  galleryFolders?: { [key: string]: File[] };
  aboutImage?: File | null;
  primaryColor: string;
  secondaryColor: string;
}

interface WebsitePreviewProps {
  businessData: BusinessData;
  onUpdateBusinessData?: (field: keyof BusinessData, value: any) => void;
}

export function WebsitePreview({ businessData, onUpdateBusinessData }: WebsitePreviewProps) {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [aboutImageUrl, setAboutImageUrl] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  // Handle logo file preview
  useEffect(() => {
    if (businessData.logo) {
      const url = URL.createObjectURL(businessData.logo);
      setLogoUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setLogoUrl(null);
    }
  }, [businessData.logo]);

  // Handle about image preview
  useEffect(() => {
    if (businessData.aboutImage) {
      const url = URL.createObjectURL(businessData.aboutImage);
      setAboutImageUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setAboutImageUrl(null);
    }
  }, [businessData.aboutImage]);

  // Handle about image upload
  const handleAboutImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdateBusinessData) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      onUpdateBusinessData('aboutImage', file);
    }
  };

  // Generate about image with AI
  const generateAboutImage = async () => {
    if (!businessData.businessName.trim()) {
      alert('Please enter a business name first');
      return;
    }

    setIsGeneratingImage(true);
    try {
      // This would integrate with an AI image generation API (like DALL-E, Midjourney, etc.)
      // For now, we'll show a placeholder
      alert('AI image generation feature coming soon! This will create professional business images based on your description.');
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // If no business name, show placeholder
  if (!businessData.businessName.trim()) {
    return (
      <div className="h-full flex items-center justify-center bg-white">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl">🏢</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Your Website Preview
          </h3>
          <p className="text-gray-600">
            Start filling in your business details on the left to see your website come to life here!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-white">
      {/* Website Content */}
      <div className="w-full">
        
        {/* Header Section */}
        <header 
          className="relative py-8 sm:py-12 lg:py-16 px-4 sm:px-6 text-center text-white"
          style={{ 
            background: `linear-gradient(135deg, ${businessData.primaryColor} 0%, ${businessData.secondaryColor} 100%)` 
          }}
        >
          <div className="max-w-3xl mx-auto">
            {/* Logo */}
            {logoUrl && (
              <div className="mb-4 sm:mb-6">
                <img 
                  src={logoUrl} 
                  alt={businessData.businessName}
                  className="h-10 sm:h-12 lg:h-16 w-auto mx-auto"
                />
              </div>
            )}
            
            {/* Business Name */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4">
              {businessData.businessName}
            </h1>
            
            {/* Tagline */}
            {businessData.tagline && (
              <p className="text-sm sm:text-lg lg:text-xl opacity-90 mb-6 sm:mb-8">
                {businessData.tagline}
              </p>
            )}
            
            {/* CTA Button */}
            <button 
              className="bg-white text-gray-900 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base"
            >
              Get Started
            </button>
          </div>
        </header>

        {/* About Section */}
        {businessData.description && (
          <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-6 sm:mb-8 lg:mb-12">
                About Us
              </h2>
              
              <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                {/* Text Content */}
                <div className="order-2 lg:order-1">
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">
                    {businessData.description}
                  </p>
                  {businessData.address && (
                    <p className="text-gray-500 text-xs sm:text-sm">
                      📍 {businessData.address}
                    </p>
                  )}
                </div>

                {/* Image Section */}
                <div className="order-1 lg:order-2">
                  {aboutImageUrl ? (
                    <div className="relative group">
                      <img
                        src={aboutImageUrl}
                        alt={`${businessData.businessName} business`}
                        className="w-full h-80 object-cover rounded-lg shadow-lg"
                      />
                      {onUpdateBusinessData && (
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex gap-3">
                            <label className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium cursor-pointer hover:bg-gray-100 transition-colors">
                              Replace Image
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleAboutImageUpload}
                                className="hidden"
                              />
                            </label>
                            <button
                              onClick={() => onUpdateBusinessData('aboutImage', null)}
                              className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-48 sm:h-64 lg:h-80 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">
                      <div className="text-center px-4">
                        <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gray-200 rounded-lg mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                          <span className="text-xl sm:text-2xl">🖼️</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                          Add Business Image
                        </h3>
                        <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6 max-w-xs">
                          Showcase your business with a professional image
                        </p>
                        
                        {onUpdateBusinessData && (
                          <div className="flex flex-col gap-2 sm:gap-3">
                            <button
                              onClick={generateAboutImage}
                              disabled={isGeneratingImage}
                              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 sm:px-4 lg:px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 text-xs sm:text-sm"
                            >
                              {isGeneratingImage ? '🎨 Generating...' : '✨ Generate with AI'}
                            </button>
                            
                            <label className="bg-gray-600 text-white px-3 sm:px-4 lg:px-6 py-2 rounded-lg font-medium cursor-pointer hover:bg-gray-700 transition-colors text-xs sm:text-sm">
                              📁 Upload Image
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleAboutImageUpload}
                                className="hidden"
                              />
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Services Section */}
        {businessData.services.length > 0 && (
          <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-6 sm:mb-8 lg:mb-12">
                Our Services
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {businessData.services.map((service, index) => (
                  <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                      {service}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Professional {service.toLowerCase()} services tailored to your needs.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Gallery Section */}
        {(() => {
          // Get all images from folders or fallback to main gallery
          const allImages = businessData.galleryFolders 
            ? Object.values(businessData.galleryFolders).flat()
            : businessData.gallery || [];
          
          // Get available categories from folder names
          const availableCategories = businessData.galleryFolders 
            ? Object.keys(businessData.galleryFolders).filter(folderName => 
                (businessData.galleryFolders?.[folderName] || []).length > 0
              )
            : [];
          
          // Filter images based on selected category
          const filteredImages = selectedCategory === 'All' 
            ? allImages
            : (businessData.galleryFolders?.[selectedCategory] || []);
          
          return allImages.length > 0 && (
            <section className="py-20 bg-white">
              <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                    Gallery
                  </h2>
                  
                  {/* Category Filter Buttons */}
                  {availableCategories.length > 1 && (
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                      <button
                        onClick={() => setSelectedCategory('All')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selectedCategory === 'All'
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        All ({allImages.length})
                      </button>
                      {availableCategories.map(category => {
                        const categoryCount = (businessData.galleryFolders?.[category] || []).length;
                        return (
                          <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                              selectedCategory === category
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {category} ({categoryCount})
                          </button>
                        );
                      })}
                    </div>
                  )}
                  
                  {/* Image Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredImages.map((image: File, index: number) => {
                      // Find which folder this image belongs to for alt text
                      const imageFolder = selectedCategory === 'All' 
                        ? Object.entries(businessData.galleryFolders || {}).find(([_, images]) => 
                            images.includes(image)
                          )?.[0] || 'gallery'
                        : selectedCategory;
                      
                      return (
                        <div
                          key={`${imageFolder}-${index}`}
                          className="group aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                        >
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`${businessData.businessName} ${imageFolder.toLowerCase()} ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* No images message */}
                  {filteredImages.length === 0 && selectedCategory !== 'All' && (
                    <div className="text-center py-12">
                      <p className="text-gray-500 text-lg">
                        No images in "{selectedCategory}" category yet
                      </p>
                      <p className="text-gray-400 text-sm mt-2">
                        Upload images to this folder to see them here
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        })()}

        {/* Contact Section */}
        {(businessData.address || businessData.phone || businessData.email) && (
          <section className="py-16 px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Contact Us
              </h2>
              
              <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Get in Touch
                  </h3>
                  
                  {businessData.address && (
                    <div className="flex items-start gap-3">
                      <span className="text-gray-400 mt-1">📍</span>
                      <div>
                        <p className="font-medium text-gray-900">Address</p>
                        <p className="text-gray-600">{businessData.address}</p>
                      </div>
                    </div>
                  )}
                  
                  {businessData.phone && (
                    <div className="flex items-start gap-3">
                      <span className="text-gray-400 mt-1">📞</span>
                      <div>
                        <p className="font-medium text-gray-900">Phone</p>
                        <p className="text-gray-600">{businessData.phone}</p>
                      </div>
                    </div>
                  )}
                  
                  {businessData.email && (
                    <div className="flex items-start gap-3">
                      <span className="text-gray-400 mt-1">✉️</span>
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <p className="text-gray-600">{businessData.email}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Contact Form */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Send Message
                  </h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First Name"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <textarea
                      placeholder="Your Message"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    ></textarea>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-lg font-semibold text-white transition-colors"
                      style={{ backgroundColor: businessData.primaryColor }}
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>

              {/* Map Placeholder */}
              {businessData.address && (
                <div className="mt-12">
                  <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <span className="text-2xl mb-2 block">🗺️</span>
                      <p>Google Map will appear here</p>
                      <p className="text-sm">{businessData.address}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer 
          className="py-8 px-6 text-center text-white"
          style={{ backgroundColor: businessData.secondaryColor }}
        >
          <p>&copy; 2025 {businessData.businessName}. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}