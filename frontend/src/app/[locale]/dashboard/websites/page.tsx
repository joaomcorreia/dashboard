'use client';

import { useState, useEffect } from 'react';
import { Globe, Plus, Edit, Eye, Trash2, MoreHorizontal, ExternalLink, X, Settings, Save } from 'lucide-react';

interface Website {
  id: number;
  name: string;
  domain: string;
  status: 'published' | 'draft' | 'maintenance';
  lastUpdated: string;
  pageViews: number;
  thumbnail: string;
  previewUrl?: string;
}

export default function WebsitePage() {
  const [showDropdown, setShowDropdown] = useState<number | null>(null);
  const [selectedWebsite, setSelectedWebsite] = useState<Website | null>(null);
  const [showUrlConfig, setShowUrlConfig] = useState(false);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);
  const [websiteUrls, setWebsiteUrls] = useState<{[key: number]: string}>({});

  // Fetch websites from API
  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        console.log('Fetching websites from API...');
        const response = await fetch('/api/websites');
        const data = await response.json();
        console.log('API response:', data);
        
        if (data.success) {
          // Transform API data to match our Website interface
          const transformedWebsites = data.websites.map((website: any) => ({
            id: website.id,
            name: website.name,
            domain: website.domain,
            status: website.status,
            lastUpdated: website.lastUpdated,
            pageViews: website.pageViews,
            thumbnail: website.thumbnail,
            previewUrl: website.previewUrl
          }));
          
          console.log('Transformed websites:', transformedWebsites);
          setWebsites(transformedWebsites);
          
          // Set up preview URLs
          const urls: {[key: number]: string} = {};
          transformedWebsites.forEach((website: any) => {
            if (website.previewUrl) {
              urls[website.id] = website.previewUrl;
            }
          });
          setWebsiteUrls(urls);
        }
      } catch (error) {
        console.error('Error fetching websites:', error);
        // Fallback to mock data if API fails
        const mockWebsites: Website[] = [
          {
            id: 1,
            name: 'My Business Website',
            domain: 'my-business.com',
            status: 'published',
            lastUpdated: 'Just created',
            pageViews: 0,
            thumbnail: '/api/placeholder/300/200'
          }
        ];
        setWebsites(mockWebsites);
        setWebsiteUrls({
          1: 'data:text/html;charset=utf-8,%3C!DOCTYPE%20html%3E%3Chtml%3E%3Chead%3E%3Ctitle%3EMy%20Business%3C/title%3E%3C/head%3E%3Cbody%3E%3Ch1%3EWelcome%20to%20My%20Business%3C/h1%3E%3Cp%3EYour%20website%20is%20being%20generated...%3C/p%3E%3C/body%3E%3C/html%3E'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWebsites();
  }, []);

  // Set the first published website as default selected on page load
  useEffect(() => {
    if (websites.length > 0) {
      const firstPublished = websites.find(site => site.status === 'published');
      if (firstPublished && !selectedWebsite) {
        setSelectedWebsite(firstPublished);
      }
    }
  }, [websites, selectedWebsite]);

  const handleUrlUpdate = (websiteId: number, newUrl: string) => {
    setWebsiteUrls(prev => ({
      ...prev,
      [websiteId]: newUrl
    }));
  };

  const getCurrentUrl = (websiteId: number) => {
    const website = websites.find(w => w.id === websiteId);
    return websiteUrls[websiteId] || website?.previewUrl || 'data:text/html;charset=utf-8,%3Ch1%3EWebsite%20Preview%20Not%20Available%3C/h1%3E';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'maintenance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEdit = (id: number) => {
    console.log('Edit website:', id);
    setShowDropdown(null);
  };

  const handlePreview = (id: number) => {
    console.log('Preview website:', id);
    setShowDropdown(null);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this website?')) {
      console.log('Delete website:', id);
      setShowDropdown(null);
    }
  };

  const handleDuplicate = (id: number) => {
    console.log('Duplicate website:', id);
    setShowDropdown(null);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your websites...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Website</h1>
            <p className="mt-2 text-gray-600">Manage and create your website here.</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowUrlConfig(!showUrlConfig)}
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Settings className="w-4 h-4 mr-2" />
              Configure URLs
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Create New Website
            </button>
          </div>
        </div>

        {/* URL Configuration Panel */}
        {showUrlConfig && (
          <div className="mb-8 bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Website URL Configuration</h3>
            <p className="text-sm text-gray-600 mb-4">Configure real URLs for your websites to preview them in the iframe below.</p>
            
            <div className="space-y-4">
              {websites.map((website) => (
                <div key={website.id} className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-32">
                    <label className="text-sm font-medium text-gray-700">{website.name}:</label>
                  </div>
                  <div className="flex-1">
                    <input
                      type="url"
                      value={getCurrentUrl(website.id)}
                      onChange={(e) => handleUrlUpdate(website.id, e.target.value)}
                      placeholder="https://example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(website.status)}`}>
                      {website.status.charAt(0).toUpperCase() + website.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowUrlConfig(false)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Configuration
              </button>
            </div>
          </div>
        )}

        {/* No websites message */}
        {websites.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center mb-8">
            <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Websites Yet</h3>
            <p className="text-gray-600 mb-6">
              You haven't created any websites yet. Start building your first website now!
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto">
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Website
            </button>
          </div>
        )}

        {/* Stats */}
        {websites.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <Globe className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Websites</p>
                <p className="text-2xl font-bold text-gray-900">{websites.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <Eye className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">
                  {websites.reduce((sum, site) => sum + site.pageViews, 0)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Published</p>
                <p className="text-2xl font-bold text-gray-900">
                  {websites.filter(site => site.status === 'published').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Drafts</p>
                <p className="text-2xl font-bold text-gray-900">
                  {websites.filter(site => site.status === 'draft').length}
                </p>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Plan Card */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                Active
              </span>
            </div>
            <div className="space-y-4">
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                defaultValue="starter"
              >
                <option value="basic">Basic</option>
                <option value="starter">Starter</option>
                <option value="premium">Premium</option>
                <option value="pro">Pro</option>
                <option value="custom">Custom</option>
              </select>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Next billing: Dec 29, 2025</span>
                <span className="text-green-600 font-medium">$29/month</span>
              </div>
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Websites: 3/5</span>
                  <span>Storage: 2.1GB/10GB</span>
                </div>
              </div>
            </div>
          </div>

          {/* Services Expiring Soon Card */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Services Expiring Soon</h3>
              <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">
                2 expiring
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">SSL Certificate</p>
                  <p className="text-xs text-gray-500">mydomain.com</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-orange-600 font-medium">5 days</p>
                  <p className="text-xs text-gray-500">Nov 3, 2025</p>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">Domain Registration</p>
                  <p className="text-xs text-gray-500">example.com</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-orange-600 font-medium">12 days</p>
                  <p className="text-xs text-gray-500">Nov 10, 2025</p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View all services →
              </button>
            </div>
          </div>

          {/* Placeholder for future cards */}
          <div className="hidden md:block"></div>
          <div className="hidden md:block"></div>
        </div>

        {/* Website Preview Section - Always Visible */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Website Preview</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedWebsite ? (
                    <>Previewing: <span className="font-medium">{selectedWebsite.name}</span> ({selectedWebsite.domain})</>
                  ) : (
                    'Select a website below to preview it here'
                  )}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {selectedWebsite && (
                  <>
                    <select
                      value={selectedWebsite.id}
                      onChange={(e) => {
                        const website = websites.find(w => w.id === parseInt(e.target.value));
                        setSelectedWebsite(website || null);
                      }}
                      className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {websites.map((website) => (
                        <option key={website.id} value={website.id}>
                          {website.name}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => window.open(getCurrentUrl(selectedWebsite.id), '_blank')}
                      className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Open in New Tab
                    </button>
                    <button
                      onClick={() => handleEdit(selectedWebsite.id)}
                      className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit Website
                    </button>
                    <button
                      onClick={() => setSelectedWebsite(null)}
                      className="text-gray-400 hover:text-gray-600 p-2"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="bg-gray-100 rounded-lg overflow-hidden" style={{ height: '600px' }}>
              {selectedWebsite && selectedWebsite.status === 'published' ? (
                <iframe
                  src={getCurrentUrl(selectedWebsite.id)}
                  className="w-full h-full border-0"
                  title={`Preview of ${selectedWebsite.name}`}
                  onError={() => console.log('Error loading website preview')}
                />
              ) : selectedWebsite && selectedWebsite.status !== 'published' ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Preview Not Available</h4>
                    <p className="text-gray-500 mb-4">
                      This website is currently in {selectedWebsite.status} status and cannot be previewed.
                    </p>
                    <button
                      onClick={() => handleEdit(selectedWebsite.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Edit Website
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Select a Website to Preview</h4>
                    <p className="text-gray-500 mb-4">
                      Click the Preview button on any website below to preview it here.
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            {selectedWebsite && (
              <div className="mt-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Last updated: {selectedWebsite.lastUpdated}</span>
                  <span>•</span>
                  <span>{selectedWebsite.pageViews.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} views</span>
                  <span>•</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedWebsite.status)}`}>
                    {selectedWebsite.status.charAt(0).toUpperCase() + selectedWebsite.status.slice(1)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowDropdown(null)}
        />
      )}
    </div>
  );
}