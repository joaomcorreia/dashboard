'use client';

import { useState } from 'react';
import { useCustomRouter } from '@/hooks/useCustomRouter';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function LoginForm() {
  const t = useTranslations();
  const router = useCustomRouter();
  const { login, isLoading, error, clearError } = useAuth();
  
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof LoginFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = field === 'rememberMe' ? e.target.checked : e.target.value;
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
    setTouched({ email: true, password: true });
    
    if (!validateForm()) {
      return;
    }

    try {
      await login(formData.email, formData.password);
      
      // Redirect based on user role will be handled by the auth context
      // For now, redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      // Error is handled by the auth context
      console.error('Login failed:', err);
    }
  };

  const getFieldError = (field: keyof FormErrors) => {
    return touched[field] ? errors[field] : undefined;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Loading message="Signing in..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Just Code Works
          </h1>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link 
            href="/register" 
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            create a new account
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
                placeholder="Enter your password"
                disabled={isLoading}
                required
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleInputChange('rememberMe')}
                    disabled={isLoading}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link 
                    href="/forgot-password" 
                    className="font-medium text-primary-600 hover:text-primary-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}