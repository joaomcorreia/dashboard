'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Navigation } from '@/components/ui/Navigation';
import DynamicSection from '../../components/sections/DynamicSection';
import * as api from '@/lib/api';

interface LibraryItem {
  id: string;
  name: string;
  target: 'DJANGO' | 'NEXTJS';
  category: string;
  subcategory: string;
  description: string;
  tags: string;
  zip_file: string;
  preview_image?: string;
  file_path: string;
  created_at: string;
}

export default function HomePage() {
  const t = useTranslations();
  const params = useParams();
  const currentLocale = params.locale as string;
  const [library, setLibrary] = useState<LibraryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLibrary();
  }, []);

  const loadLibrary = async () => {
    try {
      setLoading(true);
      // Load only homepage items for the main homepage
      const homepageItems = await api.getLibrarySubcategory('main-website', 'homepage').catch(() => []);
      
      // Only show homepage items to prevent overwhelming the user
      setLibrary(homepageItems);
    } catch (error) {
      console.error('Error loading library:', error);
      // Check if error is an Event object
      if (error && typeof error === 'object' && error.constructor.name === 'Event') {
        console.error('FOUND IT: Event object in loadLibrary error!', error);
        alert('Template error detected: An event object was passed to error handler');
      }
    } finally {
      setLoading(false);
    }
  };

  // Define section order priorities
  const getSectionOrder = (name: string): number => {
    const lowerName = name.toLowerCase();
    
    // Higher priority = appears first (lower number = higher priority)
    if (lowerName.includes('header') || lowerName.includes('nav')) return 1;
    if (lowerName.includes('hero') || lowerName.includes('banner') || lowerName === 'home') return 2;
    if (lowerName.includes('feature') || lowerName.includes('service')) return 3;
    if (lowerName.includes('about') || lowerName.includes('story')) return 4;
    if (lowerName.includes('product') || lowerName.includes('showcase')) return 5;
    if (lowerName.includes('pricing') || lowerName.includes('plan')) return 6;
    if (lowerName.includes('testimonial') || lowerName.includes('review')) return 7;
    if (lowerName.includes('team') || lowerName.includes('staff')) return 8;
    if (lowerName.includes('blog') || lowerName.includes('news')) return 9;
    if (lowerName.includes('contact') || lowerName.includes('support')) return 10;
    if (lowerName.includes('footer')) return 11;
    
    // Default order for unrecognized sections
    return 999;
  };

  const getSortedSections = (libraryItems: LibraryItem[]): LibraryItem[] => {
    return libraryItems
      .filter(item => item.target === 'NEXTJS') // Only show Next.js components
      .sort((a, b) => {
        const orderA = getSectionOrder(a.name);
        const orderB = getSectionOrder(b.name);
        
        // If same order priority, sort by creation date (older first)
        if (orderA === orderB) {
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        }
        
        return orderA - orderB;
      });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Dynamic Sections from Library */}
      <main>
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600 text-lg">Loading website sections...</span>
          </div>
        ) : (
          <div>
            {/* Render each library item as a section in proper order */}
            {getSortedSections(library)
              .map((item) => (
                <DynamicSection 
                  key={item.id} 
                  libraryItem={item}
                />
              ))}

            {/* Admin Access - Only show if library is empty or for development */}
            {library.length === 0 && (
              <section className="py-16 bg-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <div className="bg-white rounded-lg shadow-sm border p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">No Sections Available</h2>
                    <p className="text-gray-600 mb-6">Upload screenshots and convert them to Next.js components to populate this homepage</p>
                    <div className="flex justify-center space-x-4">
                      <Link 
                        href={`/${currentLocale}/admin/templates?tab=main`}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        Upload Templates
                      </Link>
                      <Link 
                        href={`/${currentLocale}/admin/templates`}
                        className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors"
                      >
                        Admin Panel
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}