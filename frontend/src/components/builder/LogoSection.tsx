'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

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
  galleryFolders: { [key: string]: File[] };
  aboutImage?: File | null;
  primaryColor: string;
  secondaryColor: string;
}

interface LogoSectionProps {
  data: BusinessData;
  onChange: (field: keyof BusinessData, value: any) => void;
}

export function LogoSection({ data, onChange }: LogoSectionProps) {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isGeneratingLogo, setIsGeneratingLogo] = useState(false);

  // Handle logo file preview
  useEffect(() => {
    if (data.logo) {
      const url = URL.createObjectURL(data.logo);
      setLogoPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setLogoPreview(null);
    }
  }, [data.logo]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
      onChange('logo', file);
    }
  };

  const removeLogo = () => {
    onChange('logo', null);
  };

  const generateLogo = async () => {
    if (!data.businessName.trim()) {
      alert('Please enter a business name first');
      return;
    }

    setIsGeneratingLogo(true);
    try {
      // This would integrate with a logo generation API (like Freepik, LogoMaker, etc.)
      // For now, we'll show a placeholder
      alert('Logo generation feature coming soon! This will integrate with AI logo generators.');
    } catch (error) {
      console.error('Error generating logo:', error);
      alert('Failed to generate logo. Please try again.');
    } finally {
      setIsGeneratingLogo(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Logo</h3>
        <p className="text-sm text-gray-600 mb-4">
          Upload your existing logo or generate a new one with AI
        </p>
      </div>

      {/* Logo Upload/Preview Section */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        {logoPreview ? (
          <div className="text-center">
            <div className="mb-4">
              <img
                src={logoPreview}
                alt="Business Logo Preview"
                className="max-w-48 max-h-48 mx-auto rounded-lg shadow-md"
              />
            </div>
            <div className="space-x-3">
              <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">
                Replace Logo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
              <button
                onClick={removeLogo}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Remove Logo
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-4">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-3xl text-gray-400">🏢</span>
              </div>
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Your Logo</h4>
            <p className="text-sm text-gray-600 mb-4">
              PNG, JPG or SVG files up to 5MB
            </p>
            <label className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">
              Choose File
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">or</span>
        </div>
      </div>

      {/* AI Logo Generation */}
      <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200">
        <div className="mb-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-2xl">🤖</span>
          </div>
        </div>
        <h4 className="text-lg font-semibold text-gray-900 mb-2">Generate Logo with AI</h4>
        <p className="text-sm text-gray-600 mb-4">
          Create a professional logo using AI based on your business name and description
        </p>
        <Button
          onClick={generateLogo}
          disabled={isGeneratingLogo || !data.businessName.trim()}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          {isGeneratingLogo ? '🎨 Generating...' : '✨ Generate Logo'}
        </Button>
        {!data.businessName.trim() && (
          <p className="text-xs text-amber-600 mt-2">
            Please enter your business name first
          </p>
        )}
      </div>

      {/* Color Scheme Section */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-900">Brand Colors</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={data.primaryColor}
                onChange={(e) => onChange('primaryColor', e.target.value)}
                className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
              />
              <Input
                type="text"
                value={data.primaryColor}
                onChange={(e) => onChange('primaryColor', e.target.value)}
                placeholder="#3B82F6"
                className="flex-1"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secondary Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={data.secondaryColor}
                onChange={(e) => onChange('secondaryColor', e.target.value)}
                className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
              />
              <Input
                type="text"
                value={data.secondaryColor}
                onChange={(e) => onChange('secondaryColor', e.target.value)}
                placeholder="#1E40AF"
                className="flex-1"
              />
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500">
          💡 Tip: Colors can be automatically extracted from your uploaded logo
        </p>
      </div>
    </div>
  );
}