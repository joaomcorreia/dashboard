'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Printer
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromOrder = searchParams.get('from') === 'order';
  const prefilledEmail = searchParams.get('email');
  
  const [email, setEmail] = useState(prefilledEmail || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate login API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, accept any password that starts with 'temp_'
      if (password.startsWith('temp_') || password === 'demo123') {
        // Determine redirect based on email
        if (email === 'admin@test.com') {
          // Admin user - redirect to admin dashboard
          router.push('/en/admin');
        } else if (email === 'business@example.com') {
          // Business user - redirect to business dashboard
          router.push('/en/dashboard');
        } else {
          // Default to business dashboard for other users
          router.push('/en/dashboard');
        }
      } else {
        setError('Invalid credentials. Please check your email and password.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Printer className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">PrintStudio</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {fromOrder ? 'Access Your Dashboard' : 'Sign In'}
          </h1>
          <p className="text-gray-600">
            {fromOrder 
              ? 'Use the credentials from your order confirmation email' 
              : 'Enter your credentials to access your account'
            }
          </p>
        </div>

        {/* Welcome Message for New Orders */}
        {fromOrder && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-green-800 font-medium">Order Completed!</p>
                <p className="text-green-700 text-sm">Log in to track your order and manage your account.</p>
              </div>
            </div>
          </div>
        )}

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={fromOrder ? "Use your temporary password" : "Enter your password"}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {fromOrder && (
                <p className="text-xs text-gray-500 mt-1">
                  Find your temporary password in the order confirmation page
                </p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            {/* Demo Credentials Help */}
            {!fromOrder && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-blue-800 text-sm font-medium mb-1">Demo Credentials:</p>
                <p className="text-blue-700 text-sm">
                  Email: any email • Password: <code className="bg-blue-100 px-1 rounded">demo123</code>
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-medium disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Forgot Password */}
            <div className="text-center">
              <Link 
                href="/en/auth/forgot-password" 
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Forgot your password?
              </Link>
            </div>
          </form>

          {/* First Time User */}
          {!fromOrder && (
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600 text-sm mb-3">
                First time ordering?
              </p>
              <Link 
                href="/en/order"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Start Your Order →
              </Link>
            </div>
          )}
        </div>

        {/* Support */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Need help? <Link href="/contact" className="text-blue-600 hover:text-blue-700">Contact Support</Link>
          </p>
        </div>
      </div>
    </div>
  );
}