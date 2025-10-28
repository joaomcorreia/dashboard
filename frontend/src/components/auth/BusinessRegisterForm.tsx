'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { apiClient } from '@/lib/api';

interface RegistrationFormData {
  username: string;
  email: string;
  password: string;
  business_name: string;
  business_type: string;
  preferred_domain: string;
  address: string;
  phone: string;
}

interface FormErrors {
  [key: string]: string;
}

interface DomainCheck {
  available: boolean;
  domain: string;
}

export default function BusinessRegisterForm() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';
  
  const [formData, setFormData] = useState<RegistrationFormData>({
    username: '',
    email: '',
    password: '',
    business_name: '',
    business_type: 'services',
    preferred_domain: '',
    address: '',
    phone: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [domainCheckResult, setDomainCheckResult] = useState<DomainCheck | null>(null);
  const [isCheckingDomain, setIsCheckingDomain] = useState(false);
  const [showVerificationScreen, setShowVerificationScreen] = useState(false);

  const businessTypes = [
    { value: 'restaurant', label: 'Restaurant & Food' },
    { value: 'retail', label: 'Retail & Commerce' },
    { value: 'services', label: 'Professional Services' },
    { value: 'healthcare', label: 'Healthcare & Medical' },
    { value: 'professional', label: 'Corporate & Business' },
    { value: 'education', label: 'Education & Training' },
  ];

  const handleInputChange = (field: keyof RegistrationFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const checkDomainAvailability = async () => {
    if (!formData.preferred_domain.trim()) {
      setErrors(prev => ({ ...prev, preferred_domain: 'Please enter a domain name' }));
      return;
    }

    setIsCheckingDomain(true);
    try {
      const result = await apiClient.checkDomain(formData.preferred_domain);
      setDomainCheckResult(result);
      
      if (!result.available) {
        setErrors(prev => ({ ...prev, preferred_domain: 'Domain is not available' }));
      } else {
        setErrors(prev => ({ ...prev, preferred_domain: '' }));
      }
    } catch (error) {
      console.error('Domain check failed:', error);
      setErrors(prev => ({ ...prev, preferred_domain: 'Failed to check domain availability' }));
    } finally {
      setIsCheckingDomain(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (!formData.business_name.trim()) newErrors.business_name = 'Business name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const result = await apiClient.registerWithBusiness({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        business_name: formData.business_name,
        business_type: formData.business_type,
        preferred_domain: formData.preferred_domain,
        address: formData.address,
        phone: formData.phone,
      });

      if (result.require_email_verification) {
        setShowVerificationScreen(true);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDevVerify = async () => {
    try {
      await apiClient.verifyEmail();
      router.push(`/${currentLocale}/onboarding/onepage`);
    } catch (error) {
      console.error('Email verification failed:', error);
    }
  };

  if (showVerificationScreen) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Logo variant="auth" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Check your email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We've sent you a verification email. Please check your inbox and click the verification link.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <Card>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Development Mode:</strong> Click the button below to simulate email verification.
                  </p>
                </div>
                
                <Button 
                  onClick={handleDevVerify}
                  variant="primary"
                  className="w-full"
                >
                  DEV: Verify Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Logo variant="auth" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Create your business account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Get started with your one-page website builder
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange('username')}
                  error={errors.username}
                  disabled={isLoading}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  error={errors.email}
                  disabled={isLoading}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  error={errors.password}
                  disabled={isLoading}
                  required
                />
              </div>

              {/* Business Name */}
              <div>
                <label htmlFor="business_name" className="block text-sm font-medium text-gray-700">
                  Business Name
                </label>
                <Input
                  id="business_name"
                  type="text"
                  value={formData.business_name}
                  onChange={handleInputChange('business_name')}
                  error={errors.business_name}
                  disabled={isLoading}
                  required
                />
              </div>

              {/* Business Type */}
              <div>
                <label htmlFor="business_type" className="block text-sm font-medium text-gray-700">
                  Business Type
                </label>
                <select
                  id="business_type"
                  value={formData.business_type}
                  onChange={handleInputChange('business_type')}
                  disabled={isLoading}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  {businessTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Domain */}
              <div>
                <label htmlFor="preferred_domain" className="block text-sm font-medium text-gray-700">
                  Preferred Domain (Optional)
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <Input
                    id="preferred_domain"
                    type="text"
                    value={formData.preferred_domain}
                    onChange={handleInputChange('preferred_domain')}
                    error={errors.preferred_domain}
                    disabled={isLoading}
                    placeholder="yourbusiness.com"
                    className="rounded-r-none"
                  />
                  <Button
                    type="button"
                    onClick={checkDomainAvailability}
                    disabled={isLoading || isCheckingDomain || !formData.preferred_domain.trim()}
                    variant="outline"
                    className="rounded-l-none border-l-0"
                  >
                    {isCheckingDomain ? 'Checking...' : 'Check'}
                  </Button>
                </div>
                {domainCheckResult && domainCheckResult.available && (
                  <p className="mt-1 text-sm text-green-600">
                    ✓ {domainCheckResult.domain} is available!
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Business Address (Optional)
                </label>
                <textarea
                  id="address"
                  value={formData.address}
                  onChange={handleInputChange('address')}
                  disabled={isLoading}
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="123 Business St, City, State 12345"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number (Optional)
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange('phone')}
                  error={errors.phone}
                  disabled={isLoading}
                  placeholder="(555) 123-4567"
                />
              </div>

              {/* General Error */}
              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <p className="text-sm text-red-800">{errors.general}</p>
                </div>
              )}

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={isLoading}
                variant="primary"
                className="w-full"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
 d i n s d a g   2 8   o k t o b e r   2 0 2 5   1 4 : 3 5 : 5 0  
  
  
 