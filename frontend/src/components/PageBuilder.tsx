'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { JCW_RESTAURANT_TEMPLATE, getTemplateForBusinessType } from '@/lib/sectionTemplates';
import { AVAILABLE_EFFECTS } from '@/lib/effects';
import { SectionTemplate, PageSection, EditablePage } from '@/types/pageBuilder';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface PageBuilderProps {
  page?: EditablePage;
  businessType?: string;
  locale?: string;
}

export default function PageBuilder({ 
  page, 
  businessType = 'restaurant', 
  locale = 'en' 
}: PageBuilderProps) {
  const t = useTranslations('admin');
  const [currentPage, setCurrentPage] = useState<EditablePage | null>(page || null);
  const [availableTemplates, setAvailableTemplates] = useState<SectionTemplate[]>([]);
  const [selectedSection, setSelectedSection] = useState<PageSection | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    // Load templates based on business type
    const templates = getTemplateForBusinessType('jcw-rest-00', businessType, locale);
    setAvailableTemplates(templates);
  }, [businessType, locale]);

  const createNewPage = () => {
    const newPage: EditablePage = {
      id: `page-${Date.now()}`,
      slug: 'new-page',
      name: 'New Page',
      title: {
        [locale]: 'New Page'
      },
      description: {
        [locale]: 'A new editable page'
      },
      sections: [],
      isPublished: false,
      seoSettings: {
        [locale]: {
          metaTitle: 'New Page',
          metaDescription: 'A new page description',
          keywords: []
        }
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setCurrentPage(newPage);
  };

  const addSection = (template: SectionTemplate) => {
    if (!currentPage) return;

    const newSection: PageSection = {
      id: `section-${Date.now()}`,
      templateId: template.id,
      sectionType: template.sectionType,
      title: template.displayName[locale] || template.displayName.en,
      content: template.defaultContent,
      settings: template.defaultSettings,
      order: currentPage.sections.length,
      isVisible: true,
      isEditable: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setCurrentPage({
      ...currentPage,
      sections: [...currentPage.sections, newSection],
      updatedAt: new Date().toISOString()
    });
  };

  const updateSection = (sectionId: string, updates: Partial<PageSection>) => {
    if (!currentPage) return;

    setCurrentPage({
      ...currentPage,
      sections: currentPage.sections.map(section =>
        section.id === sectionId
          ? { ...section, ...updates, updatedAt: new Date().toISOString() }
          : section
      ),
      updatedAt: new Date().toISOString()
    });
  };

  const deleteSection = (sectionId: string) => {
    if (!currentPage) return;

    setCurrentPage({
      ...currentPage,
      sections: currentPage.sections.filter(section => section.id !== sectionId),
      updatedAt: new Date().toISOString()
    });
  };

  const moveSectionUp = (sectionId: string) => {
    if (!currentPage) return;

    const sections = [...currentPage.sections];
    const index = sections.findIndex(s => s.id === sectionId);
    
    if (index > 0) {
      [sections[index], sections[index - 1]] = [sections[index - 1], sections[index]];
      sections.forEach((section, idx) => {
        section.order = idx;
      });

      setCurrentPage({
        ...currentPage,
        sections,
        updatedAt: new Date().toISOString()
      });
    }
  };

  const moveSectionDown = (sectionId: string) => {
    if (!currentPage) return;

    const sections = [...currentPage.sections];
    const index = sections.findIndex(s => s.id === sectionId);
    
    if (index < sections.length - 1) {
      [sections[index], sections[index + 1]] = [sections[index + 1], sections[index]];
      sections.forEach((section, idx) => {
        section.order = idx;
      });

      setCurrentPage({
        ...currentPage,
        sections,
        updatedAt: new Date().toISOString()
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Page Builder
            </h1>
            <p className="text-gray-600">
              Create and edit website pages with customizable sections
            </p>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setPreviewMode(!previewMode)}
            >
              {previewMode ? 'Edit Mode' : 'Preview'}
            </Button>
            {!currentPage && (
              <Button variant="primary" onClick={createNewPage}>
                Create New Page
              </Button>
            )}
          </div>
        </div>

        {!currentPage ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              No Page Selected
            </h3>
            <p className="text-gray-600 mb-6">
              Create a new page or select an existing one to start building
            </p>
            <Button variant="primary" onClick={createNewPage}>
              Create Your First Page
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Section Templates Sidebar */}
            {!previewMode && (
              <div className="lg:col-span-1">
                <Card className="p-6 sticky top-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Add Sections
                  </h3>
                  <div className="space-y-3">
                    {availableTemplates.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => addSection(template)}
                        className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                      >
                        <div className="font-medium text-gray-900 mb-1">
                          {template.displayName[locale] || template.displayName.en}
                        </div>
                        <div className="text-sm text-gray-600">
                          {template.description[locale] || template.description.en}
                        </div>
                      </button>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {/* Main Content Area */}
            <div className={previewMode ? 'lg:col-span-4' : 'lg:col-span-3'}>
              {/* Page Info */}
              <Card className="p-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <Input
                      value={currentPage.name}
                      onChange={(e) => setCurrentPage({
                        ...currentPage,
                        name: e.target.value,
                        title: { ...currentPage.title, [locale]: e.target.value }
                      })}
                      className="text-xl font-semibold border-none p-0 focus:ring-0"
                      placeholder="Page Name"
                    />
                    <Input
                      value={currentPage.slug}
                      onChange={(e) => setCurrentPage({
                        ...currentPage,
                        slug: e.target.value
                      })}
                      className="text-sm text-gray-600 border-none p-0 focus:ring-0 mt-1"
                      placeholder="page-slug"
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      currentPage.isPublished 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {currentPage.isPublished ? 'Published' : 'Draft'}
                    </span>
                    <Button
                      variant={currentPage.isPublished ? 'outline' : 'primary'}
                      size="sm"
                      onClick={() => setCurrentPage({
                        ...currentPage,
                        isPublished: !currentPage.isPublished
                      })}
                    >
                      {currentPage.isPublished ? 'Unpublish' : 'Publish'}
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Page Sections */}
              <div className="space-y-6">
                {currentPage.sections.length === 0 ? (
                  <Card className="p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No Sections Yet
                    </h3>
                    <p className="text-gray-600">
                      Add sections from the sidebar to start building your page
                    </p>
                  </Card>
                ) : (
                  currentPage.sections
                    .sort((a, b) => a.order - b.order)
                    .map((section) => (
                      <SectionEditor
                        key={section.id}
                        section={section}
                        locale={locale}
                        previewMode={previewMode}
                        onUpdate={(updates) => updateSection(section.id, updates)}
                        onDelete={() => deleteSection(section.id)}
                        onMoveUp={() => moveSectionUp(section.id)}
                        onMoveDown={() => moveSectionDown(section.id)}
                        canMoveUp={section.order > 0}
                        canMoveDown={section.order < currentPage.sections.length - 1}
                      />
                    ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Section Editor Component
interface SectionEditorProps {
  section: PageSection;
  locale: string;
  previewMode: boolean;
  onUpdate: (updates: Partial<PageSection>) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

function SectionEditor({
  section,
  locale,
  previewMode,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown
}: SectionEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingContent, setEditingContent] = useState(section.content[locale] || {});

  const saveContent = () => {
    onUpdate({
      content: {
        ...section.content,
        [locale]: editingContent
      }
    });
    setIsEditing(false);
  };

  if (previewMode) {
    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <SectionPreview section={section} locale={locale} />
      </div>
    );
  }

  return (
    <Card className="p-6">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {section.title}
          </h3>
          <p className="text-sm text-gray-600 capitalize">
            {section.sectionType}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onMoveUp}
            disabled={!canMoveUp}
          >
            ↑
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onMoveDown}
            disabled={!canMoveDown}
          >
            ↓
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
            className="text-red-600 hover:text-red-700"
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Section Content */}
      {isEditing ? (
        <div className="space-y-4">
          {/* Content Editor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heading
              </label>
              <Input
                value={editingContent.heading || ''}
                onChange={(e) => setEditingContent({
                  ...editingContent,
                  heading: e.target.value
                })}
                placeholder="Section heading"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subheading
              </label>
              <Input
                value={editingContent.subheading || ''}
                onChange={(e) => setEditingContent({
                  ...editingContent,
                  subheading: e.target.value
                })}
                placeholder="Section subheading"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text Content
            </label>
            <textarea
              value={editingContent.text || ''}
              onChange={(e) => setEditingContent({
                ...editingContent,
                text: e.target.value
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Section text content"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={saveContent}>
              Save Changes
            </Button>
          </div>
        </div>
      ) : (
        <SectionPreview section={section} locale={locale} />
      )}
    </Card>
  );
}

// Section Preview Component
function SectionPreview({ section, locale }: { section: PageSection; locale: string }) {
  const content = section.content[locale] || section.content.en || {};

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      {content.heading && (
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {content.heading}
        </h2>
      )}
      {content.subheading && (
        <h3 className="text-lg text-gray-600 mb-4">
          {content.subheading}
        </h3>
      )}
      {content.text && (
        <p className="text-gray-700 mb-4">
          {content.text}
        </p>
      )}
      {content.buttonText && (
        <Button variant="primary">
          {content.buttonText}
        </Button>
      )}
      {content.items && content.items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {content.items.slice(0, 3).map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border">
              {item.title && (
                <h4 className="font-semibold text-gray-900 mb-2">
                  {item.title}
                </h4>
              )}
              {item.description && (
                <p className="text-gray-600 text-sm mb-2">
                  {item.description}
                </p>
              )}
              {item.price && (
                <span className="font-bold text-green-600">
                  {item.price}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}