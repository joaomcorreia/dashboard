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

interface GalleryFolder {
  name: string;
  images: File[];
}

interface AIService {
  name: string;
  description: string;
  price?: string;
  duration?: string;
}

interface BusinessDetailsFormProps {
  data: BusinessData;
  onChange: (field: keyof BusinessData, value: any) => void;
  onContinueToLogo?: () => void;
}

export function BusinessDetailsForm({ data, onChange, onContinueToLogo }: BusinessDetailsFormProps) {
  const [showAIServices, setShowAIServices] = useState(false);
  const [aiServices, setAiServices] = useState<AIService[]>([]);
  const [isGeneratingServices, setIsGeneratingServices] = useState(false);
  const [isGeneratingTagline, setIsGeneratingTagline] = useState(false);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [activeFolder, setActiveFolder] = useState<string>('General');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [draggedImage, setDraggedImage] = useState<{ image: File; fromFolder: string; index: number } | null>(null);
  const [dragOverFolder, setDragOverFolder] = useState<string | null>(null);

  const handleInputChange = (field: keyof BusinessData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(field, e.target.value);
  };

  // Check if basic info is complete to show AI services
  const isBasicInfoComplete = data.businessName.trim() && data.description.trim();

  useEffect(() => {
    if (isBasicInfoComplete && !showAIServices && aiServices.length === 0) {
      setShowAIServices(true);
    }
  }, [isBasicInfoComplete, showAIServices, aiServices.length]);

  const generateAIServices = async () => {
    setIsGeneratingServices(true);
    setAiError(null);
    
    try {
      const prompt = `Based on this business information:
      - Business Name: ${data.businessName}
      - Description: ${data.description}
      - Business Type: Restaurant/Food Service
      
      Generate 6-8 relevant services that this business might offer. For each service, provide:
      1. Service name (concise, 2-4 words)
      2. Brief description (1-2 sentences)
      
      Return as JSON array with format: [{"name": "Service Name", "description": "Brief description"}]
      
      Focus on services that are practical and commonly offered by this type of business.`;

      const response = await fetch('/api/ai/generate-services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, businessData: data }),
      });

      if (!response.ok) {
        throw new Error(`AI service failed: ${response.status}`);
      }

      const result = await response.json();
      setAiServices(result.services || []);
      
      // Update the services in the main data
      const serviceNames = result.services?.map((s: AIService) => s.name) || [];
      onChange('services', serviceNames);
      
    } catch (error) {
      console.error('AI service generation failed:', error);
      setAiError('Failed to generate services. You can add them manually.');
      
      // Fallback to manual services
      setAiServices([
        { name: 'Dine-in Service', description: 'Full restaurant dining experience' },
        { name: 'Takeout Orders', description: 'Quick pickup service for busy customers' },
        { name: 'Catering', description: 'Event catering for special occasions' }
      ]);
    } finally {
      setIsGeneratingServices(false);
    }
  };

  const toggleService = (service: AIService) => {
    const isSelected = data.services.includes(service.name);
    const newServices = isSelected 
      ? data.services.filter(s => s !== service.name)
      : [...data.services, service.name];
    
    onChange('services', newServices);
  };

  const addCustomService = () => {
    const serviceName = prompt('Enter custom service name:');
    if (serviceName && serviceName.trim()) {
      const newService: AIService = {
        name: serviceName.trim(),
        description: 'Custom service'
      };
      setAiServices(prev => [...prev, newService]);
      onChange('services', [...data.services, serviceName.trim()]);
    }
  };

  // Initialize folders if not exist
  useEffect(() => {
    if (!data.galleryFolders || Object.keys(data.galleryFolders).length === 0) {
      onChange('galleryFolders', { 'General': [] });
    }
  }, []);

  // Get available folders
  const availableFolders = Object.keys(data.galleryFolders || { 'General': [] });
  const currentFolderImages = data.galleryFolders?.[activeFolder] || [];

  // Gallery management functions with folders
  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validImages = files.filter(file => {
      // Validate file type
      if (!file.type.startsWith('image/')) return false;
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) return false;
      return true;
    });

    const currentFolderImages = data.galleryFolders?.[activeFolder] || [];
    const remainingSlots = 8 - currentFolderImages.length;
    const imagesToAdd = validImages.slice(0, remainingSlots);
    
    if (imagesToAdd.length > 0) {
      const updatedFolders = {
        ...data.galleryFolders,
        [activeFolder]: [...currentFolderImages, ...imagesToAdd]
      };
      onChange('galleryFolders', updatedFolders);
      
      // Also update the main gallery array for backward compatibility
      const allImages = Object.values(updatedFolders).flat();
      onChange('gallery', allImages);
    }

    // Reset the input
    e.target.value = '';
  };

  const removeGalleryImage = (index: number) => {
    const currentFolderImages = data.galleryFolders?.[activeFolder] || [];
    const newFolderImages = currentFolderImages.filter((_, i) => i !== index);
    
    const updatedFolders = {
      ...data.galleryFolders,
      [activeFolder]: newFolderImages
    };
    onChange('galleryFolders', updatedFolders);
    
    // Update main gallery array
    const allImages = Object.values(updatedFolders).flat();
    onChange('gallery', allImages);
  };

  const createNewFolder = () => {
    const folderName = prompt('Enter folder name (e.g., "Food Photos", "Interior", "Menu"):');
    if (folderName && folderName.trim() && !availableFolders.includes(folderName.trim())) {
      const updatedFolders = {
        ...data.galleryFolders,
        [folderName.trim()]: []
      };
      onChange('galleryFolders', updatedFolders);
      setActiveFolder(folderName.trim());
    }
  };

  const deleteFolder = (folderName: string) => {
    if (folderName === 'General') return; // Can't delete General folder
    if (confirm(`Delete folder "${folderName}" and all its images?`)) {
      const updatedFolders = { ...data.galleryFolders };
      delete updatedFolders[folderName];
      onChange('galleryFolders', updatedFolders);
      
      // Switch to General folder
      setActiveFolder('General');
      
      // Update main gallery array
      const allImages = Object.values(updatedFolders).flat();
      onChange('gallery', allImages);
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, image: File, fromFolder: string, index: number) => {
    setDraggedImage({ image, fromFolder, index });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnterFolder = (folderName: string) => {
    setDragOverFolder(folderName);
  };

  const handleDragLeaveFolder = () => {
    setDragOverFolder(null);
  };

  const handleDropOnFolder = (e: React.DragEvent, targetFolder: string) => {
    e.preventDefault();
    setDragOverFolder(null);
    
    if (!draggedImage || draggedImage.fromFolder === targetFolder) {
      setDraggedImage(null);
      return;
    }

    // Check if target folder has space
    const targetFolderImages = data.galleryFolders?.[targetFolder] || [];
    if (targetFolderImages.length >= 8) {
      alert(`Target folder "${targetFolder}" is full (maximum 8 images per folder)`);
      setDraggedImage(null);
      return;
    }

    // Remove from source folder
    const sourceFolderImages = data.galleryFolders?.[draggedImage.fromFolder] || [];
    const updatedSourceImages = sourceFolderImages.filter((_, i) => i !== draggedImage.index);

    // Add to target folder
    const updatedTargetImages = [...targetFolderImages, draggedImage.image];

    // Update folders
    const updatedFolders = {
      ...data.galleryFolders,
      [draggedImage.fromFolder]: updatedSourceImages,
      [targetFolder]: updatedTargetImages
    };

    onChange('galleryFolders', updatedFolders);
    
    // Update main gallery array
    const allImages = Object.values(updatedFolders).flat();
    onChange('gallery', allImages);

    setDraggedImage(null);
  };

  const handleDragEnd = () => {
    setDraggedImage(null);
    setDragOverFolder(null);
  };

  // Auto-generate tagline when business name changes
  const generateTagline = async (businessName: string) => {
    if (!businessName.trim() || businessName.length < 3) return;
    
    setIsGeneratingTagline(true);
    try {
      const response = await fetch('/api/ai/generate-tagline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessName, existingDescription: data.description }),
      });

      if (response.ok) {
        const result = await response.json();
        onChange('tagline', result.tagline);
      }
    } catch (error) {
      console.error('Tagline generation failed:', error);
    } finally {
      setIsGeneratingTagline(false);
    }
  };

  // Auto-generate/update business description based on name and keywords
  const generateDescription = async (businessName: string, currentDescription: string = '') => {
    if (!businessName.trim()) return;
    
    setIsGeneratingDescription(true);
    try {
      const response = await fetch('/api/ai/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          businessName, 
          currentDescription,
          tagline: data.tagline,
          additionalInfo: extractKeywords(currentDescription)
        }),
      });

      if (response.ok) {
        const result = await response.json();
        onChange('description', result.description);
      }
    } catch (error) {
      console.error('Description generation failed:', error);
    } finally {
      setIsGeneratingDescription(false);
    }
  };

  // Extract keywords like "Portuguese food", "Mexican food" from description
  const extractKeywords = (text: string) => {
    const keywords = [];
    const foodTypes = text.match(/\b(\w+\s+food)\b/gi) || [];
    const cuisines = text.match(/\b(italian|mexican|chinese|indian|portuguese|japanese|thai|french|greek|spanish)\b/gi) || [];
    return [...foodTypes, ...cuisines];
  };

  // Smart description enhancement when keywords are detected
  const enhanceDescriptionIfNeeded = (description: string) => {
    const keywords = extractKeywords(description);
    const hasNewKeywords = keywords.some(keyword => 
      !data.description.toLowerCase().includes(keyword.toLowerCase())
    );
    
    if (hasNewKeywords && data.businessName) {
      // Debounce the enhancement
      setTimeout(() => {
        generateDescription(data.businessName, description);
      }, 2000);
    }
  };

  // Enhanced input handler for description
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value;
    onChange('description', newDescription);
    
    // Check if user added cuisine keywords
    if (newDescription.length > data.description.length + 5) { // Only on significant additions
      enhanceDescriptionIfNeeded(newDescription);
    }
  };

  // Debounced handlers for real-time AI generation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (data.businessName && data.businessName.length > 2 && !data.tagline.trim()) {
        generateTagline(data.businessName);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [data.businessName]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (data.businessName && data.businessName.length > 2 && (!data.description || data.description.length < 20)) {
        generateDescription(data.businessName, data.description);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [data.businessName]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Business Information</h3>
        <p className="text-sm text-gray-600 mb-6">
          Enter your basic business details to get started
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Name *
          </label>
          <Input
            type="text"
            value={data.businessName}
            onChange={handleInputChange('businessName')}
            placeholder="e.g., Helen's Restaurant"
            className="w-full"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Tagline
            </label>
            {data.businessName && (
              <button
                type="button"
                onClick={() => generateTagline(data.businessName)}
                disabled={isGeneratingTagline}
                className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-md hover:bg-purple-200 disabled:opacity-50"
              >
                {isGeneratingTagline ? '✨ Generating...' : '🤖 AI Generate'}
              </button>
            )}
          </div>
          <Input
            type="text"
            value={data.tagline}
            onChange={handleInputChange('tagline')}
            placeholder={isGeneratingTagline ? "AI is crafting your tagline..." : "e.g., Authentic Italian cuisine in the heart of the city"}
            className="w-full"
            disabled={isGeneratingTagline}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Business Description
            </label>
            {data.businessName && (
              <button
                type="button"
                onClick={() => generateDescription(data.businessName, data.description)}
                disabled={isGeneratingDescription}
                className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-md hover:bg-blue-200 disabled:opacity-50"
              >
                {isGeneratingDescription ? '✨ Generating...' : '🤖 AI Enhance'}
              </button>
            )}
          </div>
          <textarea
            value={data.description}
            onChange={handleDescriptionChange}
            placeholder={isGeneratingDescription ? "AI is crafting your business description..." : "Tell us about your business... Try adding cuisine types like 'Portuguese food' or 'Mexican food'"}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y min-h-[100px]"
            rows={6}
            disabled={isGeneratingDescription}
            style={{ 
              height: 'auto',
              minHeight: '100px',
              maxHeight: '200px'
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = target.scrollHeight + 'px';
            }}
          />
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-gray-500">
              💡 Add keywords like "Portuguese food", "Mexican cuisine" and AI will enhance your description
            </p>
            {(isGeneratingDescription || isGeneratingTagline) && (
              <div className="flex items-center text-xs text-purple-600">
                <div className="animate-pulse mr-1">🤖</div>
                AI working...
              </div>
            )}
          </div>
        </div>

        {/* Contact Details Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Address
              </label>
              <Input
                type="text"
                value={data.address}
                onChange={handleInputChange('address')}
                placeholder="e.g., 123 Main Street, Downtown, City 12345"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <Input
                type="tel"
                value={data.phone}
                onChange={handleInputChange('phone')}
                placeholder="e.g., +1 (555) 123-4567"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                value={data.email}
                onChange={handleInputChange('email')}
                placeholder="e.g., info@yourbusiness.com"
                className="w-full"
              />
            </div>
          </div>

          {/* Continue Button */}
          {onContinueToLogo && data.businessName && data.email && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-blue-900">Business Info Complete!</h4>
                  <p className="text-sm text-blue-700">Ready to add your logo and branding?</p>
                </div>
                <Button
                  onClick={onContinueToLogo}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Continue to Logo →
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Gallery Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Business Gallery
            </label>
            <span className="text-xs text-gray-500">
              {currentFolderImages.length}/8 images in {activeFolder}
            </span>
          </div>
          
          {/* Folder Tabs */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1 mb-3">
              {availableFolders.map((folderName) => {
                const imageCount = (data.galleryFolders?.[folderName] || []).length;
                const isDragOver = dragOverFolder === folderName;
                const canDrop = draggedImage && draggedImage.fromFolder !== folderName && imageCount < 8;
                
                return (
                  <button
                    key={folderName}
                    type="button"
                    onClick={() => setActiveFolder(folderName)}
                    onDragOver={handleDragOver}
                    onDragEnter={() => handleDragEnterFolder(folderName)}
                    onDragLeave={handleDragLeaveFolder}
                    onDrop={(e) => handleDropOnFolder(e, folderName)}
                    className={`px-3 py-1.5 text-sm rounded-md border transition-all ${
                      activeFolder === folderName
                        ? 'bg-blue-100 border-blue-300 text-blue-700'
                        : isDragOver && canDrop
                        ? 'bg-green-100 border-green-300 text-green-700 border-dashed'
                        : isDragOver && !canDrop
                        ? 'bg-red-100 border-red-300 text-red-700 border-dashed'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {folderName}
                    {imageCount > 0 && (
                      <span className="ml-1 text-xs opacity-75">({imageCount})</span>
                    )}
                    {isDragOver && canDrop && (
                      <span className="ml-1 text-xs text-green-600">📁 Drop here</span>
                    )}
                    {isDragOver && !canDrop && imageCount >= 8 && (
                      <span className="ml-1 text-xs text-red-600">Full!</span>
                    )}
                    {folderName !== 'General' && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteFolder(folderName);
                        }}
                        className="ml-2 text-red-400 hover:text-red-600 cursor-pointer"
                      >
                        ×
                      </span>
                    )}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={createNewFolder}
                className="px-3 py-1.5 text-sm rounded-md border border-dashed border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-600"
              >
                + New Folder
              </button>
            </div>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <div className="grid grid-cols-4 gap-3 mb-4">
              {currentFolderImages.map((image, index) => (
                <div 
                  key={index} 
                  className="relative group cursor-move"
                  draggable
                  onDragStart={(e) => handleDragStart(e, image, activeFolder, index)}
                  onDragEnd={handleDragEnd}
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`${activeFolder} image ${index + 1}`}
                    className="w-full h-16 object-cover rounded-md border-2 border-transparent group-hover:border-blue-300 transition-all"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-md transition-all flex items-center justify-center">
                    <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      Drag to move
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    ×
                  </button>
                </div>
              ))}
              
              {currentFolderImages.length < 8 && (
                <label className="w-full h-16 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                  <span className="text-2xl text-gray-400">+</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            
            {currentFolderImages.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <p className="text-sm">No images in "{activeFolder}" folder</p>
                <p className="text-xs mt-1">Upload images to get started</p>
              </div>
            )}
            
            {currentFolderImages.length > 0 && (
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Upload high-quality images for your {activeFolder.toLowerCase()} folder
                </p>
                <p className="text-xs text-gray-500">
                  Recommended: 1200x800px, JPG or PNG, max 5MB per image
                </p>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Address
          </label>
          <Input
            type="text"
            value={data.address}
            onChange={handleInputChange('address')}
            placeholder="123 Main Street, City, State, ZIP"
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <Input
              type="tel"
              value={data.phone}
              onChange={handleInputChange('phone')}
              placeholder="(555) 123-4567"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <Input
              type="email"
              value={data.email}
              onChange={handleInputChange('email')}
              placeholder="hello@business.com"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* AI Services Section */}
      {showAIServices && (
        <div className="pt-6 border-t border-gray-200">
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-2">🤖 AI-Powered Services</h4>
            <p className="text-sm text-gray-600 mb-4">
              Let AI generate relevant services for your business based on your description
            </p>
            
            {aiServices.length === 0 ? (
              <div className="text-center py-8">
                <Button 
                  onClick={generateAIServices}
                  disabled={isGeneratingServices}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  {isGeneratingServices ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating Magic...
                    </>
                  ) : (
                    <>✨ Generate Services with AI</>
                  )}
                </Button>
                {aiError && (
                  <p className="text-red-500 text-sm mt-2">{aiError}</p>
                )}
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  {aiServices.map((service, index) => (
                    <div
                      key={index}
                      onClick={() => toggleService(service)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        data.services.includes(service.name)
                          ? 'border-blue-500 bg-blue-50 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <input
                              type="checkbox"
                              checked={data.services.includes(service.name)}
                              onChange={() => {}}
                              className="mr-2"
                            />
                            <h5 className="font-medium text-gray-900">{service.name}</h5>
                          </div>
                          <p className="text-sm text-gray-600">{service.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={addCustomService}
                  >
                    + Add Custom Service
                  </Button>
                  
                  <Button 
                    size="sm"
                    onClick={generateAIServices}
                    disabled={isGeneratingServices}
                    variant="outline"
                  >
                    🔄 Regenerate
                  </Button>
                </div>
                
                {data.services.length > 0 && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700">
                      ✅ {data.services.length} services selected
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {!isBasicInfoComplete 
              ? 'Fill in business name and description to unlock AI services'
              : data.services.length === 0 
                ? 'Generate some services to continue'
                : 'Ready to build your website!'
            }
          </div>
          <Button 
            size="sm"
            disabled={!isBasicInfoComplete || data.services.length === 0}
          >
            Next Step →
          </Button>
        </div>
      </div>
    </div>
  );
}