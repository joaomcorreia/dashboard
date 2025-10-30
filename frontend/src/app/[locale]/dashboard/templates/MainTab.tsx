'use client';

import { useState, useEffect } from 'react';
import UploadDropzone from '@/components/templates/UploadDropzone';
import RecentUploads from '@/components/templates/RecentUploads';
import LibraryList from '@/components/templates/LibraryList';
import * as api from '@/lib/api';

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

interface LibraryItem {
  id: string;
  name: string;
  target: 'DJANGO' | 'NEXTJS';
  zip_file: string;
  created_at: string;
}

export default function MainTab() {
  const [uploads, setUploads] = useState<TemplateUpload[]>([]);
  const [jobs, setJobs] = useState<ConversionJob[]>([]);
  const [library, setLibrary] = useState<LibraryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [uploadsData, jobsData, libraryData] = await Promise.all([
        api.listUploads(),
        api.listJobs(),
        api.listLibrary(),
      ]);
      
      setUploads(uploadsData);
      setJobs(jobsData);
      setLibrary(libraryData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadComplete = () => {
    loadData();
  };

  const handleConvert = async (uploadId: string, target: 'DJANGO' | 'NEXTJS') => {
    try {
      console.log('Converting upload:', uploadId, 'to target:', target);
      await api.createJob(uploadId, target);
      loadData();
    } catch (error) {
      console.error('Error creating conversion job:', error);
      // Show user-friendly error message
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to create ${target} component: ${errorMessage}`);
    }
  };

  const handleAddToLibrary = async (jobId: string, name: string) => {
    try {
      await api.addToLibrary(jobId, name);
      loadData();
    } catch (error) {
      console.error('Error adding to library:', error);
    }
  };

  const handleDelete = async (uploadId: string) => {
    try {
      await api.deleteUpload(uploadId);
      loadData();
    } catch (error) {
      console.error('Error deleting upload:', error);
      throw error; // Re-throw to let RecentUploads handle the error display
    }
  };

  const handleDeleteLibraryItem = (itemId: string) => {
    // Remove item from local state immediately for better UX
    setLibrary(prev => prev.filter(item => item.id !== itemId));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Upload Screenshots
        </h2>
        <UploadDropzone onUploadComplete={handleUploadComplete} />
      </section>

      {/* Recent Uploads */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Recent Uploads
        </h2>
        <RecentUploads 
          uploads={uploads}
          jobs={jobs}
          onConvert={handleConvert}
          onAddToLibrary={handleAddToLibrary}
          onDelete={handleDelete}
        />
      </section>

      {/* Library */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Template Library
        </h2>
        <LibraryList items={library} onItemDeleted={handleDeleteLibraryItem} />
      </section>
    </div>
  );
}