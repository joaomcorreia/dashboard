'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { WebsitePreview } from '@/components/builder/WebsitePreview';
import { BusinessDetailsForm } from '@/components/builder/BusinessDetailsForm';
import { LogoSection } from '@/components/builder/LogoSection';
import { DeviceViewSwitcher } from '@/components/builder/DeviceViewSwitcher';
import { useAuth } from '@/contexts/AuthContext';

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

export default function WebsiteBuilderPage() {
  const t = useTranslations();
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('business-details');
  const [businessData, setBusinessData] = useState<BusinessData>({
    businessName: '',
    tagline: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    services: [],
    logo: null,
    gallery: [],
    galleryFolders: {},
    aboutImage: null,
    primaryColor: '#2563EB',
    secondaryColor: '#1D4ED8'
  });

  const sections = [
    { id: 'business-details', label: 'Business Info', icon: '🏢' },
    { id: 'design', label: 'Logo & Branding', icon: '🎨' },
    { id: 'services', label: 'Services', icon: '⚙️' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'preview', label: 'Final Review', icon: '👁️' }
  ];

  const updateBusinessData = (field: keyof BusinessData, value: any) => {
    setBusinessData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogout = async () => {
    await logout();
    // Extract current locale from pathname
    const currentLocale = pathname.split('/')[1] || 'en';
    router.push(`/${currentLocale}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Website Builder
            </h1>
            <p className="text-gray-600">
              Build your professional website in minutes
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline">Save Draft</Button>
            <Button>Publish Website</Button>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Builder Interface */}
      <div className="flex h-[calc(100vh-88px)]">
        {/* Left Panel - Forms */}
        <div className="w-[600px] bg-white border-r border-gray-200 flex flex-col">
          {/* Section Navigation - Horizontal */}
          <div className="border-b border-gray-200 px-4 py-3">
            <div className="flex items-center gap-1 overflow-x-auto">
              {sections.map((section, index) => (
                <div key={section.id} className="flex items-center">
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                      activeSection === section.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <span className="text-base">{section.icon}</span>
                    <span>{section.label}</span>
                  </button>
                  {index < sections.length - 1 && (
                    <div className="mx-2 text-gray-300">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeSection === 'business-details' && (
              <BusinessDetailsForm
                data={businessData}
                onChange={updateBusinessData}
                onContinueToLogo={() => setActiveSection('design')}
              />
            )}

            {activeSection === 'design' && (
              <LogoSection
                data={businessData}
                onChange={updateBusinessData}
              />
            )}
            
            {activeSection === 'services' && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Your Services</h3>
                <p className="text-sm text-gray-600">
                  Add the services you offer to your customers
                </p>
                {/* Services form will go here */}
                <div className="text-center py-8 text-gray-500">
                  Services form coming soon...
                </div>
              </div>
            )}

            {activeSection === 'settings' && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Website Settings</h3>
                <p className="text-sm text-gray-600">
                  Configure advanced settings and preferences
                </p>
                {/* Settings form will go here */}
                <div className="text-center py-8 text-gray-500">
                  Settings options coming soon...
                </div>
              </div>
            )}

            {activeSection === 'preview' && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Final Review</h3>
                <p className="text-sm text-gray-600">
                  Review your website before publishing
                </p>
                <div className="text-center py-8 text-gray-500">
                  Review options coming soon...
                </div>
              </div>
            )}
          </div>

          {/* Progress Footer - Compact */}
          <div className="border-t border-gray-200 px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <div className="bg-gray-200 rounded-full h-1.5 w-24">
                    <div className="bg-blue-600 h-1.5 rounded-full transition-all duration-300" style={{ width: '40%' }}></div>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">2/5 steps</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Save Draft</Button>
                <Button size="sm" disabled>Publish</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Live Preview */}
        <div className="flex-1 bg-gray-100 overflow-hidden">
          <DeviceViewSwitcher>
            <WebsitePreview 
              businessData={businessData} 
              onUpdateBusinessData={updateBusinessData}
            />
          </DeviceViewSwitcher>
        </div>
      </div>
    </div>
  );
}