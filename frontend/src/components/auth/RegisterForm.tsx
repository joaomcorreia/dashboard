'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import { Logo } from '@/components/ui/Logo';

interface RegisterFormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreedToTerms: boolean;
}

interface FormErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreedToTerms?: string;
  general?: string;
}

export default function RegisterForm() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';
  const { register, isLoading, error, clearError } = useAuth();
  
  const [formData, setFormData] = useState<RegisterFormData>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false,
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof RegisterFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = field === 'agreedToTerms' ? e.target.checked : e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    
    // Clear general auth error
    if (error) {
      clearError();
    }
  };

  const handleBlur = (field: string) => () => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      first_name: true,
      last_name: true,
      email: true,
      password: true,
      confirmPassword: true,
      agreedToTerms: true,
    });
    
    if (!validateForm()) {
      return;
    }

    try {
      await register({
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email,
        password: formData.password,
      });
      
      // Registration successful, redirect to dashboard
      router.push(`/${currentLocale}/dashboard`);
    } catch (err) {
      // Error is handled by the auth context
      console.error('Registration failed:', err);
    }
  };

  const getFieldError = (field: keyof FormErrors) => {
    return touched[field] ? errors[field] : undefined;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Loading message="Creating account..." />
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
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link 
            href={`/${currentLocale}/login`} 
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* General Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange('first_name')}
                  onBlur={handleBlur('first_name')}
                  error={getFieldError('first_name')}
                  placeholder="First name"
                  disabled={isLoading}
                  required
                />

                <Input
                  label="Last Name"
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange('last_name')}
                  onBlur={handleBlur('last_name')}
                  error={getFieldError('last_name')}
                  placeholder="Last name"
                  disabled={isLoading}
                  required
                />
              </div>

              <Input
                label="Email address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                onBlur={handleBlur('email')}
                error={getFieldError('email')}
                placeholder="Enter your email"
                disabled={isLoading}
                required
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange('password')}
                onBlur={handleBlur('password')}
                error={getFieldError('password')}
                placeholder="Create a password"
                disabled={isLoading}
                required
              />

              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                error={getFieldError('confirmPassword')}
                placeholder="Confirm your password"
                disabled={isLoading}
                required
              />

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="agree-terms"
                    name="agree-terms"
                    type="checkbox"
                    checked={formData.agreedToTerms}
                    onChange={handleInputChange('agreedToTerms')}
                    disabled={isLoading}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agree-terms" className="text-gray-700">
                    I agree to the{' '}
                    <Link href={`/${currentLocale}/terms`} className="text-primary-600 hover:text-primary-500">
                      Terms and Conditions
                    </Link>
                    {' '}and{' '}
                    <Link href={`/${currentLocale}/privacy`} className="text-primary-600 hover:text-primary-500">
                      Privacy Policy
                    </Link>
                  </label>
                  {getFieldError('agreedToTerms') && (
                    <p className="mt-1 text-sm text-red-600">{getFieldError('agreedToTerms')}</p>
                  )}
                </div>
              </div>

              <div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating account...' : 'Create account'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}