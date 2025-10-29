'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function SimpleTestRegisterForm() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    business_name: '',
    business_type: 'restaurant',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult('');
    
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE}/auth/register/`;
      console.log('API URL:', apiUrl);
      console.log('API Base:', process.env.NEXT_PUBLIC_API_BASE);
      console.log('Form Data:', formData);
      
      const requestBody = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        business_name: formData.business_name,
        business_type: formData.business_type,
      };
      console.log('Request Body:', requestBody);
      console.log('Request Body JSON:', JSON.stringify(requestBody));
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(`Success! User ID: ${data.user_id}, Email verification required: ${data.require_email_verification}`);
        
        // Redirect to onboarding after successful registration
        setTimeout(() => {
          router.push(`/${currentLocale}/onboarding`);
        }, 2000);
      } else {
        const errorText = await response.text();
        setResult(`Error ${response.status}: ${errorText}`);
      }
    } catch (error) {
      setResult(`Network error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testDomainCheck = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/domain/check/?name=test123.com`);
      const data = await response.json();
      setResult(`Domain check: ${data.domain} is ${data.available ? 'available' : 'not available'}`);
    } catch (error) {
      setResult(`Domain check error: ${error}`);
    }
  };

  const testApiConnectivity = async () => {
    try {
      console.log('Testing API connectivity...');
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE}/auth/register/`;
      console.log('Testing URL:', apiUrl);
      
      const requestBody = {
        username: formData.username || 'testuser',
        email: formData.email || 'test@example.com',
        password: formData.password || 'testpassword123',
        business_name: formData.business_name || 'Test Business',
        business_type: formData.business_type || 'restaurant',
      };
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      const responseText = await response.text();
      console.log('Response text:', responseText);
      setResult(`API Test Response: ${response.status} - ${responseText}`);
    } catch (error) {
      console.error('API Test Error:', error);
      setResult(`API Test Error: ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Test Registration
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          API Base: {process.env.NEXT_PUBLIC_API_BASE}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="business_name" className="block text-sm font-medium text-gray-700">
                Business Name
              </label>
              <input
                id="business_name"
                type="text"
                value={formData.business_name}
                onChange={(e) => setFormData(prev => ({ ...prev, business_name: e.target.value }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? 'Registering...' : 'Register'}
              </button>
              
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={testDomainCheck}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                >
                  Test Domain
                </button>
                
                <button
                  type="button"
                  onClick={testApiConnectivity}
                  className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
                >
                  Test API
                </button>
              </div>
            </div>
          </form>

          {result && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <pre className="text-sm whitespace-pre-wrap">{result}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}