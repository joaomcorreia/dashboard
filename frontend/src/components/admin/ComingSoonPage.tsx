'use client';

import React from 'react';
import { Construction, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ComingSoonPageProps {
  title: string;
  description: string;
  features?: string[];
}

export default function ComingSoonPage({ 
  title = "Coming Soon", 
  description = "This feature is currently under development.",
  features = []
}: ComingSoonPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
        <Construction className="w-12 h-12 text-blue-600" />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-md">{description}</p>
      
      {features.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8 max-w-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Planned Features</h3>
          <ul className="text-left space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-700">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <Link 
        href="/admin"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>
    </div>
  );
}