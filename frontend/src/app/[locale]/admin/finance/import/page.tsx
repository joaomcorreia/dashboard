'use client';

import React, { useState } from 'react';
import { ArrowLeft, Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { importExpensesCSV } from '../../../../../lib/financeApi';

interface ImportResult {
  message: string;
  created_count: number;
  skipped_count: number;
  errors: string[];
}

const ImportPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null); // Clear previous results
    }
  };

  const handleImport = async () => {
    if (!file) return;

    setLoading(true);
    try {
      const importResult = await importExpensesCSV(file);
      setResult(importResult);
    } catch (error) {
      console.error('Import error:', error);
      setResult({
        message: 'Import failed',
        created_count: 0,
        skipped_count: 0,
        errors: ['Failed to import CSV. Please check the file format and try again.']
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <button
              onClick={() => window.location.href = '/admin/finance'}
              className="mr-4 p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Import Expenses</h1>
              <p className="text-gray-600">Import expenses from CSV file</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* CSV Format Guide */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">CSV Format Requirements</h3>
          <p className="text-blue-800 mb-4">Your CSV file should contain the following columns (case-insensitive):</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong className="text-blue-900">Required columns:</strong>
              <ul className="list-disc list-inside text-blue-800 mt-1">
                <li>date (YYYY-MM-DD or DD/MM/YYYY)</li>
                <li>description</li>
                <li>amount (decimal)</li>
                <li>vendor</li>
                <li>category</li>
              </ul>
            </div>
            <div>
              <strong className="text-blue-900">Optional columns:</strong>
              <ul className="list-disc list-inside text-blue-800 mt-1">
                <li>payment_method</li>
                <li>paid_date (YYYY-MM-DD or DD/MM/YYYY)</li>
                <li>note</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-100 rounded text-blue-800 text-sm">
            <strong>Example row:</strong><br />
            2024-10-28, Office supplies, 45.50, Office Depot, Supplies, Credit Card, 2024-10-28, Monthly office supplies
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload CSV File</h3>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
                id="csv-upload"
              />
              <label
                htmlFor="csv-upload"
                className="cursor-pointer"
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  {file ? file.name : 'Choose CSV file'}
                </p>
                <p className="text-gray-600">
                  Click to browse or drag and drop your CSV file here
                </p>
              </label>
            </div>

            {file && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleImport}
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Importing...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>Import Expenses</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="mt-8 bg-white rounded-lg shadow-sm border">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Import Results</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span className="font-medium text-green-900">Created</span>
                  </div>
                  <p className="text-2xl font-bold text-green-900 mt-1">{result.created_count}</p>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                    <span className="font-medium text-yellow-900">Skipped</span>
                  </div>
                  <p className="text-2xl font-bold text-yellow-900 mt-1">{result.skipped_count}</p>
                </div>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-gray-600 mr-2" />
                    <span className="font-medium text-gray-900">Total</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{result.created_count + result.skipped_count}</p>
                </div>
              </div>

              {result.errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-medium text-red-900 mb-2">Errors:</h4>
                  <ul className="list-disc list-inside text-red-800 text-sm space-y-1">
                    {result.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => window.location.href = '/admin/finance'}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Back to Finance Dashboard
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportPage;