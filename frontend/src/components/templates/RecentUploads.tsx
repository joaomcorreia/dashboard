'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { 
  ArrowDownTrayIcon,
  EyeIcon,
  PlayIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

interface TemplateUpload {
  id: string;
  title: string;
  image: string;
  status: 'PENDING' | 'READY' | 'FAILED';
  created_at: string;
  notes: string;
}

interface ConversionJob {
  id: string;
  upload: string;
  upload_title: string;
  target: 'DJANGO' | 'NEXTJS';
  status: 'QUEUED' | 'RUNNING' | 'SUCCESS' | 'ERROR';
  log: string;
  zip_file: string | null;
  created_at: string;
  updated_at: string;
}

interface RecentUploadsProps {
  uploads: TemplateUpload[];
  jobs: ConversionJob[];
  onConvert: (uploadId: string, target: 'DJANGO' | 'NEXTJS') => void;
  onAddToLibrary: (jobId: string, name: string) => void;
  onDelete?: (uploadId: string) => void;
}

const StatusBadge = ({ status }: { status: string }) => {
  const variants = {
    PENDING: { color: 'bg-yellow-100 text-yellow-800', icon: ClockIcon },
    READY: { color: 'bg-green-100 text-green-800', icon: CheckCircleIcon },
    FAILED: { color: 'bg-red-100 text-red-800', icon: XCircleIcon },
    QUEUED: { color: 'bg-blue-100 text-blue-800', icon: ClockIcon },
    RUNNING: { color: 'bg-blue-100 text-blue-800', icon: PlayIcon },
    SUCCESS: { color: 'bg-green-100 text-green-800', icon: CheckCircleIcon },
    ERROR: { color: 'bg-red-100 text-red-800', icon: XCircleIcon },
  };

  const variant = variants[status as keyof typeof variants] || variants.PENDING;
  const Icon = variant.icon;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variant.color}`}>
      <Icon className="w-3 h-3 mr-1" />
      {status}
    </span>
  );
};

const ConversionCard = ({ 
  job, 
  onAddToLibrary 
}: { 
  job: ConversionJob;
  onAddToLibrary: (jobId: string, name: string) => void;
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [libraryName, setLibraryName] = useState('');

  const handleAddToLibrary = () => {
    if (libraryName.trim()) {
      onAddToLibrary(job.id, libraryName.trim());
      setLibraryName('');
      setShowAddForm(false);
    }
  };

  const handleDownload = () => {
    if (job.zip_file) {
      // Create download link with full URL - use Django base URL (without /api) for media files
      const djangoBase = process.env.DJANGO_API_URL || 'http://127.0.0.1:8000';
      const fullUrl = job.zip_file.startsWith('http') ? job.zip_file : djangoBase + job.zip_file;
      const link = document.createElement('a');
      link.href = fullUrl;
      link.download = `${job.upload_title}_${job.target.toLowerCase()}_template.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 mt-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-900">
            {job.target} Template
          </span>
          <StatusBadge status={job.status} />
        </div>
        <span className="text-xs text-gray-500">
          {formatDistanceToNow(new Date(job.updated_at), { addSuffix: true })}
        </span>
      </div>

      {job.status === 'SUCCESS' && job.zip_file && (
        <div className="flex items-center space-x-2 mt-3">
          <button
            onClick={handleDownload}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowDownTrayIcon className="w-3 h-3 mr-1" />
            Download
          </button>
          
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200"
            >
              Add to Library
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={libraryName}
                onChange={(e) => setLibraryName(e.target.value)}
                placeholder="Library name..."
                className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                onClick={handleAddToLibrary}
                disabled={!libraryName.trim()}
                className="px-2 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setLibraryName('');
                }}
                className="px-2 py-1 text-xs font-medium text-gray-600 hover:text-gray-700"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}

      {job.status === 'ERROR' && job.log && (
        <div className="mt-2 p-2 bg-red-50 rounded text-xs text-red-700">
          <p className="font-medium">Error:</p>
          <p>{job.log}</p>
        </div>
      )}
    </div>
  );
};

export default function RecentUploads({ uploads, jobs, onConvert, onAddToLibrary, onDelete }: RecentUploadsProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [deletingUpload, setDeletingUpload] = useState<string | null>(null);

  // Helper function to get full image URL
  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith('http')) {
      return imagePath; // Already a full URL
    }
    // Use Django base URL (without /api) for media files
    const djangoBase = process.env.DJANGO_API_URL || 'http://127.0.0.1:8000';
    return djangoBase + imagePath;
  };

  const handleDelete = async (uploadId: string, uploadTitle: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${uploadTitle}"? This action cannot be undone.`
    );
    
    if (confirmed && onDelete) {
      setDeletingUpload(uploadId);
      try {
        await onDelete(uploadId);
      } catch (error) {
        console.error('Error deleting upload:', error);
        alert('Failed to delete upload. Please try again.');
      } finally {
        setDeletingUpload(null);
      }
    }
  };

  if (uploads.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No uploads yet. Upload your first screenshot to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {uploads.map((upload) => {
        const uploadJobs = jobs.filter(job => job.upload === upload.id);
        
        return (
          <div key={upload.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start space-x-4">
              {/* Thumbnail */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    src={getImageUrl(upload.image)}
                    alt={upload.title}
                    className="w-44 h-28 object-cover rounded-lg cursor-pointer hover:opacity-80"
                    onClick={() => setPreviewImage(getImageUrl(upload.image))}
                  />
                  <button
                    onClick={() => setPreviewImage(getImageUrl(upload.image))}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 rounded-lg transition-opacity"
                  >
                    <EyeIcon className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-900 truncate">
                    {upload.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <StatusBadge status={upload.status} />
                    <span className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(upload.created_at), { addSuffix: true })}
                    </span>
                    {onDelete && (
                      <button
                        onClick={() => handleDelete(upload.id, upload.title)}
                        disabled={deletingUpload === upload.id}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                        title="Delete upload"
                      >
                        {deletingUpload === upload.id ? (
                          <div className="w-4 h-4 animate-spin rounded-full border-2 border-gray-300 border-t-red-600"></div>
                        ) : (
                          <TrashIcon className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {upload.notes && (
                  <p className="text-sm text-gray-600 mb-3">{upload.notes}</p>
                )}

                {/* Convert Buttons */}
                {upload.status === 'READY' && (
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-sm text-gray-700">Convert to:</span>
                    <button
                      onClick={() => onConvert(upload.id, 'DJANGO')}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded text-white bg-green-600 hover:bg-green-700"
                    >
                      Django Template
                    </button>
                    <button
                      onClick={() => onConvert(upload.id, 'NEXTJS')}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Next.js Component
                    </button>
                  </div>
                )}

                {/* Conversion Jobs */}
                {uploadJobs.length > 0 && (
                  <div className="space-y-2">
                    {uploadJobs.map((job) => (
                      <ConversionCard
                        key={job.id}
                        job={job}
                        onAddToLibrary={onAddToLibrary}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Image Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <div className="max-w-4xl max-h-full p-4">
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}