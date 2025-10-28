'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface OnboardingData {
  description: string;
  selectedServices: string[];
  primaryColor: string;
  secondaryColor: string;
  logoFile?: File;
}

export default function OnepageOnboardingFlow() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    description: '',
    selectedServices: [],
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
  });

  const [availableServices, setAvailableServices] = useState<string[]>([]);

  // Load available services on component mount
  useEffect(() => {
    const loadServices = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/services/restaurant/`);
        if (response.ok) {
          const data = await response.json();
          setAvailableServices(data.services || []);
        }
      } catch (error) {
        console.error('Failed to load services:', error);
      }
    };
    loadServices();
  }, []);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('description', onboardingData.description);
      formData.append('services', JSON.stringify(onboardingData.selectedServices));
      formData.append('primary_color', onboardingData.primaryColor);
      formData.append('secondary_color', onboardingData.secondaryColor);
      
      if (onboardingData.logoFile) {
        formData.append('logo', onboardingData.logoFile);
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/onboard/`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Onboarding success:', result);
        // Redirect to dashboard or success page
        router.push('/dashboard');
      } else {
        const errorText = await response.text();
        console.error('Onboarding failed:', response.status, errorText);
        alert(`Onboarding failed: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Onboarding error:', error);
      alert('Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateOnboardingData = (updates: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Step {currentStep} of 3</span>
            <span className="text-sm text-gray-500">{Math.round((currentStep / 3) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          {currentStep === 1 && (
            <Step1Description 
              data={onboardingData}
              onUpdate={updateOnboardingData}
            />
          )}
          
          {currentStep === 2 && (
            <Step2Services 
              data={onboardingData}
              availableServices={availableServices}
              onUpdate={updateOnboardingData}
            />
          )}
          
          {currentStep === 3 && (
            <Step3Branding 
              data={onboardingData}
              onUpdate={updateOnboardingData}
            />
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="px-6 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {isLoading ? 'Creating Website...' : 'Complete Setup'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 1: Business Description
function Step1Description({ data, onUpdate }: { 
  data: OnboardingData; 
  onUpdate: (updates: Partial<OnboardingData>) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about your business</h2>
      <p className="text-gray-600 mb-6">Help us understand what makes your business special.</p>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Business Description
        </label>
        <textarea
          value={data.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Describe your business, what you offer, your story..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={6}
        />
        <p className="text-sm text-gray-500 mt-2">
          This will appear on your website's about section.
        </p>
      </div>
    </div>
  );
}

// Step 2: Services Selection
function Step2Services({ data, availableServices, onUpdate }: { 
  data: OnboardingData; 
  availableServices: string[];
  onUpdate: (updates: Partial<OnboardingData>) => void;
}) {
  const toggleService = (service: string) => {
    const isSelected = data.selectedServices.includes(service);
    const newServices = isSelected 
      ? data.selectedServices.filter(s => s !== service)
      : [...data.selectedServices, service];
    
    onUpdate({ selectedServices: newServices });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose your services</h2>
      <p className="text-gray-600 mb-6">Select the services you want to highlight on your website.</p>
      
      <div className="grid grid-cols-2 gap-3">
        {availableServices.map((service) => (
          <div
            key={service}
            onClick={() => toggleService(service)}
            className={`p-3 border rounded-lg cursor-pointer transition-all ${
              data.selectedServices.includes(service)
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={data.selectedServices.includes(service)}
                onChange={() => {}}
                className="mr-2"
              />
              <span className="text-sm font-medium">{service}</span>
            </div>
          </div>
        ))}
      </div>
      
      {data.selectedServices.length === 0 && (
        <p className="text-sm text-gray-500 mt-4">
          Select at least one service to continue.
        </p>
      )}
    </div>
  );
}

// Step 3: Logo & Colors
function Step3Branding({ data, onUpdate }: { 
  data: OnboardingData; 
  onUpdate: (updates: Partial<OnboardingData>) => void;
}) {
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpdate({ logoFile: file });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Customize your branding</h2>
      <p className="text-gray-600 mb-6">Choose colors and upload a logo for your website.</p>
      
      <div className="space-y-6">
        {/* Logo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Logo (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {data.logoFile && (
            <p className="text-sm text-green-600 mt-2">
              ✓ Logo uploaded: {data.logoFile.name}
            </p>
          )}
        </div>

        {/* Color Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Color
            </label>
            <input
              type="color"
              value={data.primaryColor}
              onChange={(e) => onUpdate({ primaryColor: e.target.value })}
              className="w-full h-12 border border-gray-300 rounded-lg cursor-pointer"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secondary Color
            </label>
            <input
              type="color"
              value={data.secondaryColor}
              onChange={(e) => onUpdate({ secondaryColor: e.target.value })}
              className="w-full h-12 border border-gray-300 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Preview */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Color Preview</h3>
          <div className="flex space-x-4">
            <div 
              className="w-16 h-16 rounded-lg"
              style={{ backgroundColor: data.primaryColor }}
            ></div>
            <div 
              className="w-16 h-16 rounded-lg"
              style={{ backgroundColor: data.secondaryColor }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}