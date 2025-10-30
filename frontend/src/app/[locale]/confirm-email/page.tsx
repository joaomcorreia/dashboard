'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Mail, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight,
  RefreshCw,
  Printer
} from 'lucide-react';

export default function ConfirmEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const email = searchParams.get('email');
  const product = searchParams.get('product') || 'business-cards';
  const token = searchParams.get('token');

  useEffect(() => {
    // If there's a token in the URL, automatically verify it
    if (token) {
      verifyEmail(token);
    } else {
      // Simulate getting verification from email click after 10 seconds for demo
      const timer = setTimeout(() => {
        if (!isConfirmed) {
          // Simulate user clicked email link
          verifyEmail('demo-token');
        }
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [token, isConfirmed]);

  const verifyEmail = async (verificationToken: string) => {
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call to verify email
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, always succeed
      setIsConfirmed(true);
      
      // After 3 seconds, redirect to builder
      setTimeout(() => {
        router.push(`/en/dashboard/printing/builder?product=${product}&email_confirmed=true`);
      }, 3000);
      
    } catch (err) {
      setError('Failed to verify email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resendEmail = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call to resend email
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Show success message
      alert('Verification email sent! Please check your inbox.');
    } catch (err) {
      setError('Failed to resend email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Email Confirmed!
            </h1>
            
            <p className="text-gray-600 mb-6">
              Great! Your email has been verified. You'll be redirected to the design studio in a few seconds.
            </p>
            
            <div className="space-y-4">
              <Link 
                href={`/en/dashboard/printing/builder?product=${product}&email_confirmed=true`}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Printer className="w-5 h-5" />
                <span>Start Designing Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <p className="text-sm text-gray-500">
                Redirecting automatically...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {/* Header */}
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Check Your Email
          </h1>
          
          <p className="text-gray-600 mb-6">
            We've sent a verification link to <strong>{email}</strong>. 
            Click the link in your email to start designing your business cards.
          </p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          {/* Product Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Printer className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-700 capitalize">
                {product.replace('-', ' ')} Order
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Once verified, you'll be taken directly to our design studio to create your cards.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <button
              onClick={resendEmail}
              disabled={isLoading}
              className="w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Mail className="w-4 h-4" />
              )}
              <span>{isLoading ? 'Sending...' : 'Resend Email'}</span>
            </button>
            
            <div className="text-sm text-gray-500">
              <p>Didn't receive the email? Check your spam folder or try resending.</p>
            </div>
          </div>

          {/* Help */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Need help? <Link href="/contact" className="text-blue-600 hover:text-blue-700">Contact our support team</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}