// Tutorial: How to create custom sections for your homepage

/**
 * SECTION NAMING CONVENTION
 * 
 * When you upload screenshots, name them according to the section type:
 * - "hero" or "home" → Creates a hero section
 * - "features" or "services" → Creates a features grid
 * - "about" or "story" → Creates an about section
 * - "pricing" or "plans" → Creates a pricing section
 * - "contact" or "support" → Creates a contact section
 * - Any other name → Creates a generic section
 */

import React from 'react';

// Example: Custom Hero Section
export function CustomHeroSection({ content }: { content?: any }) {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            {content?.title || "Build Smarter Websites"}
          </h1>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            {content?.description || "Advanced website builder with intelligent design assistance"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              {content?.primaryButton || "Start Building Today"}
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200">
              {content?.secondaryButton || "▶ Watch Demo"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Example: Custom Features Section
export function CustomFeaturesSection({ content }: { content?: any }) {
  const defaultFeatures = [
    { icon: "🎨", title: "Modern Design", description: "Beautiful, responsive designs" },
    { icon: "⚡", title: "Fast Performance", description: "Optimized for speed and SEO" },
    { icon: "🤖", title: "AI Assistance", description: "AI-powered design suggestions" },
    { icon: "🔒", title: "Secure Hosting", description: "Enterprise-grade security" }
  ];

  const features = content?.features || defaultFeatures;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {content?.title || "Everything You Need To Succeed"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {content?.description || "Comprehensive platform with all the tools you need"}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature: any, index: number) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * HOW TO USE THESE COMPONENTS:
 * 
 * 1. Create components like above for each section type
 * 2. Update DynamicSection.tsx to use your custom components
 * 3. The content parameter can be populated from AI conversion results
 * 4. Components automatically render based on upload names
 */

/**
 * ADVANCED: Content from AI Conversion
 * 
 * When the AI converts screenshots, it can extract:
 * - Text content (headings, descriptions, button labels)
 * - Color schemes
 * - Layout structure
 * - Component types
 * 
 * This data gets stored and passed to your custom components
 */