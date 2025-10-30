'use client';

import { useState, useEffect } from 'react';
import { PlusIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface WebsiteTemplate {
  id: string;
  name: string;
  description: string;
  category: 'homepage' | 'about' | 'services' | 'contact' | 'portfolio';
  sections: TemplateSection[];
  created_at: string;
  updated_at?: string;
  preview?: string;
  screenshot?: string;
}

interface TemplateSection {
  id: string;
  type: 'header' | 'hero' | 'about' | 'services' | 'portfolio' | 'testimonials' | 'contact' | 'footer';
  title: string;
  content: string;
  backgroundColor: string;
  textColor: string;
  layout: 'single-column' | 'two-column' | 'three-column' | 'grid';
}

const sectionTypes = [
  { type: 'header', label: 'Header/Navigation', description: 'Site header with navigation menu' },
  { type: 'hero', label: 'Hero Section', description: 'Main banner with call-to-action' },
  { type: 'about', label: 'About Section', description: 'Company or service description' },
  { type: 'services', label: 'Services Section', description: 'List of services or features' },
  { type: 'portfolio', label: 'Portfolio Section', description: 'Showcase of work or products' },
  { type: 'testimonials', label: 'Testimonials', description: 'Customer reviews and feedback' },
  { type: 'contact', label: 'Contact Section', description: 'Contact form and information' },
  { type: 'footer', label: 'Footer', description: 'Site footer with links and info' },
];

const layoutOptions = [
  { value: 'single-column', label: 'Single Column' },
  { value: 'two-column', label: 'Two Columns' },
  { value: 'three-column', label: 'Three Columns' },
  { value: 'grid', label: 'Grid Layout' },
];

export default function WebsiteTemplatesTab() {
  const [templates, setTemplates] = useState<WebsiteTemplate[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showUseTemplateModal, setShowUseTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<WebsiteTemplate | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper function to convert relative media URLs to full URLs
  const getFullMediaUrl = (relativeUrl: string | null | undefined): string | null => {
    if (!relativeUrl) return null;
    if (relativeUrl.startsWith('http')) return relativeUrl; // Already a full URL
    if (relativeUrl.startsWith('data:')) return relativeUrl; // Base64 data URL
    return `http://127.0.0.1:8000${relativeUrl}`; // Convert relative to full URL
  };

  // Load templates on component mount
  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:8000/api/templates/website-templates/');
      if (response.ok) {
        const data = await response.json();
        // Normalize sections data to ensure it's always an array
        const normalizedTemplates = data.map((template: any) => ({
          ...template,
          sections: Array.isArray(template.sections) 
            ? template.sections 
            : (template.sections?.sections || [])
        }));
        setTemplates(normalizedTemplates);
      } else {
        console.error('Failed to load templates:', response.statusText);
      }
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTemplate = async (templateData: Omit<WebsiteTemplate, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      console.log('Creating template with data:', templateData);
      
      // Use FormData to handle file uploads properly
      const formData = new FormData();
      formData.append('name', templateData.name);
      formData.append('description', templateData.description);
      formData.append('category', templateData.category);
      formData.append('sections', JSON.stringify(templateData.sections));
      formData.append('preview', templateData.preview || '');
      
      // Handle screenshot if it exists
      if (templateData.screenshot) {
        console.log('Screenshot type:', typeof templateData.screenshot);
        console.log('Screenshot preview:', templateData.screenshot.substring(0, 50));
        
        if (typeof templateData.screenshot === 'string' && templateData.screenshot.startsWith('data:')) {
          try {
            // Convert base64 to blob with better error handling
            const parts = templateData.screenshot.split(',');
            if (parts.length !== 2) {
              console.error('Invalid data URL format');
              return;
            }
            
            const base64Data = parts[1];
            const mimeMatch = templateData.screenshot.match(/data:([^;]+);base64/);
            const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
            
            console.log('MIME type:', mimeType);
            console.log('Base64 length:', base64Data.length);
            
            // Create blob using fetch API for better compatibility
            const dataURL = templateData.screenshot;
            const response = await fetch(dataURL);
            const blob = await response.blob();
            
            console.log('Blob size:', blob.size, 'type:', blob.type);
            formData.append('screenshot', blob, `screenshot.${mimeType.split('/')[1]}`);
          } catch (error) {
            console.error('Error converting screenshot:', error);
            return;
          }
        } else if (templateData.screenshot && typeof templateData.screenshot === 'object' && 'name' in templateData.screenshot) {
          const file = templateData.screenshot as any;
          console.log('File upload:', file.name, file.size);
          formData.append('screenshot', file);
        }
      }
      
      const response = await fetch('http://127.0.0.1:8000/api/templates/website-templates/', {
        method: 'POST',
        body: formData, // Don't set Content-Type header - let browser set it with boundary
      });
      
      if (response.ok) {
        const newTemplate = await response.json();
        // Normalize sections data for the new template
        const normalizedTemplate = {
          ...newTemplate,
          sections: Array.isArray(newTemplate.sections) 
            ? newTemplate.sections 
            : (newTemplate.sections?.sections || [])
        };
        setTemplates([...templates, normalizedTemplate]);
        setShowCreateModal(false);
      } else {
        const errorText = await response.text();
        console.error('Failed to create template:', response.statusText, errorText);
        alert(`Failed to create template: ${response.statusText}. ${errorText}`);
      }
    } catch (error) {
      console.error('Error creating template:', error);
      alert('Error creating template. Please check your connection.');
    }
  };

  const updateTemplate = async (updatedTemplate: WebsiteTemplate) => {
    try {
      console.log('Updating template with data:', updatedTemplate);
      
      // Use FormData to handle file uploads properly
      const formData = new FormData();
      formData.append('name', updatedTemplate.name);
      formData.append('description', updatedTemplate.description);
      formData.append('category', updatedTemplate.category);
      formData.append('sections', JSON.stringify(updatedTemplate.sections));
      formData.append('preview', updatedTemplate.preview || '');
      
      // Handle screenshot if it exists
      if (updatedTemplate.screenshot) {
        console.log('Update - Screenshot type:', typeof updatedTemplate.screenshot);
        console.log('Update - Screenshot preview:', updatedTemplate.screenshot.substring(0, 50));
        
        if (typeof updatedTemplate.screenshot === 'string' && updatedTemplate.screenshot.startsWith('data:')) {
          try {
            // Convert base64 to blob with better error handling
            const parts = updatedTemplate.screenshot.split(',');
            if (parts.length !== 2) {
              console.error('Invalid data URL format');
              return;
            }
            
            const base64Data = parts[1];
            const mimeMatch = updatedTemplate.screenshot.match(/data:([^;]+);base64/);
            const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
            
            console.log('Update - MIME type:', mimeType);
            console.log('Update - Base64 length:', base64Data.length);
            
            // Create blob using fetch API for better compatibility
            const dataURL = updatedTemplate.screenshot;
            const response = await fetch(dataURL);
            const blob = await response.blob();
            
            console.log('Update - Blob size:', blob.size, 'type:', blob.type);
            formData.append('screenshot', blob, `screenshot.${mimeType.split('/')[1]}`);
          } catch (error) {
            console.error('Error converting screenshot in update:', error);
            return;
          }
        } else if (updatedTemplate.screenshot && typeof updatedTemplate.screenshot === 'object' && 'name' in updatedTemplate.screenshot) {
          const file = updatedTemplate.screenshot as any;
          console.log('Update - File upload:', file.name, file.size);
          formData.append('screenshot', file);
        }
      }
      
      const response = await fetch(`http://127.0.0.1:8000/api/templates/website-templates/${updatedTemplate.id}/`, {
        method: 'PUT',
        body: formData, // Don't set Content-Type header - let browser set it with boundary
      });
      
      if (response.ok) {
        const updated = await response.json();
        // Normalize sections data for the updated template
        const normalizedUpdated = {
          ...updated,
          sections: Array.isArray(updated.sections) 
            ? updated.sections 
            : (updated.sections?.sections || [])
        };
        const updatedTemplates = templates.map(t => 
          t.id === normalizedUpdated.id ? normalizedUpdated : t
        );
        setTemplates(updatedTemplates);
        setShowEditModal(false);
        setSelectedTemplate(null);
      } else {
        const errorText = await response.text();
        console.error('Failed to update template:', response.statusText, errorText);
        alert(`Failed to update template: ${response.statusText}. ${errorText}`);
      }
    } catch (error) {
      console.error('Error updating template:', error);
      alert('Error updating template. Please check your connection.');
    }
  };

  const deleteTemplate = async (templateId: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/templates/website-templates/${templateId}/`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          const updatedTemplates = templates.filter(t => t.id !== templateId);
          setTemplates(updatedTemplates);
        } else {
          console.error('Failed to delete template:', response.statusText);
          alert('Failed to delete template. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting template:', error);
        alert('Error deleting template. Please check your connection.');
      }
    }
  };

  const previewTemplate = (template: WebsiteTemplate) => {
    setSelectedTemplate(template);
    setShowPreviewModal(true);
  };

  const useTemplate = (template: WebsiteTemplate) => {
    setSelectedTemplate(template);
    setShowUseTemplateModal(true);
  };

  const duplicateTemplate = async (template: WebsiteTemplate) => {
    try {
      const templateData = {
        name: `${template.name} (Copy)`,
        description: template.description,
        category: template.category,
        sections: template.sections,
        preview: template.preview,
      };
      
      const response = await fetch('http://127.0.0.1:8000/api/templates/website-templates/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(templateData),
      });
      
      if (response.ok) {
        const duplicatedTemplate = await response.json();
        setTemplates([...templates, duplicatedTemplate]);
      } else {
        console.error('Failed to duplicate template:', response.statusText);
        alert('Failed to duplicate template. Please try again.');
      }
    } catch (error) {
      console.error('Error duplicating template:', error);
      alert('Error duplicating template. Please check your connection.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Website Templates</h3>
          <p className="text-gray-500">Create and manage website templates with customizable sections.</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Create Template
        </button>
      </div>

      {/* Templates Grid */}
      {templates.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <svg fill="none" stroke="currentColor" viewBox="0 0 48 48">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A9.971 9.971 0 0124 24c4.21 0 7.954 2.648 9.287 6.286" />
            </svg>
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No templates yet</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating your first website template.</p>
          <div className="mt-6">
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Create Template
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div key={template.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              {/* Template Preview */}
              <div className="aspect-video bg-gradient-to-br from-blue-50 to-blue-100 rounded-t-lg p-4 flex items-center justify-center overflow-hidden">
                {template.screenshot ? (
                  <img
                    src={getFullMediaUrl(template.screenshot) || ''}
                    alt={template.name}
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="text-xs text-gray-600">{template.sections.length} sections</div>
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 mb-1">{template.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span className="capitalize bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                  <span>{new Date(template.created_at).toLocaleDateString()}</span>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => useTemplate(template)}
                    className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition-colors text-sm font-medium text-center"
                  >
                    ✨ Use This
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTemplate(template);
                      setShowEditModal(true);
                    }}
                    className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    <PencilIcon className="h-4 w-4 inline mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => duplicateTemplate(template)}
                    className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => previewTemplate(template)}
                    className="px-3 py-2 border border-green-300 rounded-md hover:bg-green-50 transition-colors text-sm font-medium text-green-700"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => deleteTemplate(template.id)}
                    className="px-3 py-2 border border-red-300 rounded-md hover:bg-red-50 transition-colors text-sm font-medium text-red-700"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Template Modal */}
      {showCreateModal && (
        <CreateTemplateModal
          onClose={() => setShowCreateModal(false)}
          onCreate={createTemplate}
          sectionTypes={sectionTypes}
          layoutOptions={layoutOptions}
        />
      )}

      {/* Edit Template Modal */}
      {showEditModal && selectedTemplate && (
        <EditTemplateModal
          template={selectedTemplate}
          onClose={() => {
            setShowEditModal(false);
            setSelectedTemplate(null);
          }}
          onUpdate={updateTemplate}
          sectionTypes={sectionTypes}
          layoutOptions={layoutOptions}
        />
      )}

      {/* Template Preview Modal */}
      {showPreviewModal && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">Preview: {selectedTemplate.name}</h2>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="overflow-auto max-h-[calc(90vh-120px)]">
              {/* Screenshot Preview or Live Preview */}
              <div className="bg-gray-50 p-4">
                {selectedTemplate.screenshot ? (
                  /* Show Screenshot Preview */
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <img
                      src={getFullMediaUrl(selectedTemplate.screenshot) || ''}
                      alt={`Preview of ${selectedTemplate.name}`}
                      className="w-full h-auto object-contain max-h-[600px]"
                    />
                    <div className="p-4 border-t bg-blue-50">
                      <p className="text-sm text-blue-800 text-center">
                        📸 This is your uploaded screenshot preview. The actual template will be customized with your content.
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Show Live Template Preview */
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="p-4 border-b bg-yellow-50">
                      <p className="text-sm text-yellow-800 text-center">
                        🔧 Live template preview - This is how your sections will look with your content.
                      </p>
                    </div>
                    {(Array.isArray(selectedTemplate.sections) ? selectedTemplate.sections : []).map((section, index) => (
                      <div
                        key={index}
                        className="py-16 px-4"
                        style={{ backgroundColor: section.backgroundColor, color: section.textColor }}
                      >
                        <div className="max-w-7xl mx-auto">
                          {section.layout === 'single-column' && (
                            <div className="text-center">
                              <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
                              <p className="text-lg">{section.content}</p>
                            </div>
                          )}
                          {section.layout === 'two-column' && (
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                              <div>
                                <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
                                <p>{section.content}</p>
                              </div>
                              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                                <span className="text-gray-500">Image Placeholder</span>
                              </div>
                            </div>
                          )}
                          {section.layout === 'three-column' && (
                            <>
                              <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold">{section.title}</h2>
                              </div>
                              <div className="grid md:grid-cols-3 gap-8">
                                {[1, 2, 3].map((i) => (
                                  <div key={i} className="text-center">
                                    <div className="bg-gray-200 rounded-lg h-32 mb-4 flex items-center justify-center">
                                      <span className="text-gray-500">Icon</span>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">Feature {i}</h3>
                                    <p>{section.content}</p>
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                          {section.layout === 'grid' && (
                            <>
                              <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold">{section.title}</h2>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                  <div key={i} className="bg-gray-200 rounded-lg h-40 flex items-center justify-center">
                                    <span className="text-gray-500">Item {i}</span>
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
              <p className="text-gray-600">Like what you see?</p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowPreviewModal(false);
                    useTemplate(selectedTemplate);
                  }}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
                >
                  ✨ Use This Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Use Template Modal */}
      {showUseTemplateModal && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">🎉 Great Choice!</h2>
              <button
                onClick={() => setShowUseTemplateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Ready to use "{selectedTemplate.name}"</h3>
                <p className="text-gray-600">Your template will be set up with your business information</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">What happens next:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>✅ Your template will be customized with your business details</li>
                    <li>✅ All content will be automatically filled in</li>
                    <li>✅ Your website will be ready to go live</li>
                    <li>✅ You can edit anything later with our simple editor</li>
                  </ul>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowUseTemplateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Not Yet
                </button>
                <button
                  onClick={() => {
                    // This would typically redirect to setup page or trigger template deployment
                    alert(`🎉 Perfect! "${selectedTemplate.name}" is being set up for you. You'll be redirected to customize your content.`);
                    setShowUseTemplateModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
                >
                  🚀 Let's Go!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Create Template Modal Component
function CreateTemplateModal({ onClose, onCreate, sectionTypes, layoutOptions }: any) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'homepage' as const,
    sections: [] as TemplateSection[],
    screenshot: '',
  });
  const [previewImage, setPreviewImage] = useState<string>('');

  const addSection = () => {
    const newSection: TemplateSection = {
      id: Date.now().toString(),
      type: 'hero',
      title: 'New Section',
      content: 'Enter your content here...',
      backgroundColor: '#ffffff',
      textColor: '#000000',
      layout: 'single-column',
    };
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));
  };

  const updateSection = (sectionId: string, updates: Partial<TemplateSection>) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, ...updates } : section
      ),
    }));
  };

  const removeSection = (sectionId: string) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== sectionId),
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewImage(result);
        setFormData(prev => ({ ...prev, screenshot: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.sections.length > 0) {
      onCreate(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <h3 className="text-lg font-medium text-gray-900">Create New Website Template</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Template Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Business Homepage"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="homepage">Homepage</option>
                <option value="about">About Page</option>
                <option value="services">Services Page</option>
                <option value="contact">Contact Page</option>
                <option value="portfolio">Portfolio Page</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Describe this template..."
            />
          </div>

          {/* Screenshot Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Template Screenshot
            </label>
            <div className="space-y-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {previewImage && (
                <div className="mt-3">
                  <img
                    src={previewImage}
                    alt="Template preview"
                    className="max-w-full h-32 object-cover rounded-md border border-gray-200"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Sections */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-medium text-gray-900">Template Sections</h4>
              <button
                type="button"
                onClick={addSection}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded text-white bg-green-600 hover:bg-green-700"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Add Section
              </button>
            </div>
            
            <div className="space-y-4">
              {formData.sections.map((section, index) => (
                <div key={section.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-medium text-gray-900">Section {index + 1}</h5>
                    <button
                      type="button"
                      onClick={() => removeSection(section.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                      <select
                        value={section.type}
                        onChange={(e) => updateSection(section.id, { type: e.target.value as any })}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      >
                        {sectionTypes.map((type: any) => (
                          <option key={type.type} value={type.type}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Layout</label>
                      <select
                        value={section.layout}
                        onChange={(e) => updateSection(section.id, { layout: e.target.value as any })}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      >
                        {layoutOptions.map((layout: any) => (
                          <option key={layout.value} value={layout.value}>{layout.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => updateSection(section.id, { title: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
                      <input
                        type="color"
                        value={section.backgroundColor}
                        onChange={(e) => updateSection(section.id, { backgroundColor: e.target.value })}
                        className="w-full h-8 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    <textarea
                      value={section.content}
                      onChange={(e) => updateSection(section.id, { content: e.target.value })}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
              
              {formData.sections.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No sections added yet. Click "Add Section" to get started.</p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!formData.name.trim() || formData.sections.length === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Template
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Edit Template Modal (similar to create but pre-filled)
function EditTemplateModal({ template, onClose, onUpdate, sectionTypes, layoutOptions }: any) {
  // Normalize template sections to ensure it's always an array
  const normalizedTemplate = {
    ...template,
    sections: Array.isArray(template.sections) 
      ? template.sections 
      : (template.sections?.sections || [])
  };
  
  const [formData, setFormData] = useState<WebsiteTemplate>(normalizedTemplate);
  const [previewImage, setPreviewImage] = useState<string>(
    template.screenshot && !template.screenshot.startsWith('data:') 
      ? `http://127.0.0.1:8000${template.screenshot}` 
      : (template.screenshot || '')
  );

  const addSection = () => {
    const newSection: TemplateSection = {
      id: Date.now().toString(),
      type: 'hero',
      title: 'New Section',
      content: 'Enter your content here...',
      backgroundColor: '#ffffff',
      textColor: '#000000',
      layout: 'single-column',
    };
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));
  };

  const updateSection = (sectionId: string, updates: Partial<TemplateSection>) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, ...updates } : section
      ),
    }));
  };

  const removeSection = (sectionId: string) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== sectionId),
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewImage(result);
        setFormData(prev => ({ ...prev, screenshot: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.sections.length > 0) {
      onUpdate(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <h3 className="text-lg font-medium text-gray-900">Edit Website Template</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Same content as CreateTemplateModal but with formData pre-filled */}
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Template Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="homepage">Homepage</option>
                <option value="about">About Page</option>
                <option value="services">Services Page</option>
                <option value="contact">Contact Page</option>
                <option value="portfolio">Portfolio Page</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          {/* Screenshot Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Template Screenshot
            </label>
            <div className="space-y-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {previewImage && (
                <div className="mt-3">
                  <img
                    src={previewImage}
                    alt="Template preview"
                    className="max-w-full h-32 object-cover rounded-md border border-gray-200"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Sections - same as create modal */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-medium text-gray-900">Template Sections</h4>
              <button
                type="button"
                onClick={addSection}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded text-white bg-green-600 hover:bg-green-700"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Add Section
              </button>
            </div>
            
            <div className="space-y-4">
              {formData.sections.map((section, index) => (
                <div key={section.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-medium text-gray-900">Section {index + 1}</h5>
                    <button
                      type="button"
                      onClick={() => removeSection(section.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                      <select
                        value={section.type}
                        onChange={(e) => updateSection(section.id, { type: e.target.value as any })}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      >
                        {sectionTypes.map((type: any) => (
                          <option key={type.type} value={type.type}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Layout</label>
                      <select
                        value={section.layout}
                        onChange={(e) => updateSection(section.id, { layout: e.target.value as any })}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      >
                        {layoutOptions.map((layout: any) => (
                          <option key={layout.value} value={layout.value}>{layout.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => updateSection(section.id, { title: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
                      <input
                        type="color"
                        value={section.backgroundColor}
                        onChange={(e) => updateSection(section.id, { backgroundColor: e.target.value })}
                        className="w-full h-8 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    <textarea
                      value={section.content}
                      onChange={(e) => updateSection(section.id, { content: e.target.value })}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!formData.name.trim() || formData.sections.length === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Update Template
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}