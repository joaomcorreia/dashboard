'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { 
  ArrowDownTrayIcon,
  TrashIcon,
  TagIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

interface LibraryItem {
  id: string;
  name: string;
  target: 'DJANGO' | 'NEXTJS';
  zip_file: string;
  created_at: string;
}

interface LibraryListProps {
  items: LibraryItem[];
}

const TargetBadge = ({ target }: { target: 'DJANGO' | 'NEXTJS' }) => {
  const variants = {
    DJANGO: { color: 'bg-green-100 text-green-800', label: 'Django' },
    NEXTJS: { color: 'bg-blue-100 text-blue-800', label: 'Next.js' },
  };

  const variant = variants[target];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variant.color}`}>
      <TagIcon className="w-3 h-3 mr-1" />
      {variant.label}
    </span>
  );
};

export default function LibraryList({ items }: LibraryListProps) {
  const [filter, setFilter] = useState<'ALL' | 'DJANGO' | 'NEXTJS'>('ALL');

  const filteredItems = items.filter(item => 
    filter === 'ALL' || item.target === filter
  );

  const handleDownload = (item: LibraryItem) => {
    // Create download link
    const link = document.createElement('a');
    link.href = item.zip_file;
    link.download = `${item.name.replace(/\s+/g, '_').toLowerCase()}_${item.target.toLowerCase()}_template.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <TagIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-lg font-medium">No templates in library</p>
        <p className="text-sm">Convert some uploads to start building your template library!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {[
            { key: 'ALL', label: 'All Templates', count: items.length },
            { key: 'DJANGO', label: 'Django', count: items.filter(i => i.target === 'DJANGO').length },
            { key: 'NEXTJS', label: 'Next.js', count: items.filter(i => i.target === 'NEXTJS').length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as 'ALL' | 'DJANGO' | 'NEXTJS')}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                filter === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                  filter === tab.key
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Library Items */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No {filter.toLowerCase()} templates found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-medium text-gray-900 truncate">
                  {item.name}
                </h3>
                <TargetBadge target={item.target} />
              </div>

              <div className="flex items-center text-sm text-gray-500 mb-4">
                <CalendarIcon className="w-4 h-4 mr-1.5" />
                Added {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleDownload(item)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                  Download
                </button>

                <button
                  className="inline-flex items-center p-2 border border-transparent rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  title="Delete from library"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}