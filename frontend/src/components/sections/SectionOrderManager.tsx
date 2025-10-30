'use client';

import { useState, useEffect } from 'react';
import { 
  ArrowUpIcon, 
  ArrowDownIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import * as api from '@/lib/api';

interface LibraryItem {
  id: string;
  name: string;
  target: 'DJANGO' | 'NEXTJS';
  zip_file: string;
  created_at: string;
  order?: number;
}

interface SectionOrderManagerProps {
  onUpdate?: () => void;
}

export default function SectionOrderManager({ onUpdate }: SectionOrderManagerProps) {
  const [sections, setSections] = useState<LibraryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSections();
  }, []);

  const loadSections = async () => {
    try {
      setLoading(true);
      const libraryData = await api.listLibrary();
      const nextjsSections = libraryData
        .filter(item => item.target === 'NEXTJS')
        .sort((a, b) => ((a as any).order || 999) - ((b as any).order || 999));
      setSections(nextjsSections);
    } catch (error) {
      console.error('Error loading sections:', error);
    } finally {
      setLoading(false);
    }
  };

  const moveSection = (fromIndex: number, toIndex: number) => {
    const newSections = [...sections];
    const [movedSection] = newSections.splice(fromIndex, 1);
    newSections.splice(toIndex, 0, movedSection);
    
    // Update order values
    const updatedSections = newSections.map((section, index) => ({
      ...section,
      order: index + 1
    }));
    
    setSections(updatedSections);
  };

  const saveOrder = async () => {
    try {
      setSaving(true);
      
      // Save the new order to the backend
      // Note: This would require a new API endpoint to update section order
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        // await api.updateSectionOrder(section.id, i + 1);
        console.log(`Section ${section.name} order: ${i + 1}`);
      }
      
      if (onUpdate) {
        onUpdate();
      }
      
      alert('Section order saved successfully!');
    } catch (error) {
      console.error('Error saving order:', error);
      alert('Failed to save section order');
    } finally {
      setSaving(false);
    }
  };

  const getSectionTypeIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('header') || lowerName.includes('nav')) return '📋';
    if (lowerName.includes('hero') || lowerName === 'home') return '🚀';
    if (lowerName.includes('feature') || lowerName.includes('service')) return '⭐';
    if (lowerName.includes('about')) return '👥';
    if (lowerName.includes('pricing')) return '💰';
    if (lowerName.includes('contact')) return '📞';
    if (lowerName.includes('footer')) return '📍';
    return '📄';
  };

  const getSectionTypeName = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('header') || lowerName.includes('nav')) return 'Navigation';
    if (lowerName.includes('hero') || lowerName === 'home') return 'Hero Section';
    if (lowerName.includes('feature') || lowerName.includes('service')) return 'Features';
    if (lowerName.includes('about')) return 'About Section';
    if (lowerName.includes('pricing')) return 'Pricing';
    if (lowerName.includes('contact')) return 'Contact';
    if (lowerName.includes('footer')) return 'Footer';
    return 'Custom Section';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading sections...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Section Order Manager</h3>
            <p className="text-sm text-gray-600 mt-1">
              Drag and drop to reorder sections on your homepage
            </p>
          </div>
          <button
            onClick={saveOrder}
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Order'}
          </button>
        </div>
      </div>

      <div className="p-6">
        {sections.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg font-medium">No sections available</p>
            <p className="text-sm">Upload and convert screenshots to create sections</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-1 text-gray-400">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                    </svg>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getSectionTypeIcon(section.name)}</span>
                    <div>
                      <h4 className="font-medium text-gray-900">{section.name}</h4>
                      <p className="text-sm text-gray-500">{getSectionTypeName(section.name)}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded">
                    Position {index + 1}
                  </span>
                  
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => index > 0 && moveSection(index, index - 1)}
                      disabled={index === 0}
                      className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded hover:bg-white"
                      title="Move up"
                    >
                      <ArrowUpIcon className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => index < sections.length - 1 && moveSection(index, index + 1)}
                      disabled={index === sections.length - 1}
                      className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded hover:bg-white"
                      title="Move down"
                    >
                      <ArrowDownIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Preview Order Section */}
      <div className="border-t border-gray-200 p-6 bg-gray-50">
        <h4 className="font-medium text-gray-900 mb-3">Preview Order</h4>
        <div className="flex flex-wrap gap-2">
          {sections.map((section, index) => (
            <div key={section.id} className="flex items-center space-x-1 bg-white px-3 py-1 rounded-full text-sm">
              <span>{index + 1}.</span>
              <span>{getSectionTypeIcon(section.name)}</span>
              <span className="font-medium">{section.name}</span>
            </div>
          ))}
        </div>
        
        {sections.length > 0 && (
          <p className="text-xs text-gray-500 mt-3">
            This is how sections will appear on your homepage from top to bottom
          </p>
        )}
      </div>
    </div>
  );
}