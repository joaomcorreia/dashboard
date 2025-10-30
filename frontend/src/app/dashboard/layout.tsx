'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Globe, 
  Printer, 
  FileText, 
  Package, 
  CreditCard, 
  Settings, 
  ShoppingCart,
  Palette,
  Menu,
  X,
  DollarSign,
  LogOut,
  User
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: NavItem[];
}

const navigation: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/en/dashboard',
    icon: Home,
  },
  {
    id: 'websites',
    label: 'Websites',
    href: '/en/dashboard/websites',
    icon: Globe,
    children: [
      { id: 'my-websites', label: 'My Websites', href: '/en/dashboard/websites', icon: Globe },
      { id: 'website-builder', label: 'Website Builder', href: '/en/dashboard/websites/builder', icon: Globe },
    ]
  },
  {
    id: 'printing',
    label: 'Printing',
    href: '/en/dashboard/printing',
    icon: Printer,
    children: [
      { id: 'print-orders', label: 'My Orders', href: '/en/dashboard/printing/orders', icon: Package },
      { id: 'print-builder', label: 'Print Builder', href: '/en/dashboard/printing/builder', icon: Printer },
      { id: 'print-products', label: 'Products', href: '/en/dashboard/printing/products', icon: Package },
    ]
  },
  {
    id: 'templates',
    label: 'Templates',
    href: '/en/dashboard/templates',
    icon: FileText,
    children: [
      { id: 'main-website', label: 'Main Website', href: '/en/dashboard/templates/main-website', icon: Globe },
      { id: 'frontend-websites', label: 'Frontend Websites', href: '/en/dashboard/templates/frontend-websites', icon: Globe },
      { id: 'dashboards', label: 'Dashboards', href: '/en/dashboard/templates/dashboards', icon: FileText },
      { id: 'print-studio', label: 'Print Studio', href: '/en/dashboard/templates/print-studio', icon: Printer },
    ]
  },
  {
    id: 'orders',
    label: 'Orders',
    href: '/en/dashboard/orders',
    icon: ShoppingCart,
  },
  {
    id: 'assets',
    label: 'Assets (Brand Kit)',
    href: '/en/dashboard/assets',
    icon: Palette,
  },
  {
    id: 'finance',
    label: 'Finance',
    href: '/en/dashboard/finance',
    icon: DollarSign,
    children: [
      { id: 'finance-overview', label: 'Overview', href: '/en/dashboard/finance', icon: DollarSign },
      { id: 'subscriptions', label: 'Subscriptions', href: '/en/dashboard/finance/subscriptions', icon: CreditCard },
      { id: 'revenues', label: 'Revenues', href: '/en/dashboard/finance/revenues', icon: DollarSign },
    ]
  },
  {
    id: 'billing',
    label: 'Billing',
    href: '/en/dashboard/billing',
    icon: CreditCard,
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/en/dashboard/settings',
    icon: Settings,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    sessionStorage.clear();
    
    // Redirect to login page
    window.location.href = '/en/login';
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isActiveRoute = (href: string) => {
    if (href === '/en/dashboard') {
      return pathname === '/dashboard' || pathname === '/en/dashboard';
    }
    // Remove the /en prefix for comparison since pathname might not have it
    const cleanHref = href.replace('/en/', '/');
    return pathname.startsWith(cleanHref) || pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:flex-shrink-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">JCW</span>
            </div>
            <span className="ml-2 text-lg font-semibold text-gray-900">Dashboard</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = isActiveRoute(item.href);
              const Icon = item.icon;
              
              return (
                <div key={item.id}>
                  <Link
                    href={item.href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`mr-3 h-5 w-5 ${
                      isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                    }`} />
                    {item.label}
                  </Link>
                  
                  {/* Sub-navigation */}
                  {item.children && isActive && (
                    <div className="ml-11 mt-1 space-y-1">
                      {item.children.map((child) => {
                        const isChildActive = pathname === child.href;
                        const ChildIcon = child.icon;
                        
                        return (
                          <Link
                            key={child.id}
                            href={child.href}
                            className={`group flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                              isChildActive
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                          >
                            <ChildIcon className={`mr-2 h-4 w-4 ${
                              isChildActive ? 'text-blue-500' : 'text-gray-400'
                            }`} />
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-400 hover:text-gray-600"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex-1 lg:flex lg:items-center lg:justify-between">
              <div className="min-w-0 flex-1">
                {/* Breadcrumb or page title will go here */}
              </div>
              
              <div className="flex items-center space-x-4">
                {/* User Menu */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50"
                  >
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-700">Business Admin</p>
                      <p className="text-xs text-gray-500">business@example.com</p>
                    </div>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50">
                      <div className="py-1">
                        <div className="px-4 py-2 border-b">
                          <p className="text-sm font-medium text-gray-900">Business Admin</p>
                          <p className="text-xs text-gray-500">business@example.com</p>
                        </div>
                        <button
                          onClick={() => {
                            setShowUserMenu(false);
                            // Navigate to settings
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </button>
                        <button
                          onClick={() => {
                            setShowUserMenu(false);
                            handleLogout();
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}