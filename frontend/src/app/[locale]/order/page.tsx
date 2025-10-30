'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Printer, 
  Star, 
  Check, 
  ArrowRight,
  Mail,
  User,
  Building,
  CreditCard
} from 'lucide-react';

export default function OrderLandingPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Get product from URL params, default to business-cards
  const [product, setProduct] = useState('business-cards');
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const productParam = urlParams.get('product');
    if (productParam) {
      setProduct(productParam);
    }
  }, []);

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call to create order and send verification email
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would:
      // 1. Create a user account or update existing
      // 2. Create an order intent
      // 3. Send verification email with token
      
      // Redirect to email confirmation page
      router.push(`/en/confirm-email?email=${encodeURIComponent(email)}&product=${product}`);
      
    } catch (error) {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Printer className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">PrintStudio</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Already have an account?</span>
              <a href="/en/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign In
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Product Info */}
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                <Star className="w-4 h-4" />
                <span>Most Popular</span>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Professional {product === 'business-cards' ? 'Business Cards' : 
                              product === 'flyers' ? 'Flyers' : 
                              product === 'stationery' ? 'Letterhead' : 'Print Products'}
              </h1>
              
              <p className="text-xl text-gray-600 mb-6">
                Create stunning {product === 'business-cards' ? 'business cards that make a lasting impression' : 
                               product === 'flyers' ? 'flyers that grab attention' : 
                               product === 'stationery' ? 'letterhead for professional correspondence' : 'print materials'}. 
                Design online with our easy-to-use studio.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {[
                'Premium cardstock (16pt, 18pt, 32pt)',
                'Multiple finish options (Matte, Gloss, Silk)',
                'Fast turnaround (3-5 business days)',
                'Free design templates',
                'Professional design tools',
                'Free shipping on orders over $50'
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-gray-900">Starting at $19.99</span>
                <span className="text-sm text-gray-500">for 100 cards</span>
              </div>
              <div className="text-sm text-gray-600">
                <p>• Standard 16pt cardstock</p>
                <p>• Matte finish included</p>
                <p>• Free design tools</p>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-2">
                "Amazing quality and super easy to design. Got my cards in 4 days!"
              </p>
              <p className="text-sm text-gray-600">- Sarah M., Marketing Director</p>
            </div>
          </div>

          {/* Right Side - Order Form */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Start Your Order
                </h2>
                <p className="text-gray-600">
                  Enter your details to begin designing your business cards
                </p>
              </div>

              <form onSubmit={handleOrderSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
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
                  <p className="text-xs text-gray-500 mt-1">
                    We'll send you a verification link to start designing
                  </p>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Your Company Inc."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-medium disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Order...</span>
                    </>
                  ) : (
                    <>
                      <Printer className="w-5 h-5" />
                      <span>Start Designing Cards</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Terms */}
                <p className="text-xs text-gray-500 text-center">
                  By continuing, you agree to our{' '}
                  <a href="/terms" className="text-blue-600 hover:text-blue-700">Terms of Service</a>
                  {' '}and{' '}
                  <a href="/privacy" className="text-blue-600 hover:text-blue-700">Privacy Policy</a>
                </p>
              </form>

              {/* Security Notice */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <CreditCard className="w-4 h-4" />
                  <span>Secure checkout • No payment required to start</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Join 50,000+ professionals who trust PrintStudio
          </h3>
          <p className="text-gray-300 mb-6">
            Fast, easy, and professional business card printing
          </p>
          <div className="flex items-center justify-center space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold">4.9/5</div>
              <div className="text-sm text-gray-400">Customer Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">50K+</div>
              <div className="text-sm text-gray-400">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">3-5</div>
              <div className="text-sm text-gray-400">Days Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}